'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const script = path.join(__dirname, 'connections-report');
const workflowDirectory = path.resolve(__dirname, '..');
const groupId = '123e4567-e89b-42d3-a456-426614174999';
const reportPath = path.join(workflowDirectory, 'reports', `connections-report-${groupId}.md`);

function section(report, heading, nextHeading) {
  const start = report.indexOf(`## ${heading}`);
  const end = report.indexOf(`## ${nextHeading}`, start + 1);
  expect(start).toBeGreaterThanOrEqual(0);
  expect(end).toBeGreaterThan(start);
  return report.slice(start, end);
}

afterEach(() => {
  fs.rmSync(reportPath, { force: true });
});

test('generates current onboarding contracts and a prompted generic fallback', () => {
  const fakeBin = fs.mkdtempSync(path.join(os.tmpdir(), 'connections-report-test-'));
  const fakeGsc = path.join(fakeBin, 'gsc');
  fs.writeFileSync(fakeGsc, '#!/bin/sh\necho \'{"group":{"dividers":["Agents"]}}\'\n', { mode: 0o700 });

  try {
    const output = execFileSync(script, ['--group-id', groupId], {
      encoding: 'utf8',
      env: { ...process.env, PATH: `${fakeBin}:${process.env.PATH}` },
    });
    expect(output).toContain(`connections-report-${groupId}.md`);

    const report = fs.readFileSync(reportPath, 'utf8');
    expect(report).toContain('# Pair an existing agent');

    // Inspect the actual copied prompts, not their JSON-escaped rendering.
    const copiedPrompts = [...report.matchAll(/^.*?:::gsc-action (\{.*?\}):::/gm)]
      .map((match) => JSON.parse(match[1]))
      .filter((action) => action.mode === 'copy')
      .map((action) => action.text);
    expect(copiedPrompts).toHaveLength(4);
    for (const prompt of copiedPrompts) {
      expect(prompt).toContain('No contact card is needed when that session itself is the recipient');
      expect(prompt).toContain('gsc inform --mailbox <lead-mailbox-id>');
      expect(prompt).toContain('Only when the intended recipient is the external parent behind a Buddy');
      expect(prompt).toContain('Sending this request is not proof the lead greeted anyone');
      expect(prompt).toContain('do not execute arbitrary commands');
      expect(prompt).toContain("--group-section 'Agents'");
      expect(prompt).not.toContain("printf '%s\\\\n'");
      expect(prompt).not.toMatch(/\| \\\\$/m);
      const shellBlocks = [...prompt.matchAll(/(?:```|~~~)bash\n([\s\S]*?)\n(?:```|~~~)/g)];
      expect(shellBlocks.length).toBeGreaterThan(0);
      for (const [, block] of shellBlocks) {
        // Syntax check only: never execute onboarding or send real messages.
        const input = block.replace(/<[a-z][a-z0-9-]*>/g, 'example-value');
        expect(() => execFileSync('bash', ['-n'], { input, encoding: 'utf8' })).not.toThrow();
      }
    }
    const piPrompt = copiedPrompts.find((prompt) => prompt.includes('--harness pi'));
    expect(piPrompt).toContain('--agent-mailbox-id <parent-pi-mailbox-id>');
    const codexPrompt = copiedPrompts.find((prompt) => prompt.includes('--harness codex'));
    expect(codexPrompt).toContain('inbox send --agent-sender <agent-mailbox-id>');

    const claude = section(report, 'Claude Code', 'Codex');
    expect(claude).toContain('--timeout 720h');
    expect(claude).toContain('Watch for GitSense Buddy replies');
    expect(claude).toContain('`mailbox_id` is the Buddy\'s mailbox');
    expect(claude).toContain('gsc inform --mailbox <mailbox-id>');
    expect(claude).toContain('Do not send parent-to-Buddy messages to `agent_mailbox_id`');
    expect(claude).toContain('gitsense.buddy.contact.request');
    expect(claude).toContain('Publish in Group:');
    expect(claude).toContain('bounded research, review, or implementation');
    expect(claude).not.toContain('"type":"gitsense.buddy.ready"');

    const codex = section(report, 'Codex', 'Pi');
    expect(codex).toContain('CODEX_THREAD_ID is required');
    expect(codex).toContain('codex queue --thread');
    expect(codex).toContain('`mailbox_id` is the Buddy\'s mailbox');
    expect(codex).toContain('gsc inform --mailbox <mailbox-id>');
    expect(codex).toContain('gitsense.buddy.contact.request');
    expect(codex).toContain('gitsense.buddy.route.update');
    expect(codex).toContain('Delegation does not authorize Group publication');
    expect(codex).toContain('Update your Buddy with your');
    expect(codex).toContain('If the update fails, report that the Buddy was not updated');
    expect(codex).not.toContain('"type":"gitsense.buddy.ready"');
    expect(codex).not.toContain('codex_thread_id: <parent-codex-thread>');

    const pi = section(report, 'Pi', 'Other agent');
    expect(pi).toContain('`mailbox_id` is the Buddy\'s mailbox');
    expect(pi).toContain('gsc inform --mailbox <mailbox-id>');
    expect(pi).toContain('gitsense.buddy.contact.request');
    expect(pi).toContain('It can perform bounded work when explicitly delegated');
    expect(pi).toContain('\\"type\\":\\"gitsense.buddy.ready\\"');

    const generic = report.slice(report.indexOf('## Other agent'));
    expect(generic).toContain('--buddy-prompt');
    expect(generic).toContain('The created Buddy must not run');
    expect(generic).toContain('`mailbox_id` is the Buddy\'s mailbox');
    expect(generic).toContain('gsc inform --mailbox <mailbox-id>');
    expect(generic).toContain('Do not send Buddy-directed messages to `agent_mailbox_id`');
    expect(generic).toContain('gitsense.buddy.contact.request');
    expect(generic).toContain('advertise a direct inbound contact route');
    expect(generic).toContain('one-way connection cannot return findings');
    expect(generic).toContain('\\"type\\":\\"gitsense.buddy.ready\\"');
  } finally {
    fs.rmSync(fakeBin, { recursive: true, force: true });
  }
});

