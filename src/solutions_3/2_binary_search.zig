const std = @import("std");
const Tuple = std.meta.Tuple;

const SearchResult = std.meta.Tuple(&.{ u32, u32 });

fn binary_search(haystack: []u32, needle: u32) ?usize {
    var mid: usize = 0;
    var left: usize = 0;
    var right: usize = haystack.len;

    while (left <= right) {
        mid = left + ((right - left)) / 2;

        if (haystack[mid] == needle) {
            return mid;
        }

        if (haystack[mid] < needle) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return null;
}

test "binary_search" {
    std.debug.print("\n", .{});

    var array = [_]u32{ 5, 6, 7, 8, 9, 10, 23, 99, 10023, 43333 };

    var result_index = binary_search(&array, 7);
    std.debug.print("result_index: {?}\n", .{result_index});
    if (result_index != null) {
        std.debug.print("result_value: {?}\n", .{array[result_index.?]});
    }

    result_index = binary_search(&array, 5);
    std.debug.print("result_index: {?}\n", .{result_index});

    if (result_index) |i| {
        std.debug.print("result_value: {?}\n", .{array[i]});
    }

    result_index = binary_search(&array, 55);
    std.debug.print("result_index: {?}\n", .{result_index});

    if (result_index) |i| {
        std.debug.print("result_value: {?}\n", .{array[i]});
    }
}
