var title,bod,subject,file;
var id =1;

var ImgUrl;
var files=[];
var reader = new FileReader();

var d = new Date();
var t = d.getTime();
var counter = t;
var today = new Date();
var dat = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
function readForm (){
    title = document.getElementById("title").value;
    bod = document.getElementById("bod").value;
    subject = document.getElementById("subject").value;
    file1 = document.getElementById('files').value;
    console.log(title,bod,subject);
}
function resetForm (){
    title = document.getElementById("title").value="";
    bod = document.getElementById("bod").value="";
    subject = document.getElementById("subject").value="";
    file = document.getElementById('files').value="";
}
document.getElementById("insert").onclick = function () {
    readForm();
    console.log(counter);
    counter+=1;
    console.log(counter);
    console.log(dat);
      // Form fields, see IDs above
      const params = {
        title : document.getElementById("title").value,
        body : document.getElementById("bod").value,
        subject : document.getElementById("subject").value,
        image : document.getElementById('files').value,
      }

      let url  = "https://mybrand-page.herokuapp.com/api/post";
      const http = new XMLHttpRequest()
      http.open('POST',url)
      http.setRequestHeader('Content-type', 'application/json')
      http.send(JSON.stringify(params)) // Make sure to stringify
      http.onload = function() {
          // Do whatever with response
          //alert(http.responseText)
          resetForm();
          document.getElementById("cardSection").innerHTML="";
          readBlog();
          document.getElementById("titleError").style.display="none";
          document.getElementById("titleValid").style.display="none";
          document.getElementById("bodyError").style.display="none";
          document.getElementById("bodyValid").style.display="none";
          document.getElementById("subjectError").style.display="none";
          document.getElementById("subjectValid").style.display="none";
          document.getElementById("fileError").style.display="none";
          document.getElementById("fileValid").style.display="none";
          alert(http.responseText);
      }

      
    }





// Validate Functions
function validate_title(title) {
    if(title ==="")
    {
      document.getElementById("titleValid").style.display="none";
      document.getElementById("titleError").innerHTML="title can't be empty";
      document.getElementById("titleError").style.display="block";
      return false
    }
    else {
      document.getElementById("titleError").style.display="none";
      document.getElementById("titleValid").style.display="block";
        return true
    }
  }
  
  function validate_body(bod) {
    if(bod ==="")
    {
      document.getElementById("bodyValid").style.display="none";
      document.getElementById("bodyError").innerHTML="body can't be empty";
      document.getElementById("bodyError").style.display="block";
      return false
    }
    else {
      document.getElementById("bodyError").style.display="none";
      document.getElementById("bodyValid").style.display="block";
        return true
    }
  }
  function validate_subject(subject) {
    if(subject ==="")
    {
      document.getElementById("subjectValid").style.display="none";
      document.getElementById("subjectError").innerHTML="subject can't be empty";
      document.getElementById("subjectError").style.display="block";
      return false
    }
    else {
      document.getElementById("subjectError").style.display="none";
      document.getElementById("subjectValid").style.display="block";
        return true
    }
  }
  function validate_file(file) {
    if(file ==="")
    {
      document.getElementById("fileValid").style.display="none";
      document.getElementById("fileError").innerHTML="image can't be empty";
      document.getElementById("fileError").style.display="block";
      return false
    }
    else {
      document.getElementById("fileError").style.display="none";
      document.getElementById("fileValid").style.display="block";
        return true
    }
  }

