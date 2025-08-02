import { configDotenv } from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

configDotenv(); // Load environment variables

// const user = {
//   name: 'Tushar',
//   email: 'email@example.com',
// };

// const secret = process.env.JWT_SECRET_KEY || 'batman_is_better_than_superman';

// const token = jwt.sign(user, secret, { expiresIn: '1h' });

// console.log(token);

const pass = 'tushar 447';
const salt = bcrypt.genSaltSync(10);
const hashed = bcrypt.hashSync(pass,salt);
console.log("Hashed password is = ",hashed);

const main = async() => {
    try {
        let comparedPasss = await bcrypt.compare(pass,hashed);
        console.log('Compared password is = ',comparedPasss);
    } catch (error) {
        console.log(error.message);
    }
}

main();