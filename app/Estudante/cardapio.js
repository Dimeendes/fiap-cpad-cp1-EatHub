import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const AVISO_PEDIDO_KEY = 'aviso_pedido_enviado';

export default function Cardapio() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('comidas');
  const [carrinho, setCarrinho] = useState([]);
  const [avisoPedido, setAvisoPedido] = useState(null);

  const comidas = [
    {
      id: 1,
      name: 'Coxinha',
      price: '5.00',
    },
    {
      id: 2,
      name: 'Pão de Batata',
      price: '4.50',
    },
    {
      id: 3,
      name: 'Esfiha',
      price: '6.00',
    },
  ];
 
  const bebidas = [
    {
      id: 4,
      name: 'Coca Cola Zero',
      price: '4.00',
    },
    {
      id: 5,
      name: 'Coca Cola Normal',
      price: '4.00',
    },
    {
      id: 6,
      name: 'Água com Gás',
      price: '2.50',
    },
    {
      id: 7,
      name: 'Água sem Gás',
      price: '2.00',
    },
  ];

  const carregarCarrinho = async () => {
    const dados = await AsyncStorage.getItem('carrinho');
    if (dados) setCarrinho(JSON.parse(dados));
    else setCarrinho([]);
  };

  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      (async () => {
        await carregarCarrinho();
        const raw = await AsyncStorage.getItem(AVISO_PEDIDO_KEY);
        if (!raw || !ativo) return;
        try {
          const data = JSON.parse(raw);
          if (ativo) setAvisoPedido(data);
        } catch {
          if (ativo) {
            setAvisoPedido({
              titulo: 'Pedido enviado!',
              texto: 'Seu pedido foi enviado para a cozinha.',
            });
          }
        }
        await AsyncStorage.removeItem(AVISO_PEDIDO_KEY);
      })();
      return () => {
        ativo = false;
      };
    }, [])
  );
  const salvarCarrinho = async(lista) =>{
    await AsyncStorage.setItem('carrinho', JSON.stringify(lista))
  }

  const adicionarCarrinho = async (item) =>{
    const dados = await AsyncStorage.getItem('carrinho');
    const carrinhoAtual = dados ? JSON.parse(dados) : [];
    const index = carrinhoAtual.findIndex(i => i.id ===item.id.toString());
    let novoCarrinho;
    if(index !== -1){
      novoCarrinho = carrinhoAtual.map((i,idx) =>{
        if(idx === index){
          return{...i, qtd: i.qtd + 1}
        }
        return i
      });
    }else{
      const novoItem = {id: item.id.toString(), nome: item.name, preco: parseFloat(item.price), qtd: 1};
    novoCarrinho = [...carrinhoAtual, novoItem];
  }
    salvarCarrinho(novoCarrinho)
    setCarrinho(novoCarrinho);
  }
 
  const currentItems = activeTab === 'comidas' ? comidas : bebidas;
 
  return (
    <View style={styles.container}>
      <View style={styles.cardapio}>
        <Image
          source={require('../../assets/EatHub.png')}
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />

        {avisoPedido && (
          <View style={styles.avisoBox}>
            <Text style={styles.avisoTitulo}>{avisoPedido.titulo}</Text>
            <Text style={styles.avisoTexto}>{avisoPedido.texto}</Text>
            <TouchableOpacity
              style={styles.avisoFechar}
              onPress={() => setAvisoPedido(null)}
            >
              <Text style={styles.avisoFecharTexto}>Entendi</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.bem_vindo}>Cardápio</Text>
 
        {/* Abas */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'comidas' && styles.activeTab]}
            onPress={() => setActiveTab('comidas')}
          >
            <Text style={[styles.tabText, activeTab === 'comidas' && styles.activeTabText]}>Comidas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'bebidas' && styles.activeTab]}
            onPress={() => setActiveTab('bebidas')}
          >
            <Text style={[styles.tabText, activeTab === 'bebidas' && styles.activeTabText]}>Bebidas</Text>
          </TouchableOpacity>
        </View>
 
        <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator = {false}>
          {currentItems.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>R$ {item.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => adicionarCarrinho(item)}
              >
                <Text style={styles.addBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
 
        <TouchableOpacity style={styles.usuario} onPress={() => router.push('/Estudante/carrinho')}>
          <Text style={styles.botaoTexto}>Ver Carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {flexGrow: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1C1C1C'},
  cardapio:  { alignItems: 'center', justifyContent: 'center', backgroundColor: '#262626', borderRadius: 50, padding: 4, width: 320 },
  bem_vindo: { fontSize: 24, marginBottom: 20, color: '#fff', fontWeight: 'bold' },
  tabsContainer: { flexDirection: 'row', marginBottom: 20, backgroundColor: '#404040', borderRadius: 25, padding: 4 },
  tab:       { flex: 1, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, alignItems: 'center' },
  activeTab: { backgroundColor: '#F23064' },
  tabText:   { color: '#fff', fontSize: 14, fontWeight: '600' },
  activeTabText: { color: '#fff' },
  itemsContainer: { width: 280, marginBottom: 20, maxHeight: 230 },
  itemCard:  { backgroundColor: '#404040', borderRadius: 12, padding: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemInfo:  { flex: 1 },
  itemName:  { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  itemPrice: { fontSize: 14, color: '#F23064', fontWeight: 'bold' },
  addBtn:    { backgroundColor: '#F23064', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  addBtnText:{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  usuario:   { backgroundColor: '#F23064', padding: 14, borderRadius: 12, width: 200., marginBottom: 10},
  botaoTexto:{ color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center' },
  avisoBox: {
    backgroundColor: '#1a3d2e',
    borderWidth: 1,
    borderColor: '#2ecc71',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    width: '100%',
    maxWidth: 300,
  },
  avisoTitulo: {
    color: '#2ecc71',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  avisoTexto: {
    color: '#e8f8ef',
    fontSize: 14,
    lineHeight: 20,
  },
  avisoFechar: {
    marginTop: 12,
    alignSelf: 'flex-end',
    backgroundColor: '#F23064',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  avisoFecharTexto: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});
