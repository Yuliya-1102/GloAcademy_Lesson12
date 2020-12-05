'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const todoDate = []; //массив для объектов

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';
    let todoDate = JSON.parse( localStorage.todo );
   
    todoDate.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
        '</div>';

        
        // смотрим в какой список пойде li
        if(item.completed){
            todoCompleted.append(li);
        } else{
            todoList.append(li);
        }
        
        headerInput.value = ''; 

        // навешиваем событие на значек с галойчкой, выпонено не выполнено
        const todoComplete = li.querySelector('.todo-complete');
        todoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            localStorage.setItem('todo', JSON.stringify(todoDate));
            render();
        });



        // навешиваем событие на значек с корзиной, удалено 
        const todoRemove = li.querySelector('.todo-remove');
        todoRemove.addEventListener('click', function(){
            console.log(todoDate.indexOf(item));
            let i = todoDate.indexOf(item);
            if(i>=0){
                todoDate.splice(i, 1);
            }
            localStorage.setItem('todo', JSON.stringify(todoDate));
            render();
        });
        
    }); // forEach
};

todoControl.addEventListener('submit', function(event){ // везде, где есть form и кнопка => submit
    event.preventDefault();

    // проверка на пустую строку
    if(headerInput.value.trim() === ''){
        todoControl.disabled = true;
    } else{
        const newTodo = {
            value: headerInput.value,
            completed: false
        };
        // let todoDate = JSON.parse( localStorage.todo );
        todoDate.push(newTodo);

        localStorage.setItem('todo', JSON.stringify(todoDate));
    
        render();
        
       
       
    }
    
});

render();