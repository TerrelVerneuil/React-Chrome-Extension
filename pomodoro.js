document.addEventListener('DOMContentLoaded', function () {
    const todoItems = localStorage.getItem("todoItems") ? JSON.parse(localStorage.getItem("todoItems")) : [];
    const toLearnItems = localStorage.getItem("toLearnItems") ? JSON.parse(localStorage.getItem("toLearnItems")) : [];
  
    function displayTodoList(items) {
      const todoList = document.getElementById("todo-list");
      todoList.innerHTML = ""; // Clear previous list items
      items.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
  
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.style.display = "none";
        listItem.appendChild(editInput);
  
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
          editTask(todoItems, index, listItem, editInput);
        });
        listItem.appendChild(editButton);
  
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          deleteTask(todoItems, index, listItem);
        });
        listItem.appendChild(deleteButton);
  
        const completeButton = document.createElement("button");
        completeButton.textContent = "Done";
        completeButton.addEventListener("click", () => {
          markTaskComplete(todoItems, item, todoList);
        });
        listItem.appendChild(completeButton);
  
        todoList.appendChild(listItem);
      });
    }
  
    function displayToLearnList(items) {
      const toLearnList = document.getElementById("to-learn-list");
      toLearnList.innerHTML = ""; // Clear previous list items
      items.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        toLearnList.appendChild(listItem);
      });
    }
  
    function addTodoItem() {
      const newTask = prompt("Enter a new task:");
      if (newTask) {
        todoItems.push(newTask);
        displayTodoList(todoItems);
        saveData();
      }
    }
  
    function addToLearnItem() {
      const newLearningItem = prompt("Enter a new learning item:");
      if (newLearningItem) {
        toLearnItems.push(newLearningItem);
        displayToLearnList(toLearnItems);
        saveData();
      }
    }
  
    function editTask(items, index, listItem, editInput) {
      const currentTask = items[index];
      editInput.style.display = "inline-block";
      editInput.value = currentTask;
      listItem.style.display = "none";
  
      editInput.addEventListener("blur", () => {
        const updatedTask = editInput.value.trim();
        if (updatedTask && updatedTask !== currentTask) {
          items[index] = updatedTask;
          displayTodoList(todoItems);
          saveData();
        } else {
          editInput.style.display = "none";
          listItem.style.display = "block";
        }
      });
  
      editInput.focus();
    }
  
    function deleteTask(items, index, listItem) {
      items.splice(index, 1);
      listItem.remove();
      saveData();
    }
  
    function markTaskComplete(items, task, list) {
      const index = items.indexOf(task);
      if (index !== -1) {
        items.splice(index, 1);
        list.removeChild(list.querySelector("li:nth-child(" + (index + 1) + ")"));
        saveData();
      }
    }
  
    function saveData() {
      localStorage.setItem("todoItems", JSON.stringify(todoItems));
      localStorage.setItem("toLearnItems", JSON.stringify(toLearnItems));
    }
  
    displayTodoList(todoItems);
    displayToLearnList(toLearnItems);
  
    const addTodoButton = document.getElementById("add-todo-button");
    addTodoButton.addEventListener("click", addTodoItem);
  
    const addToLearnButton = document.getElementById("add-to-learn-button");
    addToLearnButton.addEventListener("click", addToLearnItem);
  });
  