import React, { useState, useEffect } from 'react'
import { FlatList, Alert, Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { useAppState } from '../context/context';

const AddService = ({ navigation }) => {

    const { state, dispatch } = useAppState();
    const [service, setService] = useState('')
    const [price, setPrice] = useState('0')

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const handleAddService = async () => {
        const docRef = firestore().collection(`service`);
        try {
            if (!docRef.empty) {
                await docRef.add({
                    service: service,
                    price: price,
                    createdAt: `${day}/${month}/${year} ${hours}:${seconds}:${minutes}`,
                    updateAt: "",
                    creator: state.email,
                })
                    .then(() => console.log('Create Successful Task'))
                setService("");
                setPrice("")
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleUpdateService = async () => {
        try {
            await firestore().collection(`service`).doc(state.data.id).update({
                service: service,
                price: price,
                creator: state.email,
                updateAt: `${day}/${month}/${year} ${hours}:${seconds}:${minutes}`,
            })
            Alert.alert("Update successfully")

        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        if (state.data !== null) {
            setService(state.data.service);
            setPrice(state.data.price);
        } else {
            setService("");
            setPrice("0");
        }
    }, [state.data ? state.data.service : null, state.data ? state.data.price : null])

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={styles.text}>Service name*</Text>
            <TextInput value={service} onChangeText={(text) => setService(text)} placeholder='Input a service name' style={styles.textInput} />
            <Text style={styles.text}>Price*</Text>
            <TextInput value={price} onChangeText={(text) => setPrice(text)} style={styles.textInput} keyboardType='number-pad' />
            {state.data === null ?
                <TouchableOpacity onPress={() => handleAddService()}>
                    <Text style={{ margin: 50, backgroundColor: 'green', borderRadius: 20, padding: 15, textAlign: 'center', fontSize: 20 }}>Add</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => handleUpdateService()}>
                    <Text style={{ margin: 50, backgroundColor: 'green', borderRadius: 20, padding: 15, textAlign: 'center', fontSize: 20 }}>Update</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default AddService

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10

    },
    textInput: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
    }
})