'use strict'
import User from '../models/user.js';


/*
    HINT : all methods starting with an underscore "_" 
    are used by the class but don´t directly return any information to a client. 
*/

// TODO : Further test register API


class RegisterController {

    preRegister(req,res){

        // TODO : clean data before processing it

        this._checkUserParamsInDB(req,(available) => {
            try{
                if(available.error){
                    return res.status(500).send({
                        message : 'Error, something went wrong'
                    });
                }

                if(!available){
                    return res.status(500).send({
                        message : 'The data is already registered'
                    });
                }

                // username and email valid and available - time to register...

                this.register(req,res);


            }catch(err){
                console.log('Error', err);

                return res.status(500).send({
                    message : 'Error, something went wrong'
                });
            }
        });
    }

    register(req,res){
        try{
            let newUser = new User();
                newUser.username =  req.body.username;
                newUser.email    =  req.body.email;
                newUser.password =  req.body.password;

            newUser.save((err, userSaved) => {
                if(err){ 
                    return res.status(500).send({ 
                        message : 'Sorry, there has been an error while registering you'
                    });
                } 
                if(!userSaved){
                    return res.status(404).send({ 
                        message : 'Sorry, we could not register your user' 
                    });
                }

                console.log(userSaved);
                return res.status(200).send({ 
                    message : userSaved}
                );
            });
        }catch(err){

            console.log('Error', err);

            return res.status(500).send({
                message : 'Error, something went wrong'
            });
        }
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

                if(user.error)      return callback(user);
                if(user != false)   return callback(false);
            
                this._isUsernameInDB(req.body.username, (user) => {

                    if(user.error)      return callback(user);
                    if(user != false)   return callback(false);
                
                    return callback(true);
                });
            });
        }catch(err){
            console.log('Error');
            return callback({ error : 'Error, something went wrong' });
        }
    }


    isEmailInDB(req,res){

        this._isEmailInDB(req.query.email, (data) => {
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
            return callback({ error : 'No email passed as parameter' });
        }

        try{
            User.find({ 'email' : email }).then((email) => {
                if(!email){
                    return callback({ error : 'Error, something went wrong' });
                }

                return callback(!(email == false));
            });true
        }catch(err){
            console.log(err);
            return callback({ error : 'Error, something went wrong' })
        }
    }



    isUsernameInDB(req,res){

        this._isUsernameInDB(req.query.username, (data) => {
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
            return callback({ error : 'No username passed as parameter', username : username });
        }

        try{
            User.find({ 'username' :  username}).then((user) => {
                if(!user){
                    return callback({ error : 'There was a mistake' });
                }

                return callback(!(user == false));
            });
        }catch(err){
            console.log(err);
            return callback({ error : 'Error, something went wrong' })
        }
    }
}


export default new RegisterController();