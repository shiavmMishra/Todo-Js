let completeTasksarr = [];
let incompleteTasks = [];
let totalTasks = 0;

let addButton = document.getElementById("add-btn");
if (addButton) {
    addButton.addEventListener('click', function addTask() {
        let text = document.getElementById('input');
        if (text.value.length == 0) {
            return;
        }

        let listBlock = document.querySelector('#task-list ul');
        let listElement = document.createElement('li');

        let iconComplete = document.createElement('div');
        iconComplete.innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>&nbsp&nbsp';
        listElement.appendChild(iconComplete);

        let textVal = document.createElement('span');
        textVal.innerHTML = text.value;
        listElement.appendChild(textVal);
        listElement.style.listStyle = "none";
        listElement.style.position = "relative";
        listElement.style.fontSize = "1.2rem";


        let removeButton = document.createElement('div');
        removeButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>'
        removeButton.style.color = "maroon";
        removeButton.style.position = "absolute";
        removeButton.style.right = "25px";
        removeButton.style.justifyContent = "flex-end";


        listElement.style.display = "flex";
        listElement.appendChild(removeButton);
        listElement.setAttribute('checked', '0');

        listBlock.appendChild(listElement);

        incompleteTasks.push(listElement);

        listElement.addEventListener('click', completeTask.bind(listElement));

        removeButton.addEventListener('click', removeTask.bind(removeButton));
        totalTasks += 1;
        $('#task-count').html(totalTasks);
        text.value = "";

        function removeTask(temp1) {
            temp1.target.parentElement.parentElement.remove();
            totalTasks = totalTasks - 1;
            $('#task-count').html(totalTasks);
            temp1.stopPropagation();
        }
        function completeTask(element) {
            if (element.target.getAttribute('checked') === '0') {
                element.target.children[0].innerHTML = '<i class="fa fa-check-circle-o" aria-hidden="true"></i>';
                element.target.setAttribute('checked', '1');
                completeTasksarr.push(element.target);
                let index = 0;
                for (let elem of incompleteTasks) {
                    if (element.target == elem) {
                        incompleteTasks.splice(index, 1);
                        break;
                    }
                    index += 1;
                }
            }
            else if (element.target.getAttribute('checked') === '1') {
                element.target.children[0].innerHTML = '<i class="fa fa-circle-thin" aria-hidden="true"></i>&nbsp&nbsp';
                element.target.setAttribute('checked', '0');
                incompleteTasks.push(element.target);
                let index = 0;
                for (let elem of completeTasksarr) {
                    if (element.target == elem) {
                        completeTasksarr.splice(index, 1);
                        break;
                    }
                    index += 1;
                }
            }
        }
    });
}

document.getElementById('incomplete').addEventListener('click', allIncomplete);
function allIncomplete() {
    let listBlock = document.querySelector('#task-list ul');
    listBlock.innerHTML = "";
    for (let elem of incompleteTasks) {
        listBlock.appendChild(elem);
    }
    $('#task-count').html(incompleteTasks.length);
}

var allCompleteClear = document.getElementById('clear-complete');
allCompleteClear.addEventListener('click', function allCompleteClear() {
    completeTasksarr = [];
    totalTasks -= completeTasksarr.length;
    allIncomplete();
});

var doAllComplete = document.getElementById('all-complete');
doAllComplete.addEventListener('click', function doAllComplete() {
    for (let elem of incompleteTasks) {
        elem.children[0].innerHTML = '<i class="fa fa-check-circle-o" aria-hidden="true"></i>&nbsp&nbsp';
        elem.setAttribute('checked', '1');
        elem.style.backgroundColor = 'lightblue';
        completeTasksarr.push(elem);
    }
    totalTasks -= incompleteTasks.length;
    incompleteTasks = [];
    allComplete();
});

var allComplete = document.getElementById('complete');
allComplete.addEventListener('click', function allComplete() {
    let listBlock = document.querySelector('#task-list ul');
    listBlock.innerHTML = "";
    for (let elem of completeTasksarr) {
        listBlock.appendChild(elem);
    }
    $('#task-count').html(completeTasksarr.length);
});

var allElements = document.getElementById('all');
allElements.addEventListener('click', function allElements() {
    let listBlock = document.querySelector('#task-list ul');
    listBlock.innerHTML = "";
    for (let elem of completeTasksarr) {
        listBlock.appendChild(elem);
    }
    for (let elem of incompleteTasks) {
        listBlock.appendChild(elem);
    }
    $('#task-count').html(completeTasksarr.length + incompleteTasks.length);
});