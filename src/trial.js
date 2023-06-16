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

// let tokens = [
//     {
//         token : '123',
//         password : 'Pratik@123'
//     }, {
//         token : '456',
//         password : 'Pradeep@123'
//     }
// ]

// console.log(tokens[0].token);

// console.log("I am running")
// const express = require('express');
// const app = express();

// // app.use(express.json())
// app.post('/name',(req,res)=>{
//     console.log(`req is ${req} and type is ${typeof(req)}`);
//     console.log(req.body)
// })

// app.listen(8080, ()=>{console.log("PORT IS LISTENING AT 8080")});

// const backendTasks = [{"_id":"6485bc4790cf111fa4263f3a","title":"first task","createdBy":"6485aa23cf2adc586c5eeb0c","__v":0},{"_id":"6485bc4790cf111fa4263f3a","title":"second task","createdBy":"6485aa22adc586c5eeb0c","__v":2}]

// const data =

// console.log(data)

const express = require('express');
const multer = require('multer');

const app = express();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory where you want to store uploaded files
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Set the filename to be the original name of the uploaded file
    cb(null, file.originalname);
  },
});

// Create Multer instance
const upload = multer({ storage });

// Define a route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(JSON.stringify(req.body));
  // Access the uploaded file details using req.file
  if (!req.file) {
    res.status(400).send('No file uploaded.');
  } else {
    res.send('File uploaded successfully.');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
