const toDoInput = document.querySelector("#toDoInput");
const addBtn = document.querySelector("#addBtn");
const toDoList = document.querySelector("#toDoList");

console.log(typeof addBtn);
addBtn.addEventListener("click", addToDos);


let toDos = [];

function mapToDos(element) {
  const items = toDos.map(toDo => `<li>${toDo}</li>`).join(' ');

  element.innerHTML += items;
}

function addToDos() {
  if (toDoInput.value == "") return;

  toDos.push(toDoInput.value);

  if (toDoList.innerHTML !== "") toDoList.innerHTML = "";

  mapToDos(toDoList);

  toDoInput.value = "";
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

  const divs = document.querySelector("#divs");

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

    let found = false;

    for (let i = 0; i < divs.length; i++) {
      if (divs[i].title == title && divs[i].date) {
        found = true;
        break;
      }
    }

    if (found) {
      found = false;
      alert("Cannot add repeat items");
      return;
    }

    const div = document.createElement("div");

    div.classList.add("div");

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

    divs.appendChild(div);

    itemAdded = true;

  }


  function addToLocalStorage() {
    let item = {};
    const key = "key";
    item[key] = itemId;
    const titleData = "title";
    item[titleData] = title;
    const dateData = "date";
    item[dateData] = date;
    const descriptionData = "description";
    item[descriptionData] = description;
    const priorityData = "priority";
    item[priorityData] = priorityValue;
    const toDosData = "toDos";
    item[toDosData] = toDoValues;
    localStorage.setItem(itemId, JSON.stringify(item));
  }

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
    addDiv: addDiv,
    addToLocalStorage: addToLocalStorage,
    cleanUp: cleanUp
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

  if (titleInput.value.length === 0 || descriptionInput.value.length === 0 || dateInput.value == '' || priorityValue == undefined || toDos == []) {
    alert("All inputs need to be filled in.");
    return;
  }

  let newItem = AddItem(titleInput.value, dateInput.value, descriptionInput.value, toDos);

  newItem.addDiv();

  if (!itemAdded) return;

  newItem.addToLocalStorage();
  newItem.cleanUp();
}
