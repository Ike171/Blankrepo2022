//© 2021 Sean Murdock

let phonenumber = "";
let onetimepassword = "";
let verifypassword = "";
let passwordRegEx=/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{6,40})/;
let usertoken= "";
function setphonenumber(){
    phonenumber = $("#phonenumber").val();
}

const sendText=()=>{
    $.ajax({
        type: 'POST',
         url: 'https://dev.stedi.me/twofactorlogin/'+phonenumber,
         data: JSON.stringify({usertoken}),
         contentType: "application/text",
         dataType: 'text' })
}


function setuseronetimepassword(){
    onetimepassword = $("#onetimepassword").val();
    // var valid=passwordRegEx.exec(password);
    // if (!valid){
    //     alert('Must be 6 digits, upper, lower, number, and symbol');
    }


function setverifypassword(){
    verifypassword = $("#verifypassword").val();
    if (verifypassword!=password){
        alert('Passwords must be entered the same twice');
    }
}

function savetoken(token){
// whatever passes as token should save into local storage
    if (window.localStorage){
     localStorage.setItem("token", token);
    }

}

function checkexpiredtoken(token){
// read token from local storage - check with ajax call
    if(window.localStorage){
    usertoken = localStorage.getItem("token");
    $.ajax({
       type: 'GET',
        url: 'https://dev.stedi.me/validate/'+token,
        data: JSON.stringify({usertoken}),
        success: function(data){savetoken(data)},
        contentType: "application/text",
        dataType: 'text' })
    }
}

function userlogin(){
    setuseronetimepassword();
    setphonenumber();
    $.ajax({
        type: 'POST',
        url: 'https://dev.stedi.me/twofactorlogin',
        data: JSON.stringify({phoneNumber:phonenumber, oneTimePassword:onetimepassword}),
        success: function(data) {
            window.location.href = "/timer.html#"+data;//https://dev.stedi.me/validate/4e3d3b08-71ac-4c8e-b14a-05d6f4efae62
        },
        contentType: "application/text",
        dataType: 'text'
    });

}

function readonlyforms(formid){
    form = document.getElementById(formid);
    elements = form.elements;
    for (i = 0, len = elements.length; i < len; ++i) {
    elements[i].readOnly = true;
    }
    createbutton();
}
 function pwsDisableInput( element, condition ) {
        if ( condition == true ) {
            element.disabled = true;

        } else {
            element.removeAttribute("disabled");
        }

 }

function createbutton(){
    var button = document.createElement("input");
    button.type = "button";
    button.value = "OK";
    button.onclick = window.location.href = "/index.html";
    context.appendChild(button);
}


function createuser(){
    $.ajax({
        type: 'POST',
        url: 'https://dev.stedi.me/user',
        data: JSON.stringify({userName, 'email': userName, password, 'verifyPassword': vpwd, 'accountType':'Personal'}),//we are using the email as the user name
        success: function(data) { alert(data);
//        readonlyforms("newUser");
//        alert(readonlyforms("newUser"));
        window.location.href = "/index.html"},
        contentType: "application/text",
        dataType: 'text'
    });
}

function getstephistory(){
      $.ajax({
            type: 'POST',
            url: 'https://dev.stedi.me/stephistory',
            data: JSON.stringify({userName}),
            success: function(data) { alert(data);
            json = $.parseJSON(data);
            $('#results').html(json.name+' Total Steps: ' + json.stepTotal)},
            contentType: "application/text",
            dataType: 'text'
        });
}

var enterFunction = (event) =>{
    if (event.keyCode === 13){
        event.preventDefault();
        $("#loginbtn").click();
    }
}

var passwordField = document.getElementById("onetimepassword");

passwordField.addEventListener("keyup", enterFunction);