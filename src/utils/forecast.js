const request = require('request')
const forecast = (longitude,latitude,callback) => {
    const url= 'http://api.weatherstack.com/current?access_key=1a5b2442dec535d374675dc1139d0a32&query='+ longitude+','+ latitude

    request({url: url,json:true},(error,response) => {
        if (error) {
            callback('unabe to connect to location service', undefined)
        }
        else if (response.body.error) {
            callback('Unable to find location try another search', undefined)
            
        }
        else {
            callback( undefined,"The weather is " + response.body.current.weather_descriptions[0] + "with a temperature of "+ response.body.current.temperature + " degree fahrenheit")

            
        }
    })

}
module.exports = forecast
