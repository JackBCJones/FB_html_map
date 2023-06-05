const field = document.getElementById('field');
const nameFilter = document.getElementById('nameFilter');
const teamFilter = document.getElementById('teamFilter');
const timestampDisplay = document.getElementById('timestampDisplay');

const userCells = []; // Array to store user's assigned cells

fetch('data.json')
  .then(response => response.json())
  .then(events => {

    // Function to filter events based on name and team ID
    const filterEvents = () => {
      const selectedName = nameFilter.value;
      const selectedTeamId = teamFilter.value;
      let delay = delaySlider.value; // Default delay value

      // Clear the table
      field.innerHTML = '';

      // Create the table rows and cells
      let firstEventTimestamp = null;
      let previousCell = null;
      for (let y = 74; y >= 0; y--) {
        const row = field.insertRow();

        for (let x = 0; x <= 115; x++) {
          const cell = row.insertCell();
          cell.className = 'cell';
          cell.textContent = `${x},${y}`; // Displaying coordinates

          // Assign cells to the user

          if (userCells.includes(`${x},${y}`)) {
            cell.classList.add('user-cell');
            cell.classList.add('gold-border'); // Add gold border to user's cells
          }

          const event = events.find(
            e =>
              Math.floor(e.x) === x &&
              Math.floor(e.y) === y &&
              (!selectedName || e.names.includes(selectedName)) &&
              (!selectedTeamId || e.team_id === selectedTeamId)
          ); // Find event with matching coordinates and filters

          // Add field lines 
          if (
            (y === 47 && (x <= 6 || x >= 109)) ||
            (y === 27 && (x <= 6 || x >= 109)) ||
            (y === 59 && (x <= 18 || x >= 97)) ||
            (y === 15 && (x <= 18 || x >= 97)) ||
            y === 37
          ) {
            cell.classList.add('top-border'); // Add 'top-border' class
          }

          if (
            x === 57 ||
            (x === 19 && y >= 16 && y <= 59) ||
            (x === 97 && y >= 16 && y <= 59) ||
            (x === 7 && y >= 28 && y <= 47) ||
            (x === 109 && y >= 28 && y <= 47) ||
            (x === 0 && y >= 34 && y <= 41)
          ) {
            cell.classList.add('left-border'); // Add 'left-border' class
          }

          if (x === 115 && y >= 33 && y <= 41) {
            cell.classList.add('right-border');
          }

          // Add user cells and show where events occurred 
          // and if event happened on user show set cell to gold

          if (event && event.score !== 0) {
            setTimeout(() => {
              cell.classList.add('black-cell');
              if (userCells.includes(`${x},${y}`)) {
                cell.classList.add('gold-cell'); // Add gold border to user's cells
              }
              if (previousCell) {
                previousCell.classList.remove('black-cell');
              }
              previousCell = cell;
              timestampDisplay.textContent = event.timestamp || '';
            }, delay * events.indexOf(event)); 
          } else {
            if (previousCell) {
              previousCell.classList.remove('black-cell');
              previousCell = null;
            }
          }
        }
      }
    };

    // Function to assign user cells
    const assignUserCells = () => {
      userCells.length = 0; // Clear the user cells array

      // Assign 3 specific cells
      userCells.push('105,40');
      userCells.push('109,37');
      userCells.push('57,37');

      // Assign 17 random cells
      const allCells = [];
      for (let y = 0; y <= 74; y++) {
        for (let x = 0; x <= 115; x++) {
          allCells.push(`${x},${y}`);
        }
      }
      const randomCells = shuffle(allCells).slice(0, 17);
      userCells.push(...randomCells);

      filterEvents(); // Update the table with the new assignments
    };

    // Helper function to shuffle an array
    const shuffle = array => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    // Update the delay value based on the slider position
    delaySlider.addEventListener('change', filterEvents);
    // Add event listeners to the filters
    nameFilter.addEventListener('change', filterEvents);
    teamFilter.addEventListener('change', filterEvents);

    // Call the filter function initially to display all events
    filterEvents();

    // Assign user cells initially
    assignUserCells();

    // Example usage of assigning user cells and changing background color
    setTimeout(() => {
      userCells.forEach(cell => {
        const [x, y] = cell.split(',');
        const targetCell = field.rows[74 - y].cells[x];
        targetCell.classList.add('gold-border'); // Add gold border to user's cells
      });
    }, 3000); // Adjust the delay value as needed
      assignUserCells();

      
  })   
  .catch(error => console.log(error));

  // ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
// const field = document.getElementById('field');
// const nameFilter = document.getElementById('nameFilter');
// const teamFilter = document.getElementById('teamFilter');
// const timestampDisplay = document.getElementById('timestampDisplay');
// let timeoutIds = []; // Array to store timeout IDs
// let currentTimeoutId = null; // ID of the current timeout
// let isPaused = false; // Flag to indicate if events are paused
// const userCells = []; // Array to store user's assigned cells

// fetch('data.json')
//   .then(response => response.json())
//   .then(events => {

//     timeoutIds.forEach(id => clearTimeout(id));
//     timeoutIds = [];

//     // Function to filter events based on name and team ID
//     const filterEvents = () => {
//       const selectedName = nameFilter.value;
//       const selectedTeamId = teamFilter.value;
//       let delay = delaySlider.value; // Default delay value

