import React,{Component} from 'react';
import {View, Text,AsyncStorage} from 'react-native';
import Slides from '../components/Slides'
import _ from 'lodash';
import {AppLoading} from 'expo';
const SLIDE_DATA = [
    {text: 'Welcome to JobApp', color:'#03A9F4'},
    {text: 'Use this to get a job', color:'#009688'},
    {text: 'Set your location, then swipe away', color:'#03A9F4'}
];

class WelcomeScreen extends Component {

    state = {token:null}


    async componentWillMount(){
       let token = await AsyncStorage.getItem('fb_token');

       if(token){
           this.props.navigation.navigate('map');
           this.setState({token})
       }else {
        this.setState({token: false});
       }
     
    }

    onSlidesComplete = () =>{ 
        console.log('clic');
        const {navigate} = this.props.navigation;
        navigate('auth');
    }

    render(){

        if(_.isNull(this.state.token)){
            return <AppLoading/>
        }

        return(
            <View 
            style={{flex:1}}
            >
             <Slides
            onComplete={this.onSlidesComplete}
            style={{backgroundColor: 'rgba(200,0,0,1)', flex:1}}
            data={SLIDE_DATA}
            />
            </View>
           
        );
    }
}


export default WelcomeScreen;