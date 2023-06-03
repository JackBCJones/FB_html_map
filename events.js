// const field = document.getElementById('field');
// const nameFilter = document.getElementById('nameFilter');
// const teamFilter = document.getElementById('teamFilter');
// const timestampDisplay = document.getElementById('timestampDisplay');


// fetch('data.json')
//   .then(response => response.json())
//   .then(events => {

//     // Function to filter events based on name and team ID
//     const filterEvents = () => {
//       const selectedName = nameFilter.value;
//       const selectedTeamId = teamFilter.value;

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
//           const event = events.find(
//             e =>
//               Math.floor(e.x) === x &&
//               Math.floor(e.y) === y &&
//               (!selectedName || e.names.includes(selectedName)) &&
//               (!selectedTeamId || e.team_id === selectedTeamId)
//           ); // Find event with matching coordinates and filters

//           // Add border classes...
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
//           if (event && event.score !== 0) {
//             setTimeout(() => {
//               cell.classList.add('black-cell');
//               if (previousCell) {
//                 previousCell.classList.remove('black-cell');
//               }
//               previousCell = cell;
//               timestampDisplay.textContent = event.timestamp || '';
//             }, 500 * events.indexOf(event)); // Adjust the delay value as needed
//           } else {
//             if (previousCell) {
//               previousCell.classList.remove('black-cell');
//               previousCell = null;
//             }
//           }
//         }
//       }
//     };

//     // Add event listeners to the filters
//     nameFilter.addEventListener('change', filterEvents);
//     teamFilter.addEventListener('change', filterEvents);

//     // Call the filter function initially to display all events
//     filterEvents();
//   })
//   .catch(error => console.log(error));


// ------------------------------------------------------------------------------------------------
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

          // Add border classes...
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
          if (event && event.score !== 0) {
            setTimeout(() => {
              cell.classList.add('black-cell');
              // console.log(`${Math.floor(event.x)}, ${Math.floor(event.y)}`)
              if (userCells.includes(`${x},${y}`)) {

                cell.classList.add('gold-cell'); // Add gold border to user's cells
              }
              if (previousCell) {
                previousCell.classList.remove('black-cell');
              }
              previousCell = cell;
              timestampDisplay.textContent = event.timestamp || '';
            }, 50 * events.indexOf(event)); // Adjust the delay value as needed
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

    // Example usage of reassigning user cells
    // setTimeout(() => {
      assignUserCells();
    // }, 6000); // Adjust the delay value as needed
  })
  .catch(error => console.log(error));


// ----------------------------------------------------------------------------------------------------------------------------------
// const field = document.getElementById('field');
// const nameFilter = document.getElementById('nameFilter');
// const teamFilter = document.getElementById('teamFilter');

// fetch('data.json')
//   .then(response => response.json())
//   .then(events => {
//     const userBlocks = []; // Array to store the user's assigned blocks
//     const userEvents = []; // Array to store events that occurred on the user's blocks

//     // Function to assign random blocks to the user
//     const assignUserBlocks = () => {
//       const blockCount = 10; // Number of blocks to assign to the user
//       const blocks = Array.from(Array(115), (_, i) => i).slice(1, 115); // All available blocks

//       // Randomly select user blocks
//       for (let i = 0; i < blockCount; i++) {
//         const randomIndex = Math.floor(Math.random() * blocks.length);
//         const blockIndex = blocks.splice(randomIndex, 1)[0];
//         const x = blockIndex % 116; // Calculate x coordinate
//         const y = Math.floor(blockIndex / 116); // Calculate y coordinate
//         userBlocks.push({ x, y });
//       }
//     };

//     // Function to filter events based on name and team ID
//     const filterEvents = () => {
//       const selectedName = nameFilter.value;
//       const selectedTeamId = teamFilter.value;
//       console.log(selectedName, selectedTeamId);

//       // Clear the table
//       field.innerHTML = '';

//       // Create the table rows and cells
//       for (let y = 74; y >= 0; y--) {
//         const row = field.insertRow();

//         for (let x = 0; x <= 115; x++) {
//           const cell = row.insertCell();
//           cell.className = 'cell';
//           cell.textContent = `${x},${y}`; // Displaying coordinates

//           const blockIndex = x + y * 116;
//           if (userBlocks.includes(blockIndex)) {
//             cell.classList.add('user-block'); // Add 'user-block' class to the user's assigned blocks
//           }

//           const event = events.find(
//             e =>
//               Math.floor(e.x) == x &&
//               Math.floor(e.y) == y &&
//               (!selectedName || e.names.includes(selectedName)) &&
//               (!selectedTeamId || e.team_id == selectedTeamId)
//           ); // Find event with matching coordinates and filters

//           if ((y == 47 && (x <= 6 || x >= 109)) || (y == 27 && (x <= 6 || x >= 109)) || (y == 59 && (x <= 18 || x >= 97)) || (y == 15 && (x <= 18 || x >= 97)) || (y == 37)){
//               cell.classList.add('top-border'); // Add 'top-border' class 
//           }

//           if ((x == 57 ) || (x == 19 && (y >= 16 && y <= 59) || x == 97 && (y >= 16 && y <= 59)) || (x == 7 && (y >= 28 && y <= 47)) || (x == 109 && (y >= 28 && y <= 47)) || (x == 0 && (y >= 34 && y <= 41))) {
//           cell.classList.add('left-border'); // Add 'left-border' class 
//           }
//           if ((x == 115 && (y >= 33 && y <= 41))) {
//               cell.classList.add('right-border')
//           }

//           if (event && event.score !== 0) {
//               console.log((event.x, event.y))
//             if (userBlocks.includes((event.x, event.y))) {
//               userEvents.push(event); // Add event to the user's events array
//               cell.classList.add('user-block-scored');
//             }
            
//             setTimeout(() => {
              
//               cell.classList.add('black-cell');
              
              
//             }, 50 * events.indexOf(event));
//              // Adjust the delay value as needed
//           }
//         }
//       }
//     };

//     // Add event listeners to the filters
//     nameFilter.addEventListener('change', filterEvents);
//     teamFilter.addEventListener('change', filterEvents);

//     // Call the filter function initially to display all events
//     assignUserBlocks();
//     filterEvents();

//     console.log('User Blocks:', userBlocks);
//     console.log('User Events:', userEvents);
//   })
  // .catch(error => console.log(error));

