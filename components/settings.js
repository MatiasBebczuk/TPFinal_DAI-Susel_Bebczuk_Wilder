import { useNavigation } from '@react-navigation/native';
import { View, Button, Text, TextInput, Image } from 'react-native';
import styles from './Estilos';


export function Editarperfil(){
    return (<View style={styles.container}>
        <Button title="Cargar foto de perfil" onPress={() => Alert.alert("Nos vemos en el TP 10!!!")}/>
        <TextInput placeholder="Nombre" defaultValue="Gabriel"/>
        <TextInput placeholder="Apellido" defaultValue="Stancanelli"/>
        <TextInput placeholder="Apodo" defaultValue="Stanca"/>
    </View>)
}
  
export function Verperfil(){
    const navigation = useNavigation();
    return (<View style={styles.container}>
        <Image source={{uri: "https://recursos.ort.edu.ar/static/archivos/usuarioperfil/22609"}}/>
        <Text>Gabriel Stancanelli</Text>
        <Text>Stanca</Text>
        <Button title="Editar perfil" onPress={() => navigation.navigate("Editar perfil")}/>
    </View>)
}