import { useState, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useUser } from './context/UserContext';
import {
  loadCartaoParaUsuario,
  salvarCartaoParaUsuario,
  removerCartaoDoUsuario,
} from './utils/cartaoStorage';

function formatarNumero(texto) {
  const nums = texto.replace(/\D/g, '').slice(0, 16);
  return nums.replace(/(.{4})(?=.)/g, '$1 ');
}

function formatarValidade(texto) {
  const nums = texto.replace(/\D/g, '').slice(0, 4);
  if (nums.length >= 3) return nums.slice(0, 2) + '/' + nums.slice(2);
  return nums;
}

function mascararNumero(numero) {
  const limpo = numero.replace(/\s/g, '');
  if (limpo.length < 4) return numero;
  return '**** **** **** ' + limpo.slice(-4);
}

/** Retorna string com erros (vazia se válido). */
function validarCamposCartao({ numLimpo, nome, validade, cvv }) {
  const erros = [];
  if (numLimpo.length !== 16) {
    erros.push('• Número: digite os 16 dígitos do cartão.');
  }
  if (nome.trim().length < 3) {
    erros.push('• Nome: mínimo 3 caracteres (como no cartão).');
  }
  const validParts = validade.split('/');
  const mm = validParts[0] ? parseInt(validParts[0], 10) : NaN;
  const aa = validParts[1] ? validParts[1].length : 0;
  if (
    validade.length !== 5 ||
    validParts.length !== 2 ||
    !validParts[0] ||
    !validParts[1] ||
    Number.isNaN(mm) ||
    mm < 1 ||
    mm > 12 ||
    aa !== 2
  ) {
    erros.push('• Validade: use MM/AA (ex.: 05/27).');
  }
  if (cvv.length < 3 || cvv.length > 4) {
    erros.push('• CVV: 3 ou 4 dígitos.');
  }
  return erros.join('\n');
}

