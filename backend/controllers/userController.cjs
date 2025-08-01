// import {user} from '../models/user';
import bcrypt from "bcryptjs";

const login = (async(req,res) => {
    const {name,email,password = 'secret'} = req.body;
    const salt = bcrypt.genSyncSalt(10);
    const hashedPassword = bcrypt.hashSync(password,salt);
    console.log(hashedPassword);
});

login();