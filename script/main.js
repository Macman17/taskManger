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
    let inputImportant= $('#iImportant').val();
    let inputTitle= $('#txtTitle').val();
    let inputDescription= $('#txtDescription').val();
    let inputColor= $('#txtColor').val();
    let inputStartDate= $("#txtStartDate").val();
    let inputDueDate= $('#txtDueDate').val();
    let inputCategory= $("#txtCategory").val();


    console.log(inputImportant,inputTitle,inputDescription,inputColor,inputStartDate,inputDueDate,inputCategory);
    //create theUser
    let theTask = new Task(inputImportant,inputTitle,inputDescription,inputColor,inputStartDate,inputDueDate,inputCategory);
if (isValid(theTask)) {
        saveTask(theTask);
        //clear the inputs
        $("input").val("");
    }
    
}
function displayTask(task){
    //travel the array
    $("#taskTable tbody").html("");
    let data="";
   for (let i = 0; i < task.length; i++) {
        console.log(task[i].title);
        data += createTask(task[i], i);
        //data = data + createUser(users[i]);
    }
    $("#taskTable tbody").html(data);
    //get each user
    //display the user
    
    //append the user to the table
    
}
function createTask(task, index) {
    return `
    <tr>
    <td> ${task.important}</td>
    <td> ${task.title}</td>
    <td> ${task.description}</td>
    <td> ${task.color}</td>
    <td>${task.startDate}</td>
    <td> ${task.dueDate}</td>
    <td> ${task.category}</td>
    <td><input type='button' value='Remove' onclick="removeUser(${index})" /></td>
    </tr>
    `;
}
function removeTask(index) {
    remove(index);
    let task=readUsers();
    displayUsers(task);

}



function init() {
    console.log("Task Manager");
    let task=readTask();
    displayTask(task);

    //load data
    
    
    //hook events
    $("#iImportant").click(toggleImportance);
    hideForm();
}

window.onload = init;