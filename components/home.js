import { useNavigation } from '@react-navigation/native';
import { View, Button, Text, Linking, Pressable } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { useEffect, useState } from 'react';
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Perms(){  // permiso de cam //
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
    }, []);              // permiso de cam //
    //operacion ternaria (en vez de usar if lo usamos directo), si el permiso es true la funcion se muestra, sino te pedira el permiso devuelta. 
    return (<View style={{ flex: 1, backgroundColor: '#f7f7f8', padding: 16, gap: 16, justifyContent: 'center' }}>    
        {
            hasPermission ? 
            <Pressable
                onPress={() => navigator.navigate("Scan")}
                style={({ pressed }) => ({
                    backgroundColor: pressed ? '#0284c7' : '#0ea5e9',
                    paddingVertical: 16,
                    paddingHorizontal: 20,
                    borderRadius: 12,
                    alignItems: 'center',
                })}
            >
                <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '700' }}>Escanear QR</Text>
            </Pressable>
            : <>
                <View style={{ backgroundColor: '#ffffff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#e6e8eb' }}>
                    <Text style={{ color: '#11181c', fontSize: 16, marginBottom: 12, textAlign: 'center' }}>Para usar la app tenés que habilitar los permisos de cámara</Text>
                    <Pressable
                        onPress={askForCameraPermission}
                        style={({ pressed }) => ({
                            backgroundColor: pressed ? '#0f172a' : '#11181c',
                            paddingVertical: 14,
                            borderRadius: 10,
                            alignItems: 'center',
                        })}
                    >
                        <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '700' }}>Pedir permisos</Text>
                    </Pressable>
                </View>
            </>
        }
    </View>);
}

export function Scan(){
    const navigator = useNavigation();
    const [scanned, setScanned] = useState(false);
    const handleBarCodeScanned = async({type, data}) => {
        if(!scanned){
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); //haptics para que cuando se escanee el qr vibre el dispositivo
            await AsyncStorage.setItem("history", JSON.stringify([...(JSON.parse(await AsyncStorage.getItem("history")) ?? []), data])); //guarda en localstorage lo escaneado
            navigator.navigate("Result", {data: data}); // muestra lo que se escaneo
            setScanned(true);
        }
    }

    //cuando returna usamos cameraview para que se vea en pantalla lo que se muestra en camara. 

    return(<View style={{ flex: 1, backgroundColor: '#000' }}> 
        <CameraView 
            facing={"back"}
            barcodeScannerSettings={{
                barcodeTypes: ["qr"]
            }}
            onBarcodeScanned={handleBarCodeScanned}
            style={{ flex: 1 }}
        />
    </View>);
}

export function Result({route}){
    const navigator = useNavigation();
    const [Resultado, setResultado] = useState(route.params.data); 

    const copyToClipboard = (async () => console.log(await Clipboard.setStringAsync(Resultado)));  //copíar en portapapeles

    return (<View style={{ flex: 1, backgroundColor: '#f7f7f8', padding: 16 }}>
        <View style={{ backgroundColor: '#ffffff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e6e8eb', marginBottom: 16 }}>
            <Text style={{ color: '#64748b', marginBottom: 6, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>Dato escaneado</Text>
            <Text selectable style={{ color: '#11181c', fontSize: 16 }}>{Resultado}</Text>
        </View>
        <View style={{ gap: 12 }}>
            <Pressable
                onPress={async() => await Linking.openURL(Resultado)}
                style={({ pressed }) => ({
                    backgroundColor: pressed ? '#0284c7' : '#0ea5e9',
                    paddingVertical: 14,
                    borderRadius: 10,
                    alignItems: 'center',
                })}
            >
                <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '700' }}>Abrir link</Text>
            </Pressable>
            <Pressable
                onPress={copyToClipboard}
                style={({ pressed }) => ({
                    backgroundColor: pressed ? '#e2e8f0' : '#e6e8eb',
                    paddingVertical: 14,
                    borderRadius: 10,
                    alignItems: 'center',
                })}
            >
                <Text style={{ color: '#11181c', fontSize: 15, fontWeight: '700' }}>Copiar al portapapeles</Text>
            </Pressable>
        </View>
    </View>);
}
