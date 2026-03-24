import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Pagamento() {
  const router = useRouter('/pagamento');
  const [metodo, setMetodo] = useState('pix'); // Estado para controlar seleção

  const MetodoItem = ({ id, titulo, icon }) => (
    <TouchableOpacity 
      style={[styles.metodoCard, metodo === id && styles.metodoSelecionado]} 
      onPress={() => setMetodo(id)}
    >
      <Text style={[styles.metodoTexto, metodo === id && styles.metodoTextoAtivo]}>
        {icon}  {titulo}
      </Text>
      <View style={[styles.radioOuter, metodo === id && styles.radioOuterAtivo]}>
        {metodo === id && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pagamento</Text>
        </View>

        {/* Resumo do Endereço */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Entregar em:</Text>
          <View style={styles.addressCard}>
            <Text style={styles.addressText}>Rua das Flores, 123 - Apt 42</Text>
            <Text style={styles.addressSub}>São Paulo, SP</Text>
          </View>
        </View>

        {/* Métodos de Pagamento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Escolha o método:</Text>
          
          <MetodoItem id="pix" titulo="PIX (Desconto de 5%)" icon="⚡" />
          <MetodoItem id="cartao" titulo="Cartão de Crédito" icon="💳" />
          <MetodoItem id="dinheiro" titulo="Dinheiro / Maquininha" icon="💵" />
        </View>

        {/* Resumo de Valores */}
        <View style={styles.resumoContainer}>
          <View style={styles.resumoRow}>
            <Text style={styles.resumoLabel}>Subtotal</Text>
            <Text style={styles.resumoValor}>R$ 78,90</Text>
          </View>
          <View style={styles.resumoRow}>
            <Text style={styles.resumoLabel}>Taxa de Entrega</Text>
            <Text style={[styles.resumoValor, { color: '#00FF00' }]}>GRÁTIS</Text>
          </View>
          <View style={[styles.resumoRow, styles.totalDestaque]}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValor}>R$ 78,90</Text>
          </View>
        </View>

      </ScrollView>

      {/* Footer com Botão Fixo */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.botaoConfirmar}
          onPress={() =>router.push('/cardapio')}

        >
          <Text style={styles.botaoTexto}>CONFIRMAR E PAGAR</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.push('/cardapio')}>
          <Text style={styles.voltarTexto}>Alterar pedido</Text>
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
    paddingBottom: 150, // Espaço para não cobrir o botão fixo
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
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  addressCard: {
    backgroundColor: '#1A1A1A',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#F23064',
  },
  addressText: {
    color: '#FFF',
    fontSize: 16,
  },
  addressSub: {
    color: '#777',
    fontSize: 14,
    marginTop: 4,
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