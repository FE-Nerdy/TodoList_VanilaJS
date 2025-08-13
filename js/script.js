const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");

let todoData = JSON.parse(localStorage.getItem("todoData") || "[]");

function addTask() {
  const newTask = inputBox.value.trim();

  if (inputBox.value.trim() === "") {
    alert("할 일을 입력하세요.");
  } else {
    const id = Date.now().toString();
    todoData.push({ id, title: newTask, done: false, memo: "", image: "" });

    const li = document.createElement("li");
    const check = document.createElement("input");
    check.type = "checkbox";
    check.className = "checkBoxClass";
    check.checked = false;
    check.dataset.id = id;

    const span = document.createElement("span");
    span.textContent = newTask;
    span.style.cursor = "pointer";
    span.dataset.id = id;
    span.addEventListener("click", () => {
      location.href = `detail.html?id=${id}`;
    });

    li.append(check, span);
    todoList.appendChild(li);
  }
  inputBox.value = "";
  saveData();
}

function renderData() {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  todoData.forEach((item) => {
    const li = document.createElement("li");
    const check = document.createElement("input");
    check.type = "checkbox";
    check.className = "checkBoxClass";
    check.checked = item.done;
    check.dataset.id = item.id;

    const span = document.createElement("span");
    span.textContent = item.title;
    span.style.cursor = "pointer";
    span.dataset.id = item.id;
    span.addEventListener("click", () => {
      location.href = `detail.html?id=${item.id}`;
    });

    li.appendChild(check);
    li.appendChild(span);
    if (item.done) doneList.appendChild(li);
    else todoList.appendChild(li);
  });
}

function saveData() {
  localStorage.setItem("todoData", JSON.stringify(todoData));
  renderData();
}

renderData();

let composing = false;

inputBox.addEventListener("compositionstart", () => (composing = true));
inputBox.addEventListener("compositionend", () => (composing = false));

addBtn.addEventListener("click", addTask);
inputBox.addEventListener("keydown", (e) => {
  if (composing || e.isComposing || e.key === "Process") return;
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});

[todoList, doneList].forEach((list) =>
  list.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
      const id = e.target.dataset.id;
      const item = todoData.find((x) => x.id === id);
      item.done = e.target.checked;
      saveData();
      renderData();
    }
  })
);
