const std = @import("std");

pub fn main() !void {}

test "simple test" {
    var list = std.ArrayList(i32).init(std.testing.allocator);
    defer list.deinit(); // try commenting this out and see if zig detects the memory leak!
    try list.append(42);
    try std.testing.expectEqual(@as(i32, 42), list.pop());
}

// test "integer overflow at compile time" {
//     const x: u8 = 255;
//     _ = x + 1;
// }
// test "integer overflow at runtime" {
//     var x: u8 = 255;
//     x += 1;
// }
// test "actually undefined behavior" {
//     @setRuntimeSafety(false);
//     var x: u8 = 255;
//     x += 1; // XXX undefined behavior!
// }

var y: i32 = add(10, x);
const x: i32 = add(12, 34);

test "global variables" {
    assert(x == 46);
    assert(y == 56);
}

fn add(a: i32, b: i32) i32 {
    return a + b;
}

const assert = std.debug.assert;

test "null @intToPtr" {
    const ptr: ?*i32 = @ptrFromInt(0x0);
    assert(ptr == null);
}

test "if while syntax" {
    const msg = "hello this is dog";
    var it = std.mem.tokenize(u8, msg, " ");
    while (it.next()) |item| {
        std.debug.print("{s}\n", .{item});
    }
}
