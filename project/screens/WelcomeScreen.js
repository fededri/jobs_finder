import React,{Component} from 'react';
import {View, Text,AsyncStorage,Platform,Animated,Dimensions,ViewPagerAndroid} from 'react-native';
import Slides from '../components/Slides'
import _ from 'lodash';
import {AppLoading} from 'expo';
import Swiper from 'react-native-swiper';
import {t} from '../Strings';
import Button from '../components/common/Button';


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
            visibleSwiper: false
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
        console.log('clic');
        const {navigate} = this.props.navigation;
        navigate('auth');
    }

    launchAuthScreen = () => {
        const {navigate} = this.props.navigation;
        navigate('auth');
    }




    render(){

        if(this.state.visibleSwiper){
            return(
               
                <Swiper 
                height={SCREEN_HEIGHT}
                loadMinimal={true}
                dotColor="#90CAF9"
                activeDotColor="#E3F2FD"
                loop={false}>
                    <View key="1" style={ [styles.slide1, {backgroundColor: SLIDE_DATA[0].color}] }>
                        <Text style={styles.text}>{t("welcome")}</Text>
                    </View>
        
                    <View key="2" style={[styles.slide2, {backgroundColor: SLIDE_DATA[1].color}]}>
                        <Text style={styles.text}>{t("use this app for")}</Text>
                    </View>
        
                    <View  key="3" style={[styles.slide3, {backgroundColor: SLIDE_DATA[2].color}, {flexDirection: 'column'}]}>
                        <Animated.View style={{transform:[{translateX: this.translateX}]}}>
                        <Text style={styles.text}>{t("select location")}</Text>
                        </Animated.View>
                        <Animated.View style={{width: 200, height:40, marginTop: 20,
                         transform: [{scale: this.springValue}, {translateX: this.translateX}]}}>
                          <Button
                          onPress={this.translateOut}
                          childrenStyle={{color: '#FFFFFF'}}
                          customStyle={{backgroundColor: '#6ec6ff'}}
                          >OK!</Button>
                        </Animated.View>
                       
                    </View>
                </Swiper>    
        
            
               
               
            );   
        }else {
            return (
                <View style={{flex:1}}>
                    <Text>asd</Text>
                    </View>
            )
        }
     

        if(Platform.OS === 'ios'){
            return(
                <Swiper 
                loadMinimal={true}
                dotColor="#90CAF9"
                activeDotColor="#E3F2FD"
                loop={false}
                style={styles.wrapper}>
                    <View key="1" style={ [styles.slide1, {backgroundColor: SLIDE_DATA[0].color}] }>
                        <Text style={styles.text}>{t("welcome")}</Text>
                    </View>
        
                    <View key="2" style={[styles.slide2, {backgroundColor: SLIDE_DATA[1].color}]}>
                        <Text style={styles.text}>{t("use this app for")}</Text>
                    </View>
        
                    <View  key="3" style={[styles.slide3, {backgroundColor: SLIDE_DATA[2].color}, {flexDirection: 'column'}]}>
                        <Animated.View style={{transform:[{translateX: this.translateX}]}}>
                        <Text style={styles.text}>{t("select location")}</Text>
                        </Animated.View>
                        <Animated.View style={{width: 200, height:40, marginTop: 20,
                         transform: [{scale: this.springValue}, {translateX: this.translateX}]}}>
                          <Button
                          onPress={this.translateOut}
                          childrenStyle={{color: '#FFFFFF'}}
                          customStyle={{backgroundColor: '#6ec6ff'}}
                          >OK!</Button>
                        </Animated.View>
                       
                    </View>
                </Swiper>      
            );
        }else {
            return(
                <ViewPagerAndroid            
                initialPage={0}
                style={[styles.wrapper,{flex:1}]}>
    
                    <View key="1" style={ [styles.slide1, {backgroundColor: SLIDE_DATA[0].color}] }>
                        <Text style={styles.text}>{t("welcome")}</Text>
                    </View>
    
                    <View key="2" style={[styles.slide2, {backgroundColor: SLIDE_DATA[1].color}]}>
                        <Text style={styles.text}>{t("use this app for")}</Text>
                    </View>
    
                    <View  key="3" style={[styles.slide3, {backgroundColor: SLIDE_DATA[2].color}, {flexDirection: 'column'}]}>
                        <Animated.View style={{transform:[{translateX: this.translateX}]}}>
                        <Text style={styles.text}>{t("select location")}</Text>
                        </Animated.View>
                        <Animated.View style={{width: 200, height:40, marginTop: 20,
                         transform: [{scale: this.springValue}, {translateX: this.translateX}]}}>
                          <Button
                          onPress={this.translateOut}
                          childrenStyle={{color: '#FFFFFF'}}
                          customStyle={{backgroundColor: '#6ec6ff'}}
                          >OK!</Button>
                        </Animated.View>
                       
                    </View>
                </ViewPagerAndroid>
               
            );
        }

       
    }
}

styles = {
    wrapper: {
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
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