# @zesun33/create-hw-agent

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
