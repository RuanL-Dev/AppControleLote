import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('lotes.db');

export default function App() {
  const [numeroLote, setNumeroLote] = useState('');
  const [status, setStatus] = useState('');
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    criarTabela();
    carregarLotes();
  }, []);

  const criarTabela = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS lotes (id INTEGER PRIMARY KEY AUTOINCREMENT, numero TEXT, status TEXT)',
        [],
        () => console.log('Tabela criada'),
        (_, error) => console.log('Erro ao criar tabela:', error)
      );
    });
  };

  const salvarLote = () => {
    if (!numeroLote.trim() || !status) {
      Alert.alert('Erro', 'Preencha o número do lote e selecione o status');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO lotes (numero, status) VALUES (?, ?)',
        [numeroLote, status],
        () => {
          Alert.alert('Sucesso', 'Lote registrado com sucesso!');
          setNumeroLote('');
          setStatus('');
          carregarLotes();
        },
        (_, error) => Alert.alert('Erro', 'Erro ao salvar lote')
      );
    });
  };

  const carregarLotes = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM lotes ORDER BY id DESC',
        [],
        (_, { rows }) => setLotes(rows._array),
        (_, error) => console.log('Erro ao carregar lotes:', error)
      );
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemLote}>
      <Text style={styles.numeroLote}>Lote: {item.numero}</Text>
      <Text style={[
        styles.status,
        { color: item.status === 'Aprovado' ? '#4CAF50' : '#F44336' }
      ]}>
        Status: {item.status}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Controle de Lotes - LAB.CQ</Text>
      
      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Número do Lote"
          value={numeroLote}
          onChangeText={setNumeroLote}
        />
        
        <View style={styles.botoesStatus}>
          <TouchableOpacity
            style={[
              styles.botaoStatus,
              status === 'Aprovado' && styles.botaoSelecionado
            ]}
            onPress={() => setStatus('Aprovado')}
          >
            <Text style={styles.textoBotao}>Aprovado</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.botaoStatus,
              status === 'Reprovado' && styles.botaoSelecionado
            ]}
            onPress={() => setStatus('Reprovado')}
          >
            <Text style={styles.textoBotao}>Reprovado</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarLote}>
          <Text style={styles.textoBotaoSalvar}>Registrar Lote</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitulo}>Histórico de Lotes</Text>
      <FlatList
        data={lotes}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.lista}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  formulario: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  botoesStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  botaoStatus: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  botaoSelecionado: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  textoBotao: {
    fontSize: 16,
    color: '#333',
  },
  botaoSalvar: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBotaoSalvar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  lista: {
    flex: 1,
  },
  itemLote: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 1,
  },
  numeroLote: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 