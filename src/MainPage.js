// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { getFirebaseConfig } from "./firebase-config";

async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

function signOutUser() {
  // Sign out of Firebase.
  signOut(getAuth());
}

// Initiate firebase auth
function initFirebaseAuth() {
  // Subscribe to the user's signed-in status
  onAuthStateChanged(getAuth(), authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  // Return the user's profile pic URL.
  return getAuth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
  // Return the user's display name.
  return getAuth().currentUser.displayName;
}

// Returns true if a user is signed-in.
// function isUserSignedIn() {
//   // Return true if a user is signed-in.
//   return !!getAuth().currentUser;
// }

// Returns true if user is signed-in. Otherwise false and displays a message.
// function checkSignedInWithMessage() {
//   // Return true if the user is signed in Firebase
//   if (isUserSignedIn()) {
//     return true;
//   }

//   // Display a message to the user using a Toast.
//   var data = {
//     message: 'You must sign-in first',
//     timeout: 2000,
//   };
//   signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
//   return false;
// }

// Shortcuts to DOM Elements:
let userPicElement = document.getElementById('user-pic');
let userNameElement = document.getElementById('user-name');
let signInButtonElement = document.getElementById('sign-in');
let signOutButtonElement = document.getElementById('sign-out');
signOutButtonElement.addEventListener('click', signOutUser);
signInButtonElement.addEventListener('click', signIn);
// let signInSnackbarElement = document.getElementById('must-signin-snackbar');

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();

    // Set the user's profile pic and name.
    userPicElement.style.backgroundImage =
      'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    userNameElement.textContent = userName;

    // Show user's profile and sign-out button.
    userNameElement.removeAttribute('hidden');
    userPicElement.removeAttribute('hidden');
    signOutButtonElement.removeAttribute('hidden');

    // Hide sign-in button.
    signInButtonElement.setAttribute('hidden', 'true');

    // We save the Firebase Messaging Device token and enable notifications.
    saveMessagingDeviceToken();
  } else {
    // User is signed out!
    // Hide user's profile and sign-out button.
    userNameElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');

    // Show sign-in button.
    signInButtonElement.removeAttribute('hidden');
  }
}

import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Saves the messaging device token to Cloud Firestore.
async function saveMessagingDeviceToken() {
  // Save the device token in Cloud Firestore
  try {
    const currentToken = await getToken(getMessaging());
    if (currentToken) {
      console.log('Got FCM device token:', currentToken);
      // Saving the Device Token to Cloud Firestore.
      const tokenRef = doc(getFirestore(), 'fcmTokens', currentToken);
      await setDoc(tokenRef, { uid: getAuth().currentUser.uid });

      // This will fire when a message is received while the app is in the foreground.
      // When the app is in the background, firebase-messaging-sw.js will receive the message instead.
      onMessage(getMessaging(), (message) => {
        console.log(
          'New foreground notification from Firebase Messaging!',
          message.notification
        );
      });
    } else {
      // Need to request permissions to show notifications.
      requestNotificationsPermissions();
    }
  } catch(error) {
    console.error('Unable to get messaging token.', error);
  }
}

// Requests permissions to show notifications.
async function requestNotificationsPermissions() {
  // Request permissions to send notifications.
  console.log('Requesting notifications permission...');
  const permission = await Notification.requestPermission();
  
  if (permission === 'granted') {
    console.log('Notification permission granted.');
    // Notification permission granted.
    await saveMessagingDeviceToken();
  } else {
    console.log('Unable to get permission to notify.');
  }
}

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

// Initialize Firebase
const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
initFirebaseAuth();

export default function showWebsite() {
 const content = document.getElementById("content");
 content.appendChild(showMain());
 const main = document.getElementById("main");
 main.textContent = "";
 main.appendChild(showSignIn());
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
    mapToDos(toDos, toDoList);
    toDoInput.value = "";
  }

  let toDos = [];

  function mapToDos(tasks, element) {
    const items = tasks.map(task => `<li>${task}</li>`).join(' ');
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
  let items = [];

  const AddItem = (title, date, description) => {

    const toDoDivs = document.querySelector("#toDoDivs");

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

    function addItem() {
     let found = false;
     for (let i = 0; i < items.length; i++) {
      if (items[i].title == title && items[i].date == date) {
       found = true;
       break;
      }
     }
     if (found) {
      found = false;
      alert("Cannot add repeat items");
      return;
     }
     let item = [];
     const itemTitle = "title";
     item[itemTitle] = title;
     const itemDate = "date";
     item[itemDate] = date;
     const itemDescription = "description";
     item[itemDescription] = description;
     const itemPriority = "priority";
     item[itemPriority] = priorityValue;
     const itemToDos = "toDos";
     item[itemToDos] = toDos;
     items.push(item);
     mapToDoDivs();
     itemAdded = true;
    }

    
    function mapToDoDivs() {
     toDoDivs.innerHTML = "";
     items.map(item => {
      const div = document.createElement("div");
      div.classList.add("toDoDiv");
  
      let theTitle = document.createElement("div");
      theTitle.textContent = (`Title: ${item.title}`);
  
      let theDate = document.createElement("div");
      theDate.textContent = (`Date: ${item.date}`);
  
      let thePriority = document.createElement("div");
      thePriority.textContent = (`Priority: ${item.priority}`);
  
      let theDescription = document.createElement("div");
      theDescription.textContent = (`${item.description}`);
  
      div.appendChild(theTitle);
      div.appendChild(theDate);
      div.appendChild(thePriority);
      div.appendChild(theDescription);

      mapToDos(item.toDos, div);
      toDoDivs.appendChild(div);
     });
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
       document.querySelector('form').reset();
       title = "";
       date = "";
       description = "";
       priorityValue = undefined;
       toDoList.innerHTML = "";
       toDos = [];
       itemAdded = false;
       console.log(items);
    }

    return { addItem, cleanUp }
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
     let newItem = AddItem(titleInput.value, dateInput.value, descriptionInput.value);
     newItem.addItem();
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

function showSignIn() {
  const user_container = document.createElement("div");
  user_container.setAttribute("id", "user-container");

  const user_pic = document.createElement("div");
  user_pic.setAttribute("hidden", true);
  user_pic.setAttribute("id", "user-pic");
  user_container.appendChild(user_pic);

  const user_name = document.createElement("div");
  user_name.setAttribute("hidden", true);
  user_name.setAttribute("id", "user-name");
  user_container.appendChild(user_name);

  const signOutBtn = document.createElement("button");
  signOutBtn.setAttribute("hidden", true);
  signOutBtn.setAttribute("id", "sign-out");
  signOutBtn.setAttribute("class", "mdl-button");
  signOutBtn.setAttribute("class", "mdl-js-button");
  signOutBtn.setAttribute("class", "mdl-js-ripple-effect");
  signOutBtn.setAttribute("class", "mdl-color-text--white");
  signOutBtn.textContent = "Sign-out";
  user_container.appendChild(signOutBtn);

  const signInBtn = document.createElement("button");
  signInBtn.setAttribute("id", "sign-in");
  signInBtn.setAttribute("class", "mdl-button");
  signInBtn.setAttribute("class", "mdl-js-button");
  signInBtn.setAttribute("class", "mdl-js-ripple-effect");
  signInBtn.setAttribute("class", "mdl-color-text--white");
  signInBtn.textContent = "Sign-in with Google";
  user_container.appendChild(signInBtn);

  return user_container;
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