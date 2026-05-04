import { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from './context/UserContext';
import { loadCartaoParaUsuario } from './utils/cartaoStorage';
import { useTheme } from './context/ThemeContext';
import { clearUserCart, getUserCart } from './utils/cartStorage';

export default function Pagamento() {
  const router = useRouter();
  const { usuarioLogado } = useUser();
  const usuarioId = usuarioLogado
    ? `${usuarioLogado.emailRM || ''}${usuarioLogado.emailRF || ''}${usuarioLogado.email || ''}`.trim().toLowerCase()
    : '';
  const { tema } = useTheme();
  const [metodo, setMetodo] = useState('pix');
  const [carrinho, setCarrinho] = useState([]);
  const [cartaoSalvo, setCartaoSalvo] = useState(null);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [usuarioId])
  );

  const carregarDados = async () => {
    const carrinhoSalvo = await getUserCart(usuarioLogado);
    setCarrinho(carrinhoSalvo);

    const cartao = await loadCartaoParaUsuario(usuarioLogado);
    setCartaoSalvo(cartao);
  };

  const subTotal = carrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0);
  const desconto = 0.05;
  const total = metodo === 'pix' ? subTotal * (1 - desconto) : subTotal;
  const totalDesconto = subTotal - total;
  const corDesconto = totalDesconto > 0 ? '#00FF00' : '#ffffff';

  const confirmarPedido = async () => {
    if (metodo === 'cartao' && !cartaoSalvo) {
      Alert.alert(
        'Cartão não cadastrado',
        'Você precisa adicionar um cartão de crédito para usar este método de pagamento.',
        [
          { text: 'Adicionar cartão', onPress: () => router.push('/adicionarCartao') },
          { text: 'Cancelar', style: 'cancel' },
        ]
      );
      return;
    }

    if (carrinho.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione itens ao carrinho antes de confirmar.');
      return;
    }

    const agora = new Date();
    const horario = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const data = agora.toLocaleDateString('pt-BR');

    const novoPedido = {
      id: Date.now(),
      nome: usuarioLogado?.nome || usuarioLogado?.rm || 'Estudante',
      rm:
        usuarioLogado?.rm ||
        usuarioLogado?.emailRM ||
        usuarioLogado?.emailRF ||
        usuarioLogado?.email ||
        '',
      status: 'preparando',
      carrinho: carrinho,
      carrinhoTexto: carrinho.map(i => `${i.qtd}x ${i.nome}`).join('\n'),
      total: total,
      horario,
      data,
      metodoPagamento: metodo,
    };

    try {
      const pedidosExistentes = await AsyncStorage.getItem('pedidos');
      const lista = pedidosExistentes ? JSON.parse(pedidosExistentes) : [];
      lista.push(novoPedido);
      await AsyncStorage.setItem('pedidos', JSON.stringify(lista));

      await clearUserCart(usuarioLogado);
      setCarrinho([]);

      await AsyncStorage.setItem(
        'aviso_pedido_enviado',
        JSON.stringify({
          titulo: 'Pedido enviado!',
          texto: `Seu pedido foi enviado para a cozinha. Total: R$ ${total.toFixed(2)}`,
        })
      );

      router.replace('/Estudante/cardapio');
    } catch (e) {
      Alert.alert(
        'Erro ao finalizar',
        'Não foi possível salvar o pedido. Tente novamente.'
      );
    }
  };

  const MetodoItem = ({ id, titulo, icon }) => (
    <TouchableOpacity
      style={[
        styles.metodoCard,
        { backgroundColor: tema.card, borderColor: tema.borda },
        metodo === id && { borderColor: tema.primaria, backgroundColor: tema.fundo },
      ]}
      onPress={() => setMetodo(id)}
    >
      <Text
        style={[
          styles.metodoTexto,
          { color: tema.textoSecundario },
          metodo === id && [styles.metodoTextoAtivo, { color: tema.texto }],
        ]}
      >
        {icon}  {titulo}
      </Text>
      <View
        style={[
          styles.radioOuter,
          { borderColor: tema.borda },
          metodo === id && { borderColor: tema.primaria },
        ]}
      >
        {metodo === id && <View style={[styles.radioInner, { backgroundColor: tema.primaria }]} />}
      </View>
    </TouchableOpacity>
  );

  const ultimosQuatro = cartaoSalvo?.numero?.replace(/\s/g, '').slice(-4);

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: tema.primaria }]}>Pagamento</Text>
        </View>

        {/* Métodos de Pagamento */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: tema.texto }]}>Escolha o método:</Text>

          <MetodoItem id="pix" titulo="PIX (Desconto de 5%)" icon="⚡" />
          <MetodoItem id="cartao" titulo="Cartão de Crédito" icon="💳" />
          <MetodoItem id="dinheiro" titulo="Dinheiro / Maquininha" icon="💵" />
        </View>

        {/* Seção do Cartão */}
        {metodo === 'cartao' && (
          <View style={styles.cartaoSection}>
            {cartaoSalvo ? (
              <View style={[styles.cartaoSalvoContainer, { backgroundColor: tema.card, borderColor: tema.primaria }]}>
                <View style={styles.cartaoSalvoInfo}>
                  <Text style={styles.cartaoSalvoIcone}>💳</Text>
                  <View>
                    <Text style={[styles.cartaoSalvoNome, { color: tema.texto }]}>{cartaoSalvo.nome}</Text>
                    <Text style={[styles.cartaoSalvoNumero, { color: tema.textoSecundario }]}>**** **** **** {ultimosQuatro}</Text>
                    <Text style={[styles.cartaoSalvoValidade, { color: tema.textoSecundario }]}>Validade: {cartaoSalvo.validade}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.botaoTrocar, { backgroundColor: tema.fundo }]}
                  onPress={() => router.push('/adicionarCartao')}
                >
                  <Text style={[styles.botaoTrocarTexto, { color: tema.primaria }]}>Trocar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={[styles.semCartaoContainer, { backgroundColor: tema.card, borderColor: tema.borda }]}>
                <Text style={styles.semCartaoTexto}>
                  ⚠️  Nenhum cartão cadastrado
                </Text>
                <TouchableOpacity
                  style={[styles.botaoAdicionarCartao, { backgroundColor: tema.primaria }]}
                  onPress={() => router.push('/adicionarCartao')}
                >
                  <Text style={styles.botaoAdicionarTexto}>+ Adicionar cartão</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Resumo de Valores */}
        <View style={[styles.resumoContainer, { borderTopColor: tema.borda }]}>
          <View style={styles.resumoRow}>
            <Text style={[styles.resumoLabel, { color: tema.textoSecundario }]}>Subtotal</Text>
            <Text style={[styles.resumoValor, { color: tema.texto }]}>R$ {subTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.resumoRow}>
            <Text style={[styles.resumoLabel, { color: tema.textoSecundario }]}>Desconto</Text>
            <Text style={[styles.resumoValor, { color: corDesconto }]}>
              - R$ {totalDesconto.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.resumoRow, styles.totalDestaque]}>
            <Text style={[styles.totalLabel, { color: tema.texto }]}>TOTAL</Text>
            <Text style={[styles.totalValor, { color: tema.primaria }]}>R$ {total.toFixed(2)}</Text>
          </View>
        </View>

      </ScrollView>

      {/* Footer com Botão Fixo */}
      <View style={[styles.footer, { backgroundColor: tema.card }]}>
        <TouchableOpacity
          style={[
            styles.botaoConfirmar,
            { backgroundColor: tema.primaria },
            metodo === 'cartao' && !cartaoSalvo && styles.botaoDesabilitado,
          ]}
          onPress={confirmarPedido}
        >
          <Text style={styles.botaoTexto}>CONFIRMAR E PAGAR</Text>
        </TouchableOpacity>

        {metodo === 'cartao' && !cartaoSalvo && (
          <Text style={styles.avisoCartao}>
            Adicione um cartão para continuar com este método
          </Text>
        )}

        <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.push('/Estudante/carrinho')}>
          <Text style={[styles.voltarTexto, { color: tema.textoSecundario }]}>Alterar pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 180,
  },
  header: {
    marginBottom: 25,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#F23064',
    fontSize: 26,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  metodoCard: {
    backgroundColor: '#1A1A1A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  metodoSelecionado: {
    borderColor: '#F23064',
    backgroundColor: '#220000',
  },
  metodoTexto: {
    color: '#AAA',
    fontSize: 16,
  },
  metodoTextoAtivo: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterAtivo: {
    borderColor: '#F23064',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F23064',
  },
  cartaoSection: {
    marginBottom: 20,
  },
  cartaoSalvoContainer: {
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F23064',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartaoSalvoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cartaoSalvoIcone: {
    fontSize: 32,
    marginRight: 12,
  },
  cartaoSalvoNome: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cartaoSalvoNumero: {
    color: '#AAA',
    fontSize: 13,
    marginTop: 2,
  },
  cartaoSalvoValidade: {
    color: '#777',
    fontSize: 12,
    marginTop: 2,
  },
  botaoTrocar: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  botaoTrocarTexto: {
    color: '#F23064',
    fontWeight: 'bold',
    fontSize: 13,
  },
  semCartaoContainer: {
    backgroundColor: '#1A0000',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#5a0000',
    alignItems: 'center',
    gap: 12,
  },
  semCartaoTexto: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
  },
  botaoAdicionarCartao: {
    backgroundColor: '#F23064',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  botaoAdicionarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  resumoContainer: {
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  resumoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resumoLabel: {
    color: '#AAA',
    fontSize: 16,
  },
  resumoValor: {
    color: '#FFF',
    fontSize: 16,
  },
  totalDestaque: {
    marginTop: 10,
    paddingTop: 10,
  },
  totalLabel: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalValor: {
    color: '#F23064',
    fontSize: 24,
    fontWeight: '900',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#121212',
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  botaoConfirmar: {
    backgroundColor: '#F23064',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  botaoDesabilitado: {
    backgroundColor: '#5a0000',
    opacity: 0.6,
  },
  avisoCartao: {
    color: '#FF6B6B',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  botaoTexto: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  botaoVoltar: {
    marginTop: 15,
    alignItems: 'center',
  },
  voltarTexto: {
    color: '#777',
    textDecorationLine: 'underline',
  },
});
