export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

// Bubble Sort Algorithm
export function getBubbleSortAnimations(array) {
  const animations = [];
  const n = array.length;
  let didSwap;

  for (let i = n - 1; i >= 0; i--) {
      didSwap = false;
      for (let j = 0; j < i; j++) {
          // Compare two elements, push their indices to change color
          animations.push([j, j + 1]);
          animations.push([j, j + 1]);
          
          if (array[j] > array[j + 1]) {
              // Push the swap operation
              animations.push([j, array[j + 1]]);
              animations.push([j + 1, array[j]]);
              
              // Swap the elements
              let temp = array[j];
              array[j] = array[j + 1];
              array[j + 1] = temp;
              didSwap = true;
          } else {
              // No swap, push original heights
              animations.push([j, array[j]]);
              animations.push([j + 1, array[j + 1]]);
          }
      }
      if (!didSwap) break; // If no swaps, the array is sorted
  }
  return animations;
}

// Quick Sort Algorithm
export function getQuickSortAnimations(array) {
  const animations = [];
  const auxiliaryArray = array.slice(); // Create a copy
  quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
  return animations;
}

function quickSortHelper(mainArray, low, high, animations) {
  if (low < high) {
      const pivotIndex = partition(mainArray, low, high, animations);
      quickSortHelper(mainArray, low, pivotIndex - 1, animations);
      quickSortHelper(mainArray, pivotIndex + 1, high, animations);
  }
}

function partition(mainArray, low, high, animations) {
  const pivot = mainArray[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
      // Compare pivot with the current element
      animations.push([j, high]);
      animations.push([j, high]);

      if (mainArray[j] < pivot) {
          i++;
          // Swap elements and push swap animation
          animations.push([i, mainArray[j]]);
          animations.push([j, mainArray[i]]);
          let temp = mainArray[i];
          mainArray[i] = mainArray[j];
          mainArray[j] = temp;
      } else {
          // No swap, push original heights
          animations.push([i + 1, mainArray[i + 1]]);
          animations.push([j, mainArray[j]]);
      }
  }
  // Place pivot in its correct sorted position
  animations.push([i + 1, high]);
  animations.push([i + 1, high]);

  animations.push([i + 1, mainArray[high]]);
  animations.push([high, mainArray[i + 1]]);
  let temp = mainArray[i + 1];
  mainArray[i + 1] = mainArray[high];
  mainArray[high] = temp;

  return i + 1;
}

// Commented out or removed Heap Sort Algorithm
/*
export function getHeapSortAnimations(array) {
  return [];
}

function siftDown(array, n, i, animations = []) {
}

export function heapSort(array) {
  return array;
}

function siftDownFinal(array, n, i) {
}
*/
