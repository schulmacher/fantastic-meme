const std = @import("std");
const Tuple = std.meta.Tuple;

const SearchResult = std.meta.Tuple(&.{ u32, u32 });

fn jump_search(haystack: []u32, needle: u32) ?usize {
    var start: usize = 0;
    var max = haystack.len - 1;
    var step: usize = haystack.len / 4;
    var end: usize = @min(start + step, max);

    while (start <= max) {
        if (haystack[start] <= needle and needle < haystack[end]) {
            // could set the max to current end
            // and change the step size here to be (end-start) / 4
            // when the array size is larger than x to avoid linear serach on huge arrays
            for (start..end - 1) |i| {
                if (haystack[i] == needle) {
                    return i;
                }
            }
            return null;
        }
        start += step;
        end = @min(start + step, max);
    }
    return null;
}

test "jump_search" {
    std.debug.print("\n", .{});

    var array = [_]u32{ 5, 6, 7, 8, 9, 10, 23, 99, 10023, 43333 };

    var result_index = jump_search(&array, 7);
    std.debug.print("result_index: {?}\n", .{result_index});
    if (result_index != null) {
        std.debug.print("result_value: {?}\n", .{array[result_index.?]});
    }

    result_index = jump_search(&array, 5);
    std.debug.print("result_index: {?}\n", .{result_index});

    if (result_index) |i| {
        std.debug.print("result_value: {?}\n", .{array[i]});
    }

    result_index = jump_search(&array, 55);
    std.debug.print("result_index: {?}\n", .{result_index});

    if (result_index) |i| {
        std.debug.print("result_value: {?}\n", .{array[i]});
    }
}
