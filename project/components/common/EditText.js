import React, {Component} from 'react';
import {Text,
    TextInput,
    View,
    Image,
    TouchableNativeFeedback
} from 'react-native';
import {Icon} from 'react-native-elements';



class EditText extends Component {

    constructor(props){
        super(props);
    }


    render(){
        const {onChangeText, placeholder,iconName, value} = this.props;

        return(         
     <View
      style= {[styles.containerStyle, this.style]}
      >

       {this.renderIcon(iconName)}     
       <TextInput
       onChangeText={onChangeText}
       placeholder={placeholder}
       underlineColorAndroid='rgba(0,0,0,0)'
       style={styles.inputStyle}
       value={value}
       />
       {this.renderClearIcon(this.props.showClearIcon,value)}
       </View>
                   );
    }


    renderIcon(iconName){
        if(iconName){
            return(
                <View
                style={styles.iconContainerStyle}
                >
             
                  <Icon
                  name={iconName}
                   />
              
                </View>
               
            );
        }
    }



    renderClearIcon(show,value){
        if(show && (value && value !== '') ){
            console.log(`value: ${value}`);
            return(
                <View
                style={styles.iconContainerStyle}
                >
                <TouchableNativeFeedback
                onPress={this.props.onClearText}
                >
                <Icon
                name='clear'
                 />

                 </TouchableNativeFeedback>
                </View>
               
            );
        }
    }
     
}


const styles = {
    containerStyle:{
        elevation: 2,
        borderWidth: 0,
        shadowColor:'#000',
        shadowOffset:{width:0, height:10},
        shadowOpacity: 0.5,
        padding:5,
        paddingRight:20,
        height:50,
        flexDirection:'row'
    },
    inputStyle:{
        flex:1,
        marginLeft: 5
    },
    iconContainerStyle:{
        flex:0.1,
        justifyContent:'center'
    }
}

export default EditText;