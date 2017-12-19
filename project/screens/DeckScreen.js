import React,{Component} from 'react';
import {View, Text, Platform,Image, Linking, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import Swipe from '../components/Swipe';
import {MapView} from 'expo';
import {Card, Button, Icon} from 'react-native-elements';
import * as actions from '../actions';
import Swipe2 from '../components/Swipe2';
import {t} from '../Strings';

class DeckScreen extends Component {
    
   
    static navigationOptions = { 
        tabBarLabel: 'Jobs',
        tabBarIcon: ({tintColor}) => {
            return <Icon name="description" size={30} color={tintColor} iconStyle={{width:30, height: 30}} />
        }    
    }



    renderOpenNow = (place) => {
        if(place.opening_hours && place.opening_hours.open_now){
            return(
                
                <Text >{t('now open')}</Text>
                
            );
        }

        return null;
    }


    renderWebSite = (place) => {
        if(place.website){
           return (
            <TouchableOpacity>
                <Text
                onPress= {()=> Linking.openURL(place.website)}
                style={{color: '#00aced'}}
                > aaaa {t("go to web")} </Text>
            </TouchableOpacity>
    
          ); 
        }
      return null;
    }

    renderWebsiteAndOpen = (place) => {
        const website = this.renderWebSite(place);
        const open = this.renderOpenNow(place);

        return (
            <View style={styles.detailWrapper}>
                {website}
                {open}
            </View>
        );
        
    }


    renderPhone(place){
        if(place.international_phone_number){
           return (
        <View style={[styles.detailWrapper,{flexDirection: 'row'}]}>
            
                 <Text style={{flex:0.5, color:'rgb(0,0,0)'}}>{place.international_phone_number}</Text>
                 <Icon  name='call' color='#00aced' />
        </View>);   
        }else return null;
    }

    renderCard = (place) => {
        initialRegion={
            longitude: place.geometry.location.lat,
            latitude: place.geometry.location.lng,
            longitudeDelta: 0.045,
            latitudeDelta: 0.02
        };
        log("DeckSCreen", place);
        return(
            <Card
            containerStyle={styles.cardContainerStyle}
            title={place.name}>
                <View style={{height: 200}}>

                    <Image
                    style={{flex:1, height:200}}
                    source={{uri: place.photo_url}}
                    />            
            
                </View>
                

                <View style={styles.detailWrapper} >
                    <Text > 
                        {place.vicinity}
                    </Text>                      
                </View>
      
                {this.renderPhone(place)}
                {this.renderWebsiteAndOpen(place)}
            </Card>
        );
    }


    likeJob = () => {
        console.log('place liked');
    }

    renderNoMoreCards = () => {
        return(
            <Card
            title="No more places!!"
            >
            <Button
            title="Back to map"
            large
            icon={{name:'my-location'}}
            backgroundColor="#03A9F4"
            onPress={() => this.props.navigation.navigate('map')}
            >

            </Button>
            </Card>
        );
    }


    likeJob = (job) =>{
        this.props.likeJob(job);
    }

    render(){
        return(
            <View>
               <Swipe2
               data={this.props.places}
               renderCard={this.renderCard}
               renderNoMoreCards={this.renderNoMoreCards}
               onSwipeRight = {job => this.props.likeJob(job)}
               keyProp="place_id"
               />
            </View>
        );
    }
}

const styles = {
    detailWrapper: {
       marginTop: 10,
       justifyContent: 'flex-start'
    },
    cardContainerStyle: {
       height:400       
    }
}

function mapStateToProps(state){
    return {
        places: state.placesData.places
    }
}




export default connect(mapStateToProps,actions)(DeckScreen);