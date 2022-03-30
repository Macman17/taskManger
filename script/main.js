var importanceIcon =  "fas fa-star";
var nonImportanceIcon =  "far fa-star";
var isImportance = true;
var isPanelVisible = true;

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



function init() {
    console.log("Task Manager");

    //load data
    
    //hook events
    $("#iImportant").click(toggleImportance);
    hideForm();
}

window.onload = init;