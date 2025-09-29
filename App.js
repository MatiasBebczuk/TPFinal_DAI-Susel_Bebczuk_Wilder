import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { Perms, Scan } from "./components/home.js";
import { History } from "./components/history.js";

const homeStack = createNativeStackNavigator();
const settingsStack = createNativeStackNavigator();

function HomeS() {
  return (
    <homeStack.Navigator>
      <homeStack.Screen name="Perms" component={Perms} />
      <homeStack.Screen name="Scan" component={Scan} />
    </homeStack.Navigator>
  );
}

function HistoryS() {
  return (
    <settingsStack.Navigator>
      <settingsStack.Screen name="Historial" component={History} />
    </settingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export default function App() {
  return (

      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeS} options={{title: "Home", tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color}/>}}/>
          <Tab.Screen name="History" component={HistoryS} options={{title: "History", tabBarIcon: ({color}) => <Ionicons name="refresh" size={24} color={color}/>}}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}