import React,{Component} from 'react';
import {View, Text, Platform} from 'react-native';
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

    renderCard(job){

        initialRegion={
            longitude: job.longitude,
            latitude: job.latitude,
            longitudeDelta: 0.045,
            latitudeDelta: 0.02
        };
        return(
            <Card
            title={job.jobtitle}>
            <View style={{height: 300}}>
            <MapView
            scrollEnabled={false}
            style={{flex:1}}
            cacheEnabled={Platform.OS === 'android=' ? true: false}
            initialRegion={initialRegion}
            > 
            
            </MapView>
            </View>
            <View style={styles.detailWrapper}>
                <Text> {job.company} </Text>
                <Text> {job.formattedRelativeTime} </Text>
            </View>


            <Text>
            {job.snippet.replace(/<b>/g,'').replace(/<\/b/g,'')};    
            </Text>

            </Card>
        );
    }


    likeJob = () => {
        console.log('job liked');
    }

    renderNoMoreCards = () => {
        return(
            <Card
            title="No more jobs!"
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
        console.log(`jobs: ${this.props.jobs}`);
        return(
            <View>
               <Swipe
               data={this.props.jobs}
               renderCard={this.renderCard}
               renderNoMoreCards={this.renderNoMoreCards}
               onSwipeRight = {job => this.props.likeJob(job)}
               keyProp="jobkey"
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
    return {jobs: state.jobs.results}
}




export default connect(mapStateToProps,actions)(DeckScreen);