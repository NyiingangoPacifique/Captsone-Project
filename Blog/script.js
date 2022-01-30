
function readBlog(){
    let url  = "https://mybrand-page.herokuapp.com/api/post";
    let xhr  = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = function () {
	var post = JSON.parse(xhr.responseText);
	if (xhr.readyState == 4 && xhr.status == "200") {
        post.forEach(element => {
        console.log(id);
            document.getElementById("cardSection").innerHTML+=`
        <ul id=list>
            <li id="list-item">
                <div class="col">
                    <div class="col1">
                        <img src="${element.image}" class="img" alt="blog">
                    </div>
                    <div class="col1">
                        <div class="blog-text">
                            <p style="display:none">${element._id}</p>
                            <h2>${element.title}</h2>
                            <p class="marg">${element.body}</p>
                            <p class="marg" id="subj" style="display:none;">${element.subject}</p>
                            <div id="comment-section">
                               <textarea id="adcomment" style="background-color: #a7adb3;"></textarea>
                               <div>
                                    <p class="errors" id="comError">Error with comment</p>
                                    <p class="valid" id="comValid">valid</p>
                               </div>
                               <button onclick="add('${element._id}')"><i class="fas fa-plus-circle">add comment</i></button>
                            </div>
                            <div id="${element._id}">
                            </div>
                            <p class="marg" style="font-size:10px;">created on ${element.date}</p>
                            <button type="submit" id"readBtn" class="p-btn" onclick="readMore('${element._id}')"
                             style="color:blue;"><i class="fab fa-readme">Read more</i></button>
                            <button id="editBtn" style="color:green;" class="BtnEdit p-btn" 
                            onclick="editBlog('${element._id}','${element.title}','${element.body}','${element.subject}','${element.image}')">
                            <i class="fas fa-edit">Edit</i></button>
                            <button type="submit" id="del" onclick="DeleteBlog('${element._id}')" class="p-btn" style="padding:5px; color:red;">
                            <i class="fas fa-trash">Delete</i></button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        `
        });
	} else {
		console.error(post);
	}
}
xhr.send()
}function add(id){
  com = document.getElementById("adcomment").value;
  console.log(com);
  if (validate_comment(com) == false) {
      alert('comment Empty');
      return
    }
  counter+=1;
  firebase.database().ref('Commnets/'+id+'/'+counter).set({
      id:counter,
      comment:com

  });
  document.getElementById("adcomment").value="";
  alert('Comment added');
}


function readMore(id){

    //const idn = '61f3c95346dbecc40a69dbcd';
    document.getElementById("cardSection").style.display="none";
    let url  = 'https://mybrand-page.herokuapp.com/api/post';
    let xhr  = new XMLHttpRequest()
    xhr.open('GET', url+'/'+id, true)
    console.log(id);
    xhr.onload = function () {
	var post = JSON.parse(xhr.responseText);
	if (xhr.readyState == 4 && xhr.status == "200") {
            document.getElementById("cardSect").innerHTML+=`
        <ul id=list>
            <li id="list-item">
                <div class="col">
                    <div class="col1">
                        <img src="${post.image}" class="img" alt="blog">
                    </div>
                    <div class="col1">
                        <div class="blog-text">
                            <p style="display:none">${post._id}</p>
                            <h2>${post.title}</h2>
                            <p class="marg">${post.body}</p>
                            <p class="marg" id="subj" style="display:block;">${post.subject}</p>
                            <button type="submit" onclick="DeleteBlog('${post._id}')" style="color:red;"><i class="fas fa-trash">Delete</i></button>
                            <button type="submit" onclick="closeBlog()" style="background-color:blue;">Close</button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        `
	} else {
		console.error(post);
	}
}
xhr.send()
}

function editBlog(id,title,bod,subject,image){
    editmodal.style.display = "block";
    document.getElementById("editform").addEventListener("submit",(e)=>{
        e.preventDefault();
    });
    document.getElementById("id1").value=id;
    document.getElementById("title1").value=title;
    document.getElementById("bod1").value=bod;
    document.getElementById("subject1").value=subject;
    document.getElementById("file1").value=image;
}