export default function AdicionarCartao() {
  const router = useRouter();
  const { usuarioLogado } = useUser();
  const usuarioId = usuarioLogado
    ? `${usuarioLogado.emailRM || ''}${usuarioLogado.emailRF || ''}${usuarioLogado.email || ''}`.trim().toLowerCase()
    : '';
  const [numero, setNumero] = useState('');
  const [nome, setNome] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');
  const [temCartao, setTemCartao] = useState(false);

  useFocusEffect(
    useCallback(() => {
      carregarCartao();
    }, [usuarioId])
  );

  const carregarCartao = async () => {
    if (!usuarioLogado) {
      setNumero('');
      setNome('');
      setValidade('');
      setCvv('');
      setTemCartao(false);
      return;
    }
    const cartao = await loadCartaoParaUsuario(usuarioLogado);
    if (cartao) {
      setNumero(cartao.numero ?? '');
      setNome(cartao.nome ?? '');
      setValidade(cartao.validade ?? '');
      setCvv(cartao.cvv ?? '');
      setTemCartao(true);
    } else {
      setNumero('');
      setNome('');
      setValidade('');
      setCvv('');
      setTemCartao(false);
    }
  };

  const salvarCartao = async () => {
    const numLimpo = numero.replace(/\s/g, '');
    const msgErro = validarCamposCartao({
      numLimpo,
      nome,
      validade,
      cvv,
    });

    if (msgErro) {
      Alert.alert('Confira os campos', msgErro);
      return;
    }

    if (!usuarioLogado) {
      Alert.alert('Login necessário', 'Faça login para salvar um cartão neste aparelho.');
      return;
    }

    const cartao = { numero, nome: nome.trim().toUpperCase(), validade, cvv };

    try {
      await salvarCartaoParaUsuario(usuarioLogado, cartao);
      setTemCartao(true);
      router.replace('/pagamento');
    } catch (e) {
      Alert.alert(
        'Não foi possível salvar',
        'Tente novamente em instantes ou verifique o espaço do dispositivo.'
      );
    }
  };

  const removerCartao = async () => {
    if (!usuarioLogado) {
      Alert.alert('Login necessário', 'Faça login para gerenciar o cartão.');
      return;
    }
    Alert.alert('Remover cartão', 'Deseja remover o cartão salvo?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover', style: 'destructive', onPress: async () => {
          await removerCartaoDoUsuario(usuarioLogado);
          setNumero(''); setNome(''); setValidade(''); setCvv('');
          setTemCartao(false);
        }
      }
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#000' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.voltarBtn}>
            <Text style={styles.voltarTexto}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.titulo}>{temCartao ? 'Editar Cartão' : 'Adicionar Cartão'}</Text>
        </View>

        {/* Visual do cartão */}
        <View style={styles.cartaoVisual}>
          <View style={styles.cartaoTopo}>
            <View style={styles.chip} />
            <Text style={styles.bandeira}>💳 CRÉDITO</Text>
          </View>
          <Text style={styles.cartaoNumero}>
            {numero ? mascararNumero(numero) : '**** **** **** ####'}
          </Text>
          <View style={styles.cartaoRodape}>
            <View>
              <Text style={styles.cartaoLabel}>TITULAR</Text>
              <Text style={styles.cartaoValor}>{nome.toUpperCase() || 'NOME DO TITULAR'}</Text>
            </View>
            <View>
              <Text style={styles.cartaoLabel}>VALIDADE</Text>
              <Text style={styles.cartaoValor}>{validade || 'MM/AA'}</Text>
            </View>
          </View>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <Text style={styles.label}>Número do cartão</Text>
          <TextInput
            style={styles.input}
            value={numero}
            onChangeText={(t) => setNumero(formatarNumero(t))}
            placeholder="0000 0000 0000 0000"
            placeholderTextColor="#555"
            keyboardType="numeric"
            maxLength={19}
          />

          <Text style={styles.label}>Nome no cartão</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Como aparece no cartão"
            placeholderTextColor="#555"
            autoCapitalize="characters"
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>Validade</Text>
              <TextInput
                style={styles.input}
                value={validade}
                onChangeText={(t) => setValidade(formatarValidade(t))}
                placeholder="MM/AA"
                placeholderTextColor="#555"
                keyboardType="numeric"
                maxLength={5}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                value={cvv}
                onChangeText={(t) => setCvv(t.replace(/\D/g, '').slice(0, 4))}
                placeholder="•••"
                placeholderTextColor="#555"
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
              />
            </View>
          </View>
        </View>

        {/* Botões */}
        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarCartao}>
          <Text style={styles.botaoSalvarTexto}>
            {temCartao ? 'ATUALIZAR CARTÃO' : 'SALVAR CARTÃO'}
          </Text>
        </TouchableOpacity>

        {temCartao && (
          <TouchableOpacity style={styles.botaoRemover} onPress={removerCartao}>
            <Text style={styles.botaoRemoverTexto}>Remover cartão</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 40 },
  header: {
    paddingTop: 55,
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  voltarBtn: { marginBottom: 10 },
  voltarTexto: { color: '#F23064', fontSize: 16 },
  titulo: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  cartaoVisual: {
    marginHorizontal: 20,
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#F23064',
    shadowColor: '#F23064',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  cartaoTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chip: {
    width: 40,
    height: 30,
    backgroundColor: '#D4AF37',
    borderRadius: 6,
  },
  bandeira: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  cartaoNumero: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 3,
    marginBottom: 20,
  },
  cartaoRodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartaoLabel: { color: '#888', fontSize: 10, letterSpacing: 1 },
  cartaoValor: { color: '#fff', fontSize: 14, fontWeight: '600', marginTop: 2 },
  form: { paddingHorizontal: 20 },
  label: { color: '#AAA', fontSize: 13, marginBottom: 6, marginTop: 14 },
  input: {
    backgroundColor: '#1A1A1A',
    color: '#FFF',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  row: { flexDirection: 'row' },
  botaoSalvar: {
    margin: 20,
    marginTop: 30,
    backgroundColor: '#F23064',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  botaoSalvarTexto: { color: '#FFF', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  botaoRemover: { alignItems: 'center', marginBottom: 10 },
  botaoRemoverTexto: { color: '#777', textDecorationLine: 'underline', fontSize: 14 },
});
