import React,{Component} from 'react';
import {View, Text, Platform,Image} from 'react-native';
import { connect } from 'react-redux';
import Swipe from '../components/Swipe';
import {MapView} from 'expo';
import {Card, Button, Icon} from 'react-native-elements';
import * as actions from '../actions';

class DeckScreen extends Component {
    
   
    static navigationOptions = { 
        tabBarLabel: 'Jobs',
        tabBarIcon: ({tintColor}) => {
            return <Icon name="description" size={30} color={tintColor} iconStyle={{width:30, height: 30}} />
        }    
    }

    renderCard(place){
        console.log('rendering place',place);
        initialRegion={
            longitude: place.geometry.location.lat,
            latitude: place.geometry.location.lng,
            longitudeDelta: 0.045,
            latitudeDelta: 0.02
        };
        return(
            <Card
            title={place.name}>
            <View style={{height: 300}}>

            <Image
            style={{flex:1}}
            source={{uri: place.photo_url}}
            />            
         
            </View>
            <View style={styles.detailWrapper}>
                <Text> {place.vicinity} </Text>
                <Text> {place.international_phone_number} </Text>
            </View>


            <Text>
            Some Other stuff    
            </Text>

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
               <Swipe
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
    }
}

function mapStateToProps(state){
    return {
        places: state.placesData.places
    }
}




export default connect(mapStateToProps,actions)(DeckScreen);