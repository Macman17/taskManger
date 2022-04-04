var importanceIcon =  "fas fa-star";
var nonImportanceIcon =  "far fa-star";
var isImportance = true;
var isPanelVisible = true;
let userList= [];
class Task{
    constructor (important,title,description, color,startDate,dueDate,category){ 
        this.important = important;
        this.title = title;
        this.description = description;
        this.color= color;
        this.startDate= startDate;
        this.dueDate = dueDate;
        this.category = category;


        this.owner = "Naqui";
    }
}



function toggleImportance() {
    console.log("Icon Clicked");


    if(isImportance){
        //switch to none imp
        $("#iImportant").removeClass(importanceIcon).addClass(nonImportanceIcon);
        isImportance=false;

    }else{
        //switch to imp
        $("#iImportant").removeClass(nonImportanceIcon).addClass(importanceIcon);
        isImportance=true;

    }
}
function hideForm() {
    if(isPanelVisible){
        $("#sect-form").hide();
        isPanelVisible= false;

    }else{
        $("#sect-form").show();
        isPanelVisible = true;
    }
}
function register(){
    
    let inputTitle= $('#txtTitle').val();
    let inputDescription= $('#txtDescription').val();
    let inputColor= $('#txtColor').val();
    let inputStartDate= $("#txtStartDate").val();
    let inputDueDate= $('#txtDueDate').val();
    let inputCategory= $("#txtCategory").val();
    
    if (inputTitle.length < 5) {
        $("#inputError").removeClass("hide");
        setTimeout(function(){
            $("#inputError").addClass("hide")
        },3000)

        return; 
    }
    let task = new Task(isImportance,inputTitle,inputDescription,inputColor,inputStartDate,inputDueDate,inputCategory);

    //save to server
    sendtask(task);
    
    
}

function sendtask(task) {

    let jsonData = JSON.stringify(task);//encoding the obj to a json string
    $.ajax({
        type: "POST",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        data: jsonData,
        contentType: "application/json",
        success: function (data) {
            console.log(data);
            //display task
            displayTask(task);
            
            //clear form
            clearForm();    
        },
        error: function (errorDetails) {
            console.log(errorDetails);
        },
    });
    
}

function displayTask(task){
    //travel the array
    let syntax =`
        <div class="task" style="border: 4px solid ${task.color}">
            <div class="info" >
                <h3>Task</h3>
                <h5>${task.title}</h5>
                <h3>Description</h3>
                <p>${task.description}</p>
            </div>
            <div class="date">
                <div>
                    <h3>Start</h3>
                    <label>${task.startDate}</label>
                    <h3>Due</h3>
                    <label>${task.dueDate}</label>
                </div>
            </div>
            <div class="misc">
                <div>
                    <h3>Category</h3>
                    <label>${task.category}</label>
                    <h3>Color</h3>
                    <label>${task.color}</label>
                    <h3>Importance</h3>
                    <label>${task.isImportance}</label>
                </div>
            </div>
        </div>
    `;
  
    $("#task-container").append(syntax);
    //get each user
    //display the user
    
    //append the user to the table
    
}
function clearForm() {
    
    $("#txtTitle").val("");
    $("#txtDescription").val("");
    $("#txtColor").val("#000");
    $("#txtStartDate").val("");
    $("#txtDueDate").val("");
    $("#txtCategory").val("");

}

function loadTask() {
    $.ajax({
        type:"GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        success: function (jsonData) {
            
            let data = JSON.parse(jsonData);//decoding JSON String
            console.log(data);
            
            //travel the array, get every elements from the array (task)
            //send the task to be displayed on screen
            for (let i = 0; i < data.length; i++) {
                
                let task = data[i];
                if (task.owner == "Naqui") {
                    displayTask(task);
                }
                
            }
            
        },
        error: function (errorDetails) {
            console.log(errorDetails);
        }

    });
}


function init() {
    console.log("Task Manager");
    
    //load data
    
    loadTask();
    //hook events
    $("#iImportant").click(toggleImportance);
    hideForm();
}

window.onload = init;