document.getElementById("update").addEventListener("click",(e)=>{
    e.preventDefault();
});
function updateBlog(id,title,bod,subject,link){
    var id=document.getElementById("id1").value;
    var title=document.getElementById("title1").value;
    var bod=document.getElementById("bod1").value;
    var subject=document.getElementById("subject1").value;
    var link= "https://res.cloudinary.com/basha18/image/upload/v1643447869/web-gca431e40e_640_novqee.png";
    if (validate_title(title) == false || validate_body(bod) == false || validate_subject(subject) == false || validate_file(link) == false) {
        //alert('title or body is Outta Line!!')
        return
    }
    const params = {
        title : document.getElementById("title1").value,
        body : document.getElementById("bod1").value,
        subject : document.getElementById("subject1").value,
        image : "https://res.cloudinary.com/basha18/image/upload/v1643447869/web-gca431e40e_640_novqee.png",
      }

      let url  = "https://mybrand-page.herokuapp.com/api/post";
      const http = new XMLHttpRequest()
      http.open('PATCH',url+'/'+id)
      http.setRequestHeader('Content-type', 'application/json')
      http.send(JSON.stringify(params)) // Make sure to stringify
      http.onload = function() {
          // Do whatever with response
          alert(http.responseText);
          document.getElementById("cardSection").innerHTML="";
          readBlog();
      }
}

function DeleteBlog(id)
{

  let url  = "https://mybrand-page.herokuapp.com/api/post";
  const http = new XMLHttpRequest()
  http.open('DELETE',url+'/'+id)
  http.setRequestHeader('Content-type', 'application/json')
  http.send(JSON.stringify()) // Make sure to stringify
  http.onload = function() {
      // Do whatever with response
    document.getElementById("cardSection").innerHTML="";
    readBlog();
    alert(http.responseText);
  }

}

function closeBlog() {
    document.getElementById("cardSection").style.display="block";
    document.getElementById("cardSect").style.display="none";
}

// Get the create modal
var createmodal = document.getElementById("createModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    createmodal.style.display = "block";
}
span.onclick = function() {
    createmodal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == createmodal) {
    createmodal.style.display = "none";
  }
}


// Get the Edit modal
var editmodal = document.getElementById("editModal");
//var btn = document.getElementById("myBtn");
var btn1 = document.getElementById("editBtn");
var span1 = document.getElementsByClassName("close1")[0];


function editBlog(id,title,bod,subject,image){
    editmodal.style.display = "block";
    console.log("hello")

    document.getElementById("editform").addEventListener("submit",(e)=>{
        e.preventDefault();
    });
    document.getElementById("id1").value=id;
    document.getElementById("title1").value=title;
    document.getElementById("bod1").value=bod;
    document.getElementById("subject1").value=subject;
    //document.getElementById("file1").files[0]=link;
}
document.getElementById("update").addEventListener("click",(e)=>{
    e.preventDefault();
});
span1.onclick = function() {
    editmodal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == editmodal) {
    editmodal.style.display = "none";
  }
}

//add comment

function add(id){
  com = document.getElementById("adcomment").value;
  console.log(com);
  if (validate_comment(com) == false) {
      alert('comment Empty');
      return
    }
    const params = {
      comment : document.getElementById('adcomment').value
    }
  
    let url  = "https://mybrand-page.herokuapp.com/api/comment/post";
    const http = new XMLHttpRequest()
    http.open('POST',url+'/'+id+'/comment')
    http.setRequestHeader('Content-type', 'application/json')
    http.send(JSON.stringify(params)) // Make sure to stringify
    http.onload = function() {
        //alert('User successfully Created');
        alert(http.responseText)
        signupForm.reset();
    }
  document.getElementById("adcomment").value="";
  alert('Comment added');
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
  function validate_file(link) {
    if(link ==="")
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

  function validate_comment(com) {
    if(com ==="")
    {
      document.getElementById("comValid").style.display="none";
      document.getElementById("comError").innerHTML="comment can't be empty";
      document.getElementById("comError").style.display="block";
      return false
    }
    else {
      document.getElementById("comError").style.display="none";
      document.getElementById("comValid").style.display="block";
        return true
    }
  }

