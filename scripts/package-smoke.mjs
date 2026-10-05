import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const work = fs.mkdtempSync(path.join(os.tmpdir(), 'scaffold-release-'));
try {
  const target = path.join(work, 'packed-project');
  execFileSync('node', [process.argv[2], target], {stdio: 'inherit', cwd: work});
  const servers = JSON.parse(fs.readFileSync(path.join(target, '.cursor/mcp.json'))).mcpServers;
  const expected = ['verilog', 'cocotb', 'yosys', 'rtl-review', 'openroad', 'gds', 'formal', 'fpga', 'spice']
    .map(name => `@zesun33/mcp-${name}`).sort();
  assert.deepEqual(Object.values(servers).map(server => server.args[1]).sort(), expected);
  assert.ok(fs.readFileSync(path.join(target, 'README.md'), 'utf8').includes('packed-project'));
  console.log('PASS: packed scaffolder creates a project with all nine MCP entries');
} finally {
  fs.rmSync(work, {recursive: true, force: true});
}
