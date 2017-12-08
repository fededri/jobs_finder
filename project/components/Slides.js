import React, {Component} from 'react';
import {View,Text, ScrollView,Dimensions} from 'react-native';
import {Button} from 'react-native-elements';

const SCREEN_WIDTH= Dimensions.get('window').width;



export default class Slides extends Component {



    renderBullets(index){
        const dataSize = this.props.data.length;
    
        return this.props.data.map( (slide,i) => {
            if(i == index){
                return(
                    <View
                    key={slide.text}
                    style={
                        {backgroundColor:'rgba(255,255,255,1)', borderRadius: 5, width:10, height:10,
                        marginHorizontal: 5}
                    }
                    />
                )
            }
            return (
                <View
                key={slide.text}
                style={
                    {backgroundColor:'rgba(255,255,255,0.2)', borderRadius: 5,
                     width:10, height:10, marginHorizontal: 5}
                }
                />
            )

        });
    }

    renderLastSlide(index){
        if(index === this.props.data.length -1){
            return (
                <View style={styles.buttonContainerStyle}>
                 <Button
                title="Onwards!"
                raised
                containerViewStyle={styles.buttonContainerStyle}
                buttonStyle={styles.buttonStyle}
                onPress={this.props.onComplete}
                />
                </View>
               
            );
        }
    }

    renderSlides = () => {
      return this.props.data.map( (slide,i) => {
        return (
          <View key={slide.text} 
          style={
              [styles.slideStyle, 
                {
              backgroundColor: slide.color
          }]}

          >
            <Text style={styles.textStyle}>{slide.text}</Text>
            {this.renderLastSlide(i)}
            <View
            style={{flexDirection:'row', marginTop:40}}
            >
            {this.renderBullets(i)}
            </View>
           
          </View>
        );
      });
    }



    render() {
      return (
        <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
          >
            {this.renderSlides()}
          </ScrollView>
        )
      }
    }



const styles = {
      slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
      },
      textStyle: {
        fontSize: 30,
        color:'#FFFFFF',
        textAlign: 'center'
      },

      buttonContainerStyle:{
        marginTop: 20,
        borderRadius:20
      },

      buttonStyle:{
          backgroundColor: '#0288D1'
      }
    };



