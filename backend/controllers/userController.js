const {User} = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports.login = async(req,res) => {
    const {name,email,password = 'secret'} = req.body;
    const user = await User.findOne({email});
    const isMatched = bcrypt.compare(password,user.password);
    if(isMatched){
        console.log('User detected successfully');
    }else{
        console.log('User not registered yet');
    }  
};

module.exports.register = async(req,res) => {
    const {name,password,email} = req.body;
    const salt = bcrypt.genSyncSalt(10);
    const hashedPassword = bcrypt.hashSync(password,salt);
    const newUser = await User({name,email,hashedPassword});
    //Or newUser = new User({name:name,email:email,password:password});
    //newUser.save();
    await newUser.save();
    console.log(newUser);
    res.send(true);
}