//       // Clear the table
//       field.innerHTML = '';

//       // Create the table rows and cells
//       let firstEventTimestamp = null;
//       let previousCell = null;
//       for (let y = 74; y >= 0; y--) {
//         const row = field.insertRow();

//         for (let x = 0; x <= 115; x++) {
//           const cell = row.insertCell();
//           cell.className = 'cell';
//           cell.textContent = `${x},${y}`; // Displaying coordinates

//           // Assign cells to the user

//           if (userCells.includes(`${x},${y}`)) {
//             cell.classList.add('user-cell');
//             cell.classList.add('gold-border'); // Add gold border to user's cells
//           }

//           const event = events.find(
//             e =>
//               Math.floor(e.x) === x &&
//               Math.floor(e.y) === y &&
//               (!selectedName || e.names.includes(selectedName)) &&
//               (!selectedTeamId || e.team_id === selectedTeamId)
//           ); // Find event with matching coordinates and filters

//           // Add field lines 
//           if (
//             (y === 47 && (x <= 6 || x >= 109)) ||
//             (y === 27 && (x <= 6 || x >= 109)) ||
//             (y === 59 && (x <= 18 || x >= 97)) ||
//             (y === 15 && (x <= 18 || x >= 97)) ||
//             y === 37
//           ) {
//             cell.classList.add('top-border'); // Add 'top-border' class
//           }

//           if (
//             x === 57 ||
//             (x === 19 && y >= 16 && y <= 59) ||
//             (x === 97 && y >= 16 && y <= 59) ||
//             (x === 7 && y >= 28 && y <= 47) ||
//             (x === 109 && y >= 28 && y <= 47) ||
//             (x === 0 && y >= 34 && y <= 41)
//           ) {
//             cell.classList.add('left-border'); // Add 'left-border' class
//           }

//           if (x === 115 && y >= 33 && y <= 41) {
//             cell.classList.add('right-border');
//           }

//           // Add user cells and show where events occurred 
//           // and if event happened on user show set cell to gold

//           if (event && event.score !== 0) {
//             currentTimeoutId = setTimeout(() => {
//               cell.classList.add('black-cell');
//               if (userCells.includes(`${x},${y}`)) {
//                 cell.classList.add('gold-cell'); // Add gold border to user's cells
//               }
//               if (previousCell) {
//                 previousCell.classList.remove('black-cell');
//               }
//               previousCell = cell;
//               timestampDisplay.textContent = event.timestamp || '';
//               // Check if events are paused
//               if (!isPaused) {
//                 // Continue to the next event
//                 const nextEventIndex = events.indexOf(event) + 1;
//                 if (nextEventIndex < events.length) {
//                   const nextEvent = events[nextEventIndex];
//                   filterEvents(nextEvent);
//                 }
//               }
//             }, delay * events.indexOf(event)); 
//             timeoutIds.push(currentTimeoutId);
//           } else {
//             if (previousCell) {
//               previousCell.classList.remove('black-cell');
//               previousCell = null;
//             }
//           }
//         }
//       }
//     };

//       // Toggle pause/resume when the button is clicked
//     const togglePauseResume = () => {
//       if (isPaused) {
//         // Resume events
//         isPaused = false;
//         filterEvents(events[events.indexOf(event) + 1]);
//         pauseResumeButton.textContent = 'Pause';
//       } else {
//         // Pause events
//         isPaused = true;
//         clearTimeout(currentTimeoutId);
//         pauseResumeButton.textContent = 'Resume';
//       }
//     };

//     // Function to assign user cells
//     const assignUserCells = () => {
//       userCells.length = 0; // Clear the user cells array

//       // Assign 3 specific cells
//       userCells.push('105,40');
//       userCells.push('109,37');
//       userCells.push('57,37');

//       // Assign 17 random cells
//       const allCells = [];
//       for (let y = 0; y <= 74; y++) {
//         for (let x = 0; x <= 115; x++) {
//           allCells.push(`${x},${y}`);
//         }
//       }
//       const randomCells = shuffle(allCells).slice(0, 17);
//       userCells.push(...randomCells);

//       filterEvents(); // Update the table with the new assignments
//     };

//     // Helper function to shuffle an array
//     const shuffle = array => {
//       for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//       }
//       return array;
//     };

//     pauseResumeButton.addEventListener('click', togglePauseResume);
//     // Update the delay value based on the slider position
//     delaySlider.addEventListener('change', filterEvents);
//     // Add event listeners to the filters
//     nameFilter.addEventListener('change', filterEvents);
//     teamFilter.addEventListener('change', filterEvents);

//     // Call the filter function initially to display all events
//     filterEvents();

//     // Assign user cells initially
//     assignUserCells();

//     // Example usage of assigning user cells and changing background color
//     setTimeout(() => {
//       userCells.forEach(cell => {
//         const [x, y] = cell.split(',');
//         const targetCell = field.rows[74 - y].cells[x];
//         targetCell.classList.add('gold-border'); // Add gold border to user's cells
//       });
//     }, 3000); // Adjust the delay value as needed
//       assignUserCells();

      
//   })   
//   .catch(error => console.log(error));

//   // ------------------------------------------------------------------------------


