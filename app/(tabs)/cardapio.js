import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
 
export default function Cardapio() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('comidas');
 
  const comidas = [
    {
      id: 1,
      name: 'Coxinha',
      price: 'R$ 5,00',
    },
    {
      id: 2,
      name: 'Pão de Batata',
      price: 'R$ 4,50',
    },
    {
      id: 3,
      name: 'Esfiha',
      price: 'R$ 6,00',
    },
  ];
 
  const bebidas = [
    {
      id: 1,
      name: 'Coca Cola Zero',
      price: 'R$ 4,00',
    },
    {
      id: 2,
      name: 'Coca Cola Normal',
      price: 'R$ 4,00',
    },
    {
      id: 3,
      name: 'Água com Gás',
      price: 'R$ 2,50',
    },
    {
      id: 4,
      name: 'Água sem Gás',
      price: 'R$ 2,00',
    },
  ];
 
  const handleAddToCart = (item) => {
    alert('${item.name} adicionado ao carrinho!');
  };
 
  const currentItems = activeTab === 'comidas' ? comidas : bebidas;
 
  return (
    <View style={styles.container}>
      <View style={styles.cardapio}>
        <Image
          source={require('../../assets/EatHub.png')}
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
 
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
 
        <View style={styles.itemsContainer}>
          {currentItems.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.addBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
 
        <TouchableOpacity style={styles.usuario} onPress={() => router.push('/carrinho')}>
          <Text style={styles.botaoTexto}>Ver Carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1C1C1C' },
  cardapio: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#262626', borderRadius: 50, padding: 20, width: 320 },
  bem_vindo: { fontSize: 24, marginBottom: 20, color: '#fff', fontWeight: 'bold' },
  tabsContainer: { flexDirection: 'row', marginBottom: 20, backgroundColor: '#404040', borderRadius: 25, padding: 4 },
  tab: { flex: 1, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, alignItems: 'center' },
  activeTab: { backgroundColor: '#F23064' },
  tabText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  activeTabText: { color: '#fff' },
  itemsContainer: { width: 280, marginBottom: 20, maxHeight: 300 },
  itemCard: { backgroundColor: '#404040', borderRadius: 12, padding: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  itemPrice: { fontSize: 14, color: '#F23064', fontWeight: 'bold' },
  addBtn: { backgroundColor: '#F23064', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  addBtnText: { color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  usuario: { backgroundColor: '#F23064', padding: 14, borderRadius: 12, width: 200, marginTop: 10 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center' },
});
