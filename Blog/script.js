
/*const firebaseConfig = {
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
*/
auth.onAuthStateChanged((user) => {
    if (user) {
        var user_email = firebase.auth().currentUser;
        var email_id = user_email.email;
        console.log(email_id);
        if(email_id ==='admin@gmail.com'){
      document.getElementById('myBtn').style.display="block";
    }
    else {
        console.log("error");
        document.getElementById('myBtn').style.display="none";
      }
    } else {
      document.getElementById('myBtn').style.display="none";
    }
  });




var d = new Date();
var t = d.getTime();
var counter = t;

function readBlog(){
    var blo=firebase.database().ref("Blog/");

    auth.onAuthStateChanged((user) => {
        if (user) {
            var user_email = firebase.auth().currentUser;
            var email_id = user_email.email;
            console.log(email_id);
            if(email_id ==='admin@gmail.com'){
    blo.on("child_added",function(data){
        var blogValue=data.val();

        document.getElementById("cardSection").innerHTML+=`
        <ul id=list>
            <li id="list-item">
                <div class="col">
                    <div class="col1">
                        <img src="${blogValue.link}" class="img" alt="blog">
                    </div>
                    <div class="col1">
                        <div class="blog-text">
                            <p style="display:none">${blogValue.id}</p>
                            <h2>${blogValue.title}</h2>
                            <p class="marg">${blogValue.bod}</p>
                            <p class="marg" id="subj" style="display:none;">${blogValue.subject}</p>
                            <div id="comment-section">
                               <textarea id="adcomment" style="background-color: #a7adb3;"></textarea>
                               <div>
                                    <p class="errors" id="comError">Error with comment</p>
                                    <p class="valid" id="comValid">valid</p>
                               </div>
                               <button onclick="add(${blogValue.id})"><i class="fas fa-plus-circle">add comment</i></button>
                            </div>
                            <div id="${blogValue.id}">
                            </div>
                            <button type="submit" onclick="readComment(${blogValue.id})">read Comment</button>
                            <p class="marg">${blogValue.date}</p>
                            <button type="submit" id"readBtn" class="p-btn" onclick="readMore(${blogValue.id})" style="color:blue;"><i class="fab fa-readme">Read more</i></button>
                            <button id="editBtn" style="color:green;" class="BtnEdit p-btn" onclick="editBlog(${blogValue.id},'${blogValue.title}','${blogValue.bod}','${blogValue.subject}','${blogValue.link}')"><i class="fas fa-edit">Edit</i></button>
                            <button type="submit" id="del" onclick="DeleteBlog(${blogValue.id})" class="p-btn" style="padding:5px; color:red;"><i class="fas fa-trash">Delete</i></button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        `
    })
    } else {
        blo.on("child_added",function(data){
            var blogValue=data.val();
    
            document.getElementById("cardSection").innerHTML+=`
            <ul id=list>
                <li id="list-item">
                    <div class="col">
                        <div class="col1">
                            <img src="${blogValue.link}" class="img" alt="blog">
                        </div>
                        <div class="col1">
                            <div class="blog-text">
                                <p style="display:none">${blogValue.id}</p>
                                <h2>${blogValue.title}</h2>
                                <p class="marg">${blogValue.bod}</p>
                                <p class="marg" id="subj" style="display:none;">${blogValue.subject}</p>
                                <div id="comment-section">
                                   <textarea id="adcomment" style="background-color: #a7adb3;"></textarea>
                                   <button onclick="add(${blogValue.id})"><i class="fas fa-plus-circle">add comment</i></button>
                                </div>
                                <div id="${blogValue.id}">
                                </div>
                                <button type="submit" onclick="readComment(${blogValue.id})">read Comment</button>
                                <p class="marg">${blogValue.date}</p>
                                <button type="submit" id"readBtn" class="p-btn" onclick="readMore(${blogValue.id})" style="color:blue;"><i class="fab fa-readme">Read more</i></button>
                                <button id="editBtn" style="color:green;display:none;" class="BtnEdit p-btn" onclick="editBlog(${blogValue.id},'${blogValue.title}','${blogValue.bod}','${blogValue.subject}','${blogValue.link}')"><i class="fas fa-edit">Edit</i></button>
                                <button type="submit" id="del" onclick="DeleteBlog(${blogValue.id})" class="p-btn" style="padding:5px; color:red;display:none;"><i class="fas fa-trash">Delete</i></button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            `
        })

    }
}
    else{
        blo.on("child_added",function(data){
            var blogValue=data.val();
            document.getElementById("cardSection").innerHTML+=`
            <ul id=list>
                <li id="list-item">
                    <div class="col">
                        <div class="col1">
                            <img src="${blogValue.link}" class="img" alt="blog">
                        </div>
                        <div class="col1">
                            <div class="blog-text">
                                <p style="display:none">${blogValue.id}</p>
                                <h2>${blogValue.title}</h2>
                                <p class="marg">${blogValue.bod}</p>
                                <p class="marg" id="subj" style="display:none;">${blogValue.subject}</p>
                                <div id="comment-section">
                                   <textarea id="adcomment" style="background-color: #a7adb3;"></textarea>
                                   <button onclick="add(${blogValue.id})"><i class="fas fa-plus-circle">add comment</i></button>
                                </div>
                                <div id="${blogValue.id}">
                                </div>
                                <button type="submit" onclick="readComment(${blogValue.id})">read Comment</button>
                                <p class="marg">${blogValue.date}</p>
                                <button type="submit" id"readBtn" class="p-btn" onclick="readMore(${blogValue.id})" style="color:blue;"><i class="fab fa-readme">Read more</i></button>
                                <button id="editBtn" style="color:green;display:none;" class="BtnEdit p-btn" onclick="editBlog(${blogValue.id},'${blogValue.title}','${blogValue.bod}','${blogValue.subject}','${blogValue.link}')"><i class="fas fa-edit">Edit</i></button>
                                <button type="submit" id="del" onclick="DeleteBlog(${blogValue.id})" class="p-btn" style="padding:5px; color:red;display:none;"><i class="fas fa-trash">Delete</i></button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            `
        })
    }
});
}


