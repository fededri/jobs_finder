import {AsyncStorage} from 'react-native';
import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
}
    from './types';
import {Facebook} from 'expo';

export const facebookLogin =  () => {

    return async (dispatch) => {
        let token = await AsyncStorage.getItem('fb_token');
        if(token){
            dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token});
        }else {
            doFacebookLogin(dispatch);
        }
    }
  
};


//helper function for fb login
const doFacebookLogin = async dispatch => {
    let {type,token} = await Facebook.logInWithReadPermissionsAsync('348051995660239',{
        permissions: ['public_profile']
    })

    if(type === 'cancel'){
        return dispatch({type: FACEBOOK_LOGIN_FAIL})
    }

    await AsyncStorage.setItem('fb_token',token);
    dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token});

}