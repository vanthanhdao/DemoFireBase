
import React, { useState } from 'react'
import { Alert, Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HelperText } from 'react-native-paper';
import auth from '@react-native-firebase/auth';


const Signup = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isEmptyEmail, setIsEmptyEmail] = useState(false)
    const [isEmptyPass, setIsEmptyPass] = useState(false)

    const [errEmail, setErrEmail] = useState('Email address is invalid!');
    const [errPass, setErrPass] = useState('Password length must be greater than or equal to 8 characters!');

    const onChangeTextEmail = text => setEmail(text);
    const onChangeTextPassword = text => setPassword(text);

    const hasErrors = (type) => {
        switch (type) {
            case 'isEmail': return !email.includes('@gmail.com') && email;
            case 'isPassword': return password.length < 6 && password;
            case 'isEmtyEmail': return !email;
            case 'isEmtyPass': return !password;
            default: false
        }
    };

    const handleLogin = async (email, password) => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
            navigation.navigate('Home');
        } catch (error) {
            setErrorMessage("Email or password is incorrect!");
        }
    };


    return (
        <ScrollView style={styles.container}>
            <View style={styles.image}>
                <Image source={require("../assets/logo.png")} />
            </View>
            <View style={styles.content}>
                <View style={styles.title} ><Text style={{ fontSize: 30 }}>LOGIN</Text></View>
                <View style={styles.txtInput}>
                    <Icon name='email' size={24} style={{ padding: 12, flex: 0.5, justifyContent: 'center', alignItems: 'center', }} />
                    <TextInput placeholder='Email' onFocus={() => setIsEmptyEmail(true)} value={email} onChangeText={onChangeTextEmail} style={{ padding: 10, flex: 5, fontSize: 18 }} />
                </View>
                {email ? (<HelperText type="error" visible={hasErrors("isEmail")} >
                    {errEmail}
                </HelperText>) : (<HelperText type="error" visible={isEmptyEmail}>
                    Email is required feld
                </HelperText>)}


                <View style={styles.txtInput}>
                    <Icon name='key' size={24} style={{ padding: 12, flex: 0.5, justifyContent: 'center', alignItems: 'center', }} />
                    <TextInput placeholder='Password' secureTextEntry={true} value={password} onFocus={() => { setErrorMessage(''), setIsEmptyPass(true) }} onChangeText={onChangeTextPassword} style={{ padding: 10, flex: 5, fontSize: 18 }} />
                    <TouchableOpacity>
                        <Icon name='visibility' size={24} style={{ padding: 12, flex: 0.5, }} />
                    </TouchableOpacity>
                </View>
                {!errorMessage ? (
                    password ? (<HelperText type="error" visible={hasErrors("isPassword")} >
                        {errPass}
                    </HelperText>) : (<HelperText type="error" visible={isEmptyPass}>
                        Password is required feld
                    </HelperText>)
                ) : (<HelperText type="error" visible={true} >
                    {errorMessage}
                </HelperText>)}



                <View style={styles.button}>
                    <TouchableOpacity onPress={() => handleLogin(email, password)}>
                        <Text style={{ backgroundColor: 'aqua', borderRadius: 20, paddingHorizontal: 80, paddingVertical: 15 }}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")} >
                        <Text style={{ marginVertical: 20, color: '#3479D7' }}>Create a new account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Forget")} >
                        <Text style={{ color: '#3479D7' }}>Forget password</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </ScrollView >

    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    content: {
        flex: 2,
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    txtInput: {
        flex: 0.5,
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 1.5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        marginHorizontal: 15,
    },
    button: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    }

})   