import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
 
export default function Home() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Quer mesmo sair de sua conta?</Text>
      <TouchableOpacity style={styles.botao} onPress={() => router.push('/')}>
        <Text style={styles.botaoTexto}>SAIR</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1C1C1C' },
  titulo:    { fontSize: 32, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', color: '#fff'},
  botao:     { backgroundColor: '#F23064', padding: 16, borderRadius: 12 },
  botaoTexto:{ color: '#fff', fontSize: 16, fontWeight: '600', width: 150, textAlign: 'center' },
}
);