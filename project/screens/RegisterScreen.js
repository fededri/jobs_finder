import React,{Component} from 'react';
import {Text,View,
    TextInput,
    ActivityIndicator, 
    Alert,
    Keyboard
} from 'react-native';
import {t} from '../Strings';
import {TextInputLayout} from 'rn-textinputlayout';
import Button from '../components/common/Button';
import {connect} from 'react-redux';
import * as actions from '../actions';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


class RegisterScreen extends Component{

    
   

    static navigationOptions = { 
        title: t('register'),
        headerTitleStyle: {alignSelf: 'center',textAlign: 'center'},
        headerRight: (<View></View>)       
       
    }



    onRegisterClick = () => {
        Keyboard.dismiss();
        const {email, password, password2} = this.state;
        
        if(password == password2){
            this.props.registerLoading();
            this.props.register(this.state.email,this.state.password);
        }else {
            Alert.alert(
                'Registro',
                'las contraseñas no coinciden',
            )
        }

        
    }

    onConfirmPassChange = (pass) => {
        this.props.passwordCheckChanged(pass);
    }


    componentWillReceiveProps(newProps){
        if(newProps.error){
            Alert.alert(
                'Sirch',
                JSON.stringify(newProps.errorMessage)
            )
            this.props.clearErrors();
        }else {
            if(newProps.user && newProps.user.uid){
                newProps.navigation.navigate('main');
            }
        }

        
    }


    render(){
        return(
            <View style={styles.container}>
            <TextInputLayout
                style={styles.inputLayout}
                checkValid={t => EMAIL_REGEX.test(t)}
            >
                <TextInput
                    onChangeText = {email => this.setState({email})}
                    style={styles.textInput}
                    placeholder={'Email'}
                />

            </TextInputLayout>

            <TextInputLayout  style={styles.inputLayout}>
                <TextInput   
                    onChangeText =  {password => this.setState({password})}
                    style={styles.textInput}
                    placeholder={'Password'}
                    secureTextEntry={true}
                />
            </TextInputLayout>


            <TextInputLayout  style={styles.inputLayout}>
                <TextInput                
                    onChangeText = {password2 => this.setState({password2})}
                    style={styles.textInput}
                    placeholder={'Confirm password'}
                    secureTextEntry={true}
                />
            </TextInputLayout>

            <View
            style={{height: 40, margin:20}}
            >
                <Button      
                onPress={this.onRegisterClick}      
                childrenStyle={{color: '#FFFFFF'}}
                customStyle={styles.buttonStyle}
                >
                    {t("register")}!
                </Button>
            </View>

            <View
            style={{flex:1,justifyContent:'center', alignItems:'center'}}
            >


            {this.props.loading &&
                <ActivityIndicator
                size={'large'}
                color="#FF0000"
                animating={true} />
            }
            </View>
            
           
          
         

        </View>
        );
    }
}

const styles ={
    container: {
        flex: 1
    },
    textInput: {
        fontSize: 16,
        height: 40      
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36
    },
    buttonStyle:{
        flex:1,
        borderRadius: 0,
        elevation: 3,
        backgroundColor: '#3949AB',

    }
};

function mapStateToProps(state){
    return {
        user : state.user,
        loading: state.register.loading,
        error: state.register.error,
        errorMessage: state.register.errorMessage
    }
}


export default connect(mapStateToProps,actions)(RegisterScreen);