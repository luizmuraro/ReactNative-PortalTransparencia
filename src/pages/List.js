import React, {useState, useEffect} from 'react';
import { View,AsyncStorage, ScrollView, SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function List({navigation}) {

    async function handleSubmit(codigo) {
        await AsyncStorage.setItem('codigo', codigo);

        navigation.navigate('Dates')
    }

    const [orgaos, setOrgaos] = useState([]);
    
    useEffect(() => {
        AsyncStorage.getItem('orgao').then(orgao => {
            const orgaoList = JSON.parse(orgao);
            setOrgaos(orgaoList)
        })
    }, []);
 
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.label}>
            <Text style={styles.label}>Selecione o órgão desejado:</Text>
                {orgaos.map(orgao =>
                    <TouchableOpacity onPress={() => handleSubmit(orgao.codigo)} key={ orgao.codigoDescricaoFormatado } style={styles.button}>
                        <Text style={styles.buttonText}>{ orgao.codigoDescricaoFormatado }</Text>
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
        fontSize: 16,
    },

    button: {
        height: 70,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 2,
        marginBottom: 6,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    }
});