export default function showWebsite() {
 const content = document.getElementById("content");
 console.log(document.getElementById("content"));
 content.appendChild(showMain());
 const main = document.getElementById("main");
 main.textContent = "";
 main.appendChild(showForm());
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