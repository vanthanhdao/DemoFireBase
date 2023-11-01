import React, { useState } from 'react'
import { Alert, Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HelperText } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const Forget = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [isEmptyEmail, setIsEmptyEmail] = useState(false)

    const [errEmail, setErrEmail] = useState('Email address is invalid!');
    const onChangeTextEmail = text => setEmail(text);

    const hasErrors = (type) => {
        switch (type) {
            case 'isEmail': return !email.includes('@gmail.com') && email;
            case 'isEmtyEmail': return !email;
            default: false
        }
    };

    const handleResetPass = async (email) => {
        try {
            await auth().sendPasswordResetEmail(email);
            Alert.alert("Successful confirmation please check your email")
        } catch (error) {
            setErrorMessage("Email or password is incorrect!");
        }
    };


    return (
        <ScrollView style={styles.container}>

            <View style={styles.content}>
                <View style={styles.title} ><Text style={{ fontSize: 30 }}>FORGET PASSWORD </Text></View>
                <View style={styles.txtInput}>
                    <Icon name='email' size={24} style={{ padding: 12, flex: 0.5, justifyContent: 'center', alignItems: 'center', }} />
                    <TextInput placeholder='Email' onFocus={() => setIsEmptyEmail(true)} value={email} onChangeText={onChangeTextEmail} style={{ padding: 10, flex: 5, fontSize: 18 }} />
                </View>
                {email ? (<HelperText type="error" visible={hasErrors("isEmail")} >
                    {errEmail}
                </HelperText>) : (<HelperText type="error" visible={isEmptyEmail}>
                    Email is required feld
                </HelperText>)}

                <View style={styles.button}>
                    <TouchableOpacity onPress={() => handleResetPass(email)}>
                        <Text style={{ backgroundColor: 'aqua', borderRadius: 20, paddingHorizontal: 80, paddingVertical: 15 }}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Signin")} >
                        <Text style={{ color: '#3479D7', marginVertical: 20 }}>Login</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView >

    )
}

export default Forget

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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