import React, {useState, useEffect} from 'react';
import { View,AsyncStorage, ScrollView, KeyboardAvoidingView,SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';

export default function List({navigation}) {

    const [orgaos, setOrgaos] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [pagina, setPagina] = useState('');


    useEffect(() => {
        AsyncStorage.getItem('orgao').then(orgao => {
            const orgaoList = JSON.parse(orgao);
            setOrgaos(orgaoList)
        })
    }, []);
    useEffect(() => {
        AsyncStorage.getItem('descricao').then(descricao => {

            setDescricao(descricao);
        })
    }, []);
    useEffect(() => {
        AsyncStorage.getItem('pagina').then(pagina => {

            setPagina(pagina);
        })
    }, []);


    async function handleSubmit(codigo) {
        await AsyncStorage.setItem('codigo', codigo);

        navigation.navigate('Dates')
    }

    async function nextPage() {
        let paginacao = parseInt(pagina);
        let proxPag = paginacao + 1;
        const pagString = String(proxPag);
        await AsyncStorage.setItem('pagina', pagString)
        setPagina(pagString)
        const response = await api.get(`orgaos-siafi?descricao=${descricao}&pagina=${pagString}`);

        await AsyncStorage.setItem('orgao', JSON.stringify(response.data));
        setOrgaos(response.data)

    }

    async function previousPage() {
        let paginacao = parseInt(pagina);
        let pagAnterior = paginacao - 1;
        const pagString = String(pagAnterior);
        await AsyncStorage.setItem('pagina', pagString)
        setPagina(pagString)
        const response = await api.get(`orgaos-siafi?descricao=${descricao}&pagina=${pagString}`);

        await AsyncStorage.setItem('orgao', JSON.stringify(response.data));
        setOrgaos(response.data)
    }
    
    
 
    return (
        <SafeAreaView>
            <ScrollView>
                {orgaos.map(orgao =>
                    <TouchableOpacity onPress={() => handleSubmit(orgao.codigo)} key={ orgao.codigoDescricaoFormatado }>
                        <Text>{ orgao.codigoDescricaoFormatado }</Text>
                    </TouchableOpacity>)}
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