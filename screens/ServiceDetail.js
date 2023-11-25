import React, { useState, useEffect } from 'react'
import { FlatList, Alert, Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { useAppState } from '../context/context';

const ServiceDetail = ({ navigation, route }) => {

    const { state, dispatch } = useAppState();

    useEffect(() => { state.role }, [])

    const handleUpdateService = () => {
        navigation.navigate("AddService");
    }


    const handleServiceDelete = async () => {
        try {
            await firestore().collection(`service`).doc(state.data.id).delete();
            Alert.alert(
                'Delete Confirmation',
                'Are you sure you want to delete?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            dispatch({ type: "SET_DATA", payload: null })
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <View style={{ flex: 1 }}>

            <View style={styles.header}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Service Detail</Text>
                {state && state.role === "admin" ?
                    <TouchableOpacity onPress={() => handleServiceDelete()}>
                        <Icon name="delete" color="red" size={24} />
                    </TouchableOpacity>
                    : null}
            </View>


            <View style={{ flex: 10 }}>
                {state && state.role === "admin" ?
                    (<TouchableOpacity onPress={() => handleUpdateService()} style={{ margin: 20, borderWidth: 1, borderRadius: 30, }}>
                        <View style={styles.view}>
                            <Text style={styles.title}>Service name: </Text>
                            <Text>{state.data !== null ? state.data.service : null}</Text>
                        </View >
                        <View style={styles.view}>
                            <Text style={styles.title}>Price: </Text>
                            <Text>{state.data !== null ? state.data.price : null}</Text>
                        </View>
                        <View style={styles.view}>
                            <Text style={styles.title}>Creator: </Text>
                            <Text>{state.data !== null ? state.data.creator : null}</Text>
                        </View>
                        <View style={styles.view}>
                            <Text style={styles.title}>CreateAt: </Text>
                            <Text>{state.data !== null ? state.data.createdAt : null}</Text>
                        </View>
                        {state.data !== null && state.data.updateAt ? <View style={styles.view}>
                            <Text style={styles.title}>UpdateAt: </Text>
                            <Text>{state.data !== null ? state.data.updateAt : null}</Text>
                        </View> : null}
                    </TouchableOpacity>)
                    :
                    (<View style={{ margin: 20, borderWidth: 1, borderRadius: 30, }}>
                        <View style={styles.view}>
                            <Text style={styles.title}>Service name: </Text>
                            <Text>{state.data !== null ? state.data.service : null}</Text>
                        </View >
                        <View style={styles.view}>
                            <Text style={styles.title}>Price: </Text>
                            <Text>{state.data !== null ? state.data.price : null}</Text>
                        </View>
                        <View style={styles.view}>
                            <Text style={styles.title}>Creator: </Text>
                            <Text>{state.data !== null ? state.data.creator : null}</Text>
                        </View>
                        <View style={styles.view}>
                            <Text style={styles.title}>CreateAt: </Text>
                            <Text>{state.data !== null ? state.data.createdAt : null}</Text>
                        </View>
                        {state.data !== null && state.data.updateAt ? <View style={styles.view}>
                            <Text style={styles.title}>UpdateAt: </Text>
                            <Text>{state.data !== null ? state.data.updateAt : null}</Text>
                        </View> : null}
                    </View>)}
            </View>
        </View>

    )
}

export default ServiceDetail

const styles = StyleSheet.create({

    view: {
        flexDirection: 'row',
        padding: 20
    },
    title: {
        fontWeight: 'bold',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'green',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    }
})