const addBtn = document.getElementById("addBtn");
const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const errorMsg = document.getElementById("errorMsg");
const taskCount = document.getElementById("taskCount");

addBtn.addEventListener("click", addTodo);

// Enter lisää tehtävän
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTodo();
    }
});

// kuinka monta tehtävää jäljellä
function updateTaskCount() {
    const totalTasks = list.children.length;
    const completedTasks = list.querySelectorAll("input[type='checkbox']:checked").length;
    const remainingTasks = totalTasks - completedTasks;
    taskCount.textContent = `Tehtäviä jäljellä: ${remainingTasks}`;
}

// Poista virhe, kun käyttäjä kirjoittaa
input.addEventListener("input", clearError);

// Virheilmoitukset
function addTodo() {

    const text = input.value.trim();

    if (text === "") {
        showError("Kirjoita tehtävä ensin");
        return;
    }

    if (text.length < 2) {
        showError("Tehtävän pituus on liian lyhyt! Kirjoita pidempi tehtävä.");
        return;
    }

    clearError();

    // luodaan li
    const li = document.createElement("li");

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // tehtävän teksti
    const span = document.createElement("span");
    span.textContent = text;

    // Kun checkbox valitaan
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            span.style.textDecoration = "line-through";
            span.style.color = "lightgray";
        } else {
            span.style.textDecoration = "none";
            span.style.color = "black";
        }

        updateTaskCount();
    });

    // Poista nappi
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Poista";
    deleteBtn.classList.add("deleteBtn");

    deleteBtn.addEventListener("click", function() {
        li.remove();
        updateTaskCount();
    });

    // lisätään elementit li:hin
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // lisätään listaan
    list.appendChild(li);

    input.value = "";
    updateTaskCount();
}


function showError(message) {
    errorMsg.textContent = message;
    input.classList.add("error");
}

function clearError() {
    errorMsg.textContent = "";
    input.classList.remove("error");
}