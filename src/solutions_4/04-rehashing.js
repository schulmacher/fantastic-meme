const PRIMES = [3, 7, 13, 23, 41, 61, 97];
const LOAD_FACTOR = 0.69;

function make_linear_hash_fn(hash_size) {
  return function modulo_hash_fn(value, i = 0) {
    if (typeof value === "number") {
      return (value + i) % hash_size;
    }
    if (typeof value === "string") {
      return ((value.charCodeAt(0) || 0) + i) % hash_size;
    }
    throw new Error("Not supported value type " + typeof value);
  };
}

function get_load_factor(table_size, element_count) {
  return element_count / table_size;
}

function get_hash_map_size(element_count, load_factor) {
  const required_size = (1 - load_factor) * element_count + element_count;

  if (required_size > PRIMES[PRIMES.length - 1]) throw new Error("Too big");

  return PRIMES.find((p) => p >= required_size);
}

function make_hash_table(hash_size) {
  const table = Array(hash_size);

  for (let i = 0; i < table.length; i++) {
    table[i] = [null, null]; // [key, value]
  }

  return table;
}

function create_linear_probe_hash_map(n) {
  let hash_size = get_hash_map_size(n, LOAD_FACTOR);
  let hash_fn = make_linear_hash_fn(hash_size);
  let table = make_hash_table(hash_size);
  let occupied_space = 0;

  function add_to_hash_map(key, value) {
    let initial_hash = hash_fn(key);
    let hash_to_check = initial_hash;
    let i = 0;

    do {
      if (table[hash_to_check][0] === null || table[hash_to_check][0] === key) {
        break;
      }

      i++;
      hash_to_check = hash_fn(key, i);
    } while (initial_hash !== hash_to_check);

    if (i !== 0 && initial_hash === hash_to_check) {
      throw new Error("Cannot find place for key " + key);
    }

    if (table[hash_to_check][0] !== key) {
      occupied_space = occupied_space + 1;
    }

    table[hash_to_check][0] = key;
    table[hash_to_check][1] = value;

    return hash_to_check;
  }

  function rehash() {
    if (get_load_factor(hash_size, occupied_space) > LOAD_FACTOR) {
      console.log("rehashing");
      const old_table = table;
      hash_size = get_hash_map_size(hash_size, LOAD_FACTOR);
      hash_fn = make_linear_hash_fn(hash_size);
      table = make_hash_table(hash_size);

      for (const [k, v] of old_table) {
        if (k !== null) {
          add_to_hash_map(k, v);
        }
      }
    }
  }

  return {
    /**
     * @param {string|number} key
     * @param {*} value
     * @returns {number} hash value, position of element in hash table
     */
    add(key, value) {
      rehash();

      return add_to_hash_map(key, value);
    },
    /**
     * @param {string|number} key
     * @returns {*}
     */
    get(key) {
      let initial_hash = hash_fn(key);
      let hash_to_check = initial_hash;
      let i = 0;

      do {
        if (table[hash_to_check][0] === key) {
          return table[hash_to_check][1];
        }

        i++;
        hash_to_check = hash_fn(key, i);
      } while (initial_hash !== hash_to_check);

      return undefined;
    },
    table() {
      return table.map((k, i) => [i, k]);
    },
  };
}

const rehashing_map = create_linear_probe_hash_map(3);

console.log("added 7 to hash index:", rehashing_map.add(7, "7"));
console.log("added 14 to hash index:", rehashing_map.add(14, "14"));
console.log("added 21 to hash index:", rehashing_map.add(21, "21"));
console.log("added 3 to hash index:", rehashing_map.add(3, "3"));

console.log("The hash table: ", rehashing_map.table());

console.log("added 6 to hash index:", rehashing_map.add(6, "6"));
console.log("added 9 to hash index:", rehashing_map.add(9, "9"));

console.log("The hash table: ", rehashing_map.table());

console.log("added 10 to hash index:", rehashing_map.add(10, "10"));

console.log("The hash table: ", rehashing_map.table());

console.log("Get still works for 6", rehashing_map.get(6));
