import React, {Component} from  'react';
import {Text, TouchableOpacity,View} from 'react-native';
import {Icon} from 'react-native-elements';




class  Button extends Component{

     renderIcon(icon,color){
         if(icon){
             return(
                <View
                style={styles.iconContainerStyle}
                >             
                  <Icon
                  name={icon}
                  color={color}
                   />
              
                </View>
               
             );
         }
     }

  
    render(){
        const {onPress, children, customStyle, childrenStyle, icon, iconColor} = this.props;

        return (
            <TouchableOpacity onPress={onPress} style = {[styles.buttonStyle, customStyle]}>                
                {this.renderIcon(icon,iconColor)}
    
               <Text style = {[styles.textStyle,childrenStyle]}> 
                   {children}
                </Text>
            </TouchableOpacity>
        );
    }


}

const styles = {

    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },

    buttonStyle : {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 3,
        borderWidth: 1,
        borderColor : '#077aff',
        marginLeft: 5,
        marginRight:5,
        justifyContent: 'center'
    },
    iconContainerStyle:{
        flex:0.1,
        justifyContent:'center',
        marginRight:10
    }
};

export default Button;