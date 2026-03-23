import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
export default function config() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações</Text>
      <Text style={styles.descricao}>Página de configurações</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container:  { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  titulo:     { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  descricao:  { fontSize: 16, color: '#555', marginBottom: 24 },
  voltar:     { fontSize: 16, color: '#E83D84', fontWeight: '600' },
});