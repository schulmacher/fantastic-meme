const PRIMES = [3, 7, 13, 23, 41, 61, 97];

function make_linear_hash_fn(hash_size) {
  return function modulo_hash_fn(value) {
    if (typeof value === "number") {
      return value % hash_size;
    }
    if (typeof value === "string") {
      return (value.charCodeAt(0) || 0) % hash_size;
    }
    throw new Error("Not supported value type " + typeof value);
  };
}

function make_reverse_modulo_hash_fn(hash_size) {
  const hash_fn = make_linear_hash_fn(hash_size);

  return function reverse_modulo_hash_fn(value) {
    return hash_size - hash_fn(value);
  };
}

function create_double_hash_map(n) {
  if (n > PRIMES[PRIMES.length - 1]) throw new Error("Too big");

  let hash1_prime = PRIMES.findIndex((p) => p >= n);
  if (hash1_prime === 0) {
    hash1_prime = hash1_prime + 1;
  }
  const hash2_prime = PRIMES[hash1_prime - 1];
  hash1_prime = PRIMES[hash1_prime];

  const hash_fn_1 = make_linear_hash_fn(hash1_prime);
  const hash_fn_2 = make_reverse_modulo_hash_fn(hash2_prime);

  const table = Array(hash1_prime);
  let occupied_space = 0;

  for (let i = 0; i < table.length; i++) {
    table[i] = [null, null]; // [key, value]
  }

  return {
    /**
     * @param {string|number} key
     * @param {*} value
     * @returns {number} hash value, position of element in hash table
     */
    add(key, value) {
      if (table.length === occupied_space) throw new Error("Table full");

      let hash_value_1 = hash_fn_1(key);
      let hash_to_check = hash_value_1;
      let hash_value_2;

      if (table[hash_to_check][0] !== null) {
        hash_value_2 = hash_fn_2(key);

        if (table[hash_value_2][0] === null) {
          hash_to_check = hash_value_2;
        }
      }

      let linear_probe_n = 1;

      while (
        table[hash_to_check][0] !== null &&
        table[hash_to_check][0] !== key
      ) {
        if (linear_probe_n > 30) throw new Error("infinyZomg");
        hash_to_check =
          (hash_value_1 + linear_probe_n * hash_value_2) % table.length;
        linear_probe_n += 1;
      }

      table[hash_to_check][0] = key;
      table[hash_to_check][1] = value;

      return hash_to_check;
    },
    /**
     * @param {string|number} key
     * @returns {*}
     */
    get(key) {
      let hash1 = hash_fn_1(key);
      if (table[hash1][0] === key) return table[hash1][1];

      let hash2 = hash_fn_2(key);
      if (table[hash2][0] === key) return table[hash2][1];

      let hash = hash1;
      let hash2_linear_probe_n = 1;

      do {
        hash = (hash1 + hash2_linear_probe_n * hash2) % table.length;
        hash2_linear_probe_n += 1;

        if (table[hash][0] === key) return table[hash][1];
      } while (table[hash][0] !== null && hash !== hash1);

      return undefined;
    },
    table() {
      return table.map((k, i) => [i, k]);
    },
  };
}

const dh_hash = create_double_hash_map(7);

console.log("added 7 to hash index:", dh_hash.add(7, "7"));
console.log("added 14 to hash index:", dh_hash.add(14, "14"));
console.log("added 21 to hash index:", dh_hash.add(21, "21"));
console.log("added 3 to hash index:", dh_hash.add(3, "3"));
console.log("added 6 to hash index:", dh_hash.add(6, "6"));
console.log("added 9 to hash index:", dh_hash.add(9, "9"));
console.log("added 10 to hash index:", dh_hash.add(10, "10"));

console.log("get 6:", dh_hash.get(6));
console.log("overwrite 6 to hash index:", dh_hash.add(6, "666"));
console.log("get 6:", dh_hash.get(6));

console.log("get 7:", dh_hash.get(7));
console.log("get 14:", dh_hash.get(14));
console.log("get 21:", dh_hash.get(21));
console.log("get 3:", dh_hash.get(3));
console.log("get 6:", dh_hash.get(6));
console.log("get 9:", dh_hash.get(9));
console.log("get 10:", dh_hash.get(10));
console.log("get 9999", dh_hash.get(9999));

console.log("The hash table: ", dh_hash.table());
