const params = new URLSearchParams(location.search);
const itemId = params.get("id");

function toIndexPage() {
  location.href = "index.html";
}

function saveData() {
  todoData[idx] = item;
  localStorage.setItem("todoData", JSON.stringify(todoData));
}

function renderImage() {
  if (item.image) {
    imgPreview.innerHTML = `<img src="${item.image}" alt="업로드된 이미지">`;
  } else {
    uploadBtn.addEventListener("click", () => imgInput.click());
  }
}

if (!itemId) {
  toIndexPage();
}

// localStorage에서 todoData 배열 불러오기
let todoData = JSON.parse(localStorage.getItem("todoData") || "[]");
const idx = todoData.findIndex((x) => x.id === itemId);
if (idx === -1) {
  toIndexPage();
}
const item = todoData[idx];

const statusCheckbox = document.querySelector(".checkBoxClass");
const titleEl = document.getElementById("title");
const memoEl = document.getElementById("memo");
const imgInput = document.getElementById("imgInput");
const imgPreview = document.getElementById("imgPreview");
const uploadBtn = document.querySelector(".uploadBtn");
const backBtn = document.getElementById("backBtn");
const saveBtn = document.getElementById("saveBtn");
const deleteBtn = document.getElementById("deleteBtn");

// init
titleEl.textContent = item.title;
statusCheckbox.checked = item.done;
memoEl.value = item.memo || "";
renderImage();

titleEl.style.cursor = "pointer";
titleEl.addEventListener("click", () => {
  titleEl.contentEditable = "true";
  titleEl.focus();
});

titleEl.addEventListener("blur", () => {
  if (titleEl.textContent.trim() === "") {
    alert("빈 제목은 허용되지 않습니다.");
    titleEl.textContent = item.title;
  } else {
    titleEl.contentEditable = "false";
    item.title = titleEl.textContent.trim();
  }
});
titleEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    titleEl.blur();
  }
});

statusCheckbox.addEventListener("change", () => {
  item.done = statusCheckbox.checked;
  titleEl.style.textDecoration = item.done ? "line-through" : "none";
});

memoEl.addEventListener("input", () => {
  item.memo = memoEl.value;
});

imgInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    item.image = reader.result;
    saveData()
    renderImage();
  };
  reader.readAsDataURL(file);
});

backBtn.addEventListener("click", () => {
  toIndexPage();
});

saveBtn.addEventListener("click", () => {
  saveData()
  toIndexPage();
});

deleteBtn.addEventListener("click", () => {
  if (!confirm("정말 삭제하시겠습니까?")) return;
  todoData.splice(idx, 1);
  localStorage.setItem("todoData", JSON.stringify(todoData));
  toIndexPage();
});
