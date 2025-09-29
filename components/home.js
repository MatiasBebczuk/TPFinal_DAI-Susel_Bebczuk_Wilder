import { useNavigation } from '@react-navigation/native';
import { View, Button, Text, Alert } from 'react-native';

export function Home(){
    const navigation = useNavigation();
    return (<View>
        <Button title="Saludar" onPress={() => Alert.alert("Bienvenido a nuestra appini")}/>
        <Button title="Ir a ToDo list" onPress={() => navigation.navigate("ToDo list")}/>
    </View>);
}