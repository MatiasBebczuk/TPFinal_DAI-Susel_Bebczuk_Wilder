import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { Home } from "./components/home.js";
import { History } from "./components/history.js";
import { SafeAreaView } from 'react-native-safe-area-context';

const homeStack = createNativeStackNavigator();
const settingsStack = createNativeStackNavigator();

function HomeS() {
  return (
    <homeStack.Navigator>
      <homeStack.Screen name="Home" component={Home} />
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
    <View style={styles.container}>
      <StatusBar style="auto" />

      <SafeAreaView>
        <Text>Hola</Text>
      </SafeAreaView>

      <NavigationContainer>
      <Tab.Navigator style={{display: "flex"}}>
        <Tab.Screen name="Home" component={HomeS} options={{title: "Home", tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color}/>}}/>
        <Tab.Screen name="History" component={HistoryS} options={{title: "History", tabBarIcon: ({color}) => <Ionicons name="history" size={24} color={color}/>}}/>
      </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}