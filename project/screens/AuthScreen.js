import React,{Component} from 'react';
import {View, Text, AsyncStorage,Image,Animated, Easing,LayoutAnimation,UIManager} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Icon,SocialIcon,Divider} from 'react-native-elements';
import {t} from '../Strings';
import Button from '../components/common/Button';

class AuthScreen extends Component {

    constructor(props){
        super(props);
        this.alphaValue = new Animated.Value(0);
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    async componentDidMount(){
        this.animateButtons();
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


    animateButtons= () => {
        this.alphaValue.setValue(0);
        Animated.timing(
            this.alphaValue,
            {
                toValue:1,
                duration: 1000
            }
        ).start();
    }

    render(){
    LayoutAnimation.spring();
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
              

                <Animated.View
                
                style={[styles.loginStyle,{opacity: this.alphaValue}]}
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
                        icon="email"
                        iconColor="#FFFFFF"
                        customStyle={styles.mailStyle}
                        childrenStyle={{color: '#FFFFFF'}}
                        >
                            Sign Up with email
                        </Button>
                    </View>
                   
                </Animated.View>



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
        borderRadius:30,
        elevation: 2,
        borderWidth:0
    }
}

export default connect(mapStateToProps,actions)(AuthScreen);