import React, { useState, useEffect } from 'react'
import Home from './screens/Home';
import Signin from './screens/SignIn';
import Signup from './screens/SignUp';
import Forget from './screens/Forget';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SignInWithPhone from './screens/SignInWithPhone';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import Transaction from './screens/Transaction';
import Customer from './screens/Customer';
import Setting from './screens/Setting';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabScreen = () => {
    return (
        <Tab.Navigator >
            {/* <Tab.Screen name="Home" component={Home} /> */}
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => (<Icon name="home" size={24} />) }} />
            <Tab.Screen name="Transaction" component={Transaction} options={{ tabBarIcon: () => (<Icon name="view-list" size={24} />) }} />
            <Tab.Screen name="Customer " component={Customer} options={{ tabBarIcon: () => (<Icon name="person" size={24} />) }} />
            <Tab.Screen name="Setting" component={Setting} options={{ tabBarIcon: () => (<Icon name="settings" size={24} />) }} />
        </Tab.Navigator>
    );
}

// const initial = () => {
//     try {
//         const USERS = firestore().collection("USERS")
//         const admin = {
//             name: "admin",
//             phone: "0929342783",
//             address: "Bình Dương",
//             email: "daothanh1411@gmail.com",
//             password: "123456",
//             role: "admin"
//         }

//         USERS.doc(admin.email).onSnapshot(async u => {

//             await auth().createUserWithEmailAndPassword(admin.email, admin.password)
//                 .then(() => USERS.doc(admin.email).set(admin).then(() => console.log("Add new user admin!")))

//         })
//     } catch (e) {
//         console.log(e.message)
//     }

// }


const App = () => {

    // useEffect(() => {
    //     initial();
    // }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name="Forget" component={Forget} options={{ headerShown: false }} />
                <Stack.Screen name="SignInWithPhone" component={SignInWithPhone} options={{ headerShown: false }} />
                {/* <Stack.Screen name="Home" component={TabScreen} /> */}
                <Stack.Screen name="HomeScreen" component={TabScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

