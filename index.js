'use strict'
const router = require('./routers/routes')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const hbs = require('express-handlebars')

const app = express()

const methodOverride = require('method-override')
app.use (methodOverride('_method'))

//body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//motor de vistas
app.engine('.hbs', hbs({
    defaultLayout: 'index',
    extname: '.hbs'
}))

app.set('view engine', '.hbs')

//Recursos publicos
app.use('/static', express.static('public'))

//Router our app

app.use('/', router)

//Conexion a la BD
mongoose.connect(config.db, config.urlParser, (err, res) => {

    if (err) {
        return console.log(`Error al conectar en la BD ${err}`)
    }

    console.log('Conexion a la BD exitosa')

    app.listen(config.port, () => {
        console.log(`Ejecutando en hmongodb+srv://vasquez:16210586@cluster0.gvflt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority:${config.port}`)
    })
})