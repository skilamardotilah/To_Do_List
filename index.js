var todoList = []
var comdoList = [];
var remList = [];
var addButton = document.getElementById("add-button")
var todoInput = document.getElementById("todo-input")
var deleteAllButton = document.getElementById("delete-all")
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected")


//event listners untuk add and delete
addButton.addEventListener("click", add)
deleteAllButton.addEventListener("click", deleteAll)
deleteSButton.addEventListener("click", deleteS)


//event listeners untuk filter
document.addEventListener('click', (e) => {
    if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'ci') {
        completeTodo(e);
    }
    if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'di') {
        deleteTodo(e)
    }
    if (e.target.id == "all") {
        viewAll();
    }
    if (e.target.id == "rem") {
        viewRemaining();
    }
    if (e.target.id == "com") {
        viewCompleted();
    }

})
//event listner untuk enter key
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});


//update semua daftar utama, yang tersisa, dan telah selesai
function update() {
    comdoList = todoList.filter((ele) => {
        return ele.complete

    })
    remList = todoList.filter((ele) => {
        return !ele.complete
    })
    document.getElementById("r-count").innerText = todoList.length.toString();
    document.getElementById("c-count").innerText = comdoList.length.toString();

}

//menambah tugas di daftar utama

function add() {
    var value = todoInput.value;
    if (value === '') {
        alert("😮 Task cannot be empty")
        return;
    }
    todoList.push({
        task: value,
        id: Date.now().toString(),
        complete: false,
    });

    todoInput.value = "";
    update();
    addinmain(todoList);
}


//merender daftar utama dan tampilan pada konten utama

function addinmain(todoList) {
    allTodos.innerHTML = ""
    todoList.forEach(element => {
        var x = `<li id=${element.id} class="todo-item">
    <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
    <div class="todo-actions">
                <button class="complete btn btn-success">
                    <i class=" ci bx bx-check bx-sm"></i>
                </button>

                <button class="delete btn btn-error" >
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`
        allTodos.innerHTML += x
    });
}


//menghapus tugas individu dan perbarui semua daftar
function deleteTodo(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    todoList = todoList.filter((ele) => {
        return ele.id != deleted
    })

    update();
    addinmain(todoList);

}

//menyelesaikan tugas individu dan update semua daftar
function completeTodo(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    todoList.forEach((obj) => {
        if (obj.id == completed) {
            if (obj.complete == false) {
                obj.complete = true
                e.target.parentElement.parentElement.querySelector("#task").classList.add("line");
            } else {
                obj.complete = false

                e.target.parentElement.parentElement.querySelector("#task").classList.remove("line");
            }
        }
    })

    update();
    addinmain(todoList);
}


//menghapus semua tugas
function deleteAll(todo) {

    todoList = []

    update();
    addinmain(todoList);

}

//menghapus hanya tugas yang selesai
function deleteS(todo) {

    todoList = todoList.filter((ele) => {
        return !ele.complete;
    })


    update();
    addinmain(todoList);

}


// fungsi untuk filters
function viewCompleted() {
    addinmain(comdoList);
}

function viewRemaining() {

    addinmain(remList);
}
function viewAll() {
    addinmain(todoList);
}