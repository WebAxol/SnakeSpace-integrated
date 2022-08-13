import User from '../models/user.js';


class LoginController {

    login(req,res){

        // TODO - sanitize user data

        let email = req.query.email;
        let password = req.query.password;

        if(!email || !password){
            return res.status(400).send({error : 'No email or password passed'});
        }

        try{
            User.findOne({ 'email' : email, 'password' : password})
                .then( user  => {
                
                if(user == null){
                    return res.status(404).send({error : 'Incorrect email or password'});
                }

                req.session.username = user.username;
                req.session.email = user.email;


                return res.status(200).send({ user : user });
                
            });
        }catch(err){

        }
    }

}

export default new LoginController();