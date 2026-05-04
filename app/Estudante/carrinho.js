import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { getUserCart, saveUserCart } from '../utils/cartStorage';

// Exemplo de dados para o carrinho

export default function Carrinho() {
  const router = useRouter();
  const { tema } = useTheme();
  const { usuarioLogado } = useUser();
  const [carrinho, setCarrinho] = useState([]);

  useFocusEffect(
    useCallback(() => {
      carregarCarrinho();
    }, [usuarioLogado])
  );


  const carregarCarrinho = async () => {
    const carrinhoSalvo = await getUserCart(usuarioLogado);
    setCarrinho(carrinhoSalvo);
  };

  const removerItem = async (id) => {
    const novoCarrinho = carrinho.filter((item) => item.id !== id);
    await saveUserCart(usuarioLogado, novoCarrinho);
    setCarrinho(novoCarrinho);
  };

  const subtotal = carrinho?.reduce(
  (acc, item) => acc +item.preco * item.qtd,
  0
)

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, { backgroundColor: tema.card, borderLeftColor: tema.primaria }]}>
      <View style={{flex:0.8}}>
        <Text style={[styles.itemNome, { color: tema.texto }]}>{item.nome}</Text>
        <Text style={[styles.itemPreco, { color: tema.textoSecundario }]}>R$ {(item.preco * item.qtd).toFixed(2)}</Text>
      </View>

      <View style={[styles.qtdContainer, { backgroundColor: tema.fundo }]}>
        <Text style={[styles.qtdTexto, { color: tema.primaria }]}>{item.qtd}x</Text>
      </View>
      <View style={[styles.cancelContainer, { backgroundColor: tema.fundo }]}>
        <TouchableOpacity
          style={[styles.cancelContainer, { backgroundColor: tema.fundo }]}
          onPress={() => removerItem(item.id)}
        >
          <Ionicons name="close" size={20} color={tema.primaria} />
        </TouchableOpacity>

      </View>
    </View>
  );

  return (

    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      {/* Cabeçalho */}
      <View style={[styles.header, { borderBottomColor: tema.borda }]}>
        <Text style={[styles.headerTitle, { color: tema.primaria }]}>Meu Carrinho</Text>
      </View>

      {/* Lista de Itens */}
      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listaContext}
      />

      {/* Resumo e Botão de Finalizar */}
      <View style={[styles.footer, { backgroundColor: tema.card }]}>
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, { color: tema.texto }]}>Total:</Text>
          <Text style={[styles.totalValor, { color: tema.texto }]}>R$ {subtotal.toFixed(2)}</Text>
        </View>

        <TouchableOpacity 
            style={[styles.botaoFinalizar, { backgroundColor: tema.primaria, shadowColor: tema.primaria }]}
            onPress={() => router.push('/pagamento')}
        >
          <Text style={styles.botaoTexto}>FINALIZAR PEDIDO</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoVoltar}
          onPress={() => router.back()}
        >
          <Text style={[styles.voltarTexto, { color: tema.textoSecundario }]}>Adicionar mais itens</Text>
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
  cancelContainer: {
    backgroundColor: '#333',
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 10,
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