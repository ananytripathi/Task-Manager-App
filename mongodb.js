// CRUD create read update delete
const mongoose = require('mongoose');
//  const {ObjectId} = mongoose;
//  const id = new ObjectId();
//  console.log(id);
const newId = new mongoose.Types.ObjectId();
console.log("Generated ID:", newId);
console.log("ID length",newId.id.length)
console.log("ID length",newId.toString())
// console.log(mongoose);

//connection
mongoose
  .connect("mongodb://127.0.0.1:27017/xyz")
  .then(()=> console.log('Mongodb Connected'))
  .catch((err)=> console.log('Mongo error',err));

//Schema Define
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    email:{
        type:'String',
        required:true,
        unique:true,
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String
    }
});

console.log(typeof userSchema);

//Model
const User = mongoose.model("user",userSchema);

User.create({
    firstName:"Anany",
    lastName:"Tripathi",
    email:"ananytrip@gmail.com",
    jobTitle:"Software Lead",
    gender:"Male"
}).then(result=>console.log(result))
.catch(err=>console.log('anany'));

//  User.deleteMany({firstName: 'Soumy'})
//      .then(res=>console.log(res))
//      .catch(err=>console.log(err));

// User.findOne({_id:"67b463b8162752e6ce65a097"})
//   .then(user=>console.log(user))
//   .catch(err=>console.log('Error Msg',err.message))

// User.find({gender:"Male"})
//   .then(users=>console.log(users.length))
//   .catch(err=>console.log(err.message))

// User.findOne({email:"atrip@email.com"})
//   .then(user=>console.log(user))
//   .catch(err=>console.log('Error Msg',err.message))

// User.findOneAndUpdate(
//   {email:"atrip@email.com"},
//   {jobTitle:"Lead Engineer"},
//   {new:true})
//   .then(user=>console.log('updated user',user))
   
// User.findOneAndDelete({email:"atp@hmail.com"})
//     .then(user=>console.log("Deleted User",user))
//     .catch(error=>console.log("error",err.message))

const userSchema2 = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        required:true
    }
});

const User2 = mongoose.model("user2",userSchema2);

User2.deleteOne({description:"Gardning"})
     .then(res=>console.log(res))
     .catch(err=>console.log(err))

// User2.findOne({_id:"67b4d2016a1535f38dab646f"})
//   .then(users=>console.log(users))
//   .catch(err=>cconsole.log(err.message))

// User2.find({completed:false})
//   .then(users=>console.log(users))
//   .catch(err=>console.log(err.message))

// User2.updateMany({completed:false},{ $set: { completed:true }},{new:true} )
//      .then(users=>console.log(users))
//      .catch(error=>console.log(error))



// const array = [{description:"Hi there i am Anany",completed:true},{description:"Hi there i am Kishan",completed:false}];
// User2.insertMany(array)
//      .then((users)=>console.log(users))
//      .catch((err)=>console.log(err.message));

// User2.findOneAndUpdate(
//   {description:"Hi there i am Kishan"},
//   {description:"Filling the ITR"},
//   {new:true})
//   .then(user=>console.log('updated user',user))