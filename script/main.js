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
    }
}
function isValid(task) {
    //validate the user *** Extra Home work
        
   let valid=true;
   $('input').removeClass("input-error");
   if (task.title.length == 0) {
       console.log("Please add a title");
       valid=false;
       $('#txtTitle').addClass("input-error");
   }
   if(!valid){
       displayError("Missing data");
  
   }

   return valid;
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


    let task = new Task(isImportance,inputTitle,inputDescription,inputColor,inputStartDate,inputDueDate,inputCategory);
    displayTask(task);
    console.log(task);
    saveTask();
    
}
function displayTask(task){
    //travel the array
    let syntax =`
        <div class="task">
            <div class="info">
                <h3>Task</h3>
                <h5>${task.title}</h5>
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
            <div class="Misc">
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




function init() {
    console.log("Task Manager");
    
    //load data
    
    
    //hook events
    $("#iImportant").click(toggleImportance);
    hideForm();
}
function test() {
    $.ajax({
        url: "https://restclass.azurewebsites.net/api/test",
        type: "GET",
        success: function (response) {
            console.log("Server says",response);
        },
        error: function (errorDetails) {
            console.log(errorDetails);
        }
    });
}

window.onload = init;