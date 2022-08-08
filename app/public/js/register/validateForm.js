'use strict'

const form = document.querySelector('form');
var request_queue = []; // Stores requests to server so that they can be processed independently one by one


// Functions

function checkPassword(){
    var password = form.password.value,
        confirm  = form.confirmPassword.value; 

    // TODO : create error boxes to show error messages on UI, then remove console.log's
    
    if(password  !== confirm){
        console.log('The passwords are not identical');
        return false;
    }
    if(password.length < 10){
        console.log('The password must contain a minimum of 10 characters');
        return false;
    }
    if(password.length > 256){
        console.log('The password must not exceed 256 characters');
        return false;
    }

    return true;
}

function isEmailAvailable(){

    var email = form.email.value;

    if(email == ''){
        return;
    }

    fetch(`/api/register/email?email=${email}`, {
        headers : {
            'Content-type' : 'application/json'
        },
        method : 'get',

    }).then((data) => {
        return data.json();

    }).then((available) => {
        if(available.message){
            console.log('The email has already been taken');
        }
    })
}


function isUsernameAvailable(){

    var username = form.username.value;

    if(username == ''){
        return;
    }

    fetch(`/api/register/username?username=${username}`, {
        headers : {
            'Content-type' : 'application/json'
        },
        method : 'get',

    }).then((data) => {
        return data.json();

    }).then((available) => {
        if(available.message){
            console.log('The username has already been taken');
        }
    })
}


function checkForm(e){
    e.preventDefault();

    console.log('checking form');

    if (!checkPassword()) return; 
    
    isUsernameAvailable();
    isEmailAvailable();
}

// EVENTS

form.addEventListener('submit', checkForm);
form.username.addEventListener('focusout', isUsernameAvailable);
form.email.addEventListener('focusout', isEmailAvailable);




