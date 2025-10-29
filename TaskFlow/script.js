const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");

// Load saved tasks and theme
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  const theme = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark", theme === "dark");
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
});

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  saveTask(task);
  renderTask(task);

  taskInput.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");
  li.classList.add("task");
  if (task.completed) li.classList.add("completed");

  li.innerHTML = `
    <span>${task.text}</span>
    <div>
      <button class="completeBtn">${task.completed ? "↩️" : "✅"}</button>
      <button class="deleteBtn">🗑️</button>
    </div>
  `;

  const completeBtn = li.querySelector(".completeBtn");
  const deleteBtn = li.querySelector(".deleteBtn");

  completeBtn.addEventListener("click", () => toggleComplete(task.id));
  deleteBtn.addEventListener("click", () => deleteTask(task.id));

  taskList.appendChild(li);
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(renderTask);
}

function deleteTask(id) {
  let tasks = getTasks().filter((t) => t.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskList.innerHTML = "";
  loadTasks();
}

function toggleComplete(id) {
  let tasks = getTasks();
  tasks = tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskList.innerHTML = "";
  loadTasks();
}
