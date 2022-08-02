'use strict'
import User from '../models/user.js';


/*
    HINT : all methods starting with an underscore "_" 
    are used by the class but don´t directly return any information to a client. 
*/

class RegisterController {

    register(req,res){

        // TODO : clean data before processing it
        
        let params = req.body;

          // TODO : validate and check parameters before storing them on the DB

        this._checkUserParamsInDB(req,(available) => {
            try{

                console.log(available);

                if(available.error){
                    res.status(500).send({
                        message : 'There was a mistake'
                    });
                }
                else if(available === true){
                    res.status(200).send({
                        message : 'The data is valid'
                    });
                }else{
                    res.status(500).send({
                        message : 'The data is already registered'
                    });
                }
            }catch(err){
                console.log('Error2');
            }
        });


        //let username_exists = this.checkUsernameInDB(params.username);

        return;

        if(typeof email_exists == 'Object'){
            return this.sendMessage(email_exists,res);
        }

        if(email_exists){
            return this.sendMessage({
                status : 404,
                content : 'The email or username have already been registered'
            },res);
        }

          // TODO : encrypt password with secure hash library

        this._register(params);
    }

    _register(){

        let newUser = new User();
            newUser.username = params.username;validatePassword
            newUser.email = params.email;
            newUser.password = params.password;

            newUser.save((err, userSaved) => {
                if(err){ 
                    return { 
                        status : 500, 
                        content : 'Sorry, there has been an error while registering you'
                    };
                } 
                if(!userSaved){
                    return { 
                        status : 404, 
                        content : 'Sorry, we could not register your user' 
                    };
                }

                console.log(userSaved);
                return { status : 200, content : userSaved};
            });
    }

    validatePassword(password,confirmation){
        // TODO : Complete this function; It must check that...
        /*
            - both the password and the confirmation variables are equal
            - the password is atleast 10 characters long
            - the password is no more than 256 characters long
        */
    }

    // Checks if both the username and email aren´t already registered in the DB

    _checkUserParamsInDB(req,callback){
        try{
        this._isEmailInDB(req.body.email, (user) => {

            if(user.error){ 
                callback(user);
            }

            if(user != false && !user.error){
                //console.log('email already registered');
                callback(false);
            }

            this._isUsernameInDB(req.body.username, (user) => {

                if(user.error){
                    callback(user);
                }

                if(user != false && user != [] && !user.error){
                    //console.log('usename already registered');
                    callback(false);
                }
                else{
                    console.log(user);
                    callback(true);
                }
            });
        });
        }catch(err){
            console.log('Error');
        }
    }


    isEmailInDB(req,res){
        this._isEmailInDB(req.body.email, (data) => {
            if(data.error){
                return res.status(500).send({
                    message : 'Error'
                });
            }

            return res.status(200).send({
                message : data
            });
        })
    }

    _isEmailInDB(email,callback){

        if(!email || email == ''){
            callback({ error : 'No email passed as parameter' });
        }

        try{
            User.find({ 'email' : email }).then((email) => {
                if(!email){
                    callback({ 
                        error : 'There was a mistake'
                    });
                }

                callback(email);
            });
        }catch(err){
            console.log(err);
            return { status : 500 , message : 'Something went wrong' };
        }
    }



    isUsernameInDB(req,res){

        this._isUsernameInDB(req.body.username, (data) => {
            if(data.error){
                return res.status(500).send({
                    message : 'Error'
                });
            }

            return res.status(200).send({
                message : data
            });
        })
    }

    _isUsernameInDB(username,callback){

        if(!username || username == ''){
            callback({ error : 'No username passed as parameter' });
        }

        try{
            User.find({ 'username' :  username}).then((user) => {
                if(!user){
                    callback({ 
                        error : 'There was a mistake'
                    });
                }

                callback(user);
            });
        }catch(err){
            console.log(err);
            return { status : 500 , message : 'Something went wrong' };
        }
    }
}


export default new RegisterController();