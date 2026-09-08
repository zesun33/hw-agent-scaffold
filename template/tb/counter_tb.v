`timescale 1ns/1ps
module counter_tb;
  reg clk;
  reg rst;
  wire [3:0] count;

  counter dut (.clk(clk), .rst(rst), .count(count));

  initial begin
    clk = 0;
    forever #5 clk = ~clk;
  end

  initial begin
    $dumpfile("counter.vcd");
    $dumpvars(0, counter_tb);
    rst = 1;
    repeat (2) @(negedge clk);
    rst = 0;
    @(posedge clk);
    @(negedge clk);
    if (count !== 4'd1) begin
      $fatal(1, "expected 1 after first tick, got %0d", count);
    end
    repeat (15) @(posedge clk);
    @(negedge clk);
    if (count !== 4'd0) begin
      $fatal(1, "expected wrap to 0, got %0d", count);
    end
    $display("PASS");
    $finish;
  end
endmodule
