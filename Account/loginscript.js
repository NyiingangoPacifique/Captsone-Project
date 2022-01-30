
 //===========login ======================
 
 let img = document.getElementById('img');


 let file = {};
 function chooseFile(e){
   file = e.target.files[0];
 }
 const loginForm = document.querySelector('#login-form');
 /*loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user info
  var email =  document.getElementById('emaill').value;
   var password= document.getElementById('passwordl').value;

   if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
  }
  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    console.log(auth);
    loginForm.reset();
}).catch(error => {
      document.getElementById("emailValid").style.display="none";
      document.getElementById("emailError").innerHTML=error.message;
      document.getElementById("emailError").style.display="block";
  alert(error.message);
})

});*/

 /*loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user info
  var email =  document.getElementById('emaill').value;
   var password= document.getElementById('passwordl').value;

   if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
  }
  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    console.log(auth);
    loginForm.reset();
}).catch(error => {
      document.getElementById("emailValid").style.display="none";
      document.getElementById("emailError").innerHTML=error.message;
      document.getElementById("emailError").style.display="block";
  alert(error.message);
})

});*/

 loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user info
  var email =  document.getElementById('emaill').value;
   var password= document.getElementById('passwordl').value;

   if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
  }

  // log the user in
    const params = {
      email : document.getElementById('emaill').value,
      password : document.getElementById('passwordl').value
    }

    let url  = "https://mybrand-page.herokuapp.com/api/user/login";
    const http = new XMLHttpRequest()
    http.open('POST',url)
    http.setRequestHeader('Content-type', 'application/json')
    http.send(JSON.stringify(params)) // Make sure to stringify
    http.onload = function() {
    alert(http.responseText)
    loginForm.reset();
    document.getElementById('log-pic').style.display="none"
    document.getElementById('user-div').style.display="block";
    document.getElementById('login-div').style.display="none";
    document.getElementById('in').style.display="none";
    document.getElementById('up').style.display="none";
    document.getElementById('out').style.display="block";
    }
});


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
      document.getElementById("emailError").innerHTML="No Uppercase allowed email format not correct";
      document.getElementById("emailError").style.display="block";
      return false
    }
  }
}

function validate_password(password) {
  const rex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if(password === ""){
    document.getElementById("passwordValid").style.display="none";
    document.getElementById("passwordError").innerHTML="password can't be Empty";
    document.getElementById("passwordError").style.display="block";
    return false
  }
  else {
      if (rex.test(password) == true) {
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
