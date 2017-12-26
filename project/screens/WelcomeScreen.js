import React,{Component} from 'react';
import {View, Text,AsyncStorage,Platform,Animated,Dimensions,
    ViewPagerAndroid,
     UIManager,
     LayoutAnimation,
     ActivityIndicator
    } from 'react-native';
import Slides from '../components/Slides'
import _ from 'lodash';
import {AppLoading} from 'expo';
import Swiper from 'react-native-swiper';
import {t} from '../Strings';
import Button from '../components/common/Button';
import WelcomeComponent from '../components/WelcomeComponent';



const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const SLIDE_DATA = [
    {text: 'Welcome to JobApp', color:'#1565C0'},
    {text: 'Use this to get a job', color:'#1976D2'},
    {text: 'Set your location, then swipe away', color:'#1E88E5'}
];

class WelcomeScreen extends Component {

   

    constructor(props){
        super(props);
        
        this.springValue = new Animated.Value(0.8);
        this.translateX = new Animated.Value(0);
        this.state = {
            visibleSwiper: false,
            index: 0
         };
   
    }



    spring(){
        this.springValue.setValue(0.8);
        Animated.spring(
            this.springValue,{
                toValue: 1,
                mass: 0.2
            }
        ).start(()=> this.springBack());
    }


    springBack(){
        this.springValue.setValue(1);
        Animated.spring(
            this.springValue,{
                toValue: 0.8,
                mass: 0.2
            }
        ).start(()=> this.spring());
    }

    translateOut = () => {
        this.translateX.setValue(0);
        Animated.timing(
            this.translateX,
            {
                toValue: -SCREEN_WIDTH,
                duration: 500
            }
        ).start(()=> this.launchAuthScreen());
    }

   /* async componentWillMount(){
       let first_time = await AsyncStorage.getItem('first_time');

       if(first_time !== undefined){
           this.props.navigation.navigate('auth');
       }
     
    } */

    componentDidMount(){
        this.spring();
        AsyncStorage.setItem('first_time','true');
        setTimeout(() => {
            this.setState({
              visibleSwiper: true
            });
         }, 100);
    }

    onSlidesComplete = () =>{ 
        const {navigate} = this.props.navigation;
        navigate('auth');
    }

    launchAuthScreen = () => {
        const {navigate} = this.props.navigation;
        navigate('auth');
    }



    onSwiperIndexChanged = (index) => {           
        
        switch (index) {
            case 0:
                this.w1.animate();
                break;

            case 1:
            this.w2.animate();
                break;

            case 2:
            this.w3.animate();
                break;
        
            default:
                break;
        }
    }


    render(){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
       
       
        if(this.state.visibleSwiper){
            return(
               
                <Swiper 
                height={SCREEN_HEIGHT}
                loadMinimal={true}
                dotColor="#90CAF9"
                loop={false}
                onIndexChanged={this.onSwiperIndexChanged}
                activeDotColor="#E3F2FD">
                    <View key="1" style={ [styles.slide1, {backgroundColor: SLIDE_DATA[0].color}] }>
                       <WelcomeComponent
                       textStyle={styles.text}
                       text={t("welcome")}
                       ref={(comp)=> {this.w1 = comp}}
                       />
                    </View>
        
                    <View key="2" style={[styles.slide2, {backgroundColor: SLIDE_DATA[1].color},
                        ]}>
                        <WelcomeComponent
                        textStyle={styles.text}
                        ref={(comp)=> {this.w2 = comp}}
                        text={t("use this app for")}
                       />
                    </View>
        
                    <Animated.View  key="3"
                     style={[styles.slide3, {backgroundColor: SLIDE_DATA[2].color}, {flexDirection: 'column'},
                            {transform: [{translateX: this.translateX}]}
                    ]}>                           
                                <WelcomeComponent
                                textStyle={styles.text}
                                ref={(comp)=> {this.w3 = comp}}
                                text={t("select location")}
                                showButton={true}             
                                onPress={this.translateOut}           
                                />                                      
                    </Animated.View>
                </Swiper>    
        
            
               
               
            );   
        }else {
            return (
                <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                   <ActivityIndicator
                    size={'large'}
                    color="#FF0000"
                    animating={true} />
                    </View>
            )
        }       
    }
}

styles = {
    wrapper: {
    },
    slide1: {
      flex: 1,
      alignItems: 'center'
    },
    slide2: {
      flex: 1,
      alignItems: 'center'
    },
    slide3: {
      flex: 1,
      alignItems: 'center'
    },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
        marginLeft: 5,
        marginRight:5,
        ...Platform.select({
            ios:{

            },
            android:{
                textAlignVertical: 'center'
            }
        })
      }
}


export default WelcomeScreen;