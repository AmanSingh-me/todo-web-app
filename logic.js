import { body, todoText, isClearHtml_Runned, totalTodos, completedTodos, allTodos, getLclStor, addTodo, showTodos, todos_Arr, editTodo, deleteTodo, todoCount, updt_Lcl_Stor } from "/modules.js";

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
        todoCount.total++;
        totalTodos.textContent = todoCount.total;
        updt_Lcl_Stor()
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
                }
            }
        }
        if (toggleClass) { // toggle returns true
            matchText(true);
            todoCount.done++;
        }
        else if (!toggleClass) { // toggle returns false
            matchText(false);
            todoCount.done--;
        }
        completedTodos.textContent = todoCount.done;
        updt_Lcl_Stor();
    }
}