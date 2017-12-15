import axios from 'axios';
import qs from 'qs';
import {
    NEW_PLACES
}from './types';


const API_KEY = 'AIzaSyC4OUI7KsHfC9u65nA3PQcUlmyjORUz9bc';


const PLACES_QUERY_PARAMS = {
    key: API_KEY,
    radius: 2000,
    location: ''
};


const PLACE_DETAIL_PARAMS = {
    key: API_KEY,
    placeid: ''
};


const PLACE_PHOTOS_PARAMS = {
    key: API_KEY,
    photoreference: '',
    maxwidth: 1000,
    maxheight: 1000
}

/**
 * Requiere pasar por parametro
 * Key
 * location (latitud,longitud)
 * radius in meters
 * Reference: https://developers.google.com/places/web-service/search?hl=es-419
 */
const ROOT_PLACES_API= 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';


/*
*Requiere
key
placeid or reference
*/
const ROOT_PLACES_DETAIL_API = 'https://maps.googleapis.com/maps/api/place/details/json?';


const ROOT_PLACE_PHOTOS_API = 'https://maps.googleapis.com/maps/api/place/photo?'; 


const MAX_NUMBER_PLACES = 20;

export const requestPlaces =  (region, callback) => {

    return async (dispatch) => {
        let placesUrl = buildPlacesUrl(region);
        console.log('fetching url...',placesUrl);
        let {data} = await axios.get(placesUrl);
        let results = data.results;
       
        var n = results.length >= MAX_NUMBER_PLACES? MAX_NUMBER_PLACES: results.length
        var listOfPlaceDetails = [];
        var photo_urls  = {};

        //get the details of each place
        await Promise.all(results.slice(0,n).map( async (place) => {
            let detailUrl = buildPlaceDetailUrl(place.place_id);
            console.log('fetching url...',detailUrl);
            let {data} = await axios.get(detailUrl);
            if(data.status === 'OK'){
                listOfPlaceDetails.push(data.result);
            }            
        }));


        //For each place build a photo_url
        await Promise.all(listOfPlaceDetails.map( place => {
            if(place.photos &&  place.photos[0]){
                place["photo_url"] = getPhotoUrl(place.photos[0].photo_reference);
            }
           
        }))
        var placeData= {
            places: listOfPlaceDetails,
            photo_urls
        }
        console.log(`obtained ${listOfPlaceDetails.length} place details`);
        console.log(photo_urls);
        dispatch({type: NEW_PLACES, payload: placeData});
        callback();
    }
}


const buildPlacesUrl = ({latitude,longitude}) => {
    const query = qs.stringify({...PLACES_QUERY_PARAMS, location: `${latitude},${longitude}` });
    return `${ROOT_PLACES_API}${query}`
}


const buildPlaceDetailUrl = (placeid) => {
    const query = qs.stringify({...PLACE_DETAIL_PARAMS, placeid: placeid})
    return `${ROOT_PLACES_DETAIL_API}${query}`;
}

const getPhotoUrl = (photoReference) => {
    const query = qs.stringify({...PLACE_PHOTOS_PARAMS, photoreference: photoReference});
    return `${ROOT_PLACE_PHOTOS_API}${query}`;
}