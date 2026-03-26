const taskInput = document.getElementById('task-input'); // 
const addTaskBtn = document.getElementById('add-task-btn'); // 
const taskList = document.getElementById('task-list'); // 

function saveTasks() {
    const taskItems = document.querySelectorAll('.task-item');
    const tasksArray = [];

    taskItems.forEach(item => {
        tasksArray.push(item.firstChild.textContent); 
    });

    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.className = 'delete-btn';

    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    saveTasks();
}

addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim(); 

    if (text !== "") {
        createTaskElement(text); 
        taskInput.value = ""; 
    }
});

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        const tasksArray = JSON.parse(savedTasks);
        tasksArray.forEach(taskText => {
            createTaskElement(taskText);
        });
    }
}

loadTasks();