let TheInput = document.querySelector('.container .add-task input');
let addTask = document.querySelector('.container .add-task .plus');
let content = document.querySelector('.container .content');
let noTask = document.querySelector('.container .no-tasks');
let tasksCount = document.querySelector('.container .tasks-count span');
let tasksCompleted = document.querySelector('.container .tasks-completed span');



//Fuctions


onload = function (){
    TheInput.focus()
}

let taskElement = document.createElement('span');
taskElement.setAttribute('class' , 'task-box');
let deleteButton = document.createElement('span');
deleteButton.setAttribute('class' , 'delete');




addTask.addEventListener('click' , function(){
    if(TheInput.value === ''){
        TheInput.style.border = 'red solid 3px'
        TheInput.setAttribute('placeholder' , 'The Input Is Empty')
    }else{
        TheInput.style.border = 'none'
        TheInput.removeAttribute('placeholder')
        let taskElement = document.createElement('span');
        taskElement.setAttribute('class' , 'task-box');
        let deleteButton = document.createElement('span');
        deleteButton.setAttribute('class' , 'delete');

        content.appendChild(taskElement);
        taskElement.innerHTML = TheInput.value
        taskElement.appendChild(deleteButton);
        deleteButton.innerHTML = "Delete"
        TheInput.value = '';
        noTask.innerHTML = 'Tasks'
        countTasks()
    }
    TheInput.focus()

})

countTasks()

addEventListener('click' , (e)=>{
    if(e.target.className == 'delete') {
        e.target.parentNode.remove()
        countTasks()
    }
})

function countTasks(){
    tasksCount.innerHTML = document.querySelectorAll('.container .task-box').length
    if(document.querySelectorAll('.container .task-box').length == 0){
        noTask.innerHTML = 'No Tasks To Show'
    }
}