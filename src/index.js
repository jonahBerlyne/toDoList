let myProjects = [];

const popUpForm = document.querySelector('#popUp');
const newProjectBtn = document.querySelector('#newProjectBtn');
newProjectBtn.addEventListener('click', () => popUpForm.style.display = 'block');

const closeBtn = document.getElementsByTagName('span')[0];
closeBtn.addEventListener('click', () => popUpForm.style.display = 'none');

const project_list = document.querySelector('#project-list');
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const dateInput = document.querySelector("#date");

class Project {
  constructor(title, author, date) {
    this.title = title;
    this.author = author;
    this.date = date;
  } 
}

function addProject() {
  const project = new Project (
    document.getElementById('title').value,
    document.getElementById('author').value,
    document.getElementById('date').value 
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

    let theAuthor = document.createElement("div");
    theAuthor.textContent += (`Author: ${item.author}`);

    let theDate = document.createElement("div");
    theDate.textContent += (`Date: ${item.date}`);

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
    card.appendChild(theAuthor);
    card.appendChild(theDate);
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
  if (titleInput.value.length !== 0 && authorInput.value.length !== 0 && dateInput.value !== "") {
    addProject();
    showProject();
    document.querySelector('form').reset();
  }
}

document.addEventListener('DOMContentLoaded', ()=> {
  document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault();
    submitProject();
  });
});