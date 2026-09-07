#!/usr/bin/env node
/**
 * create-hw-agent / hw-agent — one-step installer for the zesun33 HW agent family.
 *
 * npm  = install a package into node_modules / globally (stays on disk).
 * npx  = run a package once (downloads if needed, no global install).
 *
 * One-step (recommended):
 *   npx @zesun33/create-hw-agent my-asic
 *
 * Optional global:
 *   npm i -g @zesun33/create-hw-agent && create-hw-agent my-asic
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE = path.resolve(__dirname, "..", "template");

function usage() {
  console.log(`Usage:
  npx @zesun33/create-hw-agent <dir>   # one-step: project + MCP config for all servers
  npx @zesun33/create-hw-agent doctor  # check node/podman/images

npm vs npx:
  npm install  keeps packages on disk (global or in node_modules).
  npx          runs a package without a global install.
  This scaffolder writes Cursor MCP entries that launch each server with
  \`npx -y @zesun33/mcp-*\` so you do not clone eight repos.`);
}

function copyTemplate(dest) {
  fs.cpSync(TEMPLATE, dest, { recursive: true });
  const name = path.basename(path.resolve(dest));
  const readme = path.join(dest, "README.md");
  if (fs.existsSync(readme)) {
    fs.writeFileSync(readme, fs.readFileSync(readme, "utf8").replaceAll("{{NAME}}", name));
  }
}

function doctor() {
  const checks = [];
  const node = process.version;
  checks.push(`node ${node}`);
  const podman = spawnSync("podman", ["--version"], { encoding: "utf8" });
  checks.push(podman.status === 0 ? podman.stdout.trim() : "podman: not found (MCP servers default to rootless podman)");
  const docker = spawnSync("docker", ["--version"], { encoding: "utf8" });
  if (docker.status === 0) checks.push(docker.stdout.trim());
  console.log("hw-agent doctor");
  for (const c of checks) console.log(`  - ${c}`);
  console.log("EDA images (pull when you run a flow):");
  console.log("  podman pull ghcr.io/zesun33/verilog:latest");
  console.log("  podman pull ghcr.io/zesun33/asic:latest");
  console.log("  podman pull ghcr.io/zesun33/fpga:latest");
  console.log("  podman pull ghcr.io/zesun33/spice:latest");
}

const arg = process.argv[2];
if (!arg || arg === "-h" || arg === "--help") {
  usage();
  process.exit(arg ? 0 : 1);
}
if (arg === "doctor") {
  doctor();
  process.exit(0);
}
if (arg.startsWith("-")) {
  usage();
  process.exit(1);
}

const dest = path.resolve(process.cwd(), arg);
if (fs.existsSync(dest) && fs.readdirSync(dest).length > 0) {
  console.error(`Refusing to write into non-empty directory: ${dest}`);
  process.exit(1);
}
fs.mkdirSync(dest, { recursive: true });
copyTemplate(dest);
console.log(`Created ${dest}
Next:
  cd ${arg}
  podman pull ghcr.io/zesun33/verilog:latest   # plus asic/fpga/spice as needed
  # Open this folder in Cursor — MCP servers start via npx -y @zesun33/mcp-*
`);
