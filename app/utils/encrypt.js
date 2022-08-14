import bcrypt from 'bcrypt';

async function genHash(string,callback) {
    try{
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(string, salt)
        return hash;
    }catch(err){
        console.log('xx');
        return { error : 'Could not generate hash' };
    }
}


export default genHash;