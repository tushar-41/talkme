import {User} from '../models/user';
import bcrypt from "bcryptjs";

export const login = async(req,res) => {
    const {name,email,password = 'secret'} = req.body;
    const user = await User.findOne({email});
    const isMatched = bcrypt.compare(password,user.password);
    if(isMatched){
        console.log('User detected successfully');
    }else{
        console.log('User not registered yet');
    }
    
};

export const register = async(req,res) => {
    const {name,password,email} = req.body;
    const salt = bcrypt.genSyncSalt(10);
    const hashedPassword = bcrypt.hashSync(password,salt);
    const newUser = await User({name,email,password});
    //Or newUser = new User({name:name,email:email,password:password});
    //newUser.save();
    await newUser.save();
    res.send({name,email,password});
}