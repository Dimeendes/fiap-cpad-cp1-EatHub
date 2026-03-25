import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

// Exemplo de dados para o carrinho
const ITENS_CARRINHO = [
  { id: '1', nome: 'Burger Artesanal Duo', preco: 45.90, qtd: 1 },
  { id: '2', nome: 'Batata Rústica Grande', preco: 18.00, qtd: 1 },
  { id: '3', nome: 'Refrigerante Lata 350ml', preco: 7.50, qtd: 2 },
];

export default function Carrinho() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemNome}>{item.nome}</Text>
        <Text style={styles.itemPreco}>R$ {item.preco.toFixed(2)}</Text>
      </View>
      <View style={styles.qtdContainer}>
        <Text style={styles.qtdTexto}>{item.qtd}x</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Carrinho</Text>
      </View>

      {/* Lista de Itens */}
      <FlatList
        data={ITENS_CARRINHO}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listaContext}
      />

      {/* Resumo e Botão de Finalizar */}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValor}>R$ 123.12</Text>
        </View>

        <TouchableOpacity 
            style={styles.botaoFinalizar}
            onPress={() => router.push('/pagamento')}
        >
          <Text style={styles.botaoTexto}>FINALIZAR PEDIDO</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoVoltar}
          onPress={() => router.back()}
        >
          <Text style={styles.voltarTexto}>Adicionar mais itens</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Preto puro
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
    paddingBottom: 15,
  },
  headerTitle: {
    color: '#F23064', // Vermelho forte
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listaContext: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#F23064',
  },
  itemNome: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  itemPreco: {
    color: '#AAA',
    fontSize: 14,
    marginTop: 4,
  },
  qtdContainer: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  qtdTexto: {
    color: '#F23064',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#121212',
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  totalLabel: {
    color: '#FFF',
    fontSize: 18,
  },
  totalValor: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  botaoFinalizar: {
    backgroundColor: '#F23064',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#F23064',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  botaoTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  botaoVoltar: {
    marginTop: 15,
    alignItems: 'center',
  },
  voltarTexto: {
    color: '#AAA',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});