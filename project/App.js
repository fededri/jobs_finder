import React from 'react';
import { StyleSheet, Text, View, Platform,Alert } from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';
import {Provider} from 'react-redux';
import configureStore from './store';
import { PersistGate } from 'redux-persist/es/integration/react';
import registerForNotifications from './services/push_notifications';
import Expo, {Notifications} from 'expo';
import {getlanguageCode} from './utils/locale';
import {setCurrentLanguage} from './Strings';
export const {persistor,store} = configureStore();

export default class App extends React.Component {


 componentDidMount(){
   //registerForNotifications();
   this.loadLocaleLanguange();
   Notifications.addListener((notification)=> {
     const {data: {text}} = notification;
     console.log(`notificacion recibida: ${text}`);
     if(origin === 'received' && text ){
      Alert.alert(
        'New  Notification!',
        text,
        [{text: 'Ok.'}]
      );
     }
     
   });
 }


 loadLocaleLanguange = async () => {
  getlanguageCode()
    .then((locale) => setCurrentLanguage(locale))
    .catch((error)=> console.log("WARNING: ", "Error retrieving current locale language ", error));
 }

  render() {
    
    const MainNavigator = TabNavigator(
      {
      welcome: { screen: WelcomeScreen},
      auth: {screen: AuthScreen},
      main: {
        screen: TabNavigator({
            map: {screen: MapScreen},
            deck: {screen: DeckScreen},
            review: {
              screen: StackNavigator({
                  review: { screen: ReviewScreen},
                  settings: {screen: SettingsScreen}
              })
            }
        },
        {
          tabBarPosition: 'bottom',
          lazy: true,
          swipeEnabled:false,
          tabBarOptions:{
            labelStyle: {fontSize: 12} ,
            showIcon: Platform.OS === 'ios',
            showLabel:  true,
          
          }
        }
                            )
      }
    },
    {
    tabBarPosition: 'bottom',
    backBehavior: 'none',
    lazy: true,
    swipeEnabled: false,
    navigationOptions :{
      tabBarVisible : false
    }
    }
                                    );

    return (
      <Provider
       store = {store}
       >
         <PersistGate persistor={persistor}>
         <View style={styles.container}>
           <MainNavigator />
         </View>
         </PersistGate>
      </Provider>
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    ...Platform.select({
      ios:{
        marginTop: 20
      },
      android:{
        marginTop: 0
      }

    })
  }

});
