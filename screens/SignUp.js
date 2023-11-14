
import React, { useEffect, useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HelperText } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';


GoogleSignin.configure({
    webClientId: '120712118691-a0lh9j6f0ta0i734bvp4skb7fqep4scl.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
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

// async function onFacebookButtonPress() {
//     // Attempt login with permissions
//     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

//     if (result.isCancelled) {
//         throw 'User cancelled the login process';
//     }

//     // Once signed in, get the users AccessToken
//     const data = await AccessToken.getCurrentAccessToken();

//     if (!data) {
//         throw 'Something went wrong obtaining access token';
//     }

//     // Create a Firebase credential with the AccessToken
//     const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

//     // Sign-in the user with the credential
//     return auth().signInWithCredential(facebookCredential);
// }

const Signup = ({ navigation }) => {

    // useEffect(() => {
    //     GoogleSignin.configure({
    //         webClientId: '874691524590-ojqkp8ej8ihad2hk9mj7cm4dtqmtchfk.apps.googleusercontent.com',
    //     });
    // }, [])

    // async function onGoogleButtonPress() {
    //     try {
    //         const { idToken, user } = await GoogleSignin.signIn();
    //         const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    //         await auth().signInWithCredential(googleCredential);
    //         console.log(user)
    //     } catch (error) {
    //         console.error('Google Sign-In Error: ', error);
    //         // Handle the error, show a message to the user, etc.
    //     }


    // }

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
                    <Text>Or Login with!</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 40 }}>
                    <TouchableOpacity onPress={() => onGoogleButtonPress()}>
                        <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://image.similarpng.com/very-thumbnail/2020/06/Logo-google-icon-PNG.png' }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onFacebookButtonPress()}>
                        <Image style={{ width: 50, height: 50 }} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEU+W5n///88WZgnTJLq7PJccaVYbqNgdac1VZYjSZCOm72KmLyRnr9Ta6FNZp9IY51DX5v19vkuUJTT2OTc4OqhrMji5e2ps8zIzt7o6/G7wta0vNIcRo+wudCXo8J/j7Z2h7FugK3DydsAN4kVQo18jLSNaPd2AAADKElEQVR4nO2d2W7bMBBFXVJOyCheRHmr7Xhr+/+/2KotgvYhNkWGmDvEPdBzwAOdeCKRgSfP06e6r4mpnQkhhBBCCCGEEEIIIYQQQgghRD/GuRCs9e9YGwZccM6p3xh0wfppuz70q6Z7Z7Pq+/52eNue2vN0ZgZj6XWmYZydtPvNl4c0m34hvdgEnJ2tI+z+MtPWqgm2XUXrKTR0YduN8dNm6PzrOD1thv4y8v4pMzTH3Xg/TYZumnADNRnaNslPj6HfJgpqMUwXVGJo0wV1GIZTuqAKQ3fJENRgaBY5ghoM7dfKDcM6SxDfMLNRBYZ+1MOgQkN3zRSEN/Txryt0GuaNQg2G+bcQ3NA8ZQuCG4ZD7YbHfEFsw/xRgW4Y9rUb+rR3T3oMzfITBKEN3UuCUPfv1TRNh2wYbiPE9u01HP3/2AFgwRGPvoeZD07hlm+I9NuZoE9uwMzjBNdHnX7RzxVbL73QZFzUW9LVUXqd6bioV1BPWhOdRA6L3kovM4MQsyHaOullZhD6CEPFjcYN/EbvB+kvbPPYcKf0UNcfYgz31RuuNX/Q0PA3LzSEJsZQ9cCPMnyt3pCVYsNKWSk+rJSV4sNKWSk+rJSV4sNKWSk+dVTq7/At4q3++fu9nzAgbfjYIRdhRVNcsBHeXyxv2AtvbJQ3lN66KW8ovbFR3vBH9YbPwtvg5Q2l9/mLG3bSh1GKG26qN5Qeh+UN36T/Mi9ueKre8Fy94bT6aSF+9ru0YSf+AFzaUHwcFje8SY/D4oaH6g3Fx2Fxw0v1hnPpYVHcUP5/MQobSr9KLG+4qt5QfhyWNtxWbwiw91bY8Fq9ofg0LG4o/2tY2BBgHBbeIV0h3MPFcv7hFSL28U9mMV9+dC2l9QbufdOyjzptovmrmnnaZAD/tMk9eCaKleLDSlkpPqyUleLDSlkpPqyUleLDSlkpPqyUleLDSlkpPqyUleLDSlkpPqyUleLDSlkpPqyUleLDSlkpPqyUleLDSlkpPqyUleLDSlkpPqyUleLDSlkpPqyUleLDSlkpPqyUleLDSlkpPqyUleLDSlkpPqyUleLDSj+v0p/UYk/jbmpJdgAAAABJRU5ErkJggg==' }} />
                    </TouchableOpacity>
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