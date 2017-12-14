const app = require('express')()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const chart = require('./router/chart')

app.use('/', chart)

app.listen(3000, () => {
    console.log('listening on 3000s')
})
