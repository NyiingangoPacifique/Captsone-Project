
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
function resetForm (){
  username = document.getElementById("username").value="";
  email = document.getElementById("mail").value="";
  message = document.getElementById("message").value="";
}
function readForm (){
  username = document.getElementById("username").value;
  email = document.getElementById("mail").value;
  message = document.getElementById("message").value;
}

const contactForm = document.querySelector('#myForm');

contactForm.addEventListener('submit', (e) => {
 e.preventDefault();

  readForm();
    if (validate_name(username) == false || validate_email(email) == false || validate_message(message) == false) {
      //alert('title or body is Outta Line!!')
      return
  }
  const params = {
    name : document.getElementById("username").value,
    email : document.getElementById("mail").value,
    message : document.getElementById('message').value
  }

  let url  = "https://mybrand-page.herokuapp.com/api/contact";
  const http = new XMLHttpRequest()
  http.open('POST',url)
  http.setRequestHeader('Content-type', 'application/json')
  http.send(JSON.stringify(params)) // Make sure to stringify
  http.onload = function() {
    //resetForm();
    alert(http.responseText);
  }
})
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