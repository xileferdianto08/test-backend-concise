require('dotenv/config')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

require('./user/routes/user.routes')(app)
require('./group/routes/group.route')(app)
require('./task/routes/task.route')(app)

const { testDbConnection } = require("./database/config");
console.log(testDbConnection);

app.get('/', ()=>console.log(testDbConnection()))
const port = 3000
app.listen(port, () => console.log(`Listening on port ${port}!`))