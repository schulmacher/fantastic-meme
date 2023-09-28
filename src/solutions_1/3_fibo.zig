const log = @import("std").log.info;

const ZiboError = error{TooBigZibo};

pub fn main() !void {
    log("Fibo 0: {}", .{try zibonacci(0)});
    log("Fibo 1: {}", .{try zibonacci(1)});
    log("Fibo 2: {}", .{try zibonacci(2)});
    log("Fibo 3: {}", .{try zibonacci(3)});
    log("Fibo 4: {}", .{try zibonacci(4)});
    log("Fibo 5: {}", .{try zibonacci(5)});
    log("Fibo 6: {}", .{try zibonacci(6)});
    log("Fibo 7: {}", .{try zibonacci(7)});
    log("Fibo 47: {}", .{try zibonacci(47)});
    log("Fibo 93: {}", .{try zibonacci(93)});
    log("Fibo 137?: {}", .{try zibonacci(137)});
}

fn zibonacci(atPosition: u8) ZiboError!u64 {
    if (atPosition > 93) return ZiboError.TooBigZibo;

    var n2: u64 = 0;
    var n1: u64 = 1;

    if (atPosition == 0) return n2;
    if (atPosition == 1) return n1;

    return ziboRecurse(n2, n1, 2, atPosition);
}

fn ziboRecurse(n2v: u64, n1v: u64, currentN: u8, finalN: u8) u64 {
    if (currentN == finalN) {
        return n1v + n2v;
    }

    return ziboRecurse(n1v, n2v + n1v, currentN + 1, finalN);
}
