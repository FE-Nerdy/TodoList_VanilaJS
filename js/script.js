const inputBox = document.getElementById('inputBox');
const addBtn   = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const doneList = document.getElementById('doneList');

function addTask() {
    if(inputBox.value.trim() === '') {
        alert('Please enter a task.');
    }
    else {
        let li = document.createElement('li');
        li.textContent = inputBox.value;
        todoList.appendChild(li);
        
    }
    inputBox.value = '';
}

// addBtn.addEventListener('click', () => {
//   const task = inputBox.value.trim();
//   if (!task) return;
//   tasks.push({ id: Date.now(), text: txt, done: false, memo: '' });
//   newTask.value = '';
//   render();
// });

// 엔터키로도 추가
newTask.addEventListener('keydown', e => {
  if (e.key === 'Enter') addBtn.click();
});

todoList.addEventListener('click', function(e) {
    if(e.target.tagName === 'LI') {
        let li = e.target;
        doneList.appendChild(li);
        li.style.textDecoration = 'line-through';
    }
});

function saveData() {
    localStorage.setItem('todoList', todoList.innerHTML);
}