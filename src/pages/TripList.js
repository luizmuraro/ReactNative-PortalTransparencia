import React, {useState, useEffect} from 'react';
import { View,AsyncStorage, ScrollView, KeyboardAvoidingView,SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';

export default function TripList({navigation}) {
    const [dataIdaDe, setDataIdaDe] = useState('');
    const [dataIdaAte, setDataIdaAte] = useState('');
    const [dataRetornoDe, setDataRetornoDe] = useState('');
    const [dataRetornoAte, setDataRetornoAte] = useState('');
    const [codigo, setCodigo] = useState('');
    const [paginaTrip, setPaginaTrip] = useState('');


    const [viagens, setViagens] = useState([]);
     valorTotalGasto = 0;

    async function handleSubmit(viagemSelecionada) {

        await AsyncStorage.setItem('viagemSelecionada', JSON.stringify(viagemSelecionada));
        
        navigation.navigate('Trip');
    }

    async function nextPage() {
        let paginacao = parseInt(paginaTrip);
        let proxPag = paginacao + 1;
        const pagString = String(proxPag);
        await AsyncStorage.setItem('paginaTrip', pagString)
        setPaginaTrip(pagString)

        const response = await api.get(`viagens?dataIdaDe=${dataIdaDe}&dataIdaAte=${dataIdaAte}&dataRetornoDe=${dataRetornoDe}&dataRetornoAte=${dataRetornoAte}&codigoOrgao=${codigo}&pagina=${pagString}`);

        await AsyncStorage.setItem('viagens', JSON.stringify(response.data));
        setViagens(response.data)

    }

    async function previousPage() {
        let paginacao = parseInt(paginaTrip);
        let pagAnterior = paginacao - 1;
        const pagString = String(pagAnterior);
        await AsyncStorage.setItem('paginaTrip', pagString)
        setPaginaTrip(pagString)

        const response = await api.get(`viagens?dataIdaDe=${dataIdaDe}&dataIdaAte=${dataIdaAte}&dataRetornoDe=${dataRetornoDe}&dataRetornoAte=${dataRetornoAte}&codigoOrgao=${codigo}&pagina=${pagString}`);

        await AsyncStorage.setItem('viagens', JSON.stringify(response.data));
        setViagens(response.data)
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
    useEffect(() => {
        AsyncStorage.getItem('dataIdaDe').then(dataIdaDe => {
            setDataIdaDe(dataIdaDe);
        })
    
    }, []);
    useEffect(() => {
        AsyncStorage.getItem('dataIdaAte').then(dataIdaAte => {
            setDataIdaAte(dataIdaAte);
        })
    
    }, []);
    useEffect(() => {
        AsyncStorage.getItem('dataRetornoDe').then(dataRetornoDe => {
            setDataRetornoDe(dataRetornoDe);
        })
    
    }, []);
    useEffect(() => {
        AsyncStorage.getItem('dataRetornoAte').then(dataRetornoAte => {
            setDataRetornoAte(dataRetornoAte);
        })
    
    }, []);
    useEffect(() => {
        AsyncStorage.getItem('codigo').then(codigo => {
            setCodigo(codigo);
        })
    
    }, []);
    useEffect(() => {
        AsyncStorage.getItem('paginaTrip').then(paginaTrip => {
            setPaginaTrip(paginaTrip);
        })
    
    }, []);
    somaValores();
 
    return (
        
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.label}>
                <Text style={styles.label}>Valor Total Gasto em Viagens pelo Orgão: R${valorTotalGasto}</Text>
                {viagens.map(viagem =>
                    <TouchableOpacity onPress={() => handleSubmit(viagem)} key={ viagem.id } style={styles.buttonsTrip}>
                        <Text style={styles.buttonTextTrip}>Beneficiario: { viagem.pessoa.nome }</Text>
                        <Text style={styles.buttonTextTrip}>Data da Viagem: { viagem.dataInicioAfastamento } - {viagem.dataFimAfastamento}</Text>
                        <Text style={styles.buttonTextTrip}>Valor da viagem: R${ viagem.valorTotalViagem }</Text>
                    </TouchableOpacity>)}
                    <TouchableOpacity onPress={() => {navigation.navigate('Dates')}} style={styles.button}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={nextPage} style={styles.button}>
                        <Text style={styles.buttonText}>Próxima</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={previousPage} style={styles.button}>
                        <Text style={styles.buttonText}>Anterior</Text>
                    </TouchableOpacity>
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

    buttonsTrip: {
        height: 70,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginBottom: 6,
        marginTop: 2,
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginBottom: 8,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    buttonTextTrip: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    }
});