const todoList = JSON.parse(localStorage.getItem('tasks')) || [{name: 'Read my books', time: '17/8 10:17', done: false}]

const listContainer = document.querySelector('.list-item');
const buttonElem = document.querySelector('.create-button')

function getTime() {
  const time = new Date()
  const mm = String(time.getMonth() + 1).padStart(2, '0');
  const dd = String(time.getDate()).padStart(2, '0')
  const hh = String(time.getHours()).padStart(2, '0')
  const min = String(time.getMinutes()).padStart(2, '0')
  return `${mm}/${dd} ${hh}:${min} `
}

function saveTask() {
  localStorage.setItem(task, JSON.stringify('todoList'))
}

function renderTask() {
  listContainer.innerHTML = '';
  todoList.forEach((task, index) => {
    const li = document.createElement('li')
    li.className = 'list-item'
    li.innerHTML = `
      <input type='checkbox' class='isDone ${task.done ? 'checked' : ''}'>
      <div class="todo-wrap">
        <p class='todo' style="${task.done} ? 'text-decoration: line-through;' : '' opacity: 0.4; ">${task.name}</p>
        <span class="todo-time">${task.time}</span>
      </div>
      <button class='delete-button' data-index=${task.index}>✕</button>
    `
  })
}
renderTask()
