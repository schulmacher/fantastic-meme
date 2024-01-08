const tree = require("./tree");

function bfs(value) {
  let queue = [tree];
  let next = null;

  while ((next = queue.shift())) {
    for (const key of Object.keys(next)) {
      console.log(key);
      if (value === key) {
        return true;
      }
      queue.push(next[key]);
    }
  }

  return false;
}

console.log("4 is present: ", bfs("4"));
console.log("14 is present: ", bfs("14"));
