const express = require("express");
const { verifyLogin } = require('./filters/verifyLogin')
const { registerUser, loginUser, getUser } = require('./controllers/user');
const { allTasks, allTasksDone, newTask, taskDone, editTask, deleteTask, deleteTaskDone } = require('./controllers/tasks');

const routes = express();

routes.post('/sign-up', registerUser);
routes.post('/login', loginUser);

routes.use(verifyLogin);

routes.get('/user', getUser);

routes.get('/task/:id', allTasks)
routes.get('/done/:id', allTasksDone)
routes.post('/task/:id', newTask);
routes.post('/done/:id', taskDone);
routes.put('/task/:id', editTask);
routes.delete('/task/:id', deleteTask);
routes.delete('/done/:id', deleteTaskDone);

module.exports = routes;