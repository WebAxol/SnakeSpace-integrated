'use strict'

import User from '../models/user.js';

var RegisterController = {

    register : (req,res) => {

        console.log('registering');

        let params = req.body;

        // TODO : validate and check parameters before storing them on the DB
        
        let newUser = new User();
            newUser.username = params.username;
            newUser.email = params.email;
            newUser.password = params.password;

            newUser.save((err, userSaved) => {
                if(err){ 
                    return res.status(500).send({message : 'Sorry, there has been an error while registering you'});
                } 
                if(!userSaved){
                    return res.status(404).send({message : 'Sorry, we could not register your user'});
                }

                console.log(userSaved);
                return res.status(200).send({ message : userSaved});
            });
    },

    validatePassword : (password,confirmation) => {
        // TODO : Complete this function - It must check that...
        /*
            - both the password and the confirmation variables are equal
            - the password is atleast 10 characters long
            - the password is no more than 256 characters long
        */
    },

    // TODO: Complete functions checkEmail & checkName - They must check if the name and email are already registered respectively

    checkEmailInDB : () => {},
    checkNameInDB  : () => {}

}

export default RegisterController;