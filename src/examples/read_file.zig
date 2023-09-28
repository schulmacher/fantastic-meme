const std = @import("std");
const warn = @import("std").log.warn;

fn readFile(allocator: std.mem.Allocator, filename: []const []const u8) ![]u8 {
    // if resolve fails, try will immediatelly propagate the error to the fn caller
    const path = try std.fs.path.resolve(allocator, filename);
    // after the fn has finished, clean up memory
    defer allocator.free(path);
    warn("{s}\n", .{path});

    const f: std.fs.File = try std.fs.openFileAbsolute(path, .{ .mode = .read_only });
    const f_stat = try f.stat();
    const result = try allocator.alloc(u8, f_stat.size);
    errdefer allocator.free(result);

    const size = try f.read(result);
    _ = size;

    return result;
}

pub fn main() !void {
    var readBuf: [2 * 1024 * 1024]u8 = undefined;
    var fba = std.heap.FixedBufferAllocator.init(&readBuf);
    const allocator = fba.allocator();

    var cwdBuf: [std.fs.MAX_PATH_BYTES]u8 = undefined;
    const cwd = try std.os.getcwd(&cwdBuf);

    warn("Lets open the fail... \n", .{});

    const fileContents = try readFile(allocator, &[_][]const u8{ cwd, "src", "examples", "read_file.txt" });

    warn("{s}\n", .{fileContents});
}
