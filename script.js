let inputText = document.getElementById("inputText");
let addTask = document.getElementById("addTask");
let tasksList = document.getElementById("tasksList");

addTask.addEventListener("click", addingTask);
inputText.addEventListener("keydown" , (e) =>{
    if(e.key=== "Enter"){
        addingTask();
    }
})


let tasks = [];

function saveTasks()
{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const storedUserData = localStorage.getItem('tasks');

function loadTasks()
{
    if(storedUserData){
        tasks=JSON.parse(storedUserData)
    }else {
        console.log("User data not found in local storage");
    }
}

function renderTasks()
{

    tasksList.innerHTML="";

    tasks.forEach((task, index)=>{
        let newLi = document.createElement("li");
        let deleteButton = document.createElement("button");
        newLi.textContent = `${task.title}`;
        newLi.addEventListener("click", (toggleTask) => {
            task.done = !task.done;
            saveTasks();
            renderTasks()
        });

        if(task.done){
            newLi.style.textDecoration= "line-through";
        }
        deleteButton.textContent="X";
        deleteButton.classList.add("deleteButton");
        deleteButton.addEventListener("click", (del) =>{
            del.stopPropagation();
            tasks.splice(index,1);
            saveTasks();
            renderTasks();
        })
        newLi.appendChild(deleteButton);
        tasksList.appendChild(newLi);
    })
}



function addingTask()
{
    
    let inputValue = document.getElementById("inputText").value;
    tasks.push({title: inputValue, done: false});
    
    saveTasks();
    inputText.value="";
    renderTasks();

}

loadTasks();
renderTasks();
