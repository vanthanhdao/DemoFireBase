import React, { useState, useEffect } from 'react'
import { FlatList, Alert, Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Home from './screens/Home';
import Signin from './screens/SignIn';
import Signup from './screens/SignUp';
import Forget from './screens/Forget';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SignInWithPhone from './screens/SignInWithPhone';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import Transaction from './screens/Transaction';
import Customer from './screens/Customer';
import Setting from './screens/Setting';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddService from './screens/AddService';
import ServiceDetail from './screens/ServiceDetail';
import { useAppState } from './context/context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const initial = () => {
    try {
        const USERS = firestore().collection("users")
        const admin = {
            email: "vanthanhdao@gmail.com",
            password: "123456",
            role: "admin"
        }
        USERS.doc(admin.email).onSnapshot(async u => {
            if (!u.exists) {
                await auth().createUserWithEmailAndPassword(admin.email, admin.password)
                    .then(() => USERS.doc(admin.email).set(admin).then(() => console.log("Add new user admin!")))
            }
        })
    } catch (e) {
        console.log(e.message)
    }

}

const App = () => {


    useEffect(() => {
        initial();
    }, [])

    const TabScreen = () => {
        return (
            <Tab.Navigator initialRouteName='Home' screenOptions={{
                tabBarStyle: { backgroundColor: '#CBE9BF', paddingBottom: 10, height: 70 },
            }} >
                <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => (<Icon name="home" size={24} />), headerShown: false }} />
                <Tab.Screen name="Transaction" component={Transaction} options={{ tabBarIcon: () => (<Icon name="view-list" size={24} />) }} />
                <Tab.Screen name="Customer " component={Customer} options={{ tabBarIcon: () => (<Icon name="person" size={24} />) }} />
                <Tab.Screen name="Setting" component={Setting} options={{ tabBarIcon: () => (<Icon name="settings" size={24} />) }} />
                <Tab.Screen name="AddService" component={AddService} options={{
                    tabBarButton: () => null,
                    headerTitle: "Service",
                    headerStyle: { backgroundColor: 'green' },
                }} />
                <Tab.Screen name="ServiceDetail" component={ServiceDetail} options={{
                    tabBarButton: () => null,
                    headerShown: false,
                }} />
            </Tab.Navigator>
        );
    }


    return (

        <NavigationContainer>
            <Stack.Navigator initialRouteName="Signin">
                <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name="Forget" component={Forget} options={{ headerShown: false }} />
                <Stack.Screen name="SignInWithPhone" component={SignInWithPhone} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="HomeScreen" component={TabScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AddService" component={TabScreen} />
                <Stack.Screen name="ServiceDetail" component={TabScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}

export default App;

