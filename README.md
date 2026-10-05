# @zesun33/create-hw-agent

<!-- BEGIN GENERATED PROJECT GUIDE -->

## Purpose and first steps

Create a starter RTL project and configuration for nine hardware MCP servers.

**Who it is for:** New users who want a small RTL project and the hardware MCP configuration in one step.

**First task:** Run `npx @zesun33/create-hw-agent my-asic`, inspect the generated files, then follow its README.

**What to expect:** Starter counter RTL, a testbench, a Makefile, and a client configuration for all nine MCP servers.

**Current scope:** Scaffolding is available from npm. Simulation and physical design still need a container runtime, images, and any relevant PDK.

**Start here:** [Generated project instructions](template/README.md).

**Related projects:** [hw-agent-tooling](https://github.com/zesun33/hw-agent-tooling), [eda-docker-images](https://github.com/zesun33/eda-docker-images), [mcp-verilog](https://github.com/zesun33/mcp-verilog).

[Choose another project](https://github.com/zesun33/personal-projects/blob/main/GETTING_STARTED.md).
<!-- END GENERATED PROJECT GUIDE -->

> One-step installer for the zesun33 hardware-agent family.

```bash
npx @zesun33/create-hw-agent my-asic
```

That is the whole install. It writes a project with starter RTL and a Cursor MCP config that launches **every** server (`mcp-verilog`, review, yosys, cocotb, openroad, gds, formal, fpga, spice) via `npx -y @zesun33/mcp-*`.

## npm vs npx

| | |
| :--- | :--- |
| **npm** | Installs a package. `npm i -g @zesun33/create-hw-agent` puts `create-hw-agent` on your PATH. |
| **npx** | Runs a package once. No global install. This is the one-step. |
| **`npx -y @zesun33/mcp-verilog`** | How Cursor starts each MCP after scaffold. `-y` skips the npx prompt. |

Optional: `npx @zesun33/create-hw-agent doctor` checks node/podman.

Then `make images` in the new project pulls `ghcr.io/zesun33/{verilog,asic,fpga,spice}`. Servers default to those GHCR images; set `MCP_*_IMAGE=localhost/zesun33/...` only if you built locally.

```json
{
  "mcpServers": {
    "verilog": {
      "command": "npx",
      "args": ["-y", "@zesun33/mcp-verilog"],
      "env": { "MCP_VERILOG_IMAGE": "ghcr.io/zesun33/verilog" }
    }
  }
}
```

The packages are on npm. Clone this repo only if you are changing the scaffolder itself.

## npm releases

See [RELEASING.md](https://github.com/zesun33/hw-agent-scaffold/blob/main/RELEASING.md) for GitHub Actions dry runs and trusted publishing.
