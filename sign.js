import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
    import { getDatabase, ref, set, get, push, onValue, remove, orderByChild, query, update } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
    import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

    const firebaseConfig = {
      apiKey: "AIzaSyC7fCNZe8l-fGhhKsMF0JVcymh8uCv1zyI",
      authDomain: "lavender-app-eeeb0.firebaseapp.com",
      databaseURL: "https://lavender-app-eeeb0-default-rtdb.firebaseio.com",
      projectId: "lavender-app-eeeb0",
      storageBucket: "lavender-app-eeeb0.appspot.com",
      messagingSenderId: "666797584961",
      appId: "1:666797584961:web:8d9576c372d72fe0938cc0",
      measurementId: "G-ECZ1J6F0KK"
    };


    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const storage = getStorage(app);
    const auth = getAuth(app);


var usernameHolder = document.querySelector('#username');
var emailHolder = document.querySelector('#email');
var passwordHolder = document.querySelector('#passcode');
var signUpBtn = document.querySelector('#sign-btn');
var phonenumber = document.querySelector('#tellno');

signUpBtn.addEventListener('click', () => {
    var username = usernameHolder.value;
    var email = emailHolder.value;
    var password = passwordHolder.value;
    var telNo = phonenumber.value;
    if(username !== '' && email !== '' && password !== '' && telNo !== '') {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
          var userData = userCredential.user;
          var userRef = push(ref(db, 'users/'));
          set(userRef, {
            username: username,
            email: email,
            phonenumber: telNo,
            uid: userData.uid
          })
          .then(()=>{
            window.location.href = 'main.html';
          });
        });

    } else {
      alert('please fill all the fields.');
    }
});
