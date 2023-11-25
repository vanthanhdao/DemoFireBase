
import React, { useEffect, useState } from 'react'
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HelperText } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useAppState } from '../context/context';
import firestore from '@react-native-firebase/firestore';


const SignInWithPhone = ({ navigation }) => {
    const { state, dispatch } = useAppState();
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);
    const [phone, setPhone] = useState('');
    // verification code (OTP - One-Time-Passcode)
    const [code, setCode] = useState('');

    // Handle login
    const onAuthStateChanged = (user) => {

        if (user) {
            const USERS = firestore().collection("users")
            const customer = {
                phoneNumber: user.phoneNumber,
                uid: user.uid,
                signInWith: "Phone Number",
                role: "customer"
            }
            USERS.doc(customer.uid).onSnapshot(async u => {
                if (!u.exists && !customer.empty && customer.phoneNumber !== null) {
                    await USERS.doc(customer.uid).set(customer).then(() => console.log("Add customer Success"));
                }
            })
            dispatch({ type: "SET_USER", payload: user });
            navigation.navigate("HomeScreen")

        }

    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // Handle the button press
    async function signInWithPhoneNumber() {
        const phoneFormat = phone.split('').map(Number)
        if (phoneFormat.length > 0 && phoneFormat[0] === 0) {
            phoneFormat.shift(); // Xóa phần tử đầu tiên nếu là 0
        }
        const phoneFormatString = phoneFormat.join('')
        const confirmation = await auth().signInWithPhoneNumber(`+84${phoneFormatString}`);
        setConfirm(confirmation);
    }

    async function confirmCode() {
        try {
            await confirm.confirm(code);
        } catch (error) {
            console.log(error);
        }
    }




    if (!confirm) {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.container}>
                    <View style={styles.image}>
                        <Image source={require("../assets/logo.png")} />
                    </View>
                    <View style={styles.content}>
                        <View style={styles.title} ><Text style={{ fontSize: 30 }}>SIGN IN WITH PHONE</Text></View>
                        <View style={styles.txtInput}>
                            <Icon name='phone' size={24} style={{ padding: 12, flex: 0.5, justifyContent: 'center', alignItems: 'center', }} />
                            <TextInput
                                placeholder='Phone number'
                                value={phone}
                                onChangeText={(text) => setPhone(text)}
                                style={{ padding: 10, flex: 5, fontSize: 18 }}
                                keyboardType="phone-pad"
                            />
                        </View>


                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => signInWithPhoneNumber()}>
                                <Text style={{ backgroundColor: 'aqua', borderRadius: 20, paddingHorizontal: 80, paddingVertical: 15 }}>Sigin</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => navigation.navigate("Signup")} >
                                    <Text style={{ marginVertical: 20, color: '#3479D7' }}>Signup</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </ScrollView >
            </View>
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.image}>
                    <Image source={require("../assets/logo.png")} />
                </View>
                <View style={styles.content}>
                    <View style={styles.title} ><Text style={{ fontSize: 30 }}>Verification by OTP</Text></View>
                    <View style={styles.txtInput}>
                        <Icon name='phone' size={24} style={{ padding: 12, flex: 0.5, justifyContent: 'center', alignItems: 'center', }} />
                        <TextInput
                            placeholder='Phone number'
                            value={code}
                            onChangeText={(text) => setCode(text)}
                            style={{ padding: 10, flex: 5, fontSize: 18 }}
                            keyboardType="phone-pad"
                        />
                    </View>


                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => confirmCode()}>
                            <Text style={{ backgroundColor: 'aqua', borderRadius: 20, paddingHorizontal: 80, paddingVertical: 15 }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView >
        </View>
    );
}

export default SignInWithPhone


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


