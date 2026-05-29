$(document).ready(function () {

    $("#addBtn").click(function () {
        addTodo();
    });

    $("#todoInput").keypress(function (event) {
        if (event.key === "Enter") {
            addTodo();
        }
    });

    $("#todoInput").on("input", function () {
        clearError();
    });

    $(document).on("click", ".deleteBtn", function () {

        $(this).parent().fadeOut(300, function () {

            $(this).remove();
            updateTaskCount();

        });

    });

    VANTA.BIRDS({
    el: "#background",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundColor: 0x10128,
    color1: 0x8c0000,
    color2: 0x3fa200,
    colorMode: "lerp",
    birdSize: 2.10,
    quantity: 2.00
    });

    $(document).on("change", ".checkTask", function () {

        const span = $(this).siblings("span");

        if ($(this).is(":checked")) {

            span.css({
                "text-decoration": "line-through",
                "color": "lightgray"
            });

        } else {

            span.css({
                "text-decoration": "none",
                "color": "black"
            });

        }

        updateTaskCount();

    });

});

function addTodo() {

    const text = $("#todoInput").val().trim();

    if (text === "") {

        showError("Kirjoita tehtävä ensin");
        return;

    }

    const newTask = $(`
        <li>
            <input type="checkbox" class="checkTask">
            <span>${text}</span>
            <button class="deleteBtn">Poista</button>
        </li>
    `);

    $("#todoList").append(newTask);

    newTask.hide().fadeIn(400);

    $("#todoInput").val("");

    clearError();

    updateTaskCount();
}

function updateTaskCount() {

    const totalTasks = $("#todoList li").length;

    const completedTasks =
        $("#todoList input[type='checkbox']:checked").length;

    const remainingTasks = totalTasks - completedTasks;

    $("#taskCount").text(
        `Tehtäviä jäljellä: ${remainingTasks}`
    );
}

function showError(message) {

    $("#errorMsg").text(message);

    $("#todoInput").addClass("error");
}

function clearError() {

    $("#errorMsg").text("");

    $("#todoInput").removeClass("error");
}
