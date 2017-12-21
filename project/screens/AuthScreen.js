import React,{Component} from 'react';
import {View, Text, AsyncStorage,Image} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Icon,SocialIcon,Divider} from 'react-native-elements';
import {t} from '../Strings';
import Button from '../components/common/Button';

class AuthScreen extends Component {

    

    async componentDidMount(){
    /*let fb_token =  await AsyncStorage.getItem('fb_token');

    if(fb_token){
        this.launchMapScreen();
    }*/
    }


    componentWillReceiveProps(nextProps){
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props){
        if(props.token){
            this.launchMapScreen();
        }
    }


    launchMapScreen = () => {
        this.props.navigation.navigate('map');
    }

    render(){
        return(
            <View
            style={styles.rootStyle}
            >
                <View    style={styles.logoStyle}>
                    <Image  
                    style={styles.imageStyle}               
                    source={{uri: 'http://www.singaporeg.sg/images/Login.png'}}
                    /> 
                </View>
              

                <View
                style={styles.loginStyle}
                >
                    <SocialIcon
                    style={styles.fbStyle}
                    title='Sign In With Facebook'
                    button
                    type='facebook'
                    onPress={()=> {this.props.facebookLogin()}}
                    />

                    <View style={styles.mailContainerStyle}>
                        <Button
                        customStyle={styles.mailStyle}
                        childrenStyle={{color: '#FFFFFF'}}
                        >
                            Sign Up with email
                        </Button>
                    </View>
                   
                </View>



            </View>
        );
    }
}


function mapStateToProps({auth}){
    return {token: auth.token}
}

const styles = {
    rootStyle:{
        flexDirection: 'column',
        flex:2,
        backgroundColor: '#C5CAE9'
    },
    logoStyle:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'  
    },
    imageStyle:{
        flex:1,
        width: 200,
        height:200
    },
    loginStyle:{
        flex:1,
        marginTop: 20,
        justifyContent:'center'
    },
    fbStyle:{
        marginRight: 20,
        marginLeft:20
    },
    mailContainerStyle:{
        height:50,
        marginTop:10
    },
    mailStyle:{
        marginRight: 20,
        marginLeft:20,
        backgroundColor: '#3949AB',      
        borderRadius:30
    }
}

export default connect(mapStateToProps,actions)(AuthScreen);