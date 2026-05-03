import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function Layout() {
  const { tema } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tema.primaria,
        tabBarInactiveTintColor: tema.textoSecundario,
        headerTitleStyle: {
          color: tema.texto,
        },
        headerStyle: {
          backgroundColor: tema.card,
        },
        sceneStyle: {
          backgroundColor: tema.fundo,
        },
        tabBarStyle: {
          backgroundColor: tema.tabBar,
          borderTopWidth: 0,
          elevation: 0,
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="pedidos"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color }) => <Ionicons name="pizza" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="sair"
        options={{
          title: 'Sair',
          tabBarIcon: ({ color }) => <Ionicons name="close" size={24} color={color} />,
        }}
      />

    </Tabs>
  );
}