function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function bubble_sort(arr, debug) {
  for (let i = 0; i < arr.length; i++) {
    swapped = false;
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        debug?.swap?.(arr);
        swapped = true;
      }
    }
    debug?.iteration?.(arr);
    if (!swapped) break;
  }

  return arr;
}

function selection_sort(arr, debug) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let min_i = i;

    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[min_i]) {
        min_i = j;
      }
    }

    if (min_i !== i) {
      swap(arr, i, min_i);
      debug?.swap?.(arr);
    }
    debug?.iteration?.(arr);
  }

  return arr;
}

function insertion_sort(arr, debug) {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    for (let j = i; j >= 0; j--) {
      if (arr[j] < arr[j - 1]) {
        // possible to keep track smaller j
        // and then do a single swap at the end
        // but then we need to create new arrays
        // because all the elements on the right
        // should be shifted to the right
        swap(arr, j, j - 1);
        debug?.swap?.(arr);
      } else {
        break;
      }
    }
    debug?.iteration?.(arr);
  }

  return arr;
}

function quick_sort_merge_partition(arr, low, high, debug) {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
      debug?.swap?.(arr);
    }
  }

  i++;
  swap(arr, i, high);
  debug?.iteration?.(arr);

  return i;
}

function quick_sort_r(arr, low, high, debug) {
  if (low < high) {
    let pivot = quick_sort_merge_partition(arr, low, high, debug);

    quick_sort_r(arr, low, pivot - 1);
    quick_sort_r(arr, pivot + 1, high);
  }
}

function quick_sort(arr, debug) {
  quick_sort_r(arr, 0, arr.length - 1, debug);
  return arr;
}

function make_state_recorder(max_count = Infinity) {
  let total_count = 0;
  const items = [];

  return {
    record: function record(arr) {
      if (total_count < max_count) {
        items.push(arr.join(", "));
        total_count++;
      }
    },
    items,
  };
}

function run_method(sort, arr, debug_count) {
  const swap_state_recorder = make_state_recorder(debug_count);
  const iteration_state_recorder = make_state_recorder(debug_count);
  const result = sort(arr, {
    swap: swap_state_recorder.record,
    iteration: iteration_state_recorder.record,
  }).join(", ");
  return {
    swaps: Object.fromEntries(
      swap_state_recorder.items.map((item, i) => [i + 1, item])
    ),
    iterations: Object.fromEntries(
      iteration_state_recorder.items.map((item, i) => [i + 1, item])
    ),
    final: result,
  };
}

function run_methods(arr, debug_count) {
  console.log("run_methods:", arr.join(", "));
  const methods = [
    ["bubble_sort", bubble_sort],
    ["selection_sort", selection_sort],
    ["insertion_sort", insertion_sort],
    ["quick_sort", quick_sort],
  ];
  const method_records = {};

  for (const [method_name, sort] of methods) {
    const result = run_method(sort, [...arr], debug_count);
    method_records[method_name] = result;
  }

  console.log(JSON.stringify(method_records, null, 2));
}

console.log(
  "bubble_sort",
  run_method(bubble_sort, [64, 34, 25, 12, 22, 11, 90], Infinity)
);
console.log(
  "selection_sort",
  run_method(selection_sort, [29, 15, 56, 77, 18], Infinity)
);
console.log(
  "insertion_sort",
  run_method(insertion_sort, [12, 11, 13, 5, 6, 7], Infinity)
);
run_methods([8, 3, 5, 4, 7, 6, 2], Infinity);
