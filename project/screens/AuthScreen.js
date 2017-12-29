import React,{Component} from 'react';
import {View, Text, AsyncStorage,
    Image,Animated, 
    Easing,
    LayoutAnimation,
    UIManager,
    PanResponder,
    Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Icon,SocialIcon,Divider} from 'react-native-elements';
import {t} from '../Strings';
import Button from '../components/common/Button';
import CustomLayoutSpring from '../animations/CustomLayoutSpring';

const width = Dimensions.get('window').width;

class AuthScreen extends Component {


    static navigationOptions = { 
       header: null        
    }

    constructor(props){
        super(props);
        this.alphaValue = new Animated.Value(0);
        this.springValue = new Animated.Value(0);
        this.rotateValue= new Animated.Value(0);
       

        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    async componentDidMount(){
        this.animateButtons();
        this.rotateAnimation();
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
    
        this.springValue.setValue(10);
        Animated.spring(
            this.springValue,{
                toValue: 0,
                mass: 2
            }
        ).start();

    }


    rotateAnimation = () => {
            this.rotateValue.setValue(0);
            Animated.timing(
                this.rotateValue,
                {
                    toValue: 1,
                    duration: 6000,
                    easing: Easing.linear
                }
            ).start(()=> this.rotateAnimation())        
      
    }


    launchRegister  = () => {
        const {navigate} = this.props.navigation;
        navigate('register');
    }

    render(){
    

    const rotate = this.rotateValue.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg','-360deg']
    });


    const rotateDown = this.rotateValue.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg','720deg']
    })

    const rotateFast = this.rotateValue.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg','-1080deg']
    })
        return(
            <View
            style={styles.rootStyle}
            >


                <View    style={styles.logoStyle}>

                    <Animated.Image  
                    resizeMode='contain'
                    style={[styles.imageStyle, {marginBottom:5, transform: [{rotate}]}]}               
                    source={require('../assets/ic_settings.png')}
                    /> 
                    

                    <View style={{flexDirection: 'row'}}>
                        <Animated.Image  
                        resizeMode='contain'
                        style={[styles.imageStyle, {width: 75, height: 75,marginRight: 35,marginTop: -105},  {transform: [{ rotate: rotateDown}]} ]}               
                        source={require('../assets/ic_settings.png')}
                        /> 

                        <Animated.Image  
                        resizeMode='contain'
                        style={[styles.imageStyle, {width: 35, height: 35, position: 'absolute', right: width/2 -52, top:-80},  {transform: [{ rotate:rotateFast}]} ]}               
                        source={require('../assets/ic_settings.png')}
                        /> 

                    </View>
                  
                </View>
              

                <Animated.View
                
                style={[styles.loginStyle]}
                >
                    <Animated.View style={[styles.fbStyle, 
                                    {marginLeft: this.springValue, marginRight: this.springValue, marginBottom: this.springValue}]}>
                        <SocialIcon
                        title='Sign In With Facebook'
                        button
                        type='facebook'
                        onPress={()=> {this.props.facebookLogin()}}
                        />
                    </Animated.View>
                  

                    <Animated.View style={[styles.mailContainerStyle,
                         {marginLeft: this.springValue, marginRight: this.springValue, marginTop: this.springValue}]}>
                        <Button
                        onPress={this.launchRegister}
                        icon="email"
                        iconColor="#FFFFFF"
                        customStyle={styles.mailStyle}
                        childrenStyle={{color: '#FFFFFF'}}
                        >
                            Sign Up with email
                        </Button>
                    </Animated.View>
                   
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
        marginTop:20,
        flex:1,
        justifyContent: 'center',
        alignItems:'center'  
    },
    imageStyle:{
        flex:1,
        width: 120,
        height:120
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