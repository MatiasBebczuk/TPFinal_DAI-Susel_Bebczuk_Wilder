import { useNavigation } from '@react-navigation/native';
import { View, Button, TextInput, Alert } from 'react-native';
import styles from './Estilos';


export function Iniciarsesion(){
    const navigation = useNavigation();
    return (<View style={styles.container}>
        <TextInput placeholder="Email"/>
        <TextInput placeholder="Contraseña" secureTextEntry={true}/>
        <Button title="Recuperar cuenta" onPress={() => navigation.navigate("Recuperar cuenta")}/>
    </View>);
}
  
export function Recuperarcuenta(){
    return (<View style={styles.container}>
        <TextInput placeholder="Email"/>
        <Button title="Verificar" onPress={() => Alert.alert("Confío en que sos vos, la contraseña es info361")}/>
    </View>);
}