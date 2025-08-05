import {user} from '../models/user';
import bcrypt from "bcryptjs";

const login = (async(req,res) => {
    const {name,email,password = 'secret'} = req.body;
    const salt = bcrypt.genSyncSalt(10);
    const hashedPassword = bcrypt.hashSync(password,salt);
    const newUser = await user({name,email,password});
    await newUser.save();
    res.send({name,email,password});
});

export default login;