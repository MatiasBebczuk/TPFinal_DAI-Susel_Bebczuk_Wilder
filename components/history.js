import { useState } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export function History(){
    const [history, setHistory] = useState([]);
    useFocusEffect(() => {
        AsyncStorage.getItem("history")
        .then(h => setHistory(JSON.parse(h) ?? []))
    });   //le envia desde home una lista de todos los links escaneados y los conviernte a json. 

    return (<View style={{ flex: 1, backgroundColor: '#f7f7f8', padding: 16 }}>
        <View style={{ marginBottom: 16 }}>
            <Pressable
                onPress={async() => {await AsyncStorage.setItem("history", "[]"); setHistory([])}}
                style={({ pressed }) => ({
                    backgroundColor: pressed ? '#ef4444' : '#f87171',
                    paddingVertical: 12,
                    borderRadius: 10,
                    alignItems: 'center',
                })}
            >
                <Text style={{ color: '#ffffff', fontWeight: '700' }}>Borrar historial</Text>
            </Pressable>
        </View>
        <FlatList
            data={history}
            contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
            renderItem={({ item }) => (
                <View style={{ backgroundColor: '#ffffff', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#e6e8eb' }}>
                    <Text selectable style={{ color: '#11181c' }}>{item}</Text>
                </View>
            )}
            keyExtractor={(item, index) => `${index}-${String(item)}`}
            ListEmptyComponent={() => (
                <View style={{ backgroundColor: '#ffffff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e6e8eb' }}>
                    <Text style={{ color: '#64748b', textAlign: 'center' }}>No hay elementos en el historial</Text>
                </View>
            )}
        />
    </View>)
}
