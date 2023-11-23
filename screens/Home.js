import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = ({ route }) => {

    const { email, uid } = route.params

    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [idtask, setIdTask] = useState(0);
    const [iddefault, setIdDefault] = useState('')

    //Load Data
    useEffect(() => {
        return firestore()
            .collection(`tasks-${uid}`)
            .orderBy('_id')
            .onSnapshot(querySnapshot => {
                const tasksData = querySnapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        id: doc.id,
                    };
                });
                setTasks(tasksData);
            });
    }, []);

    //Add Task
    const addTask = async () => {
        if (task.trim().length > 0) {
            await firestore().collection(`tasks-${uid}`).add({
                _id: tasks.length + 1,
                content: task,
            }, { timestamps: true })
                .then(() => console.log('Create Successful Task'))
            setTask("");
        }
    };

    //Delete All Tasks
    const deleteAllTasks = async () => {
        const tasksRef = firestore().collection(`tasks-${uid}`);
        const tasksSnapshot = await tasksRef.get();

        const batch = firestore().batch();

        tasksSnapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();
    };

    //Delete Task
    const deleteTask = async (taskId) => {
        try {
            await firestore().collection(`tasks-${uid}`).doc(taskId).delete();
            console.log('Task deleted!');
        } catch (error) {
            console.error("Error deleting task: ", error);
        }
    };

    //Edit Task
    const editTask = async () => {
        firestore().collection(`tasks-${uid}`).doc(iddefault).update({
            content: task,
        }).then(() => {
            console.log('Update Successfully!');
        });
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text(18)}>{`Hi, ${email}`}</Text>
                <Text style={styles.text(18)}>To Do App Connect FireBase</Text>
            </View>
            <View style={styles.body}>
                <ScrollView>

                    <TextInput
                        // editable={visiable}
                        style={styles.textInput}
                        value={task}
                        onChangeText={setTask}
                        placeholder='Enter the task !'
                    />
                    <View style={styles.textRow}>
                        <TouchableOpacity
                            onPress={addTask}
                        >
                            <Text style={styles.textRowButton}>Create New Task</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={deleteAllTasks}
                        >
                            <Text style={styles.textRowButton}>Delete Tasks</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={editTask}
                        >
                            <Text style={styles.textRowButton}>Edit Item</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
            <View style={styles.list}>

                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (

                        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text>{index + 1}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setTask(item.content)
                                    setIdDefault(item.id)
                                }}
                            >
                                <Text>{item.content}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => deleteTask(item.id)}

                            >
                                <Icon name="delete" size={30} color="red" />
                            </TouchableOpacity>
                        </View>

                    )}

                />

            </View>


        </SafeAreaView >
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 10,
    },
    body: {
        flex: 0.7,
        paddingBottom: 10,
    },
    list: {
        flex: 3,
    },
    text: (size) => ({
        fontSize: size,
    }),
    textInput: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    textRowButton: {
        borderWidth: 1,
        padding: 3,
        fontSize: 14,
    }
});
