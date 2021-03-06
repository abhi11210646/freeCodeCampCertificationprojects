'use strict';
const got = require("got");
const qs = require("querystring");
const llUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';
const nbsUrl= 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
const imgUrl = 'https://maps.googleapis.com/maps/api/place/photo?';
module.exports  = class GoogleMap{
    
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    
    getGeoLocation(adrs) {
        if(!adrs)
            throw new Error('Pass address parameter');
        checkApiKey(this.apiKey);
     return makeRequest(llUrl, {address: adrs, key: this.apiKey })
       .then((response)=>{
           return JSON.parse(response.body).results[0].geometry.location;
        })
       .catch((error)=>{
           console.log('getgeoloc error', error);
           return error;
       });
    }
    nearBySearch(options) {
        if(!options.geoCode || !options.geoCode instanceof Object) 
            throw new Error('latitude and longitude required and in correct format');
        checkApiKey(this.apiKey);
       return makeRequest(nbsUrl, {location: `${options.geoCode.lat},${options.geoCode.lng}`, radius: 6000, type: options.searchType , key: this.apiKey })
         .then((response)=>{
             return buildResponse(JSON.parse(response.body).results);
        })
       .catch((error)=>{
           console.log('nearbysearch error', error);
           return error;
           
       });
    }
    getPlaceImage(photo_reference) {
        checkApiKey(this.apiKey);
        return makeRequest(imgUrl, { maxwidth: 400, photoreference: photo_reference, key: this.apiKey })
         .then((response)=>{
             return response.url;
        })
       .catch((error)=>{
           console.log('getplaceimg error', error);
           return error;
           
       });
    }
};
function checkApiKey(apiKey) {
    if(!apiKey)
        throw new Error('api key is required');
}
function makeRequest(url, option) {
    return got(url+qs.stringify(option));
}
function buildResponse(responses) {
    return responses.map((response)=>{
            return {
                name: response.name,
                icon: response.icon,
                photo_reference: response.photos? response.photos[0].photo_reference: '',
                address: response.vicinity,
                placeId: response.place_id
            };
    });
}