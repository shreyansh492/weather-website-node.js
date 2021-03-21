const path= require('path')
const express = require('express')
const hbs = require('hbs')

const geocode= require('./utils/geocode.js')
const forecast= require('./utils/forecast.js')

const app= express()
const port = process.env.PORT || 3000  

// Defining Paths for Express Config
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const publicDirPath= path.join(__dirname,'../public')

//Setup handle bars engine and views location 
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req,res)=> {
    res.render('index', {
        title: "Index page",
        name: "Shreyansh Pandey"
    })
})
app.get('/about', (req,res)=> {
    res.render('about', {
        title: "This page is about me",
        name: "Shreyansh Pandey"
    })
})
app.get('/help', (req,res)=> {
    res.render('help', {
        helpText: "This is some helpful text",
        title: "help",
        name: "Shreyansh Pandey"
    })
})
app.get('/weather', (req,res)=>{
    if (!req.query.address) {
        return res.send({
           error: "provide address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=> {
        if (error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error,forecastData)=> {
            if (error) {
                return res.send({error})
                console.log(2);

            }

            res.send({
                forecast: forecastData,
                location,
                location: req.query.address
             })
        })
    })
    
})
app.get('/product', (req,res)=>{
    if (req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send({
        products: []
    })

})
app.get('*', (req,res)=> {
    res.render('404',{
        title: "404",
        errorMessage: "error hai baba !!",
        name: "Shreyansh Pandey"
    })
})

console.log(__dirname)
// console.log(__filename);
console.log(path.join(__dirname,'../public'))

app.listen(port, () => {
    console.log("server is up on port "+ port);
})