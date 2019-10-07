import React, {useState, useEffect} from 'react';
import { View,AsyncStorage, ScrollView, KeyboardAvoidingView,SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
nome = "";

export default function Trip() {
    const [viagem, setViagem] = useState([]);
  
    useEffect(() => {
        AsyncStorage.getItem('viagemSelecionada').then(viagemRonaldo => {
            const viagemSelecionada = JSON.parse(viagemRonaldo);
            setViagem(viagemSelecionada);
            this.nome = viagemSelecionada.pessoa.nome;
            console.log(viagemSelecionada.pessoa.nome)
        })
    }, []);

    return (
        <SafeAreaView>
            <ScrollView>
                <Text>{viagem.dataInicioAfastamento}</Text>
                <Text>{viagem.dataFimAfastamento}</Text>
                <Text>{viagem.valorTotalRestituicao}</Text>
                <Text>{viagem.valorTotalTaxaAgenciamento}</Text>
                <Text>{viagem.valorMulta}</Text>
                <Text>{nome}</Text>
                <Text>{viagem.valorTotalDiarias}</Text>
                <Text>{viagem.valorTotalPassagem}</Text>
                <Text>{viagem.valorTotalViagem}</Text>
                <Text>{viagem.valorTotalDevolucao}</Text>                
            </ScrollView>
        </SafeAreaView>
    )
}