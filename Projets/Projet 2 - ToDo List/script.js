const form = document.querySelector("form");

// Stockage dans le local storage
const storeList = () => {
    window.localStorage.todoList = list.innerHTML;
}

// Réinjecté ce qui est stocker
const getTodos = () => {
    if (window.localStorage.todoList) {
        list.innerHTML = window.localStorage.todoList;
    } else {
        list.innerHTML = `Vous pouvez ajouter une nouvelle tâche`;
    }
}

window.addEventListener("load", getTodos);

// Ajout d'une tâche
form.addEventListener("submit", (e) => {
    e.preventDefault(); /* ne recharge plus la page une fois le formulaire validé */

    list.innerHTML += `<li>${item.value}</li>`;
    item.value = ""; /* efface le text dans l'input quand ola valide */
    storeList(); /* stock l'ajout d'une tâche */
});

// Ajout ou suppression de la classe checked
list.addEventListener("click", (e) => {
    /* Retrait d'une tâche. Si la tâche a la classe checked, alors au click elle se supprime */
    if (e.target.classList.contains("checked")) {
        e.target.remove();
    } else { /* si la tâche n'a pas la tâche checked, alors au click elle s'ajoute. */
        e.target.classList.add("checked");
    }
    storeList(); /* stock la liste */
});
