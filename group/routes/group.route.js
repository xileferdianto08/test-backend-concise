const controller = require('../controller/group.controller')


module.exports = function(app){
    app.get('/group', controller.getAllData)
    app.get('/group/:id', controller.getDataById)
    app.post('/group/', controller.addNewGroup)
    app.put('/group/:id', controller.updateGroup)
    app.delete('/group/:id', controller.deleteGroup)
}