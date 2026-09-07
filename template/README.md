# {{NAME}}

Scaffolded by [`@zesun33/create-hw-agent`](https://github.com/zesun33/hw-agent-scaffold).

## What this is

| Command | Meaning |
| :--- | :--- |
| **npm** | Node's package installer. `npm i -g @zesun33/create-hw-agent` puts `create-hw-agent` on your PATH. |
| **npx** | Run a package once without a global install. `npx @zesun33/create-hw-agent my-asic` is the one-step. |
| **MCP servers** | Small programs Cursor/Claude call. This project's `.cursor/mcp.json` starts every HW server with `npx -y @zesun33/mcp-*` (Verilog, review, Yosys, cocotb, OpenROAD, GDS, formal, FPGA, SPICE). |

## Next

```bash
make images   # pull GHCR EDA containers (verilog/asic/fpga/spice)
make sim      # iverilog the bundled counter
```

Open this folder in Cursor. The agent can lint/sim/synth against the counter in `rtl/`.

Until packages are on npm, clone the family from GitHub and point MCP `command` at each repo's `dist/index.js` (see each server README).
