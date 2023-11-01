
import React, { useState } from 'react'
import { Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HelperText } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { Alert } from '@mui/material';


const Signup = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [check, setCheck] = useState(true);

    const [errEmail, setErrEmail] = useState('Email address is invalid!');
    const [errPass, setErrPass] = useState('Password length must be greater than or equal to 8 characters!');
    const [errRepass, setErrRePass] = useState('The password re-entered does not match!');

    const onChangeTextEmail = text => setEmail(text);
    const onChangeTextPassword = text => setPassword(text);
    const onChangeTextRePassword = text => setRePassword(text);

    const hasErrors = (type) => {
        switch (type) {
            case 'isEmail': return !email.includes('@gmail.com') && email;
            case 'isPassword': return password.length < 6 && password;
            case 'isRePassword': return password !== repassword && repassword;
            default: false
        }
    };

    const handleSignup = async (email, password) => {
        try {
            await auth().createUserWithEmailAndPassword(email, password)
            navigation.navigate("Signin")
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.image}>
                <Image source={require("../assets/logo.png")} />
            </View>
            <View style={styles.content}>
                <View style={styles.title} ><Text style={{ fontSize: 30 }}>CREATE A NEW ACCOUNT</Text></View>
                <View style={styles.txtInput}>
                    <Icon name='email' size={24} style={{ padding: 12, flex: 0.5, justifyContent: 'center', alignItems: 'center', }} />
                    <TextInput placeholder='Email' value={email} onChangeText={onChangeTextEmail} style={{ padding: 10, flex: 5, fontSize: 18 }} />
                </View>
                <HelperText type="error" visible={hasErrors("isEmail")} style={{}}>
                    {errEmail}
                </HelperText>

                <View style={styles.txtInput}>
                    <Icon name='key' size={24} style={{ padding: 12, flex: 0.5, justifyContent: 'center', alignItems: 'center', }} />
                    <TextInput placeholder='Password' secureTextEntry={check} value={password} onChangeText={onChangeTextPassword} style={{ padding: 10, flex: 5, fontSize: 18 }} />
                    <TouchableOpacity onPress={() => setCheck(false)}>
                        <Icon name='visibility' size={24} style={{ padding: 12, flex: 0.5, }} />
                    </TouchableOpacity>
                </View>
                <HelperText type="error" visible={hasErrors("isPassword")} style={{}}>
                    {errPass}
                </HelperText>

                <View style={styles.txtInput}>
                    <Icon name='key' size={24} style={{ padding: 12, flex: 0.5, justifyContent: 'center', alignItems: 'center', }} />
                    <TextInput placeholder='Enter the password' secureTextEntry={check} value={repassword} onChangeText={onChangeTextRePassword} style={{ padding: 10, flex: 5, fontSize: 18 }} />
                    <TouchableOpacity onPress={() => setCheck(false)}>
                        <Icon name='visibility' size={24} style={{ padding: 12, flex: 0.5, }} />
                    </TouchableOpacity>
                </View>
                <HelperText type="error" visible={hasErrors("isRePassword")} style={{}}>
                    {errRepass}
                </HelperText>

                <View style={styles.button}>
                    <TouchableOpacity onPress={() => handleSignup(email, password)}>
                        <Text style={{ backgroundColor: 'aqua', borderRadius: 20, paddingHorizontal: 80, paddingVertical: 15 }}>Signup</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginVertical: 20, }}>Already has an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Signin")} >
                            <Text style={{ marginVertical: 20, color: '#3479D7' }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </ScrollView>
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