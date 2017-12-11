import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';
import {Provider} from 'react-redux';
import store from './store';

export default class App extends React.Component {
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
          lazy: true
        }
                            )
      }
    },
    {
    tabBarPosition: 'bottom',
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
          <View style={styles.container}>
        <MainNavigator/>
      </View>
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
