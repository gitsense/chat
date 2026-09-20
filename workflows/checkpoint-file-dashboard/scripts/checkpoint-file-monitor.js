#!/usr/bin/env node
'use strict';


const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const os = require('node:os');
const { spawnSync } = require('node:child_process');
const DEFAULT_INTERVAL_MS = 5_000;
const COMMAND_TIMEOUT_MS = 15_000;

function parseArgs(argv) {
    const args = { intervalMs: DEFAULT_INTERVAL_MS, gsc: 'gsc' };
    for (let i = 0; i < argv.length; i += 1) {
        const token = argv[i];
        if (!token.startsWith('--')) continue;
        const key = token.slice(2);
        if (key === 'help') return { help: true };
        const value = argv[++i];
        if (!value || value.startsWith('--')) throw new Error(`Missing value for --${key}`);
        if (key === 'interval-ms') args.intervalMs = Number(value);
        else if (key === 'group-id') args.groupId = value;
        else if (key === 'output') args.output = path.resolve(value);
        else if (key === 'stop-file') args.stopFile = path.resolve(value);
        else if (key === 'persona-session-id') args.personaSessionId = value;
        else if (key === 'gsc') args.gsc = value;
        else throw new Error(`Unknown option: --${key}`);
    }
    if (!args.groupId) throw new Error('--group-id is required');
    if (!Number.isFinite(args.intervalMs) || args.intervalMs < 250) throw new Error('--interval-ms must be at least 250');
    const gscHome = process.env.GSC_HOME || path.join(os.homedir(), '.gitsense');
    const shareRoot = path.resolve(gscHome, 'share');
    args.output ||= path.join(shareRoot, 'session-files-monitor.md');
    const relativeOutput = path.relative(shareRoot, args.output);
    if (relativeOutput.startsWith('..') || path.isAbsolute(relativeOutput)) {
        throw new Error(`--output must be inside ${shareRoot} so it is available through /--/share`);
    }
    args.shareUrl = `/--/share/${relativeOutput.split(path.sep).join('/')}`;
    args.stopFile ||= `${args.output}.stop`;
    return args;
}

function command(gsc, args) {
    const result = spawnSync(gsc, args, {
        encoding: 'utf8',
        timeout: COMMAND_TIMEOUT_MS,
        killSignal: 'SIGKILL',
    });
    if (result.error) throw result.error;
    if (result.status !== 0) {
        const error = new Error((result.stderr || result.stdout || `gsc exited ${result.status}`).trim());
        error.code = result.status;
        throw error;
    }
    try { return JSON.parse(result.stdout); }
    catch (error) { throw new Error(`Invalid JSON from gsc: ${error.message}`); }
}

function isGroupMissing(error) {
    return /group\s+(?:not found|does not exist)|no such group|unknown group|404/i.test(String(error?.message || error));
}

function isSessionMissing(error) {
    return /session\s+(?:not found|does not exist)|no such session|unknown session|404/i.test(String(error?.message || error));
}

function compactPath(value) {
    const normalized = String(value || '').replaceAll('\\', '/').replace(/^\/+/, '');
    const parts = normalized.split('/').filter(Boolean);
    if (parts.length <= 4) return parts.join('/');
    return `${parts[0]}/…/${parts.slice(-2).join('/')}`;
}

function displayPaths(changes) {
    const candidates = new Map();
    for (const change of changes) {
        const candidate = compactPath(change.displayPath || change.path);
        if (!candidates.has(candidate)) candidates.set(candidate, []);
        candidates.get(candidate).push(change);
    }
    return new Map([...candidates].flatMap(([candidate, records]) => {
        if (records.length === 1) return [[records[0].key, candidate]];
        return records.map(record => [record.key, record.displayPath || record.path]);
    }));
}

