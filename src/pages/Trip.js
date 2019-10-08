import React, {useState, useEffect} from 'react';
import { View,AsyncStorage, ScrollView, KeyboardAvoidingView,SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Trip() {
    const [viagem, setViagem] = useState([]);
    const [pessoa, setPessoa] = useState('');
  
    useEffect(() => {
        AsyncStorage.getItem('viagemSelecionada').then(viagemStorage => {
            const viagemSelecionada = JSON.parse(viagemStorage);
            setViagem(viagemSelecionada);
            setPessoa(viagemSelecionada.pessoa);
        })
    }, []);

    return (
        <SafeAreaView>
            <ScrollView>
                <Text>{pessoa.nome}</Text>
                <Text>{viagem.dataInicioAfastamento}</Text>
                <Text>{viagem.dataFimAfastamento}</Text>
                <Text>{viagem.valorTotalRestituicao}</Text>
                <Text>{viagem.valorTotalTaxaAgenciamento}</Text>
                <Text>{viagem.valorMulta}</Text>
                <Text>{viagem.valorTotalDiarias}</Text>
                <Text>{viagem.valorTotalPassagem}</Text>
                <Text>{viagem.valorTotalViagem}</Text>
                <Text>{viagem.valorTotalDevolucao}</Text>                
            </ScrollView>
        </SafeAreaView>
    )
}