import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, ArrowRight, Mail, Lock, User, Building2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/Button';

const benefits = [
  '14 dias grátis, sem cartão de crédito',
  'Configure em menos de 10 minutos',
  'Cancele quando quiser',
  'Suporte por chat incluído',
];

export function Cadastro() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    segment: '',
    leadsPerMonth: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setIsLoading(true);
    
    // Simula cadastro
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Visual */}
      <div className="hidden lg:flex flex-1 bg-blue-600 items-center justify-center p-12">
        <div className="max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Pare de perder vendas por demora
            </h2>
            <p className="text-blue-100 text-lg">
              Em poucos minutos você vai ver seus leads priorizados e saber exatamente quem atender primeiro.
            </p>
          </div>

          {/* Benefícios */}
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3 text-white">
                <CheckCircle2 className="w-5 h-5 text-blue-200 flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>

          {/* Depoimento */}
          <div className="mt-12 bg-white/10 backdrop-blur rounded-xl p-6">
            <p className="text-white mb-4">
              "No primeiro dia já vi que tinha 3 leads quentes que eu nem sabia. Fechei 2 vendas naquela semana."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">CM</span>
              </div>
              <div>
                <div className="text-white font-medium">Carla Mendes</div>
                <div className="text-blue-200 text-sm">Dona de clínica estética</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">Prioriza.AI</span>
          </Link>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`flex-1 h-1 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-slate-200'}`} />
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {step === 1 ? 'Criar sua conta' : 'Sobre sua empresa'}
          </h1>
          <p className="text-slate-600 mb-8">
            {step === 1 
              ? 'Comece grátis por 14 dias. Sem cartão de crédito.' 
              : 'Ajuda a personalizar sua experiência.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 ? (
              <>
                {/* Nome */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Seu nome
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Como você se chama?"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    E-mail profissional
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
                      placeholder="seu@empresa.com"
                    />
                  </div>
                </div>

                {/* Senha */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                    Crie uma senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={8}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-11 pr-12 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Mínimo 8 caracteres"
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
              </>
            ) : (
              <>
                {/* Nome da empresa */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                    Nome da empresa
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      id="company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                </div>

                {/* Segmento */}
                <div>
                  <label htmlFor="segment" className="block text-sm font-medium text-slate-700 mb-2">
                    Segmento de atuação
                  </label>
                  <select
                    id="segment"
                    required
                    value={formData.segment}
                    onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                  >
                    <option value="">Selecione...</option>
                    <option value="clinica">Clínica / Saúde</option>
                    <option value="imobiliaria">Imobiliária</option>
                    <option value="escola">Escola / Educação</option>
                    <option value="agencia">Agência</option>
                    <option value="servicos">Prestação de serviços</option>
                    <option value="varejo">Varejo / E-commerce</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                {/* Leads por mês */}
                <div>
                  <label htmlFor="leads" className="block text-sm font-medium text-slate-700 mb-2">
                    Quantos leads você recebe por mês?
                  </label>
                  <select
                    id="leads"
                    required
                    value={formData.leadsPerMonth}
                    onChange={(e) => setFormData({ ...formData, leadsPerMonth: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                  >
                    <option value="">Selecione...</option>
                    <option value="menos-100">Menos de 100</option>
                    <option value="100-500">100 a 500</option>
                    <option value="500-1000">500 a 1.000</option>
                    <option value="1000-5000">1.000 a 5.000</option>
                    <option value="mais-5000">Mais de 5.000</option>
                  </select>
                </div>
              </>
            )}

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
                  Criando sua conta...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {step === 1 ? 'Continuar' : 'Criar conta e entrar'}
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>

            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-center text-sm text-slate-500 hover:text-slate-700"
              >
                ← Voltar
              </button>
            )}
          </form>

          {step === 1 && (
            <>
              <div className="mt-6 text-center text-xs text-slate-500">
                Ao criar sua conta, você concorda com nossos{' '}
                <a href="#" className="text-blue-600 hover:underline">Termos de Uso</a>
                {' '}e{' '}
                <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a>.
              </div>

              <div className="mt-8 text-center">
                <p className="text-slate-600">
                  Já tem uma conta?{' '}
                  <Link to="/login" className="text-blue-600 font-medium hover:underline">
                    Fazer login
                  </Link>
                </p>
              </div>
            </>
          )}

          {/* Voltar para home */}
          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-slate-500 hover:text-slate-700">
              ← Voltar para o site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
