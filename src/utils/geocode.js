const request = require('request')
const geocode = (address,callback) => {
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1Ijoic2hyZXlhbnNoNDkyIiwiYSI6ImNrbTNzNnc5ZTA5encydm9hODlqNWZtMjgifQ.Lx6UnH6MDpRa6rJ1UFhZFA&limit=1'

    request({url: url, json: true}, (error,response) => {
        if (error) {
            callback('unabe to connect to location service', undefined)
        }
        else if (response.body.features.length === 0 ) {
            callback('Unable to find location try another search', undefined)
        }
        else {
            callback(undefined, {
                // console.log();
                latitude : response.body.features[0].center[0],
                longitude : response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })

        }
    })
}
module.exports = geocode