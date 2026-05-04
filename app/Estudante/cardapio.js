import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { getUserCart, saveUserCart } from '../utils/cartStorage';

 
export default function Cardapio() {
  const router = useRouter();
  const { tema } = useTheme();
  const { usuarioLogado } = useUser();
  const [activeTab, setActiveTab] = useState('comidas');
  const [carrinho, setCarrinho] = useState([]);

  const comidas = [
    {
      id: 1,
      name: 'Coxinha',
      price: '5.00',
      image: require('../../assets/coxinha.jpg'),
    },
    {
      id: 2,
      name: 'Pão de Batata',
      price: '4.50',
      image: require('../../assets/pao-de-batata.jpg'),
    },
    {
      id: 3,
      name: 'Esfiha',
      price: '6.00',
      image: require('../../assets/esfiha.jpg'),
    },
  ];
 
  const bebidas = [
    {
      id: 4,
      name: 'Coca Cola Zero',
      price: '4.00',
      image: require('../../assets/coca-cola-zero.jpg'),
    },
    {
      id: 5,
      name: 'Coca Cola Normal',
      price: '4.00',
      image: require('../../assets/coca-cola.jpg'),
    },
    {
      id: 6,
      name: 'Água com Gás',
      price: '2.50',
      image: require('../../assets/agua-com-gas.jpg'),
    },
    {
      id: 7,
      name: 'Água sem Gás',
      price: '2.00',
      image: require('../../assets/agua-sem-gas.jpg'),
    },
  ];

  useEffect(() => {
    carregarCarrinho();
  }, [usuarioLogado]);

  const carregarCarrinho = async () => {
    const carrinhoSalvo = await getUserCart(usuarioLogado);
    setCarrinho(carrinhoSalvo);
  };

  const salvarCarrinho = async (lista) => {
    await saveUserCart(usuarioLogado, lista);
  };

  const adicionarCarrinho = async (item) => {
    const carrinhoAtual = await getUserCart(usuarioLogado);
    const index = carrinhoAtual.findIndex(i => i.id === item.id.toString());
    let novoCarrinho;
    if (index !== -1) {
      novoCarrinho = carrinhoAtual.map((i, idx) => {
        if (idx === index) {
          return { ...i, qtd: i.qtd + 1 };
        }
        return i;
      });
    } else {
      const novoItem = { id: item.id.toString(), nome: item.name, preco: parseFloat(item.price), qtd: 1 };
      novoCarrinho = [...carrinhoAtual, novoItem];
    }
    await salvarCarrinho(novoCarrinho);
    setCarrinho(novoCarrinho);
  };
 
  const currentItems = activeTab === 'comidas' ? comidas : bebidas;
 
  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <View style={[styles.cardapio, { backgroundColor: tema.card }]}>
        <Image
          source={require('../../assets/EatHub.png')}
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
 
        <Text style={[styles.bem_vindo, { color: tema.texto }]}>Cardápio</Text>
 
        {/* Abas */}
        <View style={[styles.tabsContainer, { backgroundColor: tema.fundo }]}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'comidas' && { backgroundColor: tema.primaria }]}
            onPress={() => setActiveTab('comidas')}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'comidas' ? '#fff' : tema.texto },
                activeTab === 'comidas' && styles.activeTabText,
              ]}
            >
              Comidas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'bebidas' && { backgroundColor: tema.primaria }]}
            onPress={() => setActiveTab('bebidas')}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'bebidas' ? '#fff' : tema.texto },
                activeTab === 'bebidas' && styles.activeTabText,
              ]}
            >
              Bebidas
            </Text>
          </TouchableOpacity>
        </View>
 
        <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator = {false}>
          {currentItems.map((item) => (
            <View key={item.id} style={[styles.itemCard, { backgroundColor: tema.fundo }]}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={[styles.itemName, { color: tema.texto }]}>{item.name}</Text>
                <Text style={[styles.itemPrice, { color: tema.primaria }]}>R$ {item.price}</Text>
              </View>
              <TouchableOpacity
                style={[styles.addBtn, { backgroundColor: tema.primaria }]}
                onPress={() => adicionarCarrinho(item)}
              >
                <Text style={styles.addBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
 
        <TouchableOpacity
          style={[styles.usuario, { backgroundColor: tema.primaria }]}
          onPress={() => router.push('/Estudante/carrinho')}
        >
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
  itemCard:  { backgroundColor: '#404040', borderRadius: 12, padding: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemImage: { width: 36, height: 36, borderRadius: 8, marginRight: 10 },
  itemInfo:  { flex: 1, justifyContent: 'center' },
  itemName:  { fontSize: 15, fontWeight: 'bold', color: '#fff', marginBottom: 2 },
  itemPrice: { fontSize: 13, color: '#F23064', fontWeight: 'bold' },
  addBtn:    { backgroundColor: '#F23064', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  addBtnText:{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  usuario:   { backgroundColor: '#F23064', padding: 14, borderRadius: 12, width: 200., marginBottom: 10},
  botaoTexto:{ color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center' },
});
