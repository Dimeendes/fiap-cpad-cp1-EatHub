import { createContext, useState, useContext } from 'react';
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

    const users = [
        {
            rm: 'RM562695',
            senha: '123456',
            tipo: 'usuario'
        },
        {
            rm: 'RM563435',
            senha: '654321',
            tipo: 'usuario'
        },
        {
            rf: 'RF010119',
            senha: '080507',
            tipo: 'admin'
        }
    ];

    function login(codigoDigitado, senhaDigitada) {
        const encontrado = users.find((u) => {
            if (u.tipo === 'usuario') {
                return u.rm === codigoDigitado && u.senha === senhaDigitada;
            } else {
                return u.rf === codigoDigitado && u.senha === senhaDigitada;
            }
        });

        if (encontrado) {
            setUser(encontrado);
            return encontrado.tipo;
        } else {
            return null;
        }
    }

    function logout() {
        setUser(null);
}

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
          {children}
        </AuthContext.Provider>
    );
}
export function useUser() {
  return useContext(AuthContext);
}

export default AuthProvider;