import { useRouter } from 'expo-router';
import { useState } from 'react';
 
export default function pedidos() {
  const router = useRouter();
  const[activeTab, setActiveTab] = useState('preparando');
  const [pedidos, setPedidos] = useState([
    {
      id: 18238,
      nome: 'Diego Antonio Silva Mendes',
      rm: '565509',
      status: 'preparando',
      carrinho: '1x Pão de batata \n2x Coca cola Normal'
    },
    {
      id: 18239,
      nome: 'Thiago Ono Sakai',
      rm: '563448',
      status: 'preparando',
      carrinho: '1x Coxinha \n1x Coca Cola Zero \n1x água s/ gás'
    }
  ]);
 
  function alternarStatus(id) {
  const novosPedidos = pedidos.map(p =>
    p.id === id
      ? { ...p, status: p.status === 'preparando' ? 'pronto' : 'preparando' }
      : p
  );
 
  setPedidos(novosPedidos);
}
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Pedidos dia 23/03/2026</Text>
 
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === 'preparando' && styles.activeTab]}
          onPress={() => setActiveTab('preparando')}>
          <Text style={[styles.tabText, activeTab === 'preparando' && styles.activeTabText]}>
            Preparando
          </Text>
        </TouchableOpacity>
 
      <TouchableOpacity style={[styles.tab, activeTab === 'pronto' && styles.activeTab]}
        onPress={() => setActiveTab('pronto')}>
        <Text style={[styles.tabText, activeTab === 'pronto' && styles.activeTabText]}>
          Prontos
        </Text>
      </TouchableOpacity>
 
    </View>
 
      {activeTab === 'preparando' ? (
        pedidos
        .filter(p => p.status === 'preparando')
        .map(pedidos => (
        <View key={pedidos.id} style={styles.pedidosContainer}>
          <Text style={[styles.texto, {paddingTop: 10}]}> Pedido número #{pedidos.id}      |      Horário: 09:55</Text>
         
          <View style={[styles.hr, { backgroundColor: '#ffffff', height: 1 }]}></View>
 
          <Text style={[styles.texto, {justifyContent: 'flex-start'}]}>Aluno(a)</Text>
          <Text style={[styles.texto]}>{pedidos.nome}, Rm {pedidos.rm}</Text>
 
          <View style={[styles.hr, { backgroundColor: '#ffffff', height: 1 }]}></View>
         
          <Text style={styles.texto}>{pedidos.carrinho}</Text>
 
           {pedidos.status === 'preparando' && (
              <TouchableOpacity
                style={styles.botao}
                onPress={() => alternarStatus(pedidos.id)}
              >
                <Text style={{ color: '#fff' }}>Marcar como pronto</Text>
              </TouchableOpacity>
            )}
        </View>
        ))
      ) : (
        pedidos
        .filter(p => p.status === 'pronto')
        .map(pedido => (
        <View key={pedido.id} style={styles.pedidosContainer}>
 
          <Text style={[styles.texto, {paddingTop: 10}]}>Pedido #{pedido.id} | Horário: 09:55</Text>
 
          <Text style={styles.texto}>{pedido.nome}</Text>
 
          <TouchableOpacity
            style={[styles.botao, { backgroundColor: '#800000' }]}
            onPress={() => alternarStatus(pedido.id)}
          >
            <Text style={{ color: '#fff' }}>Voltar para preparando</Text>
          </TouchableOpacity>
 
        </View>
    ))
 
      )}
      </ScrollView>
    );
}
const styles = StyleSheet.create({
  container:  {flexGrow: 1, backgroundColor: '#1C1C1C', alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop: 40, paddingHorizontal: 20 },
  pedidosContainer:    { alignItems: 'center', justifyContent: 'center', backgroundColor: '#262626', width: '100%', borderRadius: 25, marginBottom: 15},
  titulo:     { fontSize: 22, fontWeight: 'bold', marginBottom: 20, marginTop: 10, marginLeft: 10, color: "#ffffff" },
  texto:      { fontSize: 14, fontWeight: 'bold', marginBottom: 12, color: "#ffffff" },
  hr:         { width: "100%", marginVertical: 10, color: '#ffffff', height: 1},
  tabsContainer: { flexDirection: 'row', marginBottom: 20, backgroundColor: '#404040', borderRadius: 25, padding: 4 },
  tab:        { flex: 1, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, alignItems: 'center' },
  activeTab:  { backgroundColor: '#F23064' },
  tabText:    { color: '#fff', fontSize: 14, fontWeight: '600' },
  activeTabText: { color: '#fff' },
  botao:      { marginTop: 10, backgroundColor: '#F23064', padding: 10, borderRadius: 10, alignItems: 'center', marginBottom: 10}
});