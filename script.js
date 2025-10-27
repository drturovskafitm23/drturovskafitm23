const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

// Массив для збереження справ
let todos = [
  { id: 1, text: "Вивчити HTML", checked: true },
  { id: 2, text: "Вивчити CSS", checked: true },
  { id: 3, text: "Вивчити JavaScript", checked: false }
];

// Генератор унікальних ID
let nextId = todos.length + 1;

// Додавання нової справи
function newTodo() {
  const text = prompt("Введіть нову справу:");
  if (text && text.trim() !== "") {
    todos.push({ id: nextId++, text: text.trim(), checked: false });
    render();
    updateCounter();
  }
}

// Створення HTML для однієї справи
function renderTodo(todo) {
  return `
    <li class="list-group-item" id="todo-${todo.id}">
      <input type="checkbox" class="form-check-input me-2" id="checkbox-${todo.id}" ${todo.checked ? 'checked' : ''} onchange="checkTodo(${todo.id})" />
      <label for="checkbox-${todo.id}">
        <span class="${todo.checked ? 'text-success text-decoration-line-through' : ''}">${todo.text}</span>
      </label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}

// Відображення всіх справ
function render() {
  list.innerHTML = todos.map(renderTodo).join('');
}

// Оновлення лічильників
function updateCounter() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length;
}

// Видалення справи
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  render();
  updateCounter();
}

// Відмітка справи як виконаної/невиконаної
function checkTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.checked = !todo.checked;
    render();
    updateCounter();
  }
}

// Ініціалізація при завантаженні сторінки
render();
updateCounter();
