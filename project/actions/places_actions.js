import axios from 'axios';
import qs from 'qs';
import {
    NEW_PLACES
}from './types';


const API_KEY = 'AIzaSyC4OUI7KsHfC9u65nA3PQcUlmyjORUz9bc';


const PLACES_QUERY_PARAMS = {
    key: API_KEY,
    radius: 10,
    location: ''
};

/**
 * Requiere pasar por parametro
 * Key
 * location (latitud,longitud)
 * radius
 * Reference: https://developers.google.com/places/web-service/search?hl=es-419
 */
const ROOT_PLACES_API= 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';


const ROOT_PLACES_DETAIL_API = 'https://maps.googleapis.com/maps/api/place/details/json?';

export const requestPlaces =  (region) => {

    return async (dispatch) => {
        let url = buildPlacesUrl(region);
        console.log('fetching url...',url);
        let {data} = await axios.get(url);
        console.log("obtained places: ", data);
        dispatch({type: NEW_PLACES, payload: data});
    }
}


const buildPlacesUrl = ({latitude,longitude}) => {

    const query = qs.stringify({...PLACES_QUERY_PARAMS, location: `${latitude},${longitude}` });
    return `${ROOT_PLACES_API}${query}`

}