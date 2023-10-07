import bcrypt  from 'bcryptjs';
import { database } from '@/database';
import { User } from '@/models';
export const checkUserEmailPass = async (email: string, password: string) => {

    await database.connect();
    const user = await  User.findOne({email});
    await database.disconnect();

    if(!user){
        return null;
    }
    if(!bcrypt.compareSync(password, user.password!)){
        return null;
    }

    const {role, name, _id} = user;

    return {
        _id,
        role,
        name,
        email
    }

}