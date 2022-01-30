var skilname,file,category;
var id =1;

var ImgUrl;
var files=[];
var reader = new FileReader();

var d = new Date();
var t = d.getTime();
var counter = t;
var today = new Date();
var dat = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
function resetForm (){
    document.getElementById("category").value="";
    document.getElementById("name").value="";
    document.getElementById('files').value="";
}
document.getElementById("insert").onclick = function () {

    if (validate_category(category) == false || validate_name(skilname) == false || validate_file(file) == false) {
        //alert('title or body is Outta Line!!')
        return
    }
    const params = {
      category : document.getElementById("category").value,
      name : document.getElementById("name").value,
      image : document.getElementById('files').value
    }

    let url  = "https://mybrand-page.herokuapp.com/api/skill";
    const http = new XMLHttpRequest()
    http.open('POST',url)
    http.setRequestHeader('Content-type', 'application/json')
    http.send(JSON.stringify(params)) // Make sure to stringify
    http.onload = function() {
      resetForm();
      readBlog();
      alert(http.responseText);
    }
}
//-----------------retrieve------------------
function readBlog(){
  let url  = 'https://mybrand-page.herokuapp.com/api/skill';
  let xhr  = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.onload = function () {
  var post = JSON.parse(xhr.responseText);
  if (xhr.readyState == 4 && xhr.status == "200") {
    post.forEach(element => {
      const cat = element.category;
      console.log(cat);
      if(cat === 'BackEnd')
      {
      document.getElementById("backend").innerHTML+=`
          <li class="skil">
              <img  class="skil-img" src="${element.image}" alt="">
              <p>${element.name}</p>
          </li>
      `}
      if(cat === 'FrontEnd')
      {
      document.getElementById("nested").innerHTML+=`
          <li class="skil">
              <img  class="skil-img" src="${element.image}" alt="">
              <p>${element.name}</p>
          </li>
      `}
    })
  } else {
    console.error(post);
  }
}
xhr.send()
}



// Validate Functions
  
  function validate_category(category) {
    if(category ==="")
    {
      document.getElementById("catValid").style.display="none";
      document.getElementById("catError").innerHTML="category can't be empty";
      document.getElementById("catError").style.display="block";
      return false
    }
    else {
      document.getElementById("catError").style.display="none";
      document.getElementById("catValid").style.display="block";
        return true
    }
  }
  function validate_name(skilname) {
    if(skilname ==="")
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


