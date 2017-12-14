const app = require('express')()
const cors = require('cors')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cors())

const chart = require('./router/chart')

app.use('/', chart)

app.listen(3000, () => {
    console.log('listening on 3000s')
})
