import React,{Component} from 'react';
import {View, Text, Platform,Image, Linking, TouchableNativeFeedback} from 'react-native';
import { connect } from 'react-redux';
import Swipe from '../components/Swipe';
import {MapView} from 'expo';
import {Card, Button, Icon} from 'react-native-elements';
import * as actions from '../actions';
import Swipe2 from '../components/Swipe2';


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
                <View
                style={styles.detailWrapper}
                >
                <Text> Abierto ahora! </Text>
                </View>
            );
        }

        return null;
    }


    renderWebSite = (place) => {
        if(place.website){
           return (
            <TouchableNativeFeedback>
                <Text
                onPress= {()=> Linking.openURL(place.website)}
                style={{color: 'rgb(80,0,250)'}}
                > visitar sitio web </Text>
            </TouchableNativeFeedback>
    
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
                <View style={{height: 300}}>

                    <Image
                    style={{flex:1}}
                    source={{uri: place.photo_url}}
                    />            
            
                </View>
                
                <View style={styles.detailWrapper}>
                    <Text style={{flex:1, textAlign: 'center', textAlignVertical:'center'}}> {place.vicinity} </Text>
                    <Text style={{flex:1}}> {place.international_phone_number} </Text>
                </View>

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
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    cardContainerStyle: {
       
       
    }
}

function mapStateToProps(state){
    return {
        places: state.placesData.places
    }
}




export default connect(mapStateToProps,actions)(DeckScreen);