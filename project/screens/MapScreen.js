import React,{Component} from 'react';
import {View, Text, ActivityIndicator,Platform,Dimensions} from 'react-native';
import {MapView,Location, Permissions} from 'expo';
import {Spinner} from '../components/common/Spinner'
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Button, Icon, SearchBar} from 'react-native-elements';
import EditText from '../components/common/EditText'

const SCREEN_WIDTH = Dimensions.get('window').width;

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
        search: '',
        region: {
            longitude: -58,
            latitude: -34,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
    }

    
    componentWillReceiveProps(nextProps){
        if(!this.props.location.latitude){
            this.setState({region:{
                latitude: nextProps.location.latitude,
                longitude: nextProps.location.longitude,
                longitudeDelta: 0.04,
                latitudeDelta: 0.09
            }})
        }

    }

    componentDidMount()
    {
        this.setState({mapLoaded: true})
        this.getLocationUpdatesAsync();
        
    }

    getLocationUpdatesAsync = async () => {
        
            let {status} = await Permissions.askAsync(Permissions.LOCATION);
        
            if(status !== 'granted'){
                //call an action creator and set state to permission denied
                console.log('dispathing action permission denied');
                this.props.deniedLocationPermission();
            }else {
                Location.watchPositionAsync(
                    {
                        enableHighAccuracy: true,                
                    },
                    (response) => {
                    console.log('location updated');                        
                           this.props.newLocation({
                           latitude: response.coords.latitude,
                            longitude: response.coords.longitude })
                        
                    }
                );
                //set location state
            }
        
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


    onSearchTextChange = (text) => {
        this.setState({search:text});
    }


    onSearchClearText = () => {
        console.log('clear');
        this.setState({search:''});
    }

    render(){
        if(!this.state.mapLoaded){
            return(
                <Spinner
                />
            );
        }

        return(
            <View style={{flex:1, flexDirection:'column'}}>
                <View style={styles.searchBarContainerStyle}>
                    <EditText
                    onChangeText={(text) => this.setState({search:text})}
                    placeholder="Search for a place"
                    iconName="search"
                    style={{height:120}}
                    showClearIcon= {true}
                    onClearText={() => this.setState({search: ''})}
                    value={this.state.search}
                    ref={et => this.editText  = et}
                    />
                </View>

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

    searchBarContainerStyle:{
        width: SCREEN_WIDTH
    }

   
}


function mapStateToProps(state){
    console.log('mapping state to props in MapScreen');
    return {
        location: state.location.location,
        error: state.location.error
    }
}


export default connect(mapStateToProps,actions)(MapScreen);