import User from '../../models/user.js';

class isRegistered{

    isEmailInDB(req,res){

        console.log(req.query);

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

        this._isUsernameInDB(req.query.name, (data) => {
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
                    return callback({ error : 'Error, something went wrong' });
                }

                return callback(!(user == false));
            });
        }catch(err){
            console.log(err);
            return callback({ error : 'Error, something went wrong' })
        }
    }
}

export default new isRegistered();