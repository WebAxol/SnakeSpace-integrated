'use strict'
import User from '../../models/user.js';
import bcrypt from 'bcrypt';
import isRegistered from './isRegistered.js';

/*
    HINT : all methods starting with an underscore "_" 
    are used by the class but don´t directly return any information to a client. 
*/

// TODO : Further test register API


class RegisterUser{

    preRegister(req,res){

        // TODO : clean data before processing it

        try{
            this._checkUserParamsInDB(req.body,(available) => {

                if(available.error){
                    return res.status(500).send({
                        error : available.error
                    });
                }

                if(!available){
                    return res.status(400).send({
                        message : 'The data is already registered'
                    });
                }

                this.validatePassword(req.body.password,req.body.confirm).then((validPassword) => {

                    if(validPassword.error){
                        return res.status(500).send({
                            error : 'Error, something went wrong'
                        });
                    }

                    if(validPassword){
                        return this.register(req,res);
                    }

                    return res.status(400).send({
                        error : 'The password is not valid'
                    });
                })
            })
        }catch(err){
            console.log('Error', err);

            return res.status(500).send({
                message : 'Error, something went wrong'
            });
        }
    }

    async register(req,res){

        let hashed = await bcrypt.hash(req.body.password, 8);

        try{
            let newUser = new User();
                newUser.username =  req.body.username;
                newUser.email    =  req.body.email;
                newUser.password =  hashed;

            
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
        try{
            if(!password || password == '' || !confirmation || confirmation == ''){
                return false;
            }
            if(password !== confirmation){
                return false;
            }
            if(password.length < 10 || password.length > 250){
                return false;
            }

            return true;

        }catch(err){
            console.log(err);
            return { error : 'Could not validate password' };
        }
    }

    // Checks if both the username and email aren´t already registered in the DB

    _checkUserParamsInDB(body,callback){

        try{
            isRegistered._isEmailInDB(body.email, (user) => {

                if(user.error)      return callback(user);
                if(user != false)   return callback(false);
            
                isRegistered._isUsernameInDB(body.username, (user) => {

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
}


export default new RegisterUser();