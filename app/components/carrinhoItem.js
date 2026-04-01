import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function carrinhoItem({ pedido, onRemover }) {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{pedido.texto}</Text>
      <TouchableOpacity onPress={() => onRemover(pedido.id)}>
        <Text style={styles.remover}>❌</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  texto: { fontSize: 16 },
  remover: { fontSize: 18 },
})