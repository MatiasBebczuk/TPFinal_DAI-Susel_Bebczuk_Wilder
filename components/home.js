import { useNavigation } from '@react-navigation/native';
import { View, Button, Text } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { useEffect, useState } from 'react';

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
    const [scanned, setScanned] = useState(false);
    const handleBarCodeScanned = ({type, data}) => {
        if(!scanned){
            setScanned(true);
            console.log('Tipo de codigo: ' + type + '\n' + 'Codigo: ' + data);
        }
    }

    return(<CameraView
        facing="back"
        barcodeScannerSettings={{
            barcodeTypes: ["qr"]
        }}
        onBarcodeScanned={handleBarCodeScanned}
        style={{flex: "1"}}
    >
        <View style={styles.overlay} >
          <View style={styles.scanArea} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.buttonText}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
    </CameraView>);
}

const styles = StyleSheet.create({
    container: {flex:1},
    message: {textAlign: "center", marginTop:20},
    camera: {flex:1},
    buttonContainer: {
      position: "absolute",
      bottom: 30,
      alignSelf: "center"
    },
    button: {
      backgroundColor: "black",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
    },
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    scanArea: {
      width: 250,
      height: 250,
      borderWidth: 2,
      borderColor: "white",
      borderRadius: 10
    },
  });