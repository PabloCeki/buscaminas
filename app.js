const express = require('express');
const env = require('./env.json');
const app = express();

app.use(express.text())
app.use(express.json())


app.use('/buscaminas',require('./buscaminas.route'))

app.listen(env.port || 8888,()=>{
    console.log(`Listening.... on ${env.port}`)
})