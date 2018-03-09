import {
    REGISTER_EMAIL_CHANGE,
    REGISTER_PASSWORD_CHANGE,
    REGISTER_VERIFY_PW_CHANGE,
    REGISTER,
    REGISTER_LOADING,
    REGISTER_ERROR,
    REGISTER_CLEAR_ERRORS
}from '../actions/types';

const INITIAL_STATE  = {
    email: '',
    password: '',
    passwordMatches: false,
    loading: false,
    error: false,
    errorMessage: ''
}

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case REGISTER_EMAIL_CHANGE:
        return {...state,email: action.payload}

        case REGISTER_PASSWORD_CHANGE:
        return {...state, passwordMatches: false, password: action.payload}

        case REGISTER_VERIFY_PW_CHANGE:
        return {...state, passwordMatches: state.password === action.payload}

        case REGISTER_LOADING:
        console.log('register loading',state)
        return {...state,loading: true}

        case REGISTER:
        console.log('reducing register action')
        return {...state, loading: false}

        case REGISTER_ERROR:
        return {...state, error: true, errorMessage: action.payload.message, loading: false}


        case REGISTER_CLEAR_ERRORS:

        return {...state, error: false, errorMessage: ''}

        default:
            return state;
    }
}