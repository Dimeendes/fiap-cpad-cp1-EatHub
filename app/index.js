import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useUser } from './context/UserContext';
export default function Login() {
  const router = useRouter();
  const[email, setEmail] = useState('');
  const[senha, setSenha] = useState('');
  const[erro, setErro] = useState('');
  const[pagina, setPagina] = useState('login');
  const { login } = useUser();
 
  function entrarSistema(){
    const resultado = login(email, senha);
 
    if (resultado === 'usuario') {
      router.push('Estudante/cardapio');
    } else if (resultado === 'admin') {
      router.push('Funcionarios/pedidos');
    } else {
      setErro('Email ou senha incorretos. Por favor, tente novamente.');
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
 
            <Text style={styles.paragrafo}>E-mail:</Text>
            <TextInput style={styles.caixaTexto} onChangeText={setEmail} value={email} placeholder='Digite seu email' placeholderTextColor={'#bbb'}/>
 
            <Text style={styles.paragrafo}>Senha:</Text>
            <TextInput style={styles.caixaTexto} onChangeText={setSenha} value={senha} placeholder='Digite sua senha' placeholderTextColor={'#bbb'}/>
            {erro ? <Text style={styles.erro}>{erro}</Text> : null}
 
            <TouchableOpacity style={styles.botaoCadastro} onPress={() => router.push('cadastro')}>
              <Text style={styles.textoCadastro}>Cadastro</Text>
            </TouchableOpacity>
 
            <TouchableOpacity style={styles.botaoLogin} onPress={entrarSistema}>
              <Text style={styles.textoLogin}>Login</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  erro:          { color: 'red', textAlign: 'left', marginBottom: 12, paddingRight: 30, paddingLeft: 40},
  container:     {flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#1C1C1C"},
  login:         {alignItems: 'center', justifyContent: 'center', backgroundColor: '#262626', height: 600, width: 300, borderRadius: 50},
  titulo:        { fontSize: 32, fontWeight: 'bold', marginBottom: 24},
  bem_vindo:     { fontSize: 20, marginBottom: 24, color: '#fff'},
  paragrafo:     {fontSize: 15, textAlign: 'left', marginBottom: 12, fontWeight: 'bold', paddingRight: 180, color: '#fff'},
  botaoCadastro: { borderColor: '#F23064', borderWidth: 2, padding: 16, borderRadius: 12, marginBottom: 4, width: 150, alignItems: 'center', justifyContent: 'center', marginTop: 20},
  textoCadastro: { color: '#F23064', fontSize: 16, fontWeight: 600, alignItems: 'center', justifyContent: 'center'},
  botaoLogin:    { backgroundColor: '#F23064', padding: 16, borderRadius: 12, marginBottom: 4, width: 150, alignItems: 'center', justifyContent: 'center', marginTop: 12},
  textoLogin:    { color: '#fff', fontSize: 16, fontWeight: 600, alignItems: 'center', justifyContent: 'center'},
  caixaTexto:    { border: 'none', borderRadius: 360, backgroundColor: '#404040', padding: 10, width: 240, color: '#fff', marginBottom: 10},
 
});