function normalizeCheckpointFiles(record = {}) {
    const text = value => String(value || '').trim();
    const normalizePath = value => text(value).replace(/\\/g, '/').replace(/^\.\//, '').replace(/\/{2,}/g, '/').replace(/\/$/, '');
    const workspace = record.workspace_repository || record.workspaceRepository || record.repository || {};
    const workspaceId = text(workspace.id);
    const repositories = (Array.isArray(record.repositories) ? record.repositories : [])
        .filter(value => value && typeof value === 'object' && text(value.id))
        .map(value => ({
            id: text(value.id), root: text(value.root), remote: text(value.remote),
            branch: text(value.branch), head: text(value.head),
        }));
    if (workspaceId && !repositories.some(repository => repository.id === workspaceId)) {
        repositories.unshift({
            id: workspaceId, root: text(workspace.root), remote: text(workspace.remote),
            branch: text(workspace.branch), head: text(workspace.head),
        });
    }
    const byId = new Map(repositories.map(repository => [repository.id, repository]));
    const rawChanges = Array.isArray(record.file_changes) ? record.file_changes
        : (Array.isArray(record.fileChanges) ? record.fileChanges : []);
    const legacyFiles = Array.isArray(record.files) ? record.files : [];
    const changes = rawChanges.length ? rawChanges : legacyFiles.map(file => ({ path: file }));
    return {
        fileChanges: changes.map(change => {
            const filePath = normalizePath(change?.path || change?.file);
            if (!filePath) return null;
            const explicitId = text(change?.repository);
            const repositoryId = explicitId || workspaceId;
            const repository = byId.get(repositoryId);
            const absolute = filePath.startsWith('/');
            if (absolute) {
                const parts = filePath.split('/').filter(Boolean);
                const root = parts.length ? `/${parts[0]}` : '/';
                return {
                    path: parts.slice(1).join('/') || parts[0], displayPath: filePath,
                    absolutePath: filePath, category: 'Other locations', locationLabel: root,
                    repositoryId: '', root,
                };
            }
            if (repository) {
                const category = 'Repositories';
                return {
                    path: filePath, displayPath: explicitId ? `${repositoryId}/${filePath}` : filePath,
                    absolutePath: repository.root ? path.resolve(repository.root, filePath) : '',
                    category, locationLabel: repository.id, repositoryId, root: repository.root,
                };
            }
            if (repositoryId) return {
                path: filePath, displayPath: filePath, absolutePath: '', category: 'Repositories',
                locationLabel: `${repositoryId} (metadata unavailable)`, repositoryId, root: '',
            };
            return {
                path: filePath, displayPath: filePath, absolutePath: '', category: 'Other locations',
                locationLabel: 'Unattributed', repositoryId: '', root: '',
            };
        }).filter(Boolean),
    };
}

function collectFileChanges(sessions, checkpointsBySession) {
    const grouped = new Map();
    for (const session of sessions) {
        const sessionId = String(session.session_id || session.sessionId || '');
        const checkpoints = checkpointsBySession.get(sessionId) || [];
        for (const checkpoint of checkpoints) {
            const normalized = normalizeCheckpointFiles(checkpoint);
            for (const change of normalized.fileChanges) {
                const repositoryKey = change.category === 'Other locations'
                    ? `outside:${change.root || change.locationLabel}`
                    : `repository:${change.repositoryId || change.locationLabel}`;
                const key = `${repositoryKey}\u0000${change.path}`;
                if (!grouped.has(key)) {
                    grouped.set(key, {
                        key,
                        category: change.category,
                        repository: change.category === 'Other locations' ? 'Outside repository' : change.locationLabel,
                        displayPath: change.displayPath || change.path,
                        path: change.path,
                        absolutePath: change.absolutePath || '',
                        root: change.root || '',
                        sessions: new Set(),
                        checkpoints: new Set(),
                    });
                }
                const record = grouped.get(key);
                record.sessions.add(sessionId);
                if (checkpoint.checkpointId) record.checkpoints.add(checkpoint.checkpointId);
            }
        }
    }
    const records = [...grouped.values()];
    const paths = displayPaths(records);
    return records.map(record => ({
        ...record,
        displayPath: paths.get(record.key) || record.displayPath,
        sessionCount: record.sessions.size,
        sessionIds: [...record.sessions].sort(),
        checkpointIds: [...record.checkpoints].sort(),
    })).sort((a, b) => a.repository.localeCompare(b.repository) || a.displayPath.localeCompare(b.displayPath));
}

function semanticProjection(sessions, records) {
    return {
        sessions: sessions.map(session => ({
            id: session.session_id,
            member: session.member_number,
            cwd: session.cwd,
            section: session.section,
            state: session.state,
        })).sort((a, b) => String(a.id).localeCompare(String(b.id))),
        files: records.map(record => ({
            repository: record.repository,
            path: record.path,
            absolutePath: record.absolutePath,
            root: record.root,
            sessionIds: record.sessionIds,
            checkpointIds: record.checkpointIds,
        })),
    };
}

function signature(value) {
    return crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

function shellQuote(value) {
    return `'${String(value).replaceAll("'", "'\\''")}'`;
}

function renderFileAction(file) {
    if (!file.absolutePath) return `- ${file.displayPath} (${file.sessionCount})`;
    const action = {
        label: `${file.displayPath} (${file.sessionCount})`,
        mode: 'process',
        cmd: 'zed',
        args: [file.absolutePath],
    };
    if (file.root) action.cwd = file.root;
    return `- :::gsc-action ${JSON.stringify(action)}:::`;
}

function renderReport({ pid, output, stopFile, shareUrl = '', records, stopped = false, reason = '' }) {
    const firstLine = stopped
        ? `> **Monitor stopped gracefully** · reason: ${reason} · PID: \`${pid}\` · stopped: ${new Date().toISOString()}`
        : '> Scroll to the bottom for loop details.';
    const groups = new Map();
    for (const record of records) {
        if (!groups.has(record.repository)) groups.set(record.repository, []);
        groups.get(record.repository).push(record);
    }
    const lines = [firstLine, ''];
    if (groups.size === 0) lines.push('No checkpoint file changes found.');
    for (const [repository, files] of groups) {
        lines.push(`### ${repository}`);
        for (const file of files) lines.push(renderFileAction(file));
        lines.push('');
    }
    lines.push('---', '', '### Loop details');
    lines.push(`- PID: \`${pid}\``);
    lines.push(`- Stop gracefully: \`touch ${shellQuote(stopFile)}\``);
    lines.push(`- Force stop: \`kill ${pid}\``);
    if (shareUrl) lines.push(`- Report: \`${shareUrl}\``);
    return `${lines.join('\n').trimEnd()}\n`;
}

function atomicWrite(filename, content) {
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    const temporary = `${filename}.${process.pid}.tmp`;
    fs.writeFileSync(temporary, content, { mode: 0o600 });
    fs.renameSync(temporary, filename);
}

function acquireLock(filename) {
    const lock = `${filename}.lock`;
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    try {
        const fd = fs.openSync(lock, 'wx', 0o600);
        fs.writeSync(fd, `${process.pid}\n`);
        return { fd, lock };
    } catch (error) {
        if (error.code === 'EEXIST') {
            throw new Error(`Another monitor may already be running (${lock}); remove a stale lock only after checking its PID`);
        }
        throw error;
    }
}

function personaState(options) {
    if (!options.personaSessionId) return { alive: true };
    try {
        const status = command(options.gsc, ['pi', 'sessions', 'status', options.personaSessionId, '--format', 'json']);
        const state = String(status.state || '').toLowerCase();
        return {
            alive: state === 'alive' || state === 'alive-unmanaged',
            reason: state ? `persona session ${state}` : 'persona session state unavailable',
        };
    } catch (error) {
        return { alive: false, reason: isSessionMissing(error) ? 'persona session deleted' : 'persona session unavailable' };
    }
}

function updatePersona(options, status, snapshot = null) {
    if (!options.personaSessionId) return;
    const fileCount = snapshot?.records?.length || 0;
    const sessionCount = snapshot?.sessions?.length || 0;
    const title = status === 'running' ? 'Session Files · Running' : 'Session Files · Stopped';
    const updated = new Date().toISOString().slice(11, 19) + 'Z';
    const description = status === 'running'
        ? `PID ${process.pid} · ${options.intervalMs / 1000}s · ${sessionCount} sessions · ${fileCount} files · updated ${updated} · stop: touch ${shellQuote(options.stopFile)}`
        : `Stopped · reason: ${options.stopReason || 'shutdown'} · report: ${options.shareUrl}`;
    try {
        const persona = command(options.gsc, ['pi', 'sessions', 'personas', 'show', options.personaSessionId, '--format', 'json']);
        command(options.gsc, [
            'pi', 'sessions', 'personas', 'set', options.personaSessionId,
            '--title', title,
            '--description', description,
            '--expected-updated-at', persona.updated_at,
            '--format', 'json',
        ]);
    } catch (error) {
        console.error(`[session-files-monitor] persona update failed: ${error.message}`);
    }
}

function fetchSnapshot(options) {
    const group = command(options.gsc, ['pi', 'sessions', 'groups', 'messages', options.groupId, '--last', '1', '--format', 'json']);
    const sessions = Array.isArray(group.sessions) ? group.sessions : [];
    const checkpoints = new Map();
    for (const session of sessions) {
        const id = String(session.session_id || '');
        if (!id) continue;
        const records = command(options.gsc, ['sessions', 'checkpoints', 'list', '--native-session', id, '--all', '--format', 'json']);
        checkpoints.set(id, Array.isArray(records) ? records : []);
    }
    const records = collectFileChanges(sessions, checkpoints);
    return { sessions, records, signature: signature(semanticProjection(sessions, records)) };
}

function usage() {
    return 'Usage: pi-session-files-monitor.js --group-id <id> [--persona-session-id <id>] [--output <file-in-GSC_HOME/share>] [--stop-file <file>] [--interval-ms 5000]';
}

async function main(argv = process.argv.slice(2)) {
    const options = parseArgs(argv);
    if (options.help) { console.log(usage()); return; }
    const lock = acquireLock(options.output);
    let stopping = false;
    let stopReason = '';
    options.stopReason = '';
    const requestStop = reason => { stopping = true; stopReason ||= reason; options.stopReason = stopReason; };
    const onSignal = signal => requestStop(`signal ${signal}`);
    process.on('SIGINT', onSignal);
    process.on('SIGTERM', onSignal);
    try {
        let previousSignature = '';
        let lastRecords = [];
        while (!stopping) {
            if (fs.existsSync(options.stopFile)) { requestStop('stop file'); break; }
            const owner = personaState(options);
            if (!owner.alive) { requestStop(owner.reason); break; }
            try {
                const snapshot = fetchSnapshot(options);
                if (snapshot.signature !== previousSignature) {
                    lastRecords = snapshot.records;
                    atomicWrite(options.output, renderReport({ ...options, pid: process.pid, records: snapshot.records }));
                    updatePersona(options, 'running', snapshot);
                    previousSignature = snapshot.signature;
                }
            } catch (error) {
                if (isGroupMissing(error)) { requestStop('group no longer exists'); break; }
                console.error(`[session-files-monitor] ${error.message}`);
            }
            if (!stopping) await new Promise(resolve => setTimeout(resolve, options.intervalMs));
        }
        let finalSnapshot = null;
        try { finalSnapshot = fetchSnapshot(options); } catch { /* retain the last report on shutdown */ }
        atomicWrite(options.output, renderReport({
            ...options,
            pid: process.pid,
            records: finalSnapshot?.records || lastRecords,
            stopped: true,
            reason: stopReason || 'shutdown',
        }));
        options.stopReason = stopReason || 'shutdown';
        updatePersona(options, 'stopped', finalSnapshot);
    } finally {
        process.removeListener('SIGINT', onSignal);
        process.removeListener('SIGTERM', onSignal);
        fs.closeSync(lock.fd);
        fs.unlinkSync(lock.lock);
    }
}

if (require.main === module) {
    main().catch(error => { console.error(`[session-files-monitor] ${error.message}`); process.exitCode = 1; });
}

module.exports = {
    compactPath,
    collectFileChanges,
    displayPaths,
    isGroupMissing,
    personaState,
    renderFileAction,
    renderReport,
    semanticProjection,
    signature,
};
