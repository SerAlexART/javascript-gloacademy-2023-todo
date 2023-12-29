'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];

const saveLocalStorageToDo = function () {
    localStorage.setItem('ToDoList', JSON.stringify(toDoData));
};

const loadLocalStorageToDo = function () {
    if (localStorage.length > 0) {
        toDoData = JSON.parse(localStorage.getItem('ToDoList'));
        render();
    }
};

const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData.forEach(function (item, index) {
        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed === false) {
            todoList.append(li);
        } else {
            todoCompleted.append(li);
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;

            render();
        });

        li.querySelector('.todo-remove').addEventListener('click', function () {
            toDoData.splice(index, 1);

            render();
        });
    });

    // localStorage.setItem('ToDoList', JSON.stringify(toDoData));
    saveLocalStorageToDo();
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    if (headerInput.value.trim() === '') {
        alert('Ксюша, заполни, пожалуйста, поле с планом и больше меня не ломай =)');
    } else {
        const newToDo = {
            text: headerInput.value,
            completed: false
        };

        toDoData.push(newToDo);

        headerInput.value = '';

        render();
    }
});

loadLocalStorageToDo();