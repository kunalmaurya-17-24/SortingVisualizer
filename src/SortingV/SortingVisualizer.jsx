import React from 'react';
import { 
  getMergeSortAnimations, 
  getBubbleSortAnimations, 
  getQuickSortAnimations, 
  // getHeapSortAnimations,
  // heapSort
} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 4 < 2; // Color changes happen every 2 animations

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          const barStyle = arrayBars[barIdx].style;
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 4 < 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          const barStyle = arrayBars[barIdx].style;
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  heapSort() {
    try {
      // Commented out heap sort implementation
    } catch (error) {
      // Removed console.error
    }
  }

  testHeapSort() {
    // Generate multiple test cases with more diverse scenarios
    const testCases = [
      // Basic unsorted arrays
      [5, 2, 9, 1, 7, 6, 3],
      [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5],
      
      // Already sorted arrays
      [1, 2, 3, 4, 5],
      [1, 1, 1, 1, 1],
      
      // Reverse sorted arrays
      [5, 4, 3, 2, 1],
      
      // Edge cases
      [],     // Empty array
      [1],    // Single element
      
      // Arrays with negative numbers
      [-5, -2, -9, -1, -7, -6, -3],
      [5, -2, 9, -1, 7, -6, 3],
      
      // Large range of numbers
      [1000, -1000, 500, -500, 0, 250, -250]
    ];

    // Detailed test results to track
    const testResults = {
      totalTests: testCases.length,
      passedTests: 0,
      failedTests: 0,
      errors: []
    };

    testCases.forEach((testArray, index) => {
      try {
        // Create copies for different sorting methods
        const heapSorted = heapSort([...testArray]);
        const nativeSorted = [...testArray].sort((a, b) => a - b);

        // Deep comparison
        const isCorrectlySort = heapSorted.every((val, idx) => val === nativeSorted[idx]);

        if (isCorrectlySort) {
          testResults.passedTests++;
          // Removed console.log
        } else {
          testResults.failedTests++;
          const error = {
            testCase: index + 1,
            input: testArray,
            heapSorted,
            nativeSorted
          };
          testResults.errors.push(error);
          
          // Removed console.error
        }
      } catch (error) {
        testResults.failedTests++;
        // Removed console.error
        testResults.errors.push({
          testCase: index + 1,
          error: error.message
        });
      }
    });

    // Final test summary
    // Removed console.log
    
    // Optional: Alert if any tests failed
    if (testResults.failedTests > 0) {
      alert(`Heap Sort Test Failed: ${testResults.failedTests} out of ${testResults.totalTests} tests failed`);
    }
  }

  testSortingAlgorithms() {
    const sortingFunctions = [
      { 
        name: 'Merge Sort', 
        animFunc: (arr) => getMergeSortAnimations(arr),
        sortFunc: (arr) => {
          const animations = getMergeSortAnimations(arr);
          const auxiliaryArray = arr.slice();
          mergeSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, auxiliaryArray.slice(), animations);
          return auxiliaryArray;
        }
      },
      { 
        name: 'Quick Sort', 
        animFunc: (arr) => getQuickSortAnimations(arr),
        sortFunc: (arr) => {
          const auxiliaryArray = arr.slice();
          quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, []);
          return auxiliaryArray;
        }
      },
      { 
        name: 'Heap Sort', 
        animFunc: (arr) => getHeapSortAnimations(arr),
        sortFunc: (arr) => heapSort(arr)
      }
    ];

    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let j = 0; j < length; j++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);

      for (const { name, sortFunc } of sortingFunctions) {
        const sortedArray = sortFunc(array.slice());
        // Removed console.log
      }
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}>
          </div>
        ))}
        <div className="button-container">
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
          {/* <button onClick={() => this.heapSort()}>Heap Sort</button> */}
          <button onClick={() => this.testSortingAlgorithms()}>
            Test Sorting Algorithms (BROKEN)
          </button>
          <button onClick={() => this.testHeapSort()}>Test Heap Sort</button>
          <button onClick={() => this.debugHeapSort()}>Debug Heap Sort</button>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
