const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/tasks')

const userOneId = new mongoose.Types.ObjectId;
const userTwoId = new mongoose.Types.ObjectId;

const userOne = {
    _id : userOneId,
    name:"Anany Tripathi",
    email:"ananytripathi065@gmail.com",
    password:"atp@123",
    tokens : [{
        token : jwt.sign({_id:userOneId} , process.env.JWT_SCERET)
    }]
}

const userTwo = {
    _id : userTwoId,
    name:"Akash Tripathi",
    email:"tripathiakash065@gmail.com",
    password:"aks@123",
    tokens : [{
        token : jwt.sign({_id:userTwoId} , process.env.JWT_SCERET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId,
    description : 'First Task',
    completed:false,
    owner:userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId,
    description : 'Second Task',
    completed:true,
    owner:userTwoId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId,
    description : 'Third Task',
    completed:false,
    owner:userOneId
}

const setUpDatabase = async()=>{
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
}

const setUpDatabase2 = async()=>{
    await User.deleteMany();
    await new User(userTwo).save();
}
const taskOneId = taskOne._id;

module.exports = {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    taskOneId,
    setUpDatabase
}