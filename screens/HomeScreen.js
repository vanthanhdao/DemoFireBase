import React, { useState, useEffect } from 'react'
import { FlatList, Alert, Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppState } from '../context/context';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({ navigation }) => {

    const { state, dispatch } = useAppState();

    const [data, setData] = useState([]);

    const loadData = () => {
        return firestore()
            .collection(`service`)

            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        id: doc.id,
                    };
                });
                setData(data);
            });
    };

    const handleServiceDetail = (item, index) => {
        navigation.navigate("ServiceDetail");
        dispatch({ type: "SET_DATA", payload: item })
    }

    useEffect(() => {
        loadData();
    }, [])



    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{state.phoneNumber !== null && state.email === null ? state.phoneNumber : state.email}</Text>
                <Icon name="person" size={24} />
            </View>
            <View style={{ flex: 10, backgroundColor: 'white' }}>
                <View style={{ flex: 1, alignItems: 'center', }}>
                    <Image resizeMode='contain' style={{ width: 100, height: 100 }} source={require("../assets/images.png")} />
                </View>
                <View style={{ flex: 4 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Danh sách dịch vụ</Text>
                        {state.role === "admin" ? <TouchableOpacity onPress={() => {
                            dispatch({ type: "SET_DATA", payload: null });
                            navigation.navigate("AddService");
                        }}>
                            <Icon name="add" size={24} />
                        </TouchableOpacity> : null}
                    </View>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => handleServiceDetail(item, index)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderWidth: 1, margin: 10, borderRadius: 10 }}>
                                <Text>{index + 1}</Text>
                                <Text>{item.service}</Text>
                                <Text>{`${item.price} đ`}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'green',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    }
})