import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
export default function Home() {
  const router = useRouter();
  const[textRM, setTextRM] = useState('');
  const[textSenha, setTextSenha] = useState('');
  return (
    <View style={styles.container}>
        <View style={styles.login}>
            <Image
              source={require('../assets/EatHub.png')}
              style={{ width: 150, height: 150}}
            />
            <Text style={styles.bem_vindo}>Seja bem-vindo ao EatHub!</Text>

            <Text style={styles.paragrafo}>RM/RF:</Text>
            <TextInput style={styles.caixaTexto} onChangeText={setTextRM} value={textRM} placeholder='Digite seu RM ou RF' placeholderTextColor={'#bbb'}/>

            <Text style={styles.paragrafo}>Senha:</Text>
            <TextInput style={styles.caixaTexto} onChangeText={setTextSenha} value={textSenha} placeholder='Digite sua senha' placeholderTextColor={'#bbb'}/>

            <TouchableOpacity style={styles.estudante} onPress={() => router.push('/cardapio')}>
              <Text style={styles.botaoTexto}>Estudante</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.funcionario} onPress={() => router.push('/pedidos')}>
              <Text style={styles.textoAdmin}>Funcionario</Text>
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
  paragrafo:    {fontSize: 15, textAlign: 'left', marginBottom: 5, fontWeight: 'bold', paddingRight: 180, color: '#fff'},
  estudante:      { backgroundColor: '#F23064', padding: 16, borderRadius: 12, marginBottom: 12, width: 150, alignItems: 'center', justifyContent: 'center'},
  funcionario:  { borderColor: '#F23064', padding: 16, borderRadius: 12, borderWidth: 3, width: 150, alignItems: 'center', justifyContent: 'center'},
  botaoTexto:   { color: '#fff', fontSize: 16, fontWeight: 600, alignItems: 'center', justifyContent: 'center'},
  textoAdmin:   { color: '#F23064', fontSize: 16, fontWeight: 600 },
  caixaTexto:   { border: 'none', borderRadius: 360, backgroundColor: '#404040', padding: 10, width: 240, color: '#fff', marginBottom: 10},
  
});
