import axios from 'axios';
import qs from 'qs';
import {
    NEW_PLACES
}from './types';
import {getlanguageCode} from '../utils/locale';
import log from '../log';

const API_KEY = 'AIzaSyC4OUI7KsHfC9u65nA3PQcUlmyjORUz9bc';


//TODO add 'types' parameter
const PLACES_QUERY_PARAMS = {
    key: API_KEY,
    radius: 2000,
    location: '',
    language: getlanguageCode()
};


const PLACE_DETAIL_PARAMS = {
    key: API_KEY,
    placeid: ''
};


const PLACE_PHOTOS_PARAMS = {
    key: API_KEY,
    photoreference: '',
    maxheight: 400
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


const MAX_NUMBER_PLACES = 10;

export const requestPlaces =  (region, callback) => {

    return async (dispatch) => {
        let placesUrl = buildPlacesUrl(region);
        log('fetching url...',placesUrl);
        let {data} = await axios.get(placesUrl);
        let results = data.results;
       
        
        var listOfPlaceDetails = [];
        var photo_urls  = {};

        
        //discard placed witch does not have any photo todisplay
        var filteredResults =   filterPlacesWithouthPhoto(results);
        var n = getAmountOfPlacesToShow(filteredResults);
        //get the details of each place
        listOfPlaceDetails = await getDetailsOfPlaces(filteredResults.slice(0,n));

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
        log(`obtained ${listOfPlaceDetails.length} place details`);
        log(photo_urls);
        //TODO change the payload
        dispatch({type: NEW_PLACES, payload: placeData});
        callback();
    }
}

const getDetailsOfPlaces = async (places) => {
    var array = [];
    await Promise.all(places.map( async (place) => {
        let detailUrl = buildPlaceDetailUrl(place.place_id);
        log('fetching url...',detailUrl);
        let {data} = await axios.get(detailUrl);
        if(data.status === 'OK'){
            array.push(data.result);
        }            
    }));
    return array;
}

const filterPlacesWithouthPhoto = (places) => {
   return places.filter((place)=> {
        return place.photos && place.photos.length >0
    })
}


const getAmountOfPlacesToShow = (places) =>{
    return places.length >= MAX_NUMBER_PLACES? MAX_NUMBER_PLACES: places.length
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