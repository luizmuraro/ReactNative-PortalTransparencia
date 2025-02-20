import React, {useState, useEffect} from 'react';
import { View,AsyncStorage, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function Home({ navigation }) {
    const [descricao, setDescricao] = useState('');



    async function handleSubmit() {
        const response = await api.get(`orgaos-siafi?descricao=${descricao}&pagina=1`);

        const stringResponse = JSON.stringify(response.data);

        if (stringResponse == '[]'){
            Alert.alert('Nenhum orgão encontrado!')
        } else {
          await AsyncStorage.setItem('orgao', stringResponse);
          await AsyncStorage.setItem('descricao', descricao);
          await AsyncStorage.setItem('pagina', "1");


         navigation.navigate('List');
        }
    }

    return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>ÓRGÃO:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome/Descrição do órgão"
                    placeholderTextColor="#999"
                    autoCapitalize ="words"
                    autoCorrect={false}
                    value={descricao}
                    onChangeText={setDescricao}
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