const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define Paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handle bars and view location
app.set('views',viewPath)
app.set('view engine','hbs') // sets handlebar for express
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather',
        name : 'Andrew Mead'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About me',
        name : 'Andrew Mead'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpText : 'This is help Page',
        title : 'Help',
        name : 'Andrew Mead'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide the address'
    })
}
geoCode(req.query.address,(error,{ latitude,longitude,location } = {}) => {
    if(error) {
        return res.send({ error })
    }
    //res.send(geoCodedata)
    forecast(latitude,longitude,(ferror,forecastData) => {
        if(error){
            return res.send({ error })
        }
        res.send({
            forecast : forecastData,
            location,
            address : req.query.address
        })
    })
})
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        errorMsg : 'Help Article not found',
        title : '404',
        name : 'Andrew Mead'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        errorMsg : 'Page not found',
        title : '404',
        name : 'Andrew Mead'
    })
})

app.listen(port,() => {
    console.log('Server is up on port '+ port)
})