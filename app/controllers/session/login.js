import User from '../../models/user.js';
import bcrypt from 'bcrypt';


class Login {

    login(req,res){

        // TODO - sanitize user data to avoid malicious information 

        let email = req.query.email;
        let password = req.query.password;

        if(!email || !password){
            return res.status(400).send({error : 'No email or password passed'});
        }

        try{
            User.findOne({ 'email' : email})
                .then( user  => {
                
                if(user == null){
                    return res.status(404).send({error : 'Incorrect information'});
                }

                bcrypt.compare(password,user.password, (err, same) => {
                    if (err)    return res.status(500).send({ error: 'Sorry, We could not start your session'});
                    if (!same)  return res.status(404).send({ error : 'Incorrect information' });

                    // Create session

                    //TODO - implement TOKENS to increase security
                    //TODO - store sessions on database to retrieve them when a user re-enters the application

                    req.session.username = user.username;
                    req.session.email    = user.email;

                    return res.status(200).send({session : req.session});
                });
               


            });
        }catch(err){

        }
    }

}

export default new Login();