import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
 
export default function Home() {
  const router = useRouter();
  const { tema } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Text style={[styles.titulo, { color: tema.texto }]}>Quer mesmo sair de sua conta?</Text>
      <TouchableOpacity
        style={[styles.botao, { backgroundColor: tema.primaria }]}
        onPress={() => router.push('/')}
      >
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