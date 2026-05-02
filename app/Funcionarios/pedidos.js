import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

function formatarCarrinho(carrinho) {
  if (!carrinho) return '';
  if (typeof carrinho === 'string') return carrinho;
  if (Array.isArray(carrinho)) return carrinho.map(i => `${i.qtd}x ${i.nome}`).join('\n');
  return '';
}

function iconeMetodo(metodo) {
  if (metodo === 'pix') return '⚡ PIX';
  if (metodo === 'cartao') return '💳 Cartão';
  if (metodo === 'dinheiro') return '💵 Dinheiro';
  return metodo || '';
}

export default function Pedidos() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('preparando');
  const [pedidos, setPedidos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      carregarPedidos();
    }, [])
  );

  const carregarPedidos = async () => {
    const dados = await AsyncStorage.getItem('pedidos');
    if (dados) setPedidos(JSON.parse(dados));
    else setPedidos([]);
  };

  const alternarStatus = async (id) => {
    const atualizados = pedidos.map(p =>
      p.id === id
        ? { ...p, status: p.status === 'preparando' ? 'pronto' : 'preparando' }
        : p
    );
    setPedidos(atualizados);
    await AsyncStorage.setItem('pedidos', JSON.stringify(atualizados));
  };

  const hoje = new Date().toLocaleDateString('pt-BR');
  const pedidosHoje = pedidos.filter(p => p.data === hoje);
  const filtrados = pedidosHoje.filter(p => p.status === activeTab);
  const totalPreparando = pedidosHoje.filter(p => p.status === 'preparando').length;
  const totalProntos = pedidosHoje.filter(p => p.status === 'pronto').length;

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.titulo}>Pedidos — {hoje}</Text>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'preparando' && styles.activeTab]}
          onPress={() => setActiveTab('preparando')}
        >
          <Text style={[styles.tabText, activeTab === 'preparando' && styles.activeTabText]}>
            Preparando {totalPreparando > 0 ? `(${totalPreparando})` : ''}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'pronto' && styles.activeTab]}
          onPress={() => setActiveTab('pronto')}
        >
          <Text style={[styles.tabText, activeTab === 'pronto' && styles.activeTabText]}>
            Prontos {totalProntos > 0 ? `(${totalProntos})` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {filtrados.length === 0 ? (
        <View style={styles.vazioContainer}>
          <Text style={styles.vazioTexto}>
            {activeTab === 'preparando'
              ? 'Nenhum pedido sendo preparado'
              : 'Nenhum pedido pronto ainda'}
          </Text>
        </View>
      ) : (
        filtrados.map(pedido => (
          <View key={pedido.id} style={styles.pedidosContainer}>

            <View style={styles.pedidoHeader}>
              <Text style={styles.pedidoId}>Pedido #{String(pedido.id).slice(-5)}</Text>
              <Text style={styles.pedidoHorario}>🕐 {pedido.horario}</Text>
            </View>

            <View style={styles.hr} />

            <View style={styles.alunoRow}>
              <Text style={styles.alunoLabel}>Aluno(a)</Text>
              <Text style={styles.alunoNome}>{pedido.nome}</Text>
              {pedido.rm ? <Text style={styles.alunoRm}>{pedido.rm}</Text> : null}
            </View>

            <View style={styles.hr} />

            <View style={styles.itensContainer}>
              <Text style={styles.itensLabel}>Itens do pedido</Text>
              <Text style={styles.itensTexto}>{formatarCarrinho(pedido.carrinho)}</Text>
            </View>

            <View style={styles.pedidoFooter}>
              <Text style={styles.totalTexto}>Total: R$ {pedido.total?.toFixed(2)}</Text>
              <Text style={styles.metodoTexto}>{iconeMetodo(pedido.metodoPagamento)}</Text>
            </View>

            {pedido.status === 'preparando' ? (
              <TouchableOpacity
                style={styles.botao}
                onPress={() => alternarStatus(pedido.id)}
              >
                <Text style={styles.botaoTexto}>✅ Marcar como pronto</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.botao, styles.botaoVoltar]}
                onPress={() => alternarStatus(pedido.id)}
              >
                <Text style={styles.botaoTexto}>↩ Voltar para preparando</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1C1C1C',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
    color: '#ffffff',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#404040',
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTab: { backgroundColor: '#F23064' },
  tabText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  activeTabText: { color: '#fff' },
  vazioContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  vazioTexto: {
    color: '#777',
    fontSize: 16,
  },
  pedidosContainer: {
    backgroundColor: '#262626',
    width: '100%',
    borderRadius: 16,
    marginBottom: 15,
    padding: 16,
  },
  pedidoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  pedidoId: {
    color: '#F23064',
    fontWeight: 'bold',
    fontSize: 15,
  },
  pedidoHorario: {
    color: '#aaa',
    fontSize: 13,
  },
  hr: {
    backgroundColor: '#444',
    height: 1,
    marginVertical: 10,
  },
  alunoRow: { paddingVertical: 4 },
  alunoLabel: { color: '#888', fontSize: 11, marginBottom: 2 },
  alunoNome: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  alunoRm: { color: '#aaa', fontSize: 13, marginTop: 2 },
  itensContainer: { paddingVertical: 4 },
  itensLabel: { color: '#888', fontSize: 11, marginBottom: 4 },
  itensTexto: { color: '#fff', fontSize: 14, lineHeight: 22 },
  pedidoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  totalTexto: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  metodoTexto: { color: '#aaa', fontSize: 13 },
  botao: {
    marginTop: 12,
    backgroundColor: '#F23064',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoVoltar: { backgroundColor: '#800000' },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});
