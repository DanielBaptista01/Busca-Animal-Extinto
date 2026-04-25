import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(false);

  // Estados para Busca de Animal
  const [nomeAnimal, setNomeAnimal] = useState('');
  const [animalBuscado, setAnimalBuscado] = useState(null);

  // Função para buscar Animal
async function carregarAnimal() {
    if (nomeAnimal.trim() === '') {
      Alert.alert("Aviso", "Digite o nome de um animal para buscar.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`https://extinct-api.herokuapp.com/api/v1/animal/${nomeAnimal}`);

      const json = await response.json();

      console.log("Status da Resposta:", json.status); // Verifique se retorna 'success'
      console.log("Dados recebidos:", json.data);
      // Você precisa extrair o objeto de dentro do array 'data'
      if (json.data && json.data.length > 0) {
          setAnimalBuscado(json.data[0]);
      } else {
        setAnimalBuscado(null);
        Alert.alert("Aviso", "Nenhum animal encontrado com este nome.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar as informações do animal.");
    } finally {
      setLoading(false);
    }
  }
  

  const InfoItem = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}: </Text>
      <Text style={styles.info}>{value || 'Não informado'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{flex: 1}}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.section}>
            <Text style={styles.title}>Buscador de Animais Extintos</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Ex: Tigre, Dodô, Panda..."
              value={nomeAnimal}
              onChangeText={setNomeAnimal}
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={carregarAnimal}>
              <Text style={styles.buttonText}>BUSCAR ANIMAL</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#007AFF" style={{marginTop: 20}} />}

          {animalBuscado && (
            <View style={styles.resultContainer}>
              {/* Verifique se as chaves abaixo são idênticas ao JSON fornecido */}
            <InfoItem label="Nome" value={animalBuscado.commonName} />
            <InfoItem label="Científico" value={animalBuscado.binomialName} />
            <InfoItem label="Local" value={animalBuscado.location} />
            <InfoItem label="Imagem" value={<img src={animalBuscado.imageSrc } style={{maxWidth: '100px'}} />} />
            </View>
          )}
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

//IA: Foi utilizado IA para recomendação de estilização css, como sugestão seguida da professora.
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