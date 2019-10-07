import React, {useState, useEffect} from 'react';
import { View,AsyncStorage, ScrollView, KeyboardAvoidingView,SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

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
        <SafeAreaView>
            <ScrollView>
                {orgaos.map(orgao =>
                    <TouchableOpacity onPress={() => handleSubmit(orgao.codigo)} key={ orgao.codigoDescricaoFormatado }>
                        <Text>{ orgao.codigoDescricaoFormatado }</Text>
                    </TouchableOpacity>)}
            </ScrollView>
        </SafeAreaView>
    )
}