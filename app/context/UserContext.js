import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
 
    const [usuarios, setUsuarios] = useState([
        {
            emailRM: 'rm562695@fiap.com.br',
            senha: '123456',
            nome: 'Thiago Sobral de Alvarenga',
            tipo: 'usuario'
        }
    ]);
    const [admins, setAdmins] = useState([
        {
            emailRF: 'rf010119@fiap.com.br',
            senha: '080507',
            nome: 'Admin 1',
            tipo: 'admin'
        }
    ]);
 
    useEffect(() => {
        carregarUsuario();
    }, []);
 
    async function carregarUsuario() {
        try {
            const usuarioJson = await AsyncStorage.getItem('usuarioLogado');
            if (usuarioJson) {
                setUsuarioLogado(JSON.parse(usuarioJson));
            }
        } catch (error) {
            console.error('Erro ao carregar usuário:', error);
        }
    }
 
    async function salvarUsuario(usuario) {
        try {
            await AsyncStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
        }
    }
 
    async function cadastrarUsuario(nome, emailRM, senha) {
        const novoUsuario = {
            emailRM: emailRM,
            senha: senha,
            nome: nome,
            tipo: 'usuario'
        };
 
        const novaLista = ([...usuarios, novoUsuario]);
 
        setUsuarios(novaLista);
        await AsyncStorage.setItem('usuarios', JSON.stringify(novaLista));
    }
 
    function login(emailDigitado, senhaDigitada) {
        const emailNormalizado = emailDigitado.trim().toLowerCase();
 
        const adminEncontrado = admins.find(
            (admin) => admin.emailRF?.trim().toLowerCase() === emailNormalizado && admin.senha === senhaDigitada
        );
 
        if (adminEncontrado) {
            setUsuarioLogado(adminEncontrado);
            salvarUsuario(adminEncontrado);
            return 'admin';
        }
 
        const usuarioEncontrado = usuarios.find(
            (usuario) =>
                (usuario.emailRM?.trim().toLowerCase() === emailNormalizado ||
                 usuario.email?.trim().toLowerCase() === emailNormalizado) &&
                usuario.senha === senhaDigitada
        );
 
        if (usuarioEncontrado) {
            setUsuarioLogado(usuarioEncontrado);
            salvarUsuario(usuarioEncontrado);
            return 'usuario';
        }
 
        return null;
    }
 
    function logout() {
        setUsuarioLogado(null);
        AsyncStorage.removeItem('usuarioLogado');
}
 
    return (
        <AuthContext.Provider
        value={{
            usuarioLogado,
            cadastrarUsuario,
            login,
            logout
            }}
        >
          {children}
        </AuthContext.Provider>
    );
}
export function useUser() {
  return useContext(AuthContext);
}
 
export default AuthProvider;
