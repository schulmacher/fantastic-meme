const std = @import("std");
const log = std.log.info;

fn LinkedList(comptime T: type) type {
    return struct {
        pub const Node = struct {
            next: ?*Node,
            data: T,
        };

        first: ?*Node,
        last: ?*Node,
    };
}

pub fn FifoQueue(comptime T: type) type {
    return struct {
        const Self = @This();

        pub const Node = struct {
            next: ?*Node = null,
            data: T,
        };

        first: ?*Node = null,
        last: ?*Node = null,

        pub fn addNode(list: *Self, newNode: *Node) void {
            if (list.first == null) {
                list.first = newNode;
            } else {
                if (list.last) |lastNode| {
                    lastNode.next = newNode;
                } else if (list.first) |firstNode| {
                    firstNode.next = newNode;
                }
                newNode.next = null;
                list.last = newNode;
            }
        }

        pub fn addData(list: *Self, allocator: std.mem.Allocator, data: T) !void {
            var newNode = try allocator.create(Node);
            newNode.* = Node{ .data = data };
            list.addNode(newNode);
        }

        pub fn next(list: *Self) ?*Node {
            const first = list.first orelse return null;
            list.first = first.next;
            return first;
        }
    };
}

pub fn main() !void {
    const Q = FifoQueue(u32);
    var q = Q{};

    var node1 = Q.Node{ .data = 1 };
    var node2 = Q.Node{ .data = 4 };
    var node3 = Q.Node{ .data = 10 };
    var node4 = Q.Node{ .data = 132 };

    q.addNode(&node1);
    q.addNode(&node2);
    q.addNode(&node2);
    q.addNode(&node3);
    q.addNode(&node3);
    q.addNode(&node4);

    // infinity loop, because the created node is on the stack and the pointer is
    // invalid after the function returns? Maybe this is a case where the problem of
    // passing a pointer to a stack variable to a function that stores it somewhere
    // can be solved by passing a memory allocator to the function?
    // q.addData(123);

    var readBuf: [2 * 1024 * 1024]u8 = undefined;
    var fba = std.heap.FixedBufferAllocator.init(&readBuf);
    const allocator = fba.allocator();
    try q.addData(allocator, 123);
    try q.addData(allocator, 123);
    try q.addData(allocator, 123);

    while (q.next()) |it| {
        log("item: {}\n", .{it.data});
    }
}
