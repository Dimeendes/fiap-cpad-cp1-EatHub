# EatHub

Aplicativo mobile (React Native + Expo) para reduzir filas na cantina: pedido pelo celular, pagamento no app e fila de preparo para funcionários.

---

## Integrantes

| Nome | RM |
|------|-----|
| Thiago Sobral de Alvarenga | 562695 |
| Pedro Miranda Campos Riato | 562117 |
| Israel Karacsony de Camargo Nunes | 563435 |
| Diego Antonio Silva Mendes | 565509 |
| Thiago Ono Sakai | 563448 |

---

## Sobre o projeto

O **EatHub** ataca o problema das longas filas na cantina, que atrasam estudantes e funcionários no intervalo.

1. **Login** — o usuário informa se é estudante ou funcionário da FIAP.
2. **Pedido** — o estudante monta o pedido no cardápio e no carrinho.
3. **Pagamento** — escolha entre PIX (desconto), cartão (com cadastro prévio) ou dinheiro/maquininha; ao confirmar, o pedido vai para a cozinha e o carrinho é esvaziado.
4. **Funcionários** — visualizam pedidos do dia, dados do aluno e alteram o status (preparando / pronto).

A interface muda conforme o perfil. Há também tela de **configurações** (temas) e **sair**.

**Persistência local:** uso de `AsyncStorage` para carrinho, cartão (demonstração), lista de pedidos e avisos pós-compra.

---

## Stack e decisões técnicas

- **Expo** e **Expo Router** (navegação por arquivos, abas para o estudante).
- **Context API** para autenticação (`UserContext`).
- Principais telas: login, cardápio, carrinho, pagamento, cadastro de cartão, pedidos (funcionários), configurações, sair.

**Hooks e APIs (exemplos):** `useState`, `useCallback`, `useFocusEffect`, `useRouter`, `createContext`, `useContext`, `AsyncStorage`.

**Componentes e bibliotecas (exemplos):** `View`, `Text`, `TextInput`, `TouchableOpacity`, `ScrollView`, `FlatList`, `StyleSheet`, `Alert`, `Tabs` / `Stack`, `@expo/vector-icons` (Ionicons).

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) (LTS recomendado)
- Conta / app **Expo Go** no dispositivo, ou emulador Android / iOS

---

## Como rodar o projeto

```bash
cd fiap-cpad-cp1-EatHub
npm install
npx expo start
```

Escaneie o QR code com o Expo Go ou pressione `a` / `i` para emulador.

---

## Como clonar

1. No GitHub, em **Code**, copie a URL (HTTPS ou SSH).
2. No terminal, vá até a pasta desejada (ex.: `cd Documentos/projetos`).
3. Execute:

```bash
git clone https://github.com/Dimeendes/fiap-cpad-cp1-EatHub.git
cd fiap-cpad-cp1-EatHub
```

Os hooks utilizados foram:

- useState
- useRouter
- Tabs
- stack
- Ionicons
- View
- TouchableOpacity
- StyleSheet
- Image
- ScrollView
- Flatlist
- Alert
- createContext
- useContext

Telas do fluxo estudante / funcionário (anexos do repositório):

Pré-requisitos: 
- Node.js
- ExpoGo
- Expo router

---

Demontração:

<img width="426" height="962" alt="image" src="https://github.com/user-attachments/assets/f3d933c1-114f-460a-9d5e-5222632d11bf" />
<img width="426" height="961" alt="image" src="https://github.com/user-attachments/assets/738484cb-b58b-4495-a5d1-99111d36ecd9" />
<img width="427" height="883" alt="image" src="https://github.com/user-attachments/assets/616ab374-4be6-4947-a0d1-b884a9e8e19a" />
<img width="430" height="962" alt="image" src="https://github.com/user-attachments/assets/3ee5b96b-b849-4b1a-93f7-1c636578c10e" />
<img width="422" height="952" alt="image" src="https://github.com/user-attachments/assets/cb9f817e-7007-4dcf-bff0-cf2740df59b8" />
<img width="422" height="958" alt="image" src="https://github.com/user-attachments/assets/2893c8fa-48a5-41da-8e38-6c501ff19212" />
<img width="425" height="955" alt="image" src="https://github.com/user-attachments/assets/9c34ac27-d039-4779-962b-f44c7d40add7" />
<img width="423" height="953" alt="image" src="https://github.com/user-attachments/assets/c04b39b9-97be-468b-9a7c-61922f059b2e" />

Link do vídeo demonstrativo
https://drive.google.com/file/d/1URXAff2yyXxNUFbnjwHG9uWsHWAWcj0H/view?usp=sharing

---

## Para o futuro



- **Backend ou BaaS** — API REST para pedidos, cardápio e usuários em tempo real (vários dispositivos vendo a mesma fila).
- **Cardápio dinâmico** — itens, preços, fotos e descrições vindos do servidor; painel admin para a cantina.
- **Notificações** — avisar o aluno quando o pedido estiver pronto (push ou fila com atualização automática).
- **Temas** — persistir a escolha de tema no `AsyncStorage` ou perfil do usuário e aplicar em todo o app de forma consistente.
- **Acessibilidade** — tamanhos de fonte, contraste, leitores de tela e rótulos em botões/imagens.


---
