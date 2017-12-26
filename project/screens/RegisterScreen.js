import React,{Component} from 'react';
import {Text,View,TextInput,ActivityIndicator} from 'react-native';
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
        this.props.registerLoading();
    }


    emailChanged = (email) => {
        this.props.emailChanged(email);
    }

    passwordChanged = (pass) => {
        this.props.passwordChanged(pass);
    }


    onConfirmPassChange = (pass) => {
        this.props.passwordCheckChanged(pass);
    }


    render(){
        return(
            <View style={styles.container}>
            <TextInputLayout
                style={styles.inputLayout}
                checkValid={t => EMAIL_REGEX.test(t)}
            >
                <TextInput
                    onChange={(email) => {this.emailChanged(email)}}
                    style={styles.textInput}
                    placeholder={'Email'}
                />

            </TextInputLayout>

            <TextInputLayout  style={styles.inputLayout}>
                <TextInput   
                    onChange={(pass) => {this.passwordChanged(pass)}}
                    style={styles.textInput}
                    placeholder={'Password'}
                    secureTextEntry={true}
                />
            </TextInputLayout>


            <TextInputLayout  style={styles.inputLayout}>
                <TextInput                
                    onChange={(pass) => {this.onConfirmPassChange(pass)}}
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
            <ActivityIndicator
            size={'large'}
            color="#FF0000"
            animating={this.props.loading} />
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

function mapStateToProps({register}){
    debugger
    return {
        email: register.email,
        password: register.password,
        passwordMatches: register.passwordMatches,
        loading: register.loading
    }
}


export default connect(mapStateToProps,actions)(RegisterScreen);