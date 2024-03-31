//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import FloatActionButton from '../../components/uı/floatActionButton';
import {ADDTASKS} from '../../utils/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskCard from '../../components/home/taskCard';

// create a component
const Home = ({navigation}) => {
  const [tasks, setTasks] = useState([]);
  const getTask = async () => {
    let myTask = [];
    try {
      const task = await AsyncStorage.getItem('task');
      myTask.push(JSON.parse(task));
      setTasks(myTask);
      console.log(tasks);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTask();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({item}) => <TaskCard item={item}/>}
      />
      <FloatActionButton onPress={() => navigation.navigate(ADDTASKS)} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default Home;
