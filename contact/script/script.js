var firebaseConfig = {
  apiKey: "AIzaSyC_i2VXKQkJCJWAqvnDGwH2XOe-fVpEvdU",
  authDomain: "test-javascript-20767.firebaseapp.com",
  databaseURL: "https://test-javascript-20767-default-rtdb.firebaseio.com",
  projectId: "test-javascript-20767",
  storageBucket: "test-javascript-20767.appspot.com",
  messagingSenderId: "632324638241",
  appId: "1:632324638241:web:b4db0c778e14645d5a4560",
  measurementId: "${config.measurementId}"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()


//------ modal==================
window.onload = function() {
    document.getElementById("myDIV").style.display = 'block';
    document.getElementById("myEmail").style.display = 'none';
    document.getElementById("nameError").style.display="none";
    document.getElementById("nameValid").style.display="none";
  };
  function myFunction() {
    var x = document.getElementById("myDIV");
    var y =document.getElementById("myEmail");
    if (x.style.display === "none") {
      x.style.display = "block";
     y.style.display= "none";
   }
   else if (y.style.display=== "none") {
       y.style.display= "block";
       y.style.backgroundColor = "#0768C1";
       x.style.display= "none";
   }
    else {
      y.style.display = "none";
    }
  }


  var name,email,message;
var d = new Date();
var t = d.getTime();
var counter = t;
var today = new Date();
var dat = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
function readForm (){
    username = document.getElementById("username").value;
    email = document.getElementById("mail").value;
    message = document.getElementById("message").value;
    console.log(username,email,message);
}
function resetForm (){
  username = document.getElementById("username").value="";
  email = document.getElementById("mail").value="";
  message = document.getElementById("message").value="";
}
document.getElementById("sendBtn").onclick = function () {
    readForm();
    console.log(counter);
    counter+=1;
    console.log(counter);
    console.log(dat);
    if (validate_name(username) == false || validate_email(email) == false || validate_message(message) == false) {
      //alert('title or body is Outta Line!!')
      return
  }
    /*firebase.database().ref('Comments/'+counter).set({
                    id:counter,
                    name:username,
                    email:email,
                    message: message,
                    date: dat

                });
                resetForm();
                alert('Comment added');*/
                var database_ref = database.ref()
  
                // Create User data
                var user_data = {
                  id:counter,
                    name:username,
                    email:email,
                    message: message,
                    date: dat
                }
            
                // Push to Firebase Database
                database_ref.child('Contact/' + counter).set(user_data)
                resetForm();
                alert('Message sent');
}
/*function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}*/

function validate_email(email) {
  const regx=/^[a-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/;
  if(email ==="")
  {
    document.getElementById("emailValid").style.display="none";
    document.getElementById("emailError").innerHTML="email can't be empty";
    document.getElementById("emailError").style.display="block";
    return false
  }
  else {
    if (regx.test(email) == true) {
      document.getElementById("emailError").style.display="none";
      document.getElementById("emailValid").style.display="block";
      return true
    } else {
      document.getElementById("emailValid").style.display="none";
      document.getElementById("emailError").innerHTML="No Uppercase allowed email format not correct";
      document.getElementById("emailError").style.display="block";
      return false
    }
  }
}
function validate_name(username) {
  if(username ==="")
  {
    document.getElementById("nameValid").style.display="none";
    document.getElementById("nameError").innerHTML="name can't be empty";
    document.getElementById("nameError").style.display="block";
    return false
  }
  else {
    document.getElementById("nameError").style.display="none";
    document.getElementById("nameValid").style.display="block";
      return true
  }
}
function validate_message(message) {
  if(message ==="")
  {
    document.getElementById("messageValid").style.display="none";
    document.getElementById("messageError").innerHTML="message can't be empty";
    document.getElementById("messageError").style.display="block";
    return false
  }
  else {
    document.getElementById("messageError").style.display="none";
    document.getElementById("messageValid").style.display="block";
      return true
  }
}