function blogComment(id){
    //document.getElementById('comment-section').style.display="block";
}
function add(id){
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
function readComment(id)
{
    //document.getElementById("readcomment-section").style.display="block";
    var c =id;
    var a =1640190017618;
   var n =0;
     console.log(id);
        //firebase.database().ref('Commnets/'+c+'/'+a).on("value",function(snapshot){
            var co=firebase.database().ref("Commnets/"+id+"/");
            co.on("child_added",function(data){
                var comValue=data.val();
        document.getElementById(id).innerHTML+=`
        <ul id=list>
            <li id="list-item">
                <div class="col">
                    <div class="col1">
                        <div class="blog-text">
                        <p>${comValue.id}</p>
                            <h2 style="font-family:Cursive; font-size:12px;">${comValue.comment}</h2>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        `
        n++;
    })
    
    console.log(n);
}

//onclick="EditBlog(${blogValue.id},'${blogValue.title}','${blogValue.bod}','${blogValue.subject}','${blogValue.link}')"

function readMore(id){
    document.getElementById("cardSection").style.display="none";
        firebase.database().ref('Blog/'+id).on("value",function(snapshot){
        document.getElementById("cardSect").innerHTML+=`
        <ul id=list>
            <li id="list-item">
                <div class="col">
                    <div class="col1">
                        <img src="${snapshot.val().link}" class="img" alt="blog">
                    </div>
                    <div class="col1">
                        <div class="blog-text">
                            <p style="display:none">${snapshot.val().id}</p>
                            <h2>${snapshot.val().title}</h2>
                            <p class="marg">${snapshot.val().bod}</p>
                            <p class="marg" id="subj" style="display:block;">${snapshot.val().subject}</p>
                            <p class="marg">${snapshot.val().date}</p>
                            <button type="submit" onclick="DeleteBlog(${snapshot.val().id})" style="color:red;"><i class="fas fa-trash">Delete</i></button>
                            <button type="submit" onclick="closeBlog()" style="background-color:blue;">Close</button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        `
    })
    }

function closeBlog() {
    document.getElementById("cardSection").style.display="block";
    document.getElementById("cardSect").style.display="none";
}
function DeleteBlog(id)
{
    var blog=firebase.database().ref("Blog/"+id);
    console.log(blog);
    blog.remove();
    document.getElementById("cardSection").innerHTML="";
    readBlog();
    alert('BLog deleted');
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


function editBlog(id,title,bod,subject,link){
    editmodal.style.display = "block";
    //firebase.database().ref('Blog/'+id).on("value",function(snapshot){
       //document.getElementById("title").value=snapshot.val().title;
    //});

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
function updateBlog(id,title,bod,subject,link){
    var id=document.getElementById("id1").value;
    var title=document.getElementById("title1").value;
    var bod=document.getElementById("bod1").value;
    var subject=document.getElementById("subject1").value;
    var link= "https://firebasestorage.googleapis.com/v0/b/test-javascript-20767.appspot.com/o/Images%2Ftest1.png?alt=media&token=3f61447d-6d7f-45b8-ac84-750e99c8866b";
    if (validate_title(title) == false || validate_body(bod) == false || validate_subject(subject) == false || validate_file(link) == false) {
        //alert('title or body is Outta Line!!')
        return
    }
   firebase.database().ref("Blog/"+id).update({
        id:id,
       title:title,
       bod:bod,
       link:link,
       subject:subject
   });
   readBlog();
   editmodal.style.display = "none";
   readBlog();
}
 //btn1.onclick = function() {
     //editmodal.style.display = "block";
//}

span1.onclick = function() {
    editmodal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == editmodal) {
    editmodal.style.display = "none";
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

