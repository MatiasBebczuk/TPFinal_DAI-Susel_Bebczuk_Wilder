import { useNavigation } from '@react-navigation/native';
import { View, Button, Text, Linking } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { useEffect, useState } from 'react';
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Perms(){
    const navigator = useNavigation();
    const [hasPermission, setHasPermission] = useState(false);
    const askForCameraPermission = () => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        setHasPermission(status === "granted");
        })();
    };

    useEffect(() => {
        askForCameraPermission();
    }, []);

    return (<View>
        {
            hasPermission ?
            <Button onPress={() => navigator.navigate("Scan")} title="Escanear QR"/>
            : <>
                <Text>Para usar la app tenés que habilitar los permisos de cámara</Text>
                <Button onClick={askForCameraPermission} title="Pedir permisos"/>
            </>
        }
    </View>);
}

export function Scan(){
    const navigator = useNavigation();
    const [scanned, setScanned] = useState(false);
    const handleBarCodeScanned = async({type, data}) => {
        if(!scanned){
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            await AsyncStorage.setItem("history", JSON.stringify([...(JSON.parse(await AsyncStorage.getItem("history")) ?? []), data]));
            navigator.navigate("Result", {data: data});
            setScanned(true);
        }
    }

    return(<CameraView
        facing={"back"}
        barcodeScannerSettings={{
            barcodeTypes: ["qr"]
        }}
        onBarcodeScanned={handleBarCodeScanned}
        style={{flex: "1"}}
    >
    </CameraView>);
}

export function Result({route}){
    const navigator = useNavigation();
    const [Resultado, setResultado] = useState(route.params.data);

    const copyToClipboard = (async () => console.log(await Clipboard.setStringAsync(Resultado)));

    return (<View>
        <Text>Dato escaneado: {Resultado}</Text>
        <Button onPress={async() => await Linking.openURL(Resultado)} title="Abrir link"/>
        <Button onPress={copyToClipboard} title="Copiar al portapapeles"/>
    </View>);
}