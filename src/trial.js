// const bcrypt = require('bcrypt');

// const encryption = async () => {
//     const password = 'Pratik@123';
//     let hashedPassword =await bcrypt.hash(password,8);
//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch =await bcrypt.compare(password, hashedPassword);
//     console.log(isMatch);
// }

// encryption();

// const myFunction = async (fname,lname,cb) => {
//     cb();
// }

// myFunction('Pratik','Pratik',() => {
// })

// async function jwtTesting() {
//     try {
//         const jwt = require('jsonwebtoken');
//     let token = await jwt.sign({data : 'pratikbhangale760@gmail.com'},'Pratik@123', { expiresIn: '1h' });
//     let isVerified = jwt.verify(token,'Pratik@123');
//     console.log(isVerified);
//     } catch(error) {
//         console.log(error);
//     }
// }
// jwtTesting();

// let arr = [];
// arr.push('happy')
// console.log(arr);

let tokens = [
    {
        token : '123',
        password : 'Pratik@123'
    }, {
        token : '456',
        password : 'Pradeep@123'
    }
]

console.log(tokens[0].token);