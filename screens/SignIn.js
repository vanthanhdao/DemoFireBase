
import React, { useState, useEffect } from 'react'
import { Alert, Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HelperText } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useAppState } from '../context/context';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';




const Signin = ({ navigation }) => {

    const { state, dispatch } = useAppState();
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
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            // Lấy đối tượng DocumentReference cho một tài liệu cụ thể (ví dụ: users/abc123)
            const docRef = firestore().collection('users').doc(email);
            // Gọi phương thức get để lấy dữ liệu
            const docSnapshot = await docRef.get();
            // Kiểm tra xem tài liệu có tồn tại không
            if (docSnapshot.exists) {
                // Lấy dữ liệu từ tài liệu
                const userData = docSnapshot.data();
                userData.role === "admin" ? dispatch({ type: "SET_ROLE", payload: "admin" }) : dispatch({ type: "SET_ROLE", payload: "customer" })
            } else console.log('Không tìm thấy tài liệu.');
            dispatch({ type: "SET_USER", payload: userCredential.user });
            navigation.navigate('HomeScreen');
        } catch (error) {
            setErrorMessage("Email or password is incorrect!");
            console.error(error);
        }
    };

    GoogleSignin.configure({
        webClientId: '120712118691-am2qt37ava7qnrhs2qijgn2i2eke6n66.apps.googleusercontent.com',
    });

    async function onGoogleButtonPress() {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);

            const USERS = firestore().collection("users")
            const customer = {
                email: auth().currentUser.email,
                displayName: auth().currentUser.displayName,
                uid: auth().currentUser.uid,
                signInWith: "Google",
                role: "customer"
            }
            USERS.doc(customer.uid).onSnapshot(async u => {
                if (!u.exists && !customer.empty) {
                    await USERS.doc(customer.uid).set(customer).then(() => console.log("Add customer Success"));
                }
            })
            dispatch({ type: "SET_USER", payload: auth().currentUser });
            navigation.navigate("HomeScreen")
            console.log(state)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log("1 " + statusCodes.SIGN_IN_CANCELLED)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log("2 " + statusCodes.IN_PROGRESS)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log("3 " + statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
            } else {
                // some other error happened
                console.log("4 " + error.message)
            }
        }
    }

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
                        <Text style={{ marginVertical: 10, color: '#3479D7' }}>Create a new account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Forget")} >
                        <Text style={{ marginVertical: 10, color: '#3479D7' }}>Forget password</Text>
                    </TouchableOpacity>
                    <Text>Or Login with!</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 40 }}>
                    <TouchableOpacity onPress={() => onGoogleButtonPress()}
                    >
                        <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://image.similarpng.com/very-thumbnail/2020/06/Logo-google-icon-PNG.png' }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("SignInWithPhone")}>
                        <Image style={{ width: 50, height: 50 }} source={{ uri: 'data:image/png;base64,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' }} />
                    </TouchableOpacity>
                </View>


            </View>
        </ScrollView >

    )
}

export default Signin

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