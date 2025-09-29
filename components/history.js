import { useState } from 'react';
import { View, Button, FlatList, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export function History(){
    const [history, setHistory] = useState([]);
    useFocusEffect(() => {
        AsyncStorage.getItem("history")
        .then(h => setHistory(JSON.parse(h) ?? []))
    });

    return (<View>
        <Button onPress={async() => {await AsyncStorage.setItem("history", "[]"); setHistory([])}} title="Borrar historial"/>
        <FlatList
            data={history}
            renderItem={item => <Text>{item.item}</Text>}
            keyExtractor={() => Math.random()}
        />
    </View>)
}