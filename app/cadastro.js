import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useUser } from './context/UserContext';
import { Ionicons } from '@expo/vector-icons';
export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const[email, setEmail] = useState('');
  const[senha, setSenha] = useState('');
  const[senhaConfirmacao, setSenhaConfirmacao] = useState('');
  const[erroNome, setErroNome] = useState('');
  const[erroEmail, setErroEmail] = useState('');
  const[erroSenha, setErroSenha] = useState('');
  const[erroConfirmacao, setErroConfirmacao] = useState('');
  const[senhaVisivel, setSenhaVisivel] = useState(false);
  const[senhaConfirmacaoVisivel, setSenhaConfirmacaoVisivel] = useState(false);
    const { cadastrarUsuario } = useUser();
 
    async function realizarCadastro() {
        let temErro = false;
 
        if (nome.trim() === '') {
            setErroNome('O nome é obrigatório. Por favor, insira seu nome.');
            temErro = true;
        } else {
            setErroNome('');
        }
 
        if (email.trim() === '') {
            setErroEmail('O email é obrigatório. Por favor, insira seu email.');
            temErro = true;
        } else if (!email.includes('@')) {
            setErroEmail('O email deve conter um "@" válido. Por favor, insira um email válido.');
            temErro = true;
        } else {
            setErroEmail('');
        }
 
        if (senha.length < 6) {
            setErroSenha('A senha deve conter pelo menos 6 caracteres.');
            temErro = true;
        } else {
            setErroSenha('');
        }
 
        if (senhaConfirmacao.trim() === '') {
            setErroConfirmacao('Por favor, confirme sua senha.');
            temErro = true;
        } else if (senha !== senhaConfirmacao) {
            setErroConfirmacao('As senhas não coincidem. Por favor, confirme sua senha corretamente.');
            temErro = true;
        } else {
            setErroConfirmacao('');
        }
 
        if (temErro) {
            return;
        }
 
        await cadastrarUsuario(nome, email, senha);
 
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        router.push('/');
    }
 
  return (
    <View style={styles.container}>
        <View style={erroNome && erroEmail && erroSenha && erroConfirmacao ? [styles.cadastro, { height: 750 }] : styles.cadastro}>
            <Text style={styles.titulo}>Cadastro</Text>
 
            <Text style={styles.paragrafo}>Nome:</Text>
            <TextInput style={styles.caixaTexto} onChangeText={setNome} value={nome} placeholder='Digite seu nome completo' placeholderTextColor={'#bbb'}/>
            {erroNome ? <Text style={styles.erro}>{erroNome}</Text> : null}
 
            <Text style={styles.paragrafo}>E-mail:</Text>
            <TextInput style={styles.caixaTexto} onChangeText={setEmail} value={email} placeholder='Digite seu email' placeholderTextColor={'#bbb'}/>
            {erroEmail ? <Text style={styles.erro}>{erroEmail}</Text> : null}
 
            <Text style={styles.paragrafo}>Senha:</Text>
            <View style={styles.containerSenha}>
              <TextInput style={styles.caixaTextoSenha} onChangeText={setSenha} value={senha} secureTextEntry={!senhaVisivel} placeholder='Digite sua senha' placeholderTextColor={'#bbb'}/>
              <TouchableOpacity style={styles.botaoVerSenha} onPress={() => setSenhaVisivel(!senhaVisivel)}>
                <Ionicons name={senhaVisivel ? 'eye' : 'eye-off'} size={24} color="#bbb" />
              </TouchableOpacity>
            </View>
            {erroSenha ? <Text style={styles.erro}>{erroSenha}</Text> : null}
 
            <Text style={styles.paragrafo}>Confirme a Senha:</Text>
            <View style={styles.containerSenha}>
              <TextInput style={styles.caixaTextoSenha} onChangeText={setSenhaConfirmacao} value={senhaConfirmacao} secureTextEntry={!senhaConfirmacaoVisivel} placeholder='Digite sua senha novamente' placeholderTextColor={'#bbb'}/>
              <TouchableOpacity style={styles.botaoVerSenha} onPress={() => setSenhaConfirmacaoVisivel(!senhaConfirmacaoVisivel)}>
                <Ionicons name={senhaConfirmacaoVisivel ? 'eye' : 'eye-off'} size={24} color="#bbb" />
              </TouchableOpacity>
            </View>
            {erroConfirmacao ? <Text style={styles.erro}>{erroConfirmacao}</Text> : null}
 
            <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.push('/') }>
              <Text style={styles.textoVoltar}>Voltar</Text>
            </TouchableOpacity>
 
            <TouchableOpacity style={styles.botaoCadastro} onPress={realizarCadastro}>
              <Text style={styles.textoCadastro}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  erro:          { color: 'red', textAlign: 'left', marginBottom: 12, paddingRight: 30, paddingLeft: 40},
  container:     {flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#1C1C1C"},
  cadastro:      {alignItems: 'center', justifyContent: 'center', backgroundColor: '#262626', height: 600, width: 300, borderRadius: 50},
  titulo:        { fontSize: 32, fontWeight: 'bold', marginBottom: 24, color: '#F23064'},
  bem_vindo:     { fontSize: 20, marginBottom: 24, color: '#fff'},
  paragrafo:     {fontSize: 15, marginRight: 100, fontWeight: 'bold', color: '#fff', fontSize: 12, textAlign: 'left', width: 130},
  botaoVoltar:   { borderColor: '#F23064', borderWidth: 2, padding: 16, borderRadius: 12, marginBottom: 4, width: 150, alignItems: 'center', justifyContent: 'center', marginTop: 20},
  textoVoltar:   { color: '#F23064', fontSize: 16, fontWeight: 600, alignItems: 'center', justifyContent: 'center'},
  botaoCadastro: { backgroundColor: '#F23064', padding: 16, borderRadius: 12, marginBottom: 4, width: 150, alignItems: 'center', justifyContent: 'center', marginTop: 12},
  textoCadastro: { color: '#fff', fontSize: 16, fontWeight: 600, alignItems: 'center', justifyContent: 'center'},
  caixaTexto:    { border: 'none', borderRadius: 360, backgroundColor: '#404040', padding: 10, width: 240, color: '#fff', marginBottom: 15},
  containerSenha: { width: 240,flexDirection: 'row', alignItems: 'center', backgroundColor: '#404040', borderRadius: 360, paddingRight: 10, marginBottom: 15},
  caixaTextoSenha: { border: 'none', padding: 10, width: 210, color: '#fff', flex: 1},
  botaoVerSenha: { padding: 5},
});
