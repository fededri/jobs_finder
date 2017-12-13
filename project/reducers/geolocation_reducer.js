import {
    NEW_LOCATION,
    LOCATION_PERMISSION_DENIED
} from '../actions/types';

const TAG = 'GeolocationReducer: '

const INITIAL_STATE = {
    location: {},
    error: ''
};



export default function (state = INITIAL_STATE,action){

    switch (action.type) {
        case NEW_LOCATION:
            console.log('runnnig reducer NEW LOCATION');
            return {location: action.payload, error: ''};

        case LOCATION_PERMISSION_DENIED:
            console.log(`${TAG} location was denied`);
            return {location: {}, error: 'The location permission has been denied'}

        default:
            return state;
    }

}