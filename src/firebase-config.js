// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyC8zi5G1fvi9NQwtFK_sj7vqKxH87tke90",
  authDomain: "todolist-77c13.firebaseapp.com",
  projectId: "todolist-77c13",
  storageBucket: "todolist-77c13.appspot.com",
  messagingSenderId: "864306495751",
  appId: "1:864306495751:web:74378ee5c6dd6cb13a85a2"
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}