'use strict'

const form = document.querySelector('form');
var request_queue = []; // Stores requests to server so that they can be processed independently one by one
var usernameAvailable = false;
var emailAvailable    = false;

// Functions

function displayErrorBox(field,error){
    let errorBox = document.getElementById( `${field}-errorbox`);
        errorBox.style.display = 'block';
        errorBox.innerHTML = error;
}

function hideErrorBox(field){
    let errorBox = document.getElementById( `${field}-errorbox`);
        errorBox.innerHTML = '';    
        errorBox.style.display = 'none';
}


function checkPassword(){
    var password = form.password.value,
        confirm  = form.confirmPassword.valuentitye; 

    // TODO : create error boxes to show error messages on UI, then remove console.log's
    
    if(password == '' || confirm == ''){
        return;
    }

    if(password  !== confirm){
        console.log('unequal');
        displayErrorBox('password','The passwords are not identical');
        return false;
    }
    if(password.length < 10){
        displayErrorBox('password','The password must contain a minimum of 10 characters');
        return false;
    }
    if(password.length > 256){
        displayErrorBox('password','The password must not exceed 256 characters');
        return false;
    }

    hideErrorBox('password');
    return true;
}

function isEmailAvailable(){

    var email = form.email.value;

    if(email == ''){
        return;
    }
    try{
        fetch(`/api/register/email?email=${email}`, {
            headers : {
                'Content-type' : 'application/json'
            },
            method : 'get',

        }).then((data) => {
            return data.json();

        }).then((available) => {
            if(available.message){
                displayErrorBox('email','The email is not available');
                emailAvailable = false;

            }else{
                hideErrorBox('email');
                emailAvailable = true;

            }
        })
    }catch(err){
        setTimeout(isEmailAvailable,2000)
    }
}

function isUsernameAvailable(){

    var username = form.username.value;

    if(username == ''){
        return;
    }
    try{
        fetch(`/api/register/username?username=${username}`, {
            headers : {
                'Content-type' : 'application/json'
            },
            method : 'get',

        }).then((data) => {
            return data.json();

        }).then((available) => {
            if(available.message){
                displayErrorBox('name','The name is not available');
                usernameAvailable = false;
            }
            else{
                hideErrorBox('name');
                usernameAvailable = true;
            }
        })
    }catch(err){
        setTimeout(isUsernameAvailable,2000)
    }
}


function checkForm(e){
    e.preventDefault();

    console.log('checking form');

    if (!checkPassword()) return; 
    
    if(usernameAvailable === true && emailAvailable === true){
        form.submit();
    }

}

// EVENTS

form.addEventListener('submit', checkForm);

form.addEventListener('focusout',(e) => {
    
    let input = e.target.name;

    switch(input){
        case 'username' : isUsernameAvailable();
        break;
        case 'email' : isEmailAvailable();
        break;
        case 'password' : checkPassword();
        break;
        case 'confirmPassword' : checkPassword();
    }

});




