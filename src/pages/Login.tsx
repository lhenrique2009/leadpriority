import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, ArrowRight, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/Button';

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simula login
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Formulário */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">Prioriza.AI</span>
          </Link>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Entrar na sua conta
          </h1>
          <p className="text-slate-600 mb-8">
            Acesse seu dashboard e veja seus leads priorizados.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Senha
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-12 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Entrando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Entrar
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Não tem uma conta?{' '}
              <Link to="/cadastro" className="text-blue-600 font-medium hover:underline">
                Criar conta grátis
              </Link>
            </p>
          </div>

          {/* Voltar para home */}
          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-slate-500 hover:text-slate-700">
              ← Voltar para o site
            </Link>
          </div>
        </div>
      </div>

      {/* Lado direito - Visual */}
      <div className="hidden lg:flex flex-1 bg-slate-900 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Seus leads estão esperando
            </h2>
            <p className="text-slate-400">
              Veja quem você deveria estar atendendo agora e quanto dinheiro está em risco.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-white mb-1">12</div>
              <div className="text-sm text-slate-400">Leads aguardando</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-amber-400 mb-1">3</div>
              <div className="text-sm text-slate-400">Urgentes</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-green-400 mb-1">R$ 18k</div>
              <div className="text-sm text-slate-400">Valor em pipeline</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-red-400 mb-1">R$ 4.5k</div>
              <div className="text-sm text-slate-400">Em risco</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
