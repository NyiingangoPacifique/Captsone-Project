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
function readForm (){
    category = document.getElementById("category").value;
    skilname = document.getElementById("name").value;
    file = document.getElementById('files').files[0];
    console.log(skilname);
}
document.getElementById("insert").onclick = function () {
    readForm();
    console.log(counter);
    counter+=1;
    console.log(counter);
    console.log(dat);
    
    console.log(category);

    let storageRef = firebase.storage().ref('Skills');
    let file = document.getElementById('files').files[0];
    console.log(file);

    if (validate_category(category) == false || validate_name(skilname) == false || validate_file(file) == false) {
        //alert('title or body is Outta Line!!')
        return
    }
    let thisRef = storageRef.child(file.name);

    thisRef.put(file).then(res=> {
        console.log('upload success');
        console.log(thisRef);
        alert("upload success");
    }).catch(e=> {
        console.log('Error'+e);
    })
    storageRef.child(file.name).getDownloadURL().then(url=> {
        console.log(url)
    
                firebase.database().ref('Skills/'+counter).set({
                    id:counter,
                    link:url,
                    name:skilname,
                    category:category

                });
                alert('Skills added');

            }).catch(e=> {
                console.log(e)});
}

//-----------------retrieve------------------
function readBlog(){
    var skil=firebase.database().ref("Skills/");
    skil.on("child_added",function(data){
        var skilValue=data.val();
        var cat = skilValue.category;
        console.log(cat);
        if (cat ==='frontend'){
        document.getElementById("nested").innerHTML+=`
            <li class="skil">
                <img  class="skil-img" src="${skilValue.link}" alt="">
                <p>${skilValue.name}</p>
            </li>
        `}
        if (cat ==='backend'){
            document.getElementById("backend").innerHTML+=`
                <li class="skil">
                    <img  class="skil-img" src="${skilValue.link}" alt="">
                    <p>${skilValue.name}</p>
                </li>
            `}
    })
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


