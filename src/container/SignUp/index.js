import React, { useState, useContext } from 'react';
import { globalStyle, color } from '../../utility';
import { InputField, Logo, RoundCornerButton } from '../../component';
import { SafeAreaView, View, Text,TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/types';
import {SignUpRequest, AddUser} from '../../network'; 
import {setAsyncStorage, keys} from '../../asyncStorage';
import { setUniqueValue, keyboardVerticalOffset } from '../../utility/constants';
import firebase from '../../firebase/config';


const SignUp = ({navigation}) => {
    const globalState = useContext(Store);
    const {dispatchLoaderAction} = globalState;
    const [showLogo, toggleLogo] = useState(true);
    const [credentials, setCredentials] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
    });
    const {name, email, password, confirmPassword} = credentials;

    const onSignUpPress = () => {
        if(!name){
            alert('Name is required');
        }else if(!email){
            alert('Email is required');
        }else if(!password){
            alert('Password is required');
        } else if(password != confirmPassword){
            alert('Password did not match');
        } else {
            dispatchLoaderAction({
                type : LOADING_START,
            });
            SignUpRequest(email, password)
            .then((res)=>{
                if(!res.additionalUserInfo){
                    dispatchLoaderAction({
                        type : LOADING_STOP,
                    });
                    alert(res);
                    return;
                }
                let uid = firebase.auth().currentUser.uid;
                let profileImg = '';
                AddUser(name, email, uid, profileImg)
                    .then(() => { 
                        setAsyncStorage(keys.uuid, uid);
                        setUniqueValue(uid);
                        dispatchLoaderAction({
                            type : LOADING_STOP,
                        });
                        navigation.replace('Dashboard');
                    })
                    .catch((err)=>{
                        dispatchLoaderAction({
                            type : LOADING_STOP,
                        });
                        alert(err);
                    });
            })
            .catch((err)=>{
                dispatchLoaderAction({
                    type : LOADING_STOP,
                });
                alert(err);
            })
        }

    };

    const handleOnChange = (name, value)=>{
        setCredentials({
            ...credentials,
            [name]:value,
        });
    };

    // * on fucus input
    const handleFocus=()=>{
        setTimeout(()=>{
            toggleLogo(false);
        });
    }
    // * on blur input
    const handleBlur=()=>{
        setTimeout(()=>{
            toggleLogo(false);
        },200);
    }

    return (
        <KeyboardAvoidingView
            style={[globalStyle.flex1, {backgroundColor:color.BLACK}]}
            behavior={Platform.OS==='ios'?'padding':'height'}
            keyboardVerticalOffset={keyboardVerticalOffset}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={[globalStyle.flex1,{backgroundColor:color.BLACK}]
                }>
                    {showLogo && (
                        <View style={[globalStyle.containerCentered]}>
                            <Logo />
                        </View>
                    )}
                    <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
                        <InputField 
                            placeholder="Enter name" 
                            value={name}
                            onChangeText={(text)=>handleOnChange('name', text)}
                            onFocus={()=>handleFocus()}
                            onBlur={()=>handleBlur()}
                        />
                        <InputField 
                            placeholder="Enter email" 
                            value={email}
                            onChangeText={(text)=>handleOnChange('email', text)}
                            onFocus={()=>handleFocus()}
                            onBlur={()=>handleBlur()}
                        />
                        <InputField 
                            placeholder="Enter password" 
                            secureTextEntry={true} 
                            value={password}
                            onChangeText={(text)=>handleOnChange('password', text)}
                            onFocus={()=>handleFocus()}
                            onBlur={()=>handleBlur()}
                        />
                        <InputField 
                            placeholder="Confirm password" 
                            secureTextEntry={true} 
                            value={confirmPassword}
                            onChangeText={(text)=>handleOnChange('confirmPassword', text)}
                            onFocus={()=>handleFocus()}
                            onBlur={()=>handleBlur()}
                        />
                        <RoundCornerButton title="SignUp" onPress={()=>onSignUpPress()}/>
                        <Text style={{
                            fontSize:20,
                            fontWeight:'bold',
                            color:color.LIGHT_GREEN
                        }}
                        onPress={()=>navigation.navigate('Login')}
                        >
                            Login
                        </Text>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default SignUp;