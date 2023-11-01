
import React, { useState } from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import { StyleSheet } from 'react-native'

const Login = () => {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>LOGIN</Text>
            <View style={styles.content}>
                <TextInput
                    onChangeText={(text) => {
                        setUserName(text)
                    }}
                    placeholder='UserName'
                    value={username}
                    style={styles.txtInput1} />
                <TextInput
                    onChangeText={(text) => {
                        setPassword(text)
                    }}
                    placeholder='Password'
                    value={password}
                    style={styles.txtInput2} />
                <Text
                    onPress={() => {
                        if (username === '') {
                            alert('Please enter your username!')
                        } else if (password === '') {
                            alert('Please enter your password!')
                        } else alert(`Your Username is: ${username} \nYour Password is: ${password}`)
                    }}
                    style={styles.txtButton} >Submit</Text>
            </View>
        </View>
    )
}

export default Login


const styles = StyleSheet.create({

    title: {
        flex: 1,
        fontSize: 50,
        textAlign: 'center',
        // fontweight: 'bold',
        color: 'white',
    },
    content: {
        flex: 1,
    },
    txtInput1: {
        // fontweight: 'bold',
        padding: 10,
        borderWidth: 1,
        marginVertical: 20,
        borderRadius: 10,
        height: 30
    },
    txtInput2: {
        // fontweight: 'bold',
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 10,
        height: 30
    },
    txtButton: {
        backgroundColor: '#000000aa',
        borderRadius: 30,
        textAlign: 'center',
        padding: 15,
        color: 'white',
    }

})