const request = require('request')

const forecast = (latitude,longitude,callback) => {
    
    const url = "http://api.weatherstack.com/current?access_key=c755582e456f3e216a16e1c7b85b46b7&query="+latitude+","+longitude+"&units=f"
    
    request({url, json: true},(error,{body}) => {
        if(error){
        callback("Unable to connect to the weather service !")
    } else if(body.error){
        callback("Unable to find location ")
    } else{
        callback(undefined,
            body.current.weather_descriptions+", It is currently "+body.current.temperature+" degrees out,but feels like "+body.current.feelslike+" with humidity of "+body.current.humidity
            )
        
    }
    
})

}

module.exports = forecast