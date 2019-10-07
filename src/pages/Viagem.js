import React, {useState, useEffect} from 'react';
import { View,AsyncStorage, ScrollView, KeyboardAvoidingView,SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Viagem() {
    const [viagem, setViagem] = useState([]);
    
  
    useEffect(() => {
        AsyncStorage.getItem('viagemSelecionada').then(viagemRonaldo => {
            const viagemSelecionada = JSON.parse(viagemRonaldo);
            setViagem(viagemSelecionada)
        })
    }, []);
    console.log(viagem);
    console.log(typeof(viagem))
    return (
        <SafeAreaView>
            <ScrollView>
                <Text>{viagem}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}