import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
 
const TEMAS = {
  normal: { primaria: '#BF3B5E', fundo: '#404040' },
  claro:  { primaria: '#F23064', fundo: '#FFFFFF' },
  dark:   { primaria: '#BF3B5E', fundo: '#262626' },
};
 
export default function Configuracoes() {
  const router = useRouter();
  const [temaSelecionado, setTemaSelecionado] = useState('normal');
 
  const tema = TEMAS[temaSelecionado];
 
  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Text style={[styles.titulo, { color: tema.primaria }]}> Configurações</Text>
 
      <Text style={[styles.subtitulo, { color: tema.primaria }]}>Tema</Text>
 
      <TouchableOpacity
        style={[styles.botaoTema, temaSelecionado === 'normal' && { borderColor: tema.primaria, borderWidth: 2 }]}
        onPress={() => setTemaSelecionado('normal')}
      >
        <View style={[styles.amostra, { backgroundColor: '#BF3B5E' }]} />
        <View style={[styles.amostra, { backgroundColor: '#404040' }]} />
        <Text style={styles.botaoTemaTexto}>Normal</Text>
      </TouchableOpacity>
 
      <TouchableOpacity
        style={[styles.botaoTema, temaSelecionado === 'claro' && { borderColor: tema.primaria, borderWidth: 2 }]}
        onPress={() => setTemaSelecionado('claro')}
      >
        <View style={[styles.amostra, { backgroundColor: '#F23064' }]} />
        <View style={[styles.amostra, { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#ccc' }]} />
        <Text style={styles.botaoTemaTexto}>Claro</Text>
      </TouchableOpacity>
 
      <TouchableOpacity
        style={[styles.botaoTema, temaSelecionado === 'dark' && { borderColor: tema.primaria, borderWidth: 2 }]}
        onPress={() => setTemaSelecionado('dark')}
      >
        <View style={[styles.amostra, { backgroundColor: '#BF3B5E' }]} />
        <View style={[styles.amostra, { backgroundColor: '#262626' }]} />
        <Text style={styles.botaoTemaTexto}>Dark</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container:    { flex: 1, alignItems: 'center', justifyContent: 'center' },
  titulo:       { fontSize: 28, fontWeight: 'bold', marginBottom: 32 },
  subtitulo:    { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  botaoTema:    { flexDirection: 'row', alignItems: 'center', backgroundColor: '#55555540', borderRadius: 10, padding: 14, marginBottom: 12, width: 220, borderWidth: 2, borderColor: 'transparent' },
  amostra:      { width: 28, height: 28, borderRadius: 6, marginRight: 8 },
  botaoTemaTexto: { fontSize: 16, color: '#fff', fontWeight: '600' },
});
