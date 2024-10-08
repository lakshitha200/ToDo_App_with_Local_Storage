const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// dates
var today = new Date().toISOString().split('T')[0];
document.getElementById("exprieDate").setAttribute('min',today);
var expire = document.getElementById("exprieDate");


//===== addTask() function you need to provide add Task btn using click event=====
function addTask(){
    //check is there a value in the inputbox
    // ***if value is empty give alert***
    if(inputBox.value == ""){
        alert("You should enter task.")
    }else if(expire.value == ""){
        alert("You should enter expire date.")
    }
    else{
    //***if there a value in inputbox do these things

        // 1- create li tag when add new task clicking the btn
        let li = document.createElement('li');
        listContainer.appendChild(li);

        // 2 - inside the li, I am making two div tags.
        let textDiv = document.createElement('div'); //to store task and close image buton
        let dateDiv = document.createElement('div'); //to store start and end dates
        textDiv.classList.add("tasks"); // i added a class to first div
        dateDiv.classList.add("dates"); // i added a class to second div
        li.appendChild(textDiv);
        li.appendChild(dateDiv);

        // 3 -add task value into this first div tag (textDiv)
        let span = document.createElement('span'); //create span 
        span.innerHTML = inputBox.value; //add task value to span
        textDiv.appendChild(span); //add to first div
        
        //as well as we need to add image (close img) to close task inside the first div
        let img = document.createElement('img');
        img.src = "img/notcheck.png";
        img.classList.add("close"); //some css style add using class
        textDiv.appendChild(img); 

        // 4 - add start date and expire date to second div (dateDiv)
        let startDate = document.createElement('span');
        startDate.innerText = "Start: "+ today;
        let expireDate = document.createElement('span'); 
        expireDate.innerHTML = `Expire: ${expire.value} <i class="fa-solid fa-pen-to-square" onclick="expireDateChange(this)"></i>`;
        dateDiv.appendChild(startDate); 
        dateDiv.appendChild(expireDate); 

    }

    //::::after adding task inputbox should be empty:::
    inputBox.value = "";
    expire.value = "";

    //::::need to call saveData method to store these task in Local Storage
    saveData();
}
//--------------------------------------------------------------------------

//===== when click listcontainer =======

listContainer.addEventListener('click',(e)=>{
  
    //when you click the task in the container, it mark as checked.
    // also you can uncheck
    if(e.target.tagName == 'LI' || e.target.tagName == 'DIV' ){
        e.target.classList.toggle("checked"); 
        //that changes shoud be saved in the local storage
        saveData();
    }

    //when you click the close btn, task should be removed from the container
    else if(e.target.tagName === 'IMG'){
        e.target.parentElement.parentElement.remove();
        //that changes shoud be saved in the local storage
        saveData();
    }
    
})
//------------------------------------------------------------------------
//=====this function is used to save data in local storage.=====
function saveData(){
    //this is the medthod signature ==> localStorage.setItem(key, value)
    localStorage.setItem("data",listContainer.innerHTML);
}

//-----------------------------------------------------------------------
//====this function is used to get data from local storage.===
function showList(){
      //this is the medthod signature ==> localStorage.getItem(key);
      //that data you need to set to listCOntainer. Then you can see your works
    listContainer.innerHTML = localStorage.getItem("data");
}

//you need to call to it
showList();

const dateChangeBox = document.getElementById("dateChange-box");
const dark = document.getElementById("dark");
const expireDateBox = document.getElementById("expireDate-box");
document.getElementById("expireDate-box").setAttribute('min',today);

var currentLi;
var liList;
var liArray;
var index;
var newExpireDate;

function expireDateChange(element){
    this.currentLi = element.parentElement.parentElement.parentElement;
    this.liList = element.parentElement.parentElement.parentElement.parentElement.children;
    this.liArray = Array.from(liList);
    console.log(this.liArray)
    for(let i=0;i< this.liArray.length;i++){
        if( this.liArray[i]==this.currentLi){
            this.index = i;
            break;
        }
    }
    dateChangeBox.style.display = "block";
    dark.style.display = "block";
    if (element && element.parentElement) {
        const expireDateText = element.parentElement.textContent.replace('Expire: ', '').trim();
        expireDateBox.value = expireDateText;
        this.newExpireDate = expireDateBox.value;
    } else {
        console.error("Element or parentElement is not defined");
    }
    // console.log(localStorage.getItem("data"));
};

function setExpireDate(){
   
    // this.currentLi.c.removeChild(list.children[0]);
    this.currentLi.lastChild.lastChild.innerHTML = `Expire: ${expireDateBox.value} <i class="fa-solid fa-pen-to-square" onclick="expireDateChange(this)"></i>`;
    console.log(this.currentLi.lastChild.lastChild)

    this.liArray.splice(this.index,1,this.currentLi)
    console.log(currentLi)
    currentLi.classList.remove("red")
    listContainer.replaceChild(currentLi,listContainer.children[this.index]);
    localStorage.setItem("data",listContainer.innerHTML);
    closeWindow();
}

function closeWindow(){
    dateChangeBox.style.display = "none";
    dark.style.display = "none";
};



function changeColourIfExpired(){
    let li = listContainer.children;

    for(let i=0;i< li.length;i++){
        const expireDateText = listContainer.children[i].lastChild.lastChild.textContent.replace('Expire: ', '').trim();
        if(expireDateText < today){
            console.log(li[i])
            li[i].classList.add("red")
        }
        
    }
}

changeColourIfExpired();
