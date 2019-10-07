import React, {useState, useEffect} from 'react';
import { View,AsyncStorage, ScrollView, KeyboardAvoidingView,SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function TripList({navigation}) {

    const [viagens, setViagens] = useState([]);
     valorTotalGasto = 0;

    async function handleSubmit(viagemSelecionada) {

        await AsyncStorage.setItem('viagemSelecionada', JSON.stringify(viagemSelecionada));
        
        navigation.navigate('Viagem');
    }
    function somaValores() {

        for (let i = 0; i < viagens.length; i++) {
            console.log(viagens[i].valorTotalViagem)
            valorTotalGasto += viagens[i].valorTotalViagem;       
        }
    }

    
    useEffect(() => {
        AsyncStorage.getItem('viagens').then(viagem => {
            const viagemList = JSON.parse(viagem);
            setViagens(viagemList)
        })
    }, []);
    somaValores();
 
    return (
        
        <SafeAreaView>
            <ScrollView>
                <Text>Valor Total Gasto em Viagens pelo Orgão: R${valorTotalGasto}</Text>
                {viagens.map(viagem =>
                    <TouchableOpacity onPress={() => handleSubmit(viagem)} key={ viagem.id }>
                        <Text>Beneficiario: { viagem.pessoa.nome }</Text>
                        <Text>Data da Viagem: { viagem.dataInicioAfastamento } - {viagem.dataFimAfastamento}</Text>
                        <Text>Valor da viagem: R${ viagem.valorTotalViagem }</Text>
                    </TouchableOpacity>)}
            </ScrollView>
        </SafeAreaView>
    )
}