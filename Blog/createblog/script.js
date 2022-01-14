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
    file1 = document.getElementById('files').files[0];
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

    let storageRef = firebase.storage().ref('Images');
    let file = document.getElementById('files').files[0];
    console.log(file);

    let thisRef = storageRef.child(file.name);
    if (validate_title(title) == false || validate_body(bod) == false || validate_subject(subject) == false || validate_file(file) == false) {
        //alert('title or body is Outta Line!!')
        return
      }
    thisRef.put(file).then(res=> {
        console.log('upload success');
        console.log(thisRef);
        //alert("upload success");
    }).catch(e=> {
        console.log('Error'+e);
    })
    storageRef.child(file.name).getDownloadURL().then(url=> {
        console.log(url)
    
                firebase.database().ref('Blog/'+counter).set({
                    id:counter,
                    link:url,
                    title:title,
                    bod: bod,
                    date: dat,
                    subject: subject,

                });
                resetForm();
                document.getElementById("titleError").style.display="none";
                document.getElementById("titleValid").style.display="none";
                document.getElementById("bodyError").style.display="none";
                document.getElementById("bodyValid").style.display="none";
                document.getElementById("subjectError").style.display="none";
                document.getElementById("subjectValid").style.display="none";
                document.getElementById("fileError").style.display="none";
                document.getElementById("fileValid").style.display="none";
                alert('BLog added');

            }).catch(e=> {
                console.log(e)});
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

