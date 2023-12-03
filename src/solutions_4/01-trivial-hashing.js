function create_trivial_hash_table(size = 100) {
  const hash_table = Array(size + 1);

  for (let i = 0; i < size + 1; i++) {
    hash_table[i] = [false, false];
  }

  return {
    add(value) {
      if (value > 0) {
        hash_table[value][0] = true;
      } else {
        hash_table[Math.abs(value)][1] = true;
      }
    },
    has(value) {
      if (value > 0) {
        return hash_table[value][0] === true;
      } else {
        return hash_table[Math.abs(value)][1] === true;
      }
    },
  };
}

const trivial_hash_table = create_trivial_hash_table(100);

const elements = [1, -100, 100, 34, 56];
elements.forEach(trivial_hash_table.add);

console.log("input", elements);
console.log("1: ", trivial_hash_table.has(1));
console.log("-1: ", trivial_hash_table.has(-1));
console.log("100: ", trivial_hash_table.has(100));
console.log("-100: ", trivial_hash_table.has(-100));
console.log("34: ", trivial_hash_table.has(34));
console.log("56: ", trivial_hash_table.has(56));
