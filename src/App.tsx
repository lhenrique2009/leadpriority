import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ComoFunciona } from './pages/ComoFunciona';
import { Planos } from './pages/Planos';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { Dashboard } from './pages/Dashboard';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Páginas públicas com layout padrão */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="/planos" element={<Planos />} />
        </Route>
        
        {/* Páginas de autenticação (sem layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* Dashboard (layout próprio) */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
