import {
    NEW_PLACES
}from '../actions/types';


const INITIAL_STATE= {
    places: [],
    photo_urls: {} 
};

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case NEW_PLACES:
        return action.payload;

        default:
            return state;
    }
}