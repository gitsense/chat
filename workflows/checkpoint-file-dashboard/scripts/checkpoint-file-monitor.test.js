'use strict';

const {
    collectFileChanges,
    compactPath,
    renderFileAction,
    renderReport,
    semanticProjection,
    signature,
} = require('./checkpoint-file-monitor');

function checkpoint(id, files, root = '/repo') {
    return {
        checkpointId: id,
        workspace_repository: { id: 'pi', root },
        repositories: [{ id: 'pi', root }],
        file_changes: files.map(path => ({ path, method: 'edit', change: 'modified' })),
    };
}

test('aggregates file changes by distinct session, not checkpoint', () => {
    const sessions = [{ session_id: 's1' }, { session_id: 's2' }];
    const checkpoints = new Map([
        ['s1', [checkpoint('c1', ['packages/chat/widgets/app/components/pi/MessagePane.js']), checkpoint('c2', ['packages/chat/widgets/app/components/pi/MessagePane.js'])]],
        ['s2', [checkpoint('c3', ['packages/chat/widgets/app/components/pi/MessagePane.js'])]],
    ]);
    const [record] = collectFileChanges(sessions, checkpoints);
    expect(record.sessionCount).toBe(2);
    expect(record.checkpointIds).toEqual(['c1', 'c2', 'c3']);
});

test('keeps outside-repository files in their own group', () => {
    const sessions = [{ session_id: 's1' }];
    const checkpoints = new Map([['s1', [checkpoint('c1', ['/tmp/shared.json'], '/repo')]]]);
    const [record] = collectFileChanges(sessions, checkpoints);
    expect(record.repository).toBe('Outside repository');
});

test('compacts long paths while preserving the useful suffix', () => {
    expect(compactPath('packages/chat/widgets/app/components/pi/TrackerView.js'))
        .toBe('packages/…/pi/TrackerView.js');
});

test('file rows become Zed process actions with structured arguments', () => {
    const row = renderFileAction({
        displayPath: 'packages/…/pi/MessagePane.js',
        sessionCount: 3,
        absolutePath: '/repo/packages/chat/widgets/app/components/pi/MessagePane.js',
        root: '/repo',
    });
    expect(row).toContain(':::gsc-action');
    expect(row).toContain('"cmd":"zed"');
    expect(row).toContain('"args":["/repo/packages/chat/widgets/app/components/pi/MessagePane.js"]');
    expect(row).toContain('"cwd":"/repo"');
});

test('report starts with runtime controls and stopped reports explain why', () => {
    const running = renderReport({ pid: 123, output: '/tmp/report.md', stopFile: '/tmp/report.md.stop', records: [] });
    expect(running.split('\n')[0]).toBe('> Scroll to the bottom for loop details.');
    expect(running).toContain('PID: `123`');
    expect(running).toContain("touch '/tmp/report.md.stop'");

    const stopped = renderReport({ pid: 123, output: '/tmp/report.md', stopFile: '/tmp/report.md.stop', records: [], stopped: true, reason: 'stop file' });
    expect(stopped.split('\n')[0]).toContain('Monitor stopped gracefully');
    expect(stopped.split('\n')[0]).toContain('reason: stop file');
});

test('semantic signatures ignore runtime metadata', () => {
    const projection = semanticProjection([{ session_id: 's1', member_number: 1 }], []);
    expect(signature(projection)).toBe(signature(JSON.parse(JSON.stringify(projection))));
});
