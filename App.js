import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import firestore from '@react-native-firebase/firestore';


firestore().collection('users').add(
    {
        id: 2,
        name: 'John1',
    }
)
    .then(() => console.log('Create Successfully'));


export default function App() {
    return (
        <View style={styles.container}>
            <Text>App</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
})