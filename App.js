import { ThemeProvider } from './context/ThemeContext';
import Configuracoes from './screens/Configuracoes';

export default function App() {
  return (
    <ThemeProvider>
      <Configuracoes />
    </ThemeProvider>
  );
}