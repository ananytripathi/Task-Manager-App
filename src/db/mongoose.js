const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect(process.env.MONGODB_URL).then(()=>console.log('mongoose connected!'))
  .catch((err)=>console.log(err));

// const User = mongoose.model('User',{
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid');
//             }
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         validate(value){
//             if(value.toLowerCase().includes("password")){
//                 throw new Error('Password must not contain password');
//             }

//             if(value.length<=6)
//                 throw new Error('Password must be greater than 6 characters');

//         }
//     },
//     age:{
//         type:Number,
//         default:0,
//         validate(value){
//             if(value<0)
//                 throw new Error('Age must be a positive number');
//         }
        
//     }
// });

// const me = new User({
//     name:'   Anany   ',
//     email:'ANANY@GMAIL.COM',
//     password:'abcdefgPassword    ',
//     age:24
// });

// me.save().then((user)=>{
//     console.log(user)
// }).catch((err)=>{
//     console.log('Error! ',err);
// });

// const Task = mongoose.model('Task',{
//     description:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// });

// const task = new Task({
//     description:
//     completed:true
// })

// task.save().then((task)=>{
//     console.log(task)
// }).catch(err=>console.log('Error! ',err));

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://anany064:<db_password>@cluster0.zbmg9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(process.env.MONGODB_URL, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);