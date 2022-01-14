
  const firebaseConfig = {
    apiKey: "AIzaSyC_i2VXKQkJCJWAqvnDGwH2XOe-fVpEvdU",
    authDomain: "test-javascript-20767.firebaseapp.com",
    databaseURL: "https://test-javascript-20767-default-rtdb.firebaseio.com",
    projectId: "test-javascript-20767",
    storageBucket: "test-javascript-20767.appspot.com",
    messagingSenderId: "632324638241",
    appId: "1:632324638241:web:b4db0c778e14645d5a4560",
    measurementId: "${config.measurementId}"
  };
  firebase.initializeApp(firebaseConfig);
  const auth =firebase.auth();
  app_firebase = firebase;

