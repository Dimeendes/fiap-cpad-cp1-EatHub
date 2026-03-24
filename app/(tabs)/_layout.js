import { Tabs, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
export default function Layout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#FF006E', 
      headerTitleStyle:{
        color: "#ffffff"
      },
      headerStyle:{
        backgroundColor: "#262626",
      },
      tabBarStyle:{
        backgroundColor: "#262626",
        borderTopWidth: 0,
        elevation: 0
      },
      headerShadowVisible: false
      }}>
      
      <Tabs.Screen
        name="config"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color}/>
        }}
      />
      <Tabs.Screen
         name="cardapio"
        options={{
          title: 'cardapio',
          tabBarIcon: ({ color }) => <Ionicons name="reader-outline" size={24} color={color}/>
        }}
      />
      <Tabs.Screen
        name="sair"
        options={{
          title: 'Sair',
          tabBarIcon: ({ color }) => <Ionicons name="close" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="carrinho"
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color }) => <Ionicons name="cart" size={24} color={color} />,
        }}
      />
      
    </Tabs>
  );
}