const body = document.querySelector('body');
const todoText = document.getElementById('todo-text');
const stats = document.querySelector('.statistics');
const totalTodos = document.getElementById('total-todos').firstElementChild;
const completedTodos = document.getElementById('completed-todos').firstElementChild;
const allTodos = document.querySelector('.all-todo');

/* ------------------------------------------------------------------------  */
const todos_Arr = [];
const todoCount = { total: 0, done: 0 };
let isClearHtml_Runned = false;

/* ------------------------------------------------------------------------  */

function clearHtml(elem = allTodos) {
    elem.innerHTML = "";
}

function setLclStor(KEY, TODO_ARR) {
    localStorage.setItem(KEY, JSON.stringify(TODO_ARR));
}

function todoTemplate(TODO_VALUE) {
    let li = document.createElement('li');
    li.classList.add('todo');

    let p = document.createElement('p');
    p.classList.add("todo-detail");
    p.textContent = TODO_VALUE;
    li.append(p);

    let icons = [{ src: "more.svg", id: "more", class: "svg-icons" }, { src: "edit_square.svg", id: "edit", class: "svg-icons" }, { src: "delete.svg", id: "delete", class: "svg-icons" }];
    for (const detail of icons) {
        let img = document.createElement('img');
        img.id = detail.id;
        img.classList.add(detail.class);
        img.setAttribute("src", detail.src);

        li.append(img);
    }
    return li;
}

function getLclStor(KEY) {
    return JSON.parse(localStorage.getItem(KEY));
}

function addTodo(TODO) {
    allTodos.append(todoTemplate(TODO))
}

function showTodos() {
    let totalTodos_Arr = getLclStor('Todos');

    if (totalTodos_Arr.length > 0) {
        totalTodos_Arr.forEach((data, index) => {
            allTodos.append(todoTemplate(data.text));
            todos_Arr.push(data);

            let element = document.getElementsByClassName('todo-detail');
            if (data.isDone) { // styling text decoration if todo is done
                element[index].classList.add('isDone_true')
            }
        })
    } else {
        allTodos.textContent = "Nothing to Show....";
    }
    totalTodos.textContent = getLclStor('todoCount').total;
    completedTodos.textContent = getLclStor('todoCount').done;
    todoCount.total = getLclStor('todoCount').total;
    todoCount.done = getLclStor('todoCount').done;
}

function editTodo(TRGT_TODO) {
    TRGT_TODO.parentElement.remove();
    let todoToEdit = TRGT_TODO.parentElement.firstElementChild.textContent;
    let index = todos_Arr.indexOf(todoToDelete);
    todos_Arr.splice(index, 1);
    setLclStor('Todos', todos_Arr);

    if (getLclStor('Todos').length == 0) {
        allTodos.innerHTML = 'Nothing to Show....';
        isClearHtml_Runned = false;
    }
    todoCount.total--;
    totalTodos.textContent = todoCount.total

    todoText.textContent = todoToEdit;
}

function deleteTodo(TRGT_TODO) {
    let todoToDelete = TRGT_TODO.parentElement.firstElementChild.textContent;
    TRGT_TODO.parentElement.remove();

    todos_Arr.forEach((data,index) => {
        if (data.text === todoToDelete) {
            todoCount.total--;
            totalTodos.textContent = todoCount.total;
            todos_Arr.splice(index,1);
            setLclStor('Todos', todos_Arr);
            if(data.isDone){
                todoCount.done--;
                completedTodos.textContent = todoCount.done;
            }
            setLclStor('todoCount', todoCount);
        }
    });
    if (getLclStor('Todos').length == 0) {
        allTodos.innerHTML = 'Nothing to Show....';
        isClearHtml_Runned = false;
    }
}

export { body, todoText, isClearHtml_Runned, stats, totalTodos, completedTodos, allTodos, setLclStor, getLclStor, addTodo, showTodos, todos_Arr, editTodo, clearHtml, deleteTodo, todoCount }