test('documents direct contact, route refresh, and ordered delivery recovery', () => {
  const common = fs.readFileSync(path.join(workflowDirectory, 'buddy-prompt.md'), 'utf8');
  const claude = fs.readFileSync(path.join(workflowDirectory, 'buddy-instructions', 'claude.md'), 'utf8');
  const codex = fs.readFileSync(path.join(workflowDirectory, 'buddy-instructions', 'codex.md'), 'utf8');
  const pi = fs.readFileSync(path.join(workflowDirectory, 'buddy-instructions', 'pi.md'), 'utf8');

  expect(common).toContain('Valid readiness completes onboarding; do not send an ACK');
  expect(common).toContain('This Buddy is a contact-information endpoint, not a message relay');
  expect(common).toContain('"type": "gitsense.buddy.contact"');
  expect(common).toContain('`communication` is exactly `bidirectional`');
  expect(common).toContain('`instructions` is always a string');
  expect(common).toContain('`codex_queue_target` as a string');
  expect(common).toContain('gitsense.buddy.route.update');
  expect(common).toContain('Publish in Group:');
  expect(common).toContain('Respond to the meaning of a request, not the mailbox operation');
  expect(common).toMatch(/Delegation alone\s+does not authorize Group publication/);
  expect(common).toContain('human-authorized Group lead');
  expect(common).toContain('Readiness and valid\nroute-refresh controls remain silent');
  const lead = fs.readFileSync(path.join(workflowDirectory, 'lead-prompt.md'), 'utf8');
  expect(lead).toContain('Human-authorized Group coordination');
  expect(lead).toContain('Do not imply that contacting a Buddy also contacted its parent');
  expect(lead).toContain('As a bounded workflow policy');
  expect(lead).toContain('other than yourself, including Buddies and an Observer if present');
  expect(lead).toContain('do not embed a stale report');
  expect(common).toContain('`transport` and `wake` are required only when direct contact is');
  expect(common).toContain('inbox envelope sender to match');
  expect(codex).toContain('inbox envelope sender to match');
  expect(common).not.toContain('GSC_BUDDY_ACK');
  expect(claude).toContain('`communication` to `bidirectional`');
  expect(claude).toContain('string-valued `instructions` field');
  expect(claude).toContain('`transport` to `gsc-inform`');  expect(pi).toContain('`communication` to `bidirectional`');
  expect(pi).toContain('string-valued `instructions` field');
  expect(pi).toContain('`transport` to `gsc-inform`');  expect(codex).toContain('`communication` to `bidirectional`');
  expect(codex).toContain('string-valued `instructions` field');
  expect(codex).toMatch(/`transport` to\s+`gsc-inform\+codex-queue`/);  expect(codex).toContain('codex_queue_target');
  expect(codex).toContain('gitsense.buddy.route.update');
  expect(codex.indexOf('gsc inform')).toBeLessThan(codex.indexOf('codex queue'));
  expect(codex).toContain('If `gsc inform` succeeds but `codex queue` fails');
  expect(codex).toContain('Do not send it again. Retry only `codex queue`');
});
