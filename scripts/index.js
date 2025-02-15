let idCount = 1;

class Task {
  id = idCount++;
  constructor(taskName, taskDueDate, taskPriority, statusCompleted = false) {
    this.taskName = taskName;
    this.taskDueDate = taskDueDate;
    this.taskPriority = taskPriority;
    this.statusCompleted = statusCompleted;
  }

  toggleStatus() {
    this.statusCompleted = !this.statusCompleted;
  }
}

const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("default-datepicker");
const priorityOption = document.getElementById("priority-option");
const addTaskForm = document.getElementById("add-task-form");
const taskList = document.getElementById("task-list");
const taskArray = [];

addTaskForm.onsubmit = function (e) {
  e.preventDefault();
  const newTask = new Task(
    taskInput.value,
    dateInput.value,
    priorityOption.value
  );
  addTask(newTask);
  taskInput.value = "";
  dateInput.value = "";
  priorityOption.value = "";
};

function loadTasks() {
  let taskListElementString = "";
  for (const task in taskArray) {
    console.log(taskArray[task]);
    taskListElementString += renderTask(taskArray[task]);
  }
  taskList.innerHTML = taskListElementString;

  const taskButtons = document.querySelectorAll("#task-list button");
  for (let index = 0; index < taskArray.length; index++) {
    const task = taskArray[index];
    taskButtons[index].onclick = function () {
      task.toggleStatus();
      if (task.statusCompleted) {
        this.classList.replace("bg-orange-400", "bg-green-400");
        this.classList.replace("w-25", "w-35");
        this.innerText = "Completed";
      } else {
        this.classList.replace("bg-green-400", "bg-orange-400");
        this.classList.replace("w-35", "w-25");
        this.innerText = "Pending";
      }
    };
  }
}

function addTask(task) {
  taskArray.push(task);
  loadTasks();
}

function renderTask(task) {
  let taskPriorityString;
  let taskButtonTitle;
  let taskButtonStyle =
    "rounded-md py-1 text-white transition-all duration-1000 ";

  switch (task.taskPriority) {
    case "low":
      taskPriorityString =
        '<td class="text-start px-5 py-4 text-green-400 font-semibold">\
        Low\
        </td>';
      break;
    case "medium":
      taskPriorityString =
        '<td class="text-start px-5 py-4 text-yellow-300 font-semibold">\
                  Medium\
                </td>';
      break;
    case "high":
      taskPriorityString =
        '<td class="text-start px-5 py-4 text-red-500 font-semibold">\
          High\
          </td>';
      break;
  }

  if (task.statusCompleted) {
    taskButtonStyle += "bg-green-400 w-35";
    taskButtonTitle = "Completed";
  } else {
    taskButtonStyle += "bg-orange-400 w-25";
    taskButtonTitle = "Pending";
  }

  return `<tr> <td class="text-start px-5 py-4 text-slate-500 font-semibold">
                  ${task.taskName}
                </td>
                <td class="text-start px-5 py-4 text-slate-500 font-semibold">
                  ${task.taskDueDate}
                </td>
                ${taskPriorityString}
                <td class="text-center px-5 text-slate-500 font-semibold">
                  <button class="${taskButtonStyle}">
                    ${taskButtonTitle}
                  </button>
                </td>
              </tr>`;
}

loadTasks();
