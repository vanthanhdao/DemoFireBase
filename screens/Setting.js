import React from 'react'
import { Alert, Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth';

const Setting = ({ navigation }) => {
    return (
        <View>
            <Button title='Sign Out' onPress={() => auth()
                .signOut()
                .then(() => console.log('User signed out!'))
                .then(() => navigation.navigate("Signin"))} />
        </View>
    )
}

export default Setting