const controller = require('../controller/task.controller')

module.exports = (app) =>{
    app.get('/task', controller.getAllData)
    app.get('/task/taskId/:id', controller.getDataByTaskId)
    app.get('/task/userId/:userId', controller.getDataByUserId)
    app.post('/task', controller.addNewTask)
    app.put('/task/:id', controller.updateTask)
    app.delete('/task/:id', controller.deleteTask)
}