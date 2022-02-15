const path = require('path') 
const express = require('express')
const hbs= require('hbs')
const geocode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../template/view')
const partialPath = path.join(__dirname,'../template/partials')

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.get('',(req,res) => {
    res.render('index',{
        title: 'weather app',
        name : 'Rupesh Roy'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Rupesh Roy'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helptext : 'Help page',
        title: 'Help',
        name: 'Rupesh Roy'
    })
})


app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'Please provide the address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if(error){
            return res.send( {error} )
        }
        forecast(latitude,longitude,(error,forecastdata) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastdata,
                location,
                address : req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res) => {
    res.render('error',{
        title: '404',
        name : 'Rupesh Kumar',
        errormsg : 'Help content not found'
    })
})

app.get('*',(req,res) => {
    res.render('error',{
        title: '404',
        name : 'Rupesh Kumar',
        errormsg : 'page not found'
    })
})

app.listen(port,() => {
    console.log('Server is up on port '+ port)
})