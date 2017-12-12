import React,{Component} from 'react';
import {View, Text, ActivityIndicator,Platform} from 'react-native';
import {MapView} from 'expo';
import {Spinner} from '../components/common/Spinner'
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Button, Icon} from 'react-native-elements';



class MapScreen extends Component {

    static navigationOptions = { 
        title: 'Map',
        tabBarLabel: 'Map',
        tabBarIcon: ({tintColor}) => {
            return <Icon name="my-location" size={30} color={tintColor}  iconStyle={{width:30, height: 30, justifyContent:'center'}}/>
        },
        
    }

    state = {
        mapLoaded: false,
        loading: false,
        region: {
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
    }


    componentDidMount(){
        this.setState({mapLoaded: true})
        
}


    onRegionChangeComplete = (region) => {
        console.log(region);
        this.setState({region});
    }


    onButtonPress = () => {
        this.setState({loading:true})
        this.props.fetchJobs(this.state.region, () => {
            this.setState({loading:false})
            this.props.navigation.navigate('deck');
        });
    }

    render(){
        if(!this.state.mapLoaded){
            return(
                <Spinner
                />
            );
        }

        return(
            <View style={{flex:1}}>
                <MapView
                onRegionChangeComplete={this.onRegionChangeComplete}
                region= {this.state.region}
                style={{flex:1}}
                />

                <View
                style={styles.buttonContainer}
                >
                    <Button
                    loading={this.state.loading}
                    rightIcon={{name:'search'}}
                    title="Search this Area"
                    onPress={this.onButtonPress}
                    backgroundColor="#2196F3"
                    buttonStyle={{flex:1, justifyContent:'center', alignItems:'center'}}
                    />
                </View>
            </View>
        );
    }
}

const styles={
    buttonContainer:{
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        justifyContent:'center'
    },

   
}


export default connect(null,actions)(MapScreen);