let myProjects = [];

const popUpForm = document.querySelector('#popUp');
const newProjectBtn = document.querySelector('#newProjectBtn');
newProjectBtn.addEventListener('click', () => popUpForm.style.display = 'block');

const closeBtn = document.getElementsByTagName('span')[0];
closeBtn.addEventListener('click', () => popUpForm.style.display = 'none');

const project_list = document.querySelector('#project-list');
const titleInput = document.querySelector("#title");
const dateInput = document.querySelector("#date");
let priorityValue;
const descriptionInput = document.querySelector("#description");

const checklist = document.querySelector("#checklist");
const checklistBtn = document.querySelector("#checklistBtn");
checklistBtn.addEventListener('click', addThings);

class Project {
  constructor(title, date, priority, description, things) {
    this.title = title;
    this.date = date;
    this.priority = priority;
    this.description = description;
    this.things = things;
  } 
}

function selectPriority() {
  const needs = document.querySelectorAll('input[name="priority"]');
  for (const need of needs) {
    if (need.checked) {
      priorityValue = need.value;
      break;
    }
  }
}

function addThings(e) {
  e.preventDefault();
  const checklistInput = document.querySelector("#checklistInput");

  if (checklistInput.value.length !== 0) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(`${checklistInput.value}`));
    checklist.appendChild(li);
    checklistInput.value = "";
  }
}

function showThings() {
  const lis = document.querySelectorAll("li");

  for (const li of lis) {
    document.createTextNode(li);
  }
}

function addProject() {
  const project = new Project (
    document.getElementById('title').value,
    document.getElementById('date').value,
    priorityValue, 
    document.getElementById('description').value,
    checklist
  );
  myProjects.push(project);
}

function showProject(){
 myProjects.forEach(function(item, index){
   let projectIndex = myProjects.length - 1;
   if (index == projectIndex) {
    let card = document.createElement("div");
    card.setAttribute("id", "card");
    card.className = "card";

    let theTitle = document.createElement("div");
    theTitle.textContent += (`Title: ${item.title}`);

    
    let theDate = document.createElement("div");
    theDate.textContent += (`Date: ${item.date}`);

    let thePriority = document.createElement("div");
    thePriority.textContent += (`Priority: ${item.priority}`);
    
    let theDescription = document.createElement("div");
    theDescription.textContent += (`${item.description}`);

    let theChecklist = document.createElement("div");
    //let checklistTitle = document.createElement("h5");
    //checklistTitle.textContent += "Things:"
    //theChecklist.appendChild(checklistTitle);
    showThings();
    theChecklist.textContent += (`${item.things}`);
    //console.log(item.things);

    const remove_btn = document.createElement("button");
    remove_btn.setAttribute('data-attribute', projectIndex);
    remove_btn.className = "button";
    remove_btn.textContent = "X";
    remove_btn.addEventListener('click', removeProject);

    const more_btn = document.createElement("button");
    more_btn.setAttribute('data-attribute', projectIndex);
    more_btn.className = "button";
    more_btn.textContent = "More";
    more_btn.addEventListener('click', getMoreInfo);

    card.appendChild(theTitle);
    card.appendChild(theDate);
    card.appendChild(thePriority);

    let br = document.createElement("br");
    card.appendChild(br);

    card.appendChild(theDescription);
    card.appendChild(theChecklist);
    card.appendChild(remove_btn);
    card.appendChild(more_btn);

    project_list.appendChild(card);
   }
 });
}

function removeProject(e) {
  e.target.parentElement.remove();
    myProjects.splice(e.target, 1);
}

function getMoreInfo(e) {
  // Code goes here
}

function submitProject() {
  if (titleInput.value.length !== 0 && descriptionInput.value.length !== 0 && (priorityValue !== undefined) && dateInput.value !== "" && checklist) {
    addProject();
    showProject();
    document.querySelector('form').reset();
    priorityValue = undefined;
  }
}

document.addEventListener('DOMContentLoaded', ()=> {
  document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault();
    selectPriority();
    submitProject();
  });
});