import {
    REGISTER_EMAIL_CHANGE,
    REGISTER_PASSWORD_CHANGE,
    REGISTER_VERIFY_PW_CHANGE
}from '../actions/types';

const INITIAL_STATE  = {
    email: '',
    password: '',
    passwordMatches: false
}

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case REGISTER_EMAIL_CHANGE:
        return {...state,email: action.payload}

        case REGISTER_PASSWORD_CHANGE:
        return {...state, passwordMatches: false, password: action.payload}

        case REGISTER_VERIFY_PW_CHANGE:
        return {...state, passwordMatches: state.password === action.payload}

        default:
            return state;
    }
}