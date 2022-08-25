import { body, todoText, isClearHtml_Runned, totalTodos, completedTodos, allTodos, setLclStor, getLclStor, addTodo, showTodos, todos_Arr, editTodo, deleteTodo, todoCount} from "/modules.js";

todoText.addEventListener('keyup', setTodo)
function setTodo(event) {
    if (event.key === "Enter") {
        if (!isClearHtml_Runned) { // For removing the text already present
            try {
                if (getLclStor('Todos').length == 0) {
                    allTodos.innerHTML = "";
                    isClearHtml_Runned = true;
                }
            } catch (error) {
                allTodos.innerHTML = "";
            }
        }
        let todo = todoText.value.trim();
        todos_Arr.push({ text: todo, isDone: false });
        addTodo(todo);
        todoText.value = "";
        setLclStor("Todos", todos_Arr);
        todoCount.total++;
        totalTodos.textContent = todoCount.total;
        setLclStor('todoCount', todoCount);
    }
}
document.addEventListener('DOMContentLoaded', showTodos());


allTodos.addEventListener('click', getTrgt);

function getTrgt(event) {
    let trgt = event.target;

    switch (trgt.id) {
        case "more": trgt.previousElementSibling.classList.toggle('show-all-todo');
            break;
        case "edit": editTodo(trgt)
            break;
        case "delete": deleteTodo(trgt)
    }

    if (trgt.classList.contains('todo-detail')) {  // It cheks that todo is done or not
        let toggleClass = trgt.classList.toggle('isDone_true');
        let searchText = trgt.textContent;
        function matchText(boolean) {
            for (const data of todos_Arr) {
                if (data.text === searchText) {
                    data.isDone = boolean;
                    setLclStor('Todos', todos_Arr);
                }
            }
        }
        if (toggleClass) { // If toggle returns true
            matchText(true);
            todoCount.done++;
        }
        else if (!toggleClass) { // If toggle returns false
            matchText(false);
            todoCount.done--;
        }
        completedTodos.textContent = todoCount.done;
        setLclStor('todoCount', todoCount);
    }
}
