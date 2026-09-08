import test from "node:test";
import assert from "node:assert/strict";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bin = path.join(root, "bin", "create-hw-agent.js");

test("create-hw-agent writes MCP npx entries for all servers", () => {
  const dest = fs.mkdtempSync(path.join(os.tmpdir(), "hw-agent-"));
  const res = spawnSync(process.execPath, [bin, dest], { encoding: "utf8" });
  assert.equal(res.status, 0, res.stderr + res.stdout);
  const mcp = JSON.parse(fs.readFileSync(path.join(dest, ".cursor", "mcp.json"), "utf8"));
  const names = Object.keys(mcp.mcpServers).sort();
  assert.deepEqual(names, [
    "cocotb",
    "formal",
    "fpga",
    "gds",
    "openroad",
    "rtl-review",
    "spice",
    "verilog",
    "yosys",
  ]);
  for (const cfg of Object.values(mcp.mcpServers)) {
    assert.equal(cfg.command, "npx");
    assert.equal(cfg.args[0], "-y");
    assert.ok(String(cfg.args[1]).startsWith("@zesun33/mcp-"));
  }
  assert.ok(fs.existsSync(path.join(dest, "rtl", "counter.v")));
  const rtl = fs.readFileSync(path.join(dest, "rtl", "counter.v"), "utf8");
  const tb = fs.readFileSync(path.join(dest, "tb", "counter_tb.v"), "utf8");
  assert.match(rtl, /posedge clk or posedge rst/);
  assert.match(tb, /@\(negedge clk\)/);
  fs.rmSync(dest, { recursive: true, force: true });
});

test("create-hw-agent doctor exits 0", () => {
  const res = spawnSync(process.execPath, [bin, "doctor"], { encoding: "utf8" });
  assert.equal(res.status, 0, res.stderr);
  assert.match(res.stdout, /hw-agent doctor/);
});
