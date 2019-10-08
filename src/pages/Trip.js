import React, {useState, useEffect} from 'react';
import { View,AsyncStorage, ScrollView, SafeAreaView, Text, StyleSheet } from 'react-native';

export default function Trip() {
    const [viagem, setViagem] = useState([]);
    const [pessoa, setPessoa] = useState('');
    const [dimViagem, setDimViagem] = useState('');
  
    useEffect(() => {
        AsyncStorage.getItem('viagemSelecionada').then(viagemRonaldo => {
            const viagemSelecionada = JSON.parse(viagemRonaldo);
            setViagem(viagemSelecionada);
            setPessoa(viagemSelecionada.pessoa);
            setDimViagem(viagemSelecionada.dimViagem)
            
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.label}>Nome do beneficiário:</Text>
                <Text>{pessoa.nome}</Text>
                <Text style={styles.label}>Motivo da viagem:</Text>
                <Text>{dimViagem.motivo}</Text>
                <Text style={styles.label}>Data de inicio do afastamento:</Text>
                <Text>{viagem.dataInicioAfastamento}</Text>
                <Text style={styles.label}>Data de fim do afastamento:</Text>
                <Text>{viagem.dataFimAfastamento}</Text>
                <Text style={styles.label}>Valor total da viagem:</Text>
                <Text>R${viagem.valorTotalViagem}</Text>
                <Text style={styles.label}>Valor total de restituição: </Text>
                <Text>R${viagem.valorTotalRestituicao}</Text>
                <Text style={styles.label}>Valor total de taxas de agenciamento:</Text>
                <Text>R${viagem.valorTotalTaxaAgenciamento}</Text>
                <Text style={styles.label}>Valor total de multas:</Text>
                <Text>R${viagem.valorMulta}</Text>
                <Text style={styles.label}>Valor total de diárias:</Text>
                <Text>R${viagem.valorTotalDiarias}</Text>
                <Text style={styles.label}>Valor total de passagens:</Text>
                <Text>R${viagem.valorTotalPassagem}</Text>
                <Text style={styles.label}>Valor total de devoluções:</Text>
                <Text>R${viagem.valorTotalDevolucao}</Text>                
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f05a5b',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    label: {
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 8,
        marginTop: 4,
        fontSize: 15,
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