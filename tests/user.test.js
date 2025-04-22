const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const User = require('../src/models/user')
const {userOne , userOneId , setUpDatabase , setUpDatabase2} = require('./fixtures/db');


beforeEach(setUpDatabase);


test('should signup a new user', async ()=> {

    const response = await request(app).post('/users').send({
        name:'Rano Pathak',
        email:'ananytripathi064@gmail.com',
        password : 'rano@123'
    }).expect(201);

    //Assert that the database was changed correctly
    const user =  await User.findById(response.body.user._id);
    expect(user).not.toBe(null);

    //Assert about the response
    expect(response.body).toMatchObject({
        user:{
            name:'Rano Pathak',
            email:'ananytripathi064@gmail.com'
        },
        token: user.tokens[0].token

    })

    expect(user.password).not.toBe('rano@123');


});

test('should login existing user', async ()=>{
    const response = await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200);

    const user = await User.findById(response.body.user._id);
    expect(response.body.token).toBe(user.tokens[1].token);

})

test('should not login new user', async ()=>{
    await request(app).post('/users/login').send({
        email:'atp@exp.com',
        password:'atp123!'
    }).expect(400);
})

test('should get profile for user', async ()=>{
   await request(app).get('/users/me')
           .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
           .send()
           .expect(200);
});

test('should not get profile for user', async ()=>{
    await request(app).get('/users/me')
          .send()
          .expect(401);
})

test('should delete account for user' , async ()=>{
    const response = await request(app).delete('/users/me')
          .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
          .send()
          .expect(200)

    const user = await User.findById(response.body._id);
    expect(user).toBeNull();
})

test('should not delete account for unauthenticated user' , async ()=>{
    await request(app).delete('/users/me')
         .send()
         .expect(401);
})

test('should upload avatar image', async ()=>{
    await request(app)
          .post('/users/me/avatar')
          .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
          .attach('avatar','tests/fixtures/avatar.jpeg')
          .expect(200)

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
})

test('should update valid user fields',async ()=>{
    await request(app)
          .patch('/users/me')
          .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
          .send({
            name:'Aditya Karmkar'
          })
          .expect(200)

    const user = await User.findById(userOneId);
    expect(user.name).toEqual('Aditya Karmkar');
})

test('should not update invalid user fields',async ()=>{
    await request(app)
          .patch('/users/me')
          .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
          .send({
            location : 'Phelidelphia'
          })
          .expect(400)
})
// Jest intentionally waits for beforeEach to fully complete (including all awaits) before running the test. This is a special behavior of test runners, not standard JavaScript execution. Here's why:

// beforeEach is a hook:

// Jest treats beforeEach as a synchronization point.

// It pauses test execution until the hook's await resolves.

// Test doesn't start until beforeEach finishes:

// Even though await in regular code would yield control, Jest's hook system holds the test in a queue until the hook completes.


// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated