import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useUser } from './context/UserContext';
export default function Login() {
  const router = useRouter();
  const[codigo, setCodigo] = useState('');
  const[senha, setSenha] = useState('');
  const[pagina, setPagina] = useState('login');
  const { login } = useUser();

  function entrarSistema(){
    const resultado = login(codigo, senha);

    if (resultado === 'usuario') {
      router.push('Estudante/cardapio');
    } else if (resultado === 'admin') {
      router.push('Funcionarios/pedidos');
    } else {
      Alert.alert('Erro', 'Código ou senha inválidos. Tente novamente.');
    }
  }
  return (
    <View style={styles.container}>
        <View style={styles.login}>
            <Image
              source={require('../assets/EatHub.png')}
              style={{ width: 150, height: 150}}
            />
            <Text style={styles.bem_vindo}>Seja bem-vindo ao EatHub!</Text>

            <Text style={styles.paragrafo}>RM/RF:</Text>
            <TextInput style={styles.caixaTexto} onChangeText={setCodigo} value={codigo} placeholder='Digite seu RM ou RF' placeholderTextColor={'#bbb'}/>

            <Text style={styles.paragrafo}>Senha:</Text>
            <TextInput style={styles.caixaTexto} onChangeText={setSenha} value={senha} placeholder='Digite sua senha' placeholderTextColor={'#bbb'}/>

            <TouchableOpacity style={styles.botao} onPress={entrarSistema}>
              <Text style={styles.botaoTexto}>Login</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container:    {flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#1C1C1C"},
  login:        {alignItems: 'center', justifyContent: 'center', backgroundColor: '#262626', height: 500, width: 300, borderRadius: 50},
  titulo:       { fontSize: 32, fontWeight: 'bold', marginBottom: 24},
  bem_vindo:    { fontSize: 20, marginBottom: 24, color: '#fff'},
  paragrafo:    {fontSize: 15, textAlign: 'left', marginBottom: 12, fontWeight: 'bold', paddingRight: 180, color: '#fff'},
  botao:        { backgroundColor: '#F23064', padding: 16, borderRadius: 12, marginBottom: 12, width: 150, alignItems: 'center', justifyContent: 'center', marginTop: 20},
  botaoTexto:   { color: '#fff', fontSize: 16, fontWeight: 600, alignItems: 'center', justifyContent: 'center'},
  caixaTexto:   { border: 'none', borderRadius: 360, backgroundColor: '#404040', padding: 10, width: 240, color: '#fff', marginBottom: 10},
  
});
