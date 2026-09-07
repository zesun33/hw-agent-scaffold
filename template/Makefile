.PHONY: images sim

images:
	podman pull ghcr.io/zesun33/verilog:latest
	podman pull ghcr.io/zesun33/asic:latest
	podman pull ghcr.io/zesun33/fpga:latest
	podman pull ghcr.io/zesun33/spice:latest

sim:
	podman run --rm --storage-opt overlay.ignore_chown_errors=true \
	  -v "$(CURDIR):/workspace:Z" -w /workspace ghcr.io/zesun33/verilog:latest \
	  bash -c "iverilog -o /tmp/sim.vvp rtl/counter.v tb/counter_tb.v && vvp /tmp/sim.vvp"
