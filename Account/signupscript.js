
let signupview = document.getElementById('signup-view'),
profileview = document.getElementById('profile-view'),
signuppic = document.getElementById('signup-pic'),
pic = document.getElementById('pic'),
img = document.getElementById('img');

var ImgUrl;

let file = {};

function chooseFile(e){
  file = e.target.files[0];
}

 //===========Create Account with profile picture ======================

 const signupForm = document.querySelector('#signup-form');

 signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('uname').value;
  const email = document.getElementById('email').value;
  const pwd = document.getElementById('pwd').value;
  const pic = document.getElementById('pic').value;

  if (validate_email(email) == false || validate_password(pwd) == false || validate_name(username) == false || validate_file(pic) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
  if (validate_field(username) == false ) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }
  const params = {
    name : document.getElementById('uname').value,
    email : document.getElementById('email').value,
    password : document.getElementById('pwd').value
  }

  let url  = "https://mybrand-page.herokuapp.com/api/user/register";
  const http = new XMLHttpRequest()
  http.open('POST',url)
  http.setRequestHeader('Content-type', 'application/json')
  http.send(JSON.stringify(params)) // Make sure to stringify
  http.onload = function() {
      document.getElementById("nameValid").style.display="none";
      document.getElementById("nameError").style.display="none";
      document.getElementById("emailValid").style.display="none";
      document.getElementById("emailError").style.display="none";
      document.getElementById("passwordValid").style.display="none";
      document.getElementById("passwordError").style.display="none";
      document.getElementById("fileValid").style.display="none";
      document.getElementById("fileError").style.display="none";
      //alert('User successfully Created');
      alert(http.responseText)
      signupForm.reset();
  }
 });

//=================================

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


function validate_name(username) {
  const usr = /^[a-zA-Z0-9]+$/;
  if (username === "") {
    document.getElementById("nameValid").style.display="none";
    document.getElementById("nameError").innerHTML="username is Empty";
    document.getElementById("nameError").style.display="block";
    return false
  } else {
    if (usr.test(username) == true) {
      document.getElementById("nameError").style.display="none";
      document.getElementById("nameValid").style.display="block";
      return true
    } else {
      document.getElementById("nameValid").style.display="none";
      document.getElementById("nameError").innerHTML="can't allow special character size <10 char";
      document.getElementById("nameError").style.display="block";
      return false
    }
  }
}
// Validate Functions
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
      document.getElemenresponseTexttById("emailError").innerHTML="No Uppercase allowed email format not correct";
      document.getElementById("emailError").style.display="block";
      return false
    }
  }
}

function validate_password(pwd) {
  const rex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if(pwd === ""){
    document.getElementById("passwordValid").style.display="none";
    document.getElementById("passwordError").innerHTML="password can't be Empty";
    document.getElementById("passwordError").style.display="block";
    return false
  }
  else {
      if (rex.test(pwd) == true) {
          document.getElementById("passwordError").style.display="none";
          document.getElementById("passwordValid").style.display="block";
        return true
      } else {
        document.getElementById("passwordValid").style.display="none";
        document.getElementById("passwordError").innerHTML="must contain Upper,Lower case, special character,number and limit 6";
        document.getElementById("passwordError").style.display="block";
        return false
      }
  }
}
function validate_file(pic) {
  if (pic === "") {
    document.getElementById("fileValid").style.display="none";
    document.getElementById("fileError").innerHTML="Image file can't be empty";
    document.getElementById("fileError").style.display="block";
    return false
  } else {
    document.getElementById("fileError").style.display="none";
    document.getElementById("fileValid").style.display="block";
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}