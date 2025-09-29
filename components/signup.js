import { useNavigation } from '@react-navigation/native';
import { View, Button, Text, TextInput } from 'react-native';
import styles from './Estilos';


export function Rellenarform(){
  const navigation = useNavigation();
  return (<View style={styles.container}>
    <TextInput placeholder="Nombre"/>
    <TextInput placeholder="Apellido"/>
    <TextInput placeholder="Email"/>
    <TextInput placeholder="Contraseña" secureTextEntry={true}/>
    <TextInput placeholder="Repetir contraseña" secureTextEntry={true}/>
    <Button title="Registrarse" onPress={() => navigation.navigate("Invitar amigos")}/>
  </View>);
}
  
export function Invitaramigos(){
  const navigation = useNavigation();
  return (<View style={styles.container}>
    <Text>Opcional: Ingresá el email de 3 amigos para participar en el sorteo de una play</Text>
    <TextInput placeholder="Amigo 1"/>
    <TextInput placeholder="Amigo 2"/>
    <TextInput placeholder="Amigo 3"/>
    <Button title="Saltear" onPress={() => navigation.navigate("Saludar")}/>
  </View>);
}