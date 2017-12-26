import React,{Component} from 'react';
import {View,Text, Animated, Platform, Dimensions} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class WelcomeComponent extends Component{

    constructor(props){
        super(props);
        this.springValue = new Animated.Value(0);
    }


    componentDidMount(){
        this.springValue.setValue(0);
        Animated.spring(this.springValue,{
            toValue: SCREEN_HEIGHT /2,
            mass: 2
        }).start()
    }

    render(){
    const {style,text} = this.props;
        return(
            <Animated.View
            style={{transform: [ {translateY: this.springValue} ] }}
            >
                <Text style={styles.textStyle}> {text} </Text>
            </Animated.View>
        );
    }
}


styles = {
    containerStyle:{
        flex: 1,
        alignItems: 'center'
    },
    textStyle:{
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
        marginLeft: 5,
        marginRight:5,
        ...Platform.select({
            ios:{

            },
            android:{
                textAlignVertical: 'center'
            }
        })
      }
    }



export default WelcomeComponent;