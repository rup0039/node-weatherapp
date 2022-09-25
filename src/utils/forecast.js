const request = require("request")

const forecast = function (latitude,longitude,callback) {
    const url = 'http://api.weatherstack.com/current?access_key=c755582e456f3e216a16e1c7b85b46b7&query='+longitude+','+latitude
    request({ url,json:true },(error,{ body }) => {
        if(error){
            callback('Unable to connect to the weather service',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out")
        }
    })
}

module.exports = forecast