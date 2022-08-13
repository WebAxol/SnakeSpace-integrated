'use strict'
import User from '../models/user.js';
import hash from '../utils/encrypt.js'

/*
    HINT : all methods starting with an underscore "_" 
    are used by the class but don´t directly return any information to a client. 
*/

// TODO : Further test register API


class RegisterController {



    preRegister(req,res){

        // TODO : clean data before processing it

        this._checkUserParamsInDB(req.body,(available) => {
            try{
                if(available.error){
                    return res.status(500).send({
                        error : available.error
                    });
                }

                if(!available){
                    return res.status(500).send({
                        message : 'The data is already registered'
                    });
                }


                this.validatePassword(req.body.password,req.body.confirm).then((validPassword) => {

                    if(validPassword){
                        return this.register(req,res);
                    }

                    return res.status(400).send({
                        error : 'The password is not valid'
                    });

                })


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

    async validatePassword(password,confirmation){

        if(!password || password == '' || !confirmation || confirmation == ''){
            return false;
        }
        if(!password !== confirmation){
            return false;
        }
        if(password.length < 10 || password.length > 250){
            return false;
        }

        genHash(password).then((hashed) => {
            console.log(hashed);
            return res.body.password = hashed;
        })
    }

    // Checks if both the username and email aren´t already registered in the DB

    _checkUserParamsInDB(body,callback){

        try{
            this._isEmailInDB(body.email, (user) => {

                if(user.error)      return callback(user);
                if(user != false)   return callback(false);
            
                this._isUsernameInDB(body.username, (user) => {

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