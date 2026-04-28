import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, Image } from 'react-native';

export default function App() {
  // Controla se o icone de carregamento deve aparecer ou não
  const [loading, setLoading] = useState(false);

  // Armazena o texto inserido pelo usuário em número
  const [quantidadeDesejada, setQuantidadeDesejada] = useState('');

  // A API que escolhi retorna uma lista, essa lista é armazenada na variavel abaixo, através do hook useState
  // Onde cada indice é um animal.
  const [listaResultados, setListaResultados] = useState(null);

  async function carregarAnimal() {
    if (quantidadeDesejada.trim() === '') {
      Alert.alert("Aviso", "Digite a quantidade de animais (1 a 804).");
      return;
    }

    try {
      setLoading(true);
      // Mantida a URL original: o parâmetro final é a quantidade
      const response = await fetch(`https://extinct-api.herokuapp.com/api/v1/animal/${quantidadeDesejada}`);
      const json = await response.json();

      console.log("Status da Resposta:", json.status);
      console.log("Dados recebidos:", json.data);

      // Verifica se a API retornou animais.
      if (json.data && json.data.length > 0) {
          setListaResultados(json.data);
      } else {
        setListaResultados(null);
        Alert.alert("Aviso", "Nenhum dado retornado para esta quantidade.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar as informações.");
    } finally {
      setLoading(false);
    }
  }

  // Componente criado para padronização e não repetir códigos.
  const InfoItem = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}: </Text>
      <Text style={styles.info}>{value || 'Não informado'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      // Utilizado como recomendação da IA para o teclado não cobrir o campo de input no celular.
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{flex: 1}}
      >
        // Permite que o usuário role a tela para baixo se o número de animais for grande.
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.section}>
            <Text style={styles.title}>Listagem de Animais Extintos</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Digite a quantidade de animais (1 a 804)"
              value={quantidadeDesejada}
              onChangeText={setQuantidadeDesejada}
              keyboardType="numeric"
              maxLength={3}
            />

            <TouchableOpacity style={styles.button} onPress={carregarAnimal}>
              <Text style={styles.buttonText}>CARREGAR ANIMAIS</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#007AFF" style={{marginTop: 20}} />}
            
            //Verifica se existe uma lista na condicional.
            // Utilizei o .map para percorrer cada animal/indice da lista e criar um Card. Obs: foi ensinado pela prof. Bia
          {listaResultados && Array.isArray(listaResultados) && (
            listaResultados.map((animal, index) => (
              //Key={index} serve para indentificar cada item da lista de forma única.
              <View key={index} style={styles.resultContainer}>
                <InfoItem label="Nome" value={animal.commonName} />
                <InfoItem label="Científico" value={animal.binomialName} />
                <InfoItem label="Local" value={animal.location} />
                <InfoItem label="Derradeiro" value={animal.lastRecord} />
                <InfoItem label="Descrição" value={animal.shortDesc} />
              
              </View>
            ))
          )}
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Utilizei a IA como auxilio na estilização. Recomendação dada pela prof. Bia.
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2F5' },
  scrollContent: { padding: 20, paddingTop: 40 },
  section: { width: '100%' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#ccc' },
  button: { backgroundColor: '#28a745', padding: 16, borderRadius: 10, alignItems: 'center', elevation: 2 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultContainer: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginTop: 20, elevation: 3 },
  infoRow: { flexDirection: 'row', marginBottom: 8, width: '100%' },
  label: { fontWeight: 'bold', color: '#555', width: 90 },
  info: { color: '#777', flex: 1 }
});