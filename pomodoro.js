// Define variables to track time and state

let isTimerRunning = false;
let timerInterval = null;
let pomodoroCount = 0;
let currentSessionTime = 25 * 60; // 25 minutes by default
let breakTime = 5 * 60; // 5 minutes by default
var addNotes = document.getElementById('addNoteButton');
var startButton = document.getElementById('startingButton');
startButton.addEventListener("click", startTimer);
addNotes.addEventListener("click", addNote);

document.getElementById('resetButton').addEventListener('click', resetTimer);
// Start the timer

function startTimer() {
  if (!isTimerRunning) {
      isTimerRunning = true;
      timerInterval = setInterval(updateTimer, 1000); 
      startButton.textContent = 'Pause'; 
      document.getElementById('resetButton').style.display = 'inline'; 
  } else {
      pauseTimer();
      startButton.textContent = 'Start Focusing'; 
  }
  saveTimerState();
}
function pauseTimer() {
    
    clearInterval(timerInterval);
    isTimerRunning = false;
    saveTimerState();

}
function updateTimer() {
    if (currentSessionTime > 0) {
        currentSessionTime--;
        displayTime(currentSessionTime);
    } else {
        pauseTimer();
       
    }
}
function resetTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  currentSessionTime = 25 * 60;
  displayTime(currentSessionTime);
  // Hide reset button
  document.getElementById('resetButton').style.display = 'none';
}
function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const displayString = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    
    document.getElementById('timerDisplay').textContent = displayString;
}

function updateSessionTime(minutes) {
  currentSessionTime = minutes * 60;
}

function updateBreakTime(minutes) {
  breakTime = minutes * 60;
}

document.addEventListener('DOMContentLoaded', function() {
  const focusInput = document.getElementById('focusDuration');
  const breakInput = document.getElementById('breakDuration');

  focusInput.addEventListener('change', function() {
      updateSessionTime(this.value); // Assuming the input value is in minutes
      displayTime(currentSessionTime);
  });

  breakInput.addEventListener('change', function() {
      updateBreakTime(this.value); // Assuming the input value is in minutes
  });

  
});

function addNote(noteContent) {
  const ul = document.getElementById('notesList');
  const li = document.createElement('li');
  li.textContent = noteContent;

  
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.style.display = 'none';
  li.appendChild(editInput);

  
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  li.appendChild(editButton);

  
  editButton.addEventListener('click', function() {
      if (editButton.textContent === 'Edit') {
          editInput.value = noteContent;
          editInput.style.display = 'inline';
          editButton.textContent = 'Save';
          li.firstChild.style.display = 'none'; 
          
      } else {
          noteContent = editInput.value;
          li.firstChild.textContent = noteContent;
          editInput.style.display = 'none';
          editButton.textContent = 'Edit';
          li.firstChild.style.display = 'inline'; 
          
      }
  });

  ul.appendChild(li);
  saveNotes();

}

function saveTimerState() {
  chrome.storage.local.set({ currentSessionTime, isTimerRunning });
}

function saveNotes() {
  const notes = Array.from(document.querySelectorAll('#notesList li')).map(li => li.textContent);
  chrome.storage.local.set({ notes });
}

// Load saved state and notes

chrome.storage.local.get(['currentSessionTime', 'isTimerRunning', 'notes'], function(result) {
      if (result.currentSessionTime !== undefined) {
          currentSessionTime = result.currentSessionTime;
          displayTime(currentSessionTime);
      }
      if (result.isTimerRunning) {
          startTimer();
      }
      if (result.notes && Array.isArray(result.notes)) {
          result.notes.forEach(noteContent => addNote(noteContent));
      }
  });


