const std = @import("std");
const log = std.log.info;

fn binarySearch(array: []const i32, search: i32) ?usize {
    var low: usize = 0;
    var high: usize = array.len;
    var mid: usize = (high - low) / 2;

    while (low < high) {
        if (array[mid] == search) return mid;
        if (array[mid] < search) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
        mid = low + (high - low) / 2;
    }

    if (array[mid] == search) return mid;
    return null;
}

pub fn main() !void {
    const sorted_array = [_]i32{ 1, 2, 4, 6, 19, 23, 43, 55, 91, 100 };

    for (&sorted_array, 0..) |val, i| {
        log("item {} at index {}, found at index: {any}\n", .{ val, i, binarySearch(&sorted_array, val) });
    }
}
