Integrantes do Grupo:

Thiago Sobral de Alvarenga - RM: 562695

Pedro Miranda Campos Riato - RM: 562117

Israel Karacsony de Camargo Nunes - RM: 563435

Diego Antonio Silva Mendes - RM: 565509

Thiago Ono Sakai - RM: 563448

Sobre o Projeto:
 O app que desenvolvemos chama-se EatHub, e o problema que buscamos resolver por meio deste app são as grandes filas na cantina. 
Essas filas costumam atrasar a rotina dos estudantes e até dos funcionários, que buscam comer/beber algo durante o intervalo, e acabam se deparando com filas gigantescas na cantina.
Para isso, primeiramente o usuário realiza um breve login, informando se é estudante ou funcionário da FIAP. Em seguida, ele realiza o pedido por meio do próprio app, escolhendo dentre as comidas e bebidas disponíveis.
 Dependendo de se o usupario for funcionário ou estudante, a interface se altera: um estudante verá o aplicativo como um comum app de pedidos, já o funcionário verá quais pedidos devem ser preparados, quem pediu (como forma de identificação quando aluno for retirar) e marcar cada pedido como pronto(e vice-versa em caso de que o mesmo clique errado).
 Por fim, ele realiza o pagamento também dentro do app, economizando assim um grande tempo de fila, comparecendo na cantina somente para a retirada do pedido. Além disso, o app também é customizável, podendo alterar suas cores, mas sempre mantendo a estética da FIAP.

Decisões Técnicas:
Nosso projeto foi estruturando de maneira que cada integrante seria responsável por uma tela do app, totalizando 5 telas. São elas:
- Login
- Configurações
- Pedido
- Cardápio
- Carrinho
- Pagamento
- Sair

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
- useTheme

Context criado:
- Theme context, que gerencia o tema global do app(claro, escuro, normal)


Pré-requisitos: 
- Node.js
- ExpoGo
- Expo router


Diferencial Implementado:

Escolha de temas pelo usuário, que funcionam em todo o app. Tem os temas claro, dark e normal, sempre respeitando a estética da FIAP. 
Esse diferencial foi escolhido, pois já havíamos começado a implementá-lo na primeira entrega do projeto, e agora aprimoramos o seu uso por meio de um estado global.

Foi criado um ThemeContext com três temas, cada um com duas cores: primaria e fundo. O contexto é inicializado com o tema normal, e por meio de um hook useTheme(), permite que a alteração do tema permaneça nas outras telas.

Como clonar o projeto:

- Copie a URL: clique no botão verde "<> Code" e copie a URL (HTTPS ou SSH).
- Abra o terminal: Abra o Git Bash ou terminal de sua preferência.
- Navegue até a pasta: Use cd para ir para onde deseja salvar o projeto (ex: cd documentos/projetos).
- Execute o clone: git clone https://github.com/Dimeendes/fiap-cpad-cp1-EatHub.git

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


Para o futuro: 

- Funcionamento correto de cardápio, utilizando de permanencia de dados, passando os mesmos para a área de carrinho e pedidos
- Adicionar mais opções de cardápio
- Adicionar imagens e descrições para o cardápio
- Adicionar funcionalidades de acessibilidade
- Funcionamento correto das configurações de temas
- Adicionar mais opções de configurações
- Adicionar foma de salvar cartões na hora do pagamento


