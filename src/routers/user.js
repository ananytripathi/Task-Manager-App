const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const auth = require('../middleware/auth');
const sharp = require('sharp');
const email = require('../emails/accounts')
const router = new express.Router();


router.post('/users', async (req,res)=>{
    const user = new User(req.body)

    try{
      const token = await user.generateAuthToken();
        email.sendWelcomeEmail(user.email,user.name);
        res.status(201).send({user,token});
    }catch(e){
        res.status(400).send(e);
    }

    
    
    // user.save().then(()=>{
    //     res.status(201).send(user);
    // }).catch((err)=>{
    //     res.status(400).send(err);
    // })
})

router.post('/users/login', async (req,res)=>{
   
   try{
      const user = await User.findByCredentials(req.body.email,req.body.password);
      const token = await user.generateAuthToken();
      res.send({user , token});
   } catch(e){
      res.status(400).send({error : e.message});
    }
})


router.get('/users/me',auth,async (req,res)=>{
 
  res.send(req.user);

    // try{
    //    const user = await User.find({});
    //    if(user.length===0) return res.status(404).send();
    //    res.send(user); 
    // }catch(e){
    //    res.status(500).send(e);
    // }

    // User.find({}).then((users)=>{
    //     res.send(users);
    // }).catch((e)=>{
    //     res.status(500).send(e);
    // })
})

router.post('/users/logout',auth,async (req,res)=>{
  try{
    req.user.tokens = req.user.tokens.filter((token)=>{
       return token.token !== req.token;
    })
    await req.user.save();
    res.send()
  }catch(e){
    res.status(500).send({error:e.message});
  }
})

router.post('/users/logoutAll',auth,async (req,res)=>{
  try{
     req.user.tokens = [];
     await req.user.save();
     res.send();
  }catch(e){
     res.status(500).send();
  }
})


// router.get('/users/:id', async (req,res)=>{
//     const _id = req.params.id;

//     try{
//        const user = await User.findById(_id);
//        if(!user){
//         return res.status(404).send();
//        }
//        res.send(user);
//     }catch(e){
//        res.status(500).send(e);
//     }

//     // User.findById(_id).then((user)=>{
//     //     if(!user){
//     //         return res.status(404).send()        
//     //     }
//     //     res.send(user);
//     // }).catch((e)=>{
//     //     res.status(500).send(e);
//     // })
// })


const upload = multer({
  limits:{
    fileSize:1000000
  },
  fileFilter(req,file,cb){
    if(!file.originalname.match(/\.(jpg|jpeg|png)/)){
      return cb(new Error('File must be an image'));
    }
    cb(undefined,true); 
  },
  storage: multer.memoryStorage()
});

router.post('/users/me/avatar', auth , upload.single('avatar'), async (req,res)=>{

  const buffer = await sharp(req.file.buffer).resize({width:50,height:50}).png().toBuffer();
  req.user.avatar = buffer;
  // req.user.avatar = req.file.buffer;
  await req.user.save()
  res.send();
},(err,req,res,next)=>{
  res.status(400).send({error:err.message});
})

router.delete('/users/me/avatar', auth ,async (req,res)=>{
  try{
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch(err) {
     res.status(500).send({error:err.message});
  }

});

router.get('/users/:id/avatar', async (req,res)=>{
  try{
    const user = await User.findById(req.params.id);

    if(!user || !user.avatar){
      throw new Error();
    }

    res.set('Content-Type','image/png');
    res.send(user.avatar);

  } catch(e) {
    res.status(400).send({error:e.message});
  }
})

router.patch('/users/me',auth, async (req,res)=>{
    
    const updates = Object.keys(req.body);
    const allowedUpdate = ['name','email','password','age'];
    const isAllowedUpdate = updates.every((update)=>allowedUpdate.includes(update));

    if(!isAllowedUpdate){
        return res.status(400).send({error:'Invalid Updates!'});
    }

  try{
    updates.forEach((update)=> req.user[update]=req.body[update]);
    await req.user.save();

    // const user = await User.findByIdAndUpdate(req.params.id , req.body , {new:true , runValidators:true});//this can bypass the middleware 

    res.send(req.user);
  }catch(e){
    res.status(400).send(e);
  }
})

router.delete('/users/me',auth, async (req,res)=>{

    try{
      // const user = await User.findByIdAndDelete(req.user._id);
      // if(!user) return res.status(404).send();
      await req.user.deleteOne();
      email.sendDeleteAccountEmail(req.user.email,req.user.name);
      res.send(req.user);
    } catch(e) {
      res.status(500).send(e);
    }
})

module.exports = router;