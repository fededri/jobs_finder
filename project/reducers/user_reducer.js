import {
    REGISTER,
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
}from '../actions/types';

const INITIAL_STATE  = {
  
}

export default function  (state = INITIAL_STATE, action){

    switch (action.type) {
        case REGISTER:
         return action.payload;

    
        default:
            return state;
    }
  
}
