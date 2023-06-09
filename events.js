const field = document.getElementById('field');
const nameFilter = document.getElementById('nameFilter');
const teamFilter = document.getElementById('teamFilter');
const timestampDisplay = document.getElementById('timestampDisplay');

const userCells = []; // Array to store user's assigned cells
window.addEventListener('load', function() {});
fetch('ACMilan_Verona.json')
  .then(response => response.json())
  .then(events => {

    // Function to filter events based on name and team ID
    const filterEvents = () => {
      // const selectedName = nameFilter.value;
      // const selectedTeamId = teamFilter.value;
      let delay = delaySlider.value; // Default delay value

      // Clear the table
      field.innerHTML = '';

      events.sort((a, b) => a.timestamp - b.timestamp);

      // Create the table rows and cells
      // let firstEventTimestamp = null;
      let previousCell = null;
      let previousEventTime = 0
      let previousEvent = null;
      for (let y = 74; y >= 0; y--) {
        const row = field.insertRow();

        for (let x = 0; x <= 115; x++) {
          const cell = row.insertCell();
          cell.className = 'cell';
          // cell.textContent = `${x},${y}`; // Displaying coordinates

          // Assign cells to the user

          if (userCells.includes(`${x},${y}`)) {
            cell.classList.add('user-cell');
            cell.classList.add('gold-border'); // Add gold border to user's cells
          }

          const event = events.find(
            e =>
              Math.floor(e.x) === x &&
              Math.floor(e.y) === y ); 
              // Find event with matching coordinates and filters

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


          if (event && event.score !== 0) {
            const eventTime = (event.timeMin * 60 + event.timeSec)
            const realTime = (eventTime - previousEventTime);
            setTimeout(() => {
              
              // console.log((eventTime - previousEventTime))
              cell.classList.add('black-cell');
              if (userCells.includes(`${x},${y}`)) {
                cell.classList.add('gold-cell'); // Add gold border to user's cells
              }
              if (previousCell) {
                previousCell.classList.remove('black-cell');
              }
              
              previousCell = cell;
              console.log(`Event time: ${event.timeMin} Mins ${event.timeSec} Seconds`);
              timestampDisplay.textContent = (`${event.timeMin} Mins ${event.timeSec} Seconds`) || '';
              previousEventTime = eventTime;
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
      userCells.push('101,37');
      userCells.push('101,33');
      userCells.push('57,37');
      userCells.push('56,37');
      userCells.push('57,38');
      userCells.push('56,38');


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

    // Call the filter function initially to display all events
    filterEvents();

    // Assign user cells initially
    assignUserCells();
      
  })   
  .catch(error => console.log(error));

  // ------------------------------------------------------------------------------

  
  