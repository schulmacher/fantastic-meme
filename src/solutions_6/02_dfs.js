const tree = require("./tree");

function dfs(value) {
  const result = traverse_recursive(tree, (k) => k === value);

  return result;
}

function traverse_recursive(obj, cb) {
  for (const key of Object.keys(obj)) {
    console.log(key);
    if (cb(key)) {
      return true;
    }

    const recursive_result = traverse_recursive(obj[key], cb);

    if (recursive_result) {
      return true;
    }
  }

  return false;
}

console.log("4 is present: ", dfs("4"));
console.log("14 is present: ", dfs("14"));
