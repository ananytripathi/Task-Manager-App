const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/tasks');
const {userOne , userOneId, userTwo , userTwoId ,taskOneId,setUpDatabase} = require('./fixtures/db');


beforeEach(setUpDatabase);

test('should create task for user', async ()=>{
  const response = await request(app)
                         .post('/tasks')
                         .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
                         .send({
                            description:'From the test'
                         })
                         .expect(201)
})

test('should get all the tasks of a user',async()=>{
   const response = await request(app)
                          .get('/tasks')
                          .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
                          .send()
                          .expect(200)
   expect(response.body.length).toBe(2);
   

})

test('should delete the task by task id', async()=>{
   const response = await request(app)
                          .delete(`/tasks/${taskOneId}`)
                          .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
                          .send()
                          .expect(404)
            
   const task = await Task.findById({_id:taskOneId})

   expect(task).not.toBe(null);
})

// Task Test Ideas
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks