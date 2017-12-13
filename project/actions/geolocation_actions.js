import {
NEW_LOCATION,
LOCATION_PERMISSION_DENIED
}from './types';


export const newLocation = ({latitude,longitude}) => {
    return{
        type: NEW_LOCATION,
        payload: {latitude,longitude}
    }
}


export const deniedLocationPermission = () => {
    return{
        type: LOCATION_PERMISSION_DENIED
    }
}