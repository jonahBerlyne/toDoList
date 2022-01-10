// import runFunctionality from "./ToDos";

export default function showWebsite() {
 const content = document.getElementById("content");
 content.appendChild(showMain());
 const main = document.getElementById("main");
 main.textContent = "";
 main.appendChild(showForm());
 runToDos();
}

function runToDos() {
  const toDoInput = document.querySelector("#toDoInput");
  const toDoList = document.querySelector("#toDoList");
  const addBtn = document.querySelector("#addBtn");
  addBtn.addEventListener("click", addToDos);

  function addToDos() {
    if (toDoInput.value == "") return;

    if (toDos.includes(toDoInput.value)) {
     alert("You can't add duplicate items.");
     return;
    }

    toDos.push(toDoInput.value);

    if (toDoList.innerHTML !== "") toDoList.innerHTML = "";

    mapToDos(toDoList);

    toDoInput.value = "";
    console.log(toDos);
  }

  let toDos = [];

  function mapToDos(element) {
    const items = toDos.map(toDo => `<li>${toDo}</li>`).join(' ');

    element.innerHTML += items;
  }

  let priorityValue;

  function selectPriority() {
    const needs = document.querySelectorAll('input[name="priority"]');
     for (const need of needs) {
      if (need.checked) {
        priorityValue = need.value;
        break;
      }
     }
  }

   let itemAdded = false;

   const AddItem = (title, date, description, toDoValues) => {

    const toDoDivs = document.querySelector("#divs");

    function makeId() {
       let result = '';
       let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
       let charactersLength = characters.length;
       for (let i = 0; i < 15; i++) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    }

    let itemId = makeId();

    function addDiv() {

       // let found = false;

       // for (let i = 0; i < toDoDivs.length; i++) {
       //   if (toDoDivs[i].title == title && toDoDivs[i].date) {
       //     found = true;
       //     break;
       //   }
       // }

       // if (found) {
       //   found = false;
       //   alert("Cannot add repeat items");
       //   return;
       // }

       const div = document.createElement("div");

       div.classList.add("toDoDiv");

       let theTitle = document.createElement("div");
       theTitle.textContent = (`Title: ${title}`);

       let theDate = document.createElement("div");
       theDate.textContent = (`Date: ${date}`);

       let thePriority = document.createElement("div");
       thePriority.textContent = (`Priority: ${priorityValue}`);

       let theDescription = document.createElement("div");
       theDescription.textContent = (`${description}`);

       div.appendChild(theTitle);
       div.appendChild(theDate);
       div.appendChild(thePriority);
       div.appendChild(theDescription);

       mapToDos(div);

       toDoDivs.appendChild(div);

       itemAdded = true;

    }


     // function addToLocalStorage() {
     //   let item = {};
     //   const key = "key";
     //   item[key] = itemId;
     //   const titleData = "title";
     //   item[titleData] = title;
     //   const dateData = "date";
     //   item[dateData] = date;
     //   const descriptionData = "description";
     //   item[descriptionData] = description;
     //   const priorityData = "priority";
     //   item[priorityData] = priorityValue;
     //   const toDosData = "toDos";
     //   item[toDosData] = toDoValues;
     //   localStorage.setItem(itemId, JSON.stringify(item));
     // }

    function cleanUp() {
       title = "";
       date = "";
       description = "";
       priorityValue = undefined;
       toDoList.innerHTML = "";
       toDoValues = [];
       itemAdded = false;
    }

    return {
       addDiv,
       cleanUp
    }
   }

   const titleInput = document.querySelector("#title");
   const dateInput = document.querySelector("#date");
   const descriptionInput = document.querySelector("#description");
   const submitBtn = document.querySelector("#submitBtn");
   submitBtn.addEventListener("click", submitItem);

   function submitItem(e) {
     e.preventDefault();

     selectPriority();

     if (titleInput.value.length === 0 || descriptionInput.value.length === 0 || dateInput.value == '' || priorityValue == undefined || toDos.length === 0) {
       alert("All inputs need to be filled in.");
       return;
     }

     let newItem = AddItem(titleInput.value, dateInput.value, descriptionInput.value, toDos);

     newItem.addDiv();

     if (!itemAdded) return;

     // newItem.addToLocalStorage();
     newItem.cleanUp();
   }
}

function showMain() {
 const main = document.createElement("main");
 main.setAttribute("id", "main");
 return main;
}

function showForm() {
 const formDiv = document.createElement("div");

 const form = document.createElement("form");
 
 const titleLabel = document.createElement("label");
 titleLabel.textContent = "Title: ";
 form.appendChild(titleLabel);
 
 const titleInput = document.createElement("input");
 titleInput.setAttribute("type", "text");
 titleInput.setAttribute("name", "title");
 titleInput.setAttribute("id", "title");
 form.appendChild(titleInput);

 const br1 = document.createElement("br");
 form.appendChild(br1);

 const dateLabel = document.createElement("label");
 dateLabel.textContent = "Date: ";
 form.appendChild(dateLabel);

 const dateInput = document.createElement("input");
 dateInput.setAttribute("type", "date");
 dateInput.setAttribute("name", "date");
 dateInput.setAttribute("id", "date");
 form.appendChild(dateInput);

 const br2 = document.createElement("br");
 form.appendChild(br2);

 const priorityLabel = document.createElement("label");
 priorityLabel.textContent = "Priority: ";
 form.appendChild(priorityLabel);

 const urgentInput = document.createElement("input");
 urgentInput.setAttribute("type", "radio");
 urgentInput.setAttribute("name", "priority");
 urgentInput.setAttribute("id", "priority");
 urgentInput.setAttribute("value", "Urgent");
 form.appendChild(urgentInput);

 const urgentLabel = document.createElement("label");
 urgentLabel.textContent = "Urgent";
 form.appendChild(urgentLabel);

 const smallInput = document.createElement("input");
 smallInput.setAttribute("type", "radio");
 smallInput.setAttribute("name", "priority");
 smallInput.setAttribute("id", "priority");
 smallInput.setAttribute("value", "Small");
 form.appendChild(smallInput);

 const smallLabel = document.createElement("label");
 smallLabel.textContent = "Small";
 form.appendChild(smallLabel);

 const br3 = document.createElement("br");
 form.appendChild(br3);

 const br4 = document.createElement("br");
 form.appendChild(br4);

 const descriptionLabel = document.createElement("label");
 descriptionLabel.textContent = "Description:";
 form.appendChild(descriptionLabel);

 const br5 = document.createElement("br");
 form.appendChild(br5);

 const descriptionArea = document.createElement("textarea");
 descriptionArea.setAttribute("name", "description");
 descriptionArea.setAttribute("id", "description");
 descriptionArea.setAttribute("cols", "30");
 descriptionArea.setAttribute("rows", "10");
 form.appendChild(descriptionArea);

 const br6 = document.createElement("br");
 form.appendChild(br6);

 const br7 = document.createElement("br");
 form.appendChild(br7);

 const toDoLabel = document.createElement("label");
 toDoLabel.textContent = "To Dos: "
 form.appendChild(toDoLabel);

 const toDoInput = document.createElement("input");
 toDoInput.setAttribute("type", "text");
 toDoInput.setAttribute("id", "toDoInput");
 form.appendChild(toDoInput);

 const addBtn = document.createElement("button");
 addBtn.setAttribute("type", "button");
 addBtn.setAttribute("id", "addBtn");
 addBtn.textContent = "+";
 form.appendChild(addBtn);

 const submitBtn = document.createElement("button");
 submitBtn.setAttribute("type", "submit");
 submitBtn.setAttribute("id", "submitBtn");
 submitBtn.textContent = "Submit";
 form.appendChild(submitBtn);

 formDiv.appendChild(form);

 const toDoList = document.createElement("ul");
 toDoList.setAttribute("id", "toDoList");
 formDiv.appendChild(toDoList);

 const toDoDivs = document.createElement("div");
 toDoDivs.setAttribute("id", "toDoDivs");
 toDoDivs.setAttribute("class", "toDoDivs");
 formDiv.appendChild(toDoDivs);

 return formDiv;
}