import axios from 'axios';
import log from '../log';
import {getlanguageCode} from '../utils/locale';
import {
    REGISTER_EMAIL_CHANGE,
    REGISTER_PASSWORD_CHANGE,
    REGISTER_VERIFY_PW_CHANGE,
    REGISTER,
    REGISTER_LOADING,
    REGISTER_ERROR,
    REGISTER_CLEAR_ERRORS
} from './types';
import * as firebase from 'firebase'

const TAG = 'RegisterActions';

export const emailChanged = (email) => {
    return {
        type: REGISTER_EMAIL_CHANGE,
        payload: email
    };
}

export const passwordChanged = (password) => {
    return {
        type: REGISTER_PASSWORD_CHANGE,
        payload: password
    };
}


export const passwordCheckChanged = (password) => {   
    return {
        type: REGISTER_VERIFY_PW_CHANGE,
        payload: password
    };
}


export const registerLoading = () => {
    console.log('Dispatching REGISTER_LOADING action');
   return {
       type: REGISTER_LOADING
   }
}


export const register = (email, password) =>async (dispatch) => {
    console.log('Dispatcing register action')
    try{
        let response =  await firebase.auth().createUserWithEmailAndPassword(email,password);
        console.log(`user registered, response: ${JSON.stringify(response)}`)
        dispatch({type: REGISTER, payload: response})
        
    }catch(err){
        console.log(`error ${err}`)
        dispatch({type: REGISTER_ERROR, payload: err})
        
    }


    
    
};


export const clearErrors  = () => {
    
    return {
        type: REGISTER_CLEAR_ERRORS
    }
}



