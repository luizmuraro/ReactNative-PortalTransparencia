import React, {useState, useEffect} from 'react';
import { View,AsyncStorage, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';

export default function Dates({ navigation }) {
    const [dataIdaDe, setDataIdaDe] = useState('');
    const [dataIdaAte, setDataIdaAte] = useState('');
    const [dataRetornoDe, setDataRetornoDe] = useState('');
    const [dataRetornoAte, setDataRetornoAte] = useState('');
    const [codigo, setCodigo] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('codigo').then(codigo => {
            setCodigo(codigo);
        })
    
    }, []);
 

    async function handleSubmit() {
        const response = await api.get(`viagens?dataIdaDe=${dataIdaDe}&dataIdaAte=${dataIdaAte}&dataRetornoDe=${dataRetornoDe}&dataRetornoAte=${dataRetornoAte}&codigoOrgao=${codigo}&pagina=1`);

        await AsyncStorage.setItem('viagens', JSON.stringify(response.data));

        await AsyncStorage.setItem('dataIdaDe', dataIdaDe);
        await AsyncStorage.setItem('dataIdaAte', dataIdaAte);
        await AsyncStorage.setItem('dataRetornoDe', dataRetornoDe);
        await AsyncStorage.setItem('dataRetornoAte', dataRetornoAte);
        await AsyncStorage.setItem('codigo', codigo);
        await AsyncStorage.setItem('paginaTrip', "1");


         navigation.navigate('TripList');
        
    }
  
    return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
    
            <View style={styles.form}>
                <Text style={styles.label}>Data de ida a partir de: *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="(DD/MM/AAAA)"
                    placeholderTextColor="#999"
                    autoCorrect={false}
                    value={dataIdaDe}
                    onChangeText={setDataIdaDe}
                />
                <Text style={styles.label}>Data de ida até: *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="(DD/MM/AAAA)"
                    placeholderTextColor="#999"
                    autoCorrect={false}
                    value={dataIdaAte}
                    onChangeText={setDataIdaAte}
                />
                <Text style={styles.label}>Data de retorno a partir de: *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="(DD/MM/AAAA)"
                    placeholderTextColor="#999"
                    autoCorrect={false}
                    value={dataRetornoDe}
                    onChangeText={setDataRetornoDe}
                />
                <Text style={styles.label}>Data de retorno a partir de: *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="(DD/MM/AAAA)"
                    placeholderTextColor="#999"
                    autoCorrect={false}
                    value={dataRetornoAte}
                    onChangeText={setDataRetornoAte}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Buscar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});