import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import {ADDTASKS, TASKS} from '../utils/routes';
import AddTask from '../screens/addTask';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={TASKS} component={Home} />
      <Stack.Screen name={ADDTASKS} component={AddTask} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
