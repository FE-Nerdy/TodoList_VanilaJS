const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
// const todoList = document.getElementById("todoList");
// const doneList = document.getElementById("doneList");

function addTask() {
  const newTask = inputBox.value.trim();

  if (inputBox.value.trim() === "") {
    alert("Please enter a task.");
  } else {
    const li = document.createElement("li");
    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = false;

    const span = document.createElement("span");
    span.textContent = newTask;

    li.appendChild(check);
    li.appendChild(span);
    todoList.appendChild(li);
  }
  inputBox.value = "";
}

addBtn.addEventListener("click", () => {
  addTask();
});

// 엔터키로도 추가
inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

todoList.addEventListener("change", e => {
  if (e.target.type === "checkbox") {
    e.target.checked = true;
    const li = e.target.closest("li");
    li.style.textDecoration = "line-through";
    doneList.appendChild(li);
  }
});

doneList.addEventListener("change", e => {
  if (e.target.type === "checkbox") {
    e.target.checked = false;
    const li = e.target.closest("li");
    li.style.textDecoration = "none";
    todoList.appendChild(li);
  }
});
// function saveData() {
//   localStorage.setItem("todoList", todoList.innerHTML);
// }