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

function create_separate_chain_hash_table(hash_fn, hash_size) {
  const table = Array(hash_size);

  for (let i = 0; i < hash_size; i++) {
    table[i] = [];
  }

  return {
    /**
     * Returns -1 if the key was overwritten.
     * Returns 1 if the key was not seen before.
     * @param {string|number} key
     * @param {*} value
     * @returns {0|1}
     */
    add(key, value) {
      const hash = hash_fn(key);
      const current_index = table[hash].findIndex(
        ([existing_key]) => existing_key === key
      );

      if (current_index !== -1) {
        table[hash][current_index] = [key, value];
      } else {
        table[hash].push([key, value]);
      }

      return current_index > -1 ? -1 : 1;
    },
    /**
     * @param {string|number} key
     * @returns {*}
     */
    get(key) {
      const hash = hash_fn(key);
      const val = table[hash].find(([existing_key]) => existing_key === key);

      if (!val) return val;

      return val[1];
    },
    values: function* () {
      for (const chain of table) {
        for (const item of chain) {
          yield item[1];
        }
      }
    },
  };
}

const hash_size = 7;
const sc_hash = create_separate_chain_hash_table(
  make_linear_hash_fn(hash_size),
  hash_size
);

sc_hash.add(8, { foo: "bar" });
// same hash output "1"
sc_hash.add(8 + hash_size, { bar: "baz" });
sc_hash.add("md5", "md5");
sc_hash.add("m", "m");
sc_hash.add("blah", "blah"); // b ASCII = 98 % 7 = 0
sc_hash.add(7, 7); // 7 % 7 = 0

console.log("All values", JSON.stringify(Array.from(sc_hash.values())));
console.log("Get 8", sc_hash.get(8));
console.log("Get 15", sc_hash.get(8 + hash_size));
console.log("Get blah", sc_hash.get("blah"));
console.log("'7'", sc_hash.get("7"));
console.log("7", sc_hash.get(7));
