import React,{Component} from 'react';
import {View, Text, Platform, ScrollView,Linking} from 'react-native';
import {Button,Card,Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {MapView} from 'expo';

class ReviewScreen extends Component {

  
  

    static navigationOptions = ({navigation}) => ({
        title: 'Review Jobs',
        tabBarLabel: 'Review Jobs',
        tabBarIcon: ({tintColor}) => {
                return <Icon name="favorite" size={30} color={tintColor} iconStyle={{width:30, height: 30}}/>
            },
        headerRight: 
         <Button 
         title="Settings"
         onPress={() => navigation.navigate('settings') }
         backgroundColor="rgba(0,0,0,0)"
         color="rgba(0,122,255,1)"
             />
    })


    renderLikedJobs(){
        return this.props.likedJobs.map(job => {
            const {url, company, formattedRelativeTime,
                 latitude, longitude, jobtitle, jobkey} = job;

            const initialRegion = {
                longitude,
                latitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            };

            return(
                <Card title={jobtitle} key={jobkey}>
                    <View style={{height:200}}>
                    <MapView
                    style={{flex:1}}
                    cacheEnabled={Platform.OS ==='android'}
                    scrollEnabled={false}
                    initialRegion={initialRegion}
                    />
                         <View style={styles.detailWrapper}>
                        <Text style={styles.italics}>{company} </Text>
                        <Text style={styles.italics}>{formattedRelativeTime} </Text>
                        </View>

                        <Button
                        title="Apply"
                        backgroundColor="#03A9F4"
                        onPress={()=> Linking.openURL(url)}
                        />
                  
                    </View>
                </Card>
            );
        })
    }

    render(){
        return(
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}


function mapStateToProps(state){
    return {likedJobs: state.likedJobs}
}


const styles = {
    detailWrapper:{
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop:10
    },
    italics:{
        fontStyle: 'italic'
    }
}

export default connect(mapStateToProps)(ReviewScreen);