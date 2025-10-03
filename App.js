import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { Perms, Scan, Result } from "./components/home.js";
import { History } from "./components/history.js";

const homeStack = createNativeStackNavigator();
const settingsStack = createNativeStackNavigator();

function HomeS() {
  return (
    <homeStack.Navigator>
      <homeStack.Screen name="Perms" component={Perms} />
      <homeStack.Screen name="Scan" component={Scan} />
      <homeStack.Screen name="Result" component={Result} />
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
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: '#0ea5e9',
            background: '#f7f7f8',
            card: '#ffffff',
            text: '#11181c',
            border: '#e6e8eb',
          },
        }}
      >
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#ffffff' },
            headerTitleStyle: { fontWeight: '600', color: '#11181c' },
            headerShadowVisible: false,
            tabBarActiveTintColor: '#0ea5e9',
            tabBarInactiveTintColor: '#94a3b8',
            tabBarStyle: {
              backgroundColor: '#ffffff',
              borderTopColor: '#e6e8eb',
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeS}
            options={{
              title: 'Inicio',
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" size={22} color={color} />
              ),
              headerTitle: 'Lector QR',
            }}
          />
          <Tab.Screen
            name="History"
            component={HistoryS}
            options={{
              title: 'Historial',
              tabBarIcon: ({ color }) => (
                <Ionicons name="time-outline" size={22} color={color} />
              ),
              headerTitle: 'Historial',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}