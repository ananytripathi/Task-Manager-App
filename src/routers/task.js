const express = require('express');
const Task = require('../models/tasks');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks',auth , async (req,res)=>{
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner : req.user._id
    })

    try{
       await task.save();
       res.status(201).send(task);
    }catch(e){
       res.status(400).send(e);
    }
    // task.save().then(()=>{
    //     res.status(201).send(task);
    // }).catch((e)=>{
    //     res.status(400).send(e);
    // })
})


//GET /tasks?completed=true
//limit skip
//GET /tasks?limit=10&skip=10
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks',auth, async (req,res)=>{

    const match = {};
    const sort = {};

    if(req.query.completed){
       match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try{
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        });
        const task = req.user.tasks;
        
        if(task.length===0) return res.status(404).send();
        
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }

    // Task.find({}).then((users)=>{
    //     res.send(users);
    // }).catch(()=>{
    //     res.status(500).send();
    // })
})

router.get('/tasks/:id',auth, async (req,res)=>{
    const _id = req.params.id;
    try{
      const task = await Task.findOne({_id , 'owner':req.user._id});
      if(!task){
        return res.status(404).send();
      }
      res.send(task);
    }catch(e){
        res.status(500).send(e);
    }

    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send();
    //     }
    //     res.send(task);
    // }).catch((e)=>{
    //     res.status(500).send(e);
    // })
})



router.patch('/tasks/:id' ,auth, async (req,res)=>{

    const updates = Object.keys(req.body);
    const allowedUpdate = ['description' , 'completed'];
    const isAllowedUpdate = updates.every((update)=>allowedUpdate.includes(update));

    if(!isAllowedUpdate){
        return res.status(404).send({error : 'Invalid Updates!'})
    }

    try{

        const task = await Task.findOne({_id:req.params.id,owner:req.user.id});

        if(!task) return res.status(404).send();

        updates.forEach((update)=> task[update]=req.body[update]);
        await task.save();

    //   const task = await Task.findByIdAndUpdate(req.params.id , req.body , {new:true , runValidators:true});
      res.send(task);
    } catch(e) {
      res.status(500).send(e);
    }

})

router.delete('/tasks/:id',auth , async (req,res)=>{
    try{
       const task = await Task.findOneAndDelete({_id:req.params.id , owner:req.user._id});
       if(!task) return res.status(404).send();
       res.send(task);
    } catch(e){
       res.status(500).send(e);
    }
})


module.exports = router;

