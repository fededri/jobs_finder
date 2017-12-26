import axios from 'axios';
import log from '../log';
import {getlanguageCode} from '../utils/locale';
import {
    REGISTER_EMAIL_CHANGE,
    REGISTER_PASSWORD_CHANGE,
    REGISTER_VERIFY_PW_CHANGE,
    REGISTER,
    REGISTER_LOADING
} from './types';

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
   return {
       type: REGISTER_LOADING
   }
}



