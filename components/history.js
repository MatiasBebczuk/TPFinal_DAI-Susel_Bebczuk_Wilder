import { useNavigation } from '@react-navigation/native';
import { View, Button, Text, TextInput, Image } from 'react-native';

export function History(){
    return (<View>
        <Button title="Cargar foto de perfil" onPress={() => Alert.alert("Nos vemos en el TP 10!!!")}/>
        <TextInput placeholder="Nombre" defaultValue="Gabriel"/>
        <TextInput placeholder="Apellido" defaultValue="Stancanelli"/>
        <TextInput placeholder="Apodo" defaultValue="Stanca"/>
    </View>)
}