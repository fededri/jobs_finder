import React,{Component} from 'react';
import {View,Text, Animated, Platform, Dimensions} from 'react-native';
import Button from './common/Button';

const SCREEN_HEIGHT = Dimensions.get('window').height;

class WelcomeComponent extends Component{

    constructor(props){
        super(props);
        this.springValue = new Animated.Value(0);
        this.buttonScaleValue = new Animated.Value(0);
    }


    componentDidMount(){
        this.springValue.setValue(0);
        Animated.spring(this.springValue,{
            toValue: SCREEN_HEIGHT /2,
            mass: 1
        }).start()
    }


    renderButton  = (showButton) => {
        
        if(showButton){
            return (
                <View style={{width: 200, height:40, marginTop: 20, justifyContent: 'center'
                     }}>
                         <Button                       
                         onPress={this.props.onPress}          
                         childrenStyle={{color: '#FFFFFF'}}
                         customStyle={{backgroundColor: '#6ec6ff'}}
                         >OK!
                         </Button>
                 </View>
                );
        }      
    }

    animate() {
        this.springValue.setValue(0);
        Animated.spring(this.springValue,{
            toValue: SCREEN_HEIGHT /2,
            mass: 1
        }).start()
    }



    render(){
    const {text,textStyle} = this.props;

        return(
            <View>
                <Animated.View
                    style={[{alignItems: 'center'}, {transform: [ {translateY: this.springValue} ] }]}>
                          <Text style={textStyle}> {text} </Text>
                          {this.renderButton(this.props.showButton)}
                 </Animated.View>
            </View>
          
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