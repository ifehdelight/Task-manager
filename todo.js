const todoList = JSON.parse(localStorage.getItem('tasks')) || []

const listContainer = document.querySelector('.todolist');
const buttonElem = document.querySelector('.create-button')

function getTime() {
  const time = new Date()
  const mm = String(time.getMonth() + 1).padStart(2, '0');
  const dd = String(time.getDate()).padStart(2, '0')
  const hh = String(time.getHours()).padStart(2, '0')
  const min = String(time.getMinutes()).padStart(2, '0')
  return `${mm}/${dd} ${hh}:${min} `
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(todoList))
}

function renderTasks() {
  listContainer.innerHTML = ''
  if (todoList.length === 0) {
    const h3 = document.createElement('h3');
    h3.className = 'default';
    h3.textContent = `No task here yet!`;
    listContainer.appendChild(h3);
    return;
  }
  
  todoList.forEach((task, index) => {
    const li = document.createElement('li')
    li.className = 'list-item'
    li.innerHTML = `
      <input type='checkbox' class='isDone' ${task.done ? 'checked' : ''}>
      <div class="todo-wrap">
        <p class='todo' style="${task.done ? 'text-decoration: line-through; opacity: 0.4;' : '' } ">${task.name}</p>
        <span class="todo-time">${task.time}</span>
      </div>
      <button class='delete-button' data-index=${index}>✕</button>
      
    `
    li.querySelector('.isDone').addEventListener('change', () => toggleDone(index))
    li.querySelector('.delete-button').addEventListener('click', () => deleteTask(index))
    listContainer.appendChild(li)
  })
}
function toggleDone(index) {
  todoList[index].done = !todoList[index].done
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  todoList.splice(index, 1);
  saveTasks();
  renderTasks()
}

function addTask(name) {
  if (!name.trim()) return;
  todoList.push({
    name: name.trim(),
    time: getTime(),
    done: false
  })
  saveTasks();
  renderTasks();
}

function showModal() {
  const modal = document.createElement('div')
  
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    background-color: rgba(0,0,0,0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  `
          modal.innerHTML = `
      <div style="background:#1a1a1a; padding:24px; border-radius:15px; width:85%; max-width:400px;">
        <h3 style="color:lightgray; margin-bottom:16px;">New Task</h3>
        <input id="task-input" type="text" placeholder="What needs to be done?"
          style="width:100%; padding:12px; border-radius:8px; border:none; font-size:15px;
                 box-sizing:border-box; background:#2a2a2a; color:white; outline:none;">
        <div style="display:flex; gap:10px; margin-top:16px; justify-content:flex-end;">
          <button id="cancel-btn" style="padding:10px 20px; border-radius:8px; border:none;
            background:#333; color:lightgray; cursor:pointer; font-size:14px;">Cancel</button>
          <button id="add-btn" style="padding:10px 20px; border-radius:8px; border:none;
            background:lightsalmon; color:white; cursor:pointer; font-size:14px;">Add</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal)
    const input = modal.querySelector('#task-input')
    input.focus()
    modal.querySelector('#cancel-btn').addEventListener('click', () => modal.remove())
    modal.querySelector('#add-btn').addEventListener('click', () => {
      addTask(input.value)
      modal.remove()
    })
    
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        addTask(input.value);
        modal.remove();
      };
      if (e.key === 'Escape') modal.remove();
    })
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove()
    })
}

buttonElem.addEventListener('click', showModal);
  renderTasks();
