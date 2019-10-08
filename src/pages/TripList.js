import React, {useState, useEffect} from 'react';
import { View,AsyncStorage, ScrollView, KeyboardAvoidingView,SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function TripList({navigation}) {

    const [viagens, setViagens] = useState([]);
     valorTotalGasto = 0;

    async function handleSubmit(viagemSelecionada) {

        await AsyncStorage.setItem('viagemSelecionada', JSON.stringify(viagemSelecionada));
        
        navigation.navigate('Trip');
    }
    function somaValores() {

        for (let i = 0; i < viagens.length; i++) {
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
        
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.label}>
                <Text style={styles.label}>Valor Total Gasto em Viagens pelo Orgão: R${valorTotalGasto}</Text>
                {viagens.map(viagem =>
                    <TouchableOpacity onPress={() => handleSubmit(viagem)} key={ viagem.id } style={styles.button}>
                        <Text style={styles.buttonText}>Beneficiario: { viagem.pessoa.nome }</Text>
                        <Text style={styles.buttonText}>Data da Viagem: { viagem.dataInicioAfastamento } - {viagem.dataFimAfastamento}</Text>
                        <Text style={styles.buttonText}>Valor da viagem: R${ viagem.valorTotalViagem }</Text>
                    </TouchableOpacity>)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 4,
        fontSize: 14,
    },

    button: {
        height: 70,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginBottom: 8,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    }
});