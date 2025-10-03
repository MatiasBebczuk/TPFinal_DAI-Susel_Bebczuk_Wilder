import { View, Text } from 'react-native';

export function About(){
    return (<View style={{ flex: 1, backgroundColor: '#f7f7f8', padding: 16 }}>
        <Text style={{fontSize: 30}}>
            Esta app consiste de:
        </Text>
        <Text style={{fontSize: 30}}>
            -Lector de QR + copiar resultado al portapapeles
        </Text>
        <Text style={{fontSize: 30}}>
            -Historial de escaneos
        </Text>
    </View>)
}