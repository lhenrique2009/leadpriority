import { Link } from 'react-router-dom';
import { 
  Clock, 
  DollarSign, 
  TrendingDown, 
  AlertTriangle,
  MessageSquare,
  Users,
  Building2,
  Stethoscope,
  GraduationCap,
  Home as HomeIcon,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Timer
} from 'lucide-react';
import { Button } from '@/components/Button';
import { DashboardMockup } from '@/components/DashboardMockup';
import { cn } from '@/utils/cn';

// Seção: Problema
const problems = [
  {
    icon: Clock,
    title: 'Demora para responder',
    description: 'Leads esperam horas ou dias por uma resposta. Quando você responde, já compraram do concorrente.',
    stat: '78% dos leads compram de quem responde primeiro',
  },
  {
    icon: TrendingDown,
    title: 'Leads perdidos no meio',
    description: 'Conversas ficam espalhadas em WhatsApp, Instagram, e-mail. Você esquece de fazer follow-up.',
    stat: '67% das vendas precisam de 5+ contatos',
  },
  {
    icon: AlertTriangle,
    title: 'Sem saber a prioridade',
    description: 'Você atende todos igual. O lead de R$ 500 recebe a mesma atenção do de R$ 50.000.',
    stat: 'Leads quentes esfriam em 5 minutos',
  },
];

// Seção: Como funciona
const steps = [
  {
    number: '01',
    title: 'Conecte seus canais',
    description: 'WhatsApp, Instagram, site. Todas as conversas em um lugar só.',
    detail: 'Integração em menos de 10 minutos, sem precisar de desenvolvedor.',
  },
  {
    number: '02',
    title: 'IA analisa cada lead',
    description: 'A IA lê as mensagens, entende a intenção e calcula a probabilidade de compra.',
    detail: 'Considera tempo de resposta, histórico e comportamento.',
  },
  {
    number: '03',
    title: 'Você recebe prioridades',
    description: 'Lista ordenada: quem atender primeiro, quem está esfriando, quem precisa de follow-up.',
    detail: 'Alertas em tempo real quando um lead importante aparece.',
  },
  {
    number: '04',
    title: 'Sugestões do que falar',
    description: 'A IA sugere respostas baseadas no contexto da conversa e no perfil do lead.',
    detail: 'Você decide se usa ou adapta. Sem respostas automáticas.',
  },
];

// Seção: Para quem é
const segments = [
  { icon: Stethoscope, name: 'Clínicas e consultórios', example: 'Pacientes pedindo informações sobre procedimentos' },
  { icon: HomeIcon, name: 'Imobiliárias', example: 'Interessados perguntando sobre imóveis' },
  { icon: GraduationCap, name: 'Escolas e cursos', example: 'Alunos querendo se matricular' },
  { icon: Briefcase, name: 'Prestadores de serviço', example: 'Clientes pedindo orçamento' },
  { icon: Building2, name: 'Agências', example: 'Leads de campanhas e indicações' },
  { icon: Users, name: 'Varejo e e-commerce', example: 'Dúvidas pré-compra no WhatsApp' },
];

// Seção: Prova
const stats = [
  { value: '42%', label: 'menos leads perdidos', description: 'Média dos clientes após 3 meses' },
  { value: '3.2 min', label: 'tempo de primeira resposta', description: 'Antes era 4h em média' },
  { value: 'R$ 23k', label: 'recuperado por mês', description: 'Em vendas que seriam perdidas' },
];

// Seção: Planos (resumo)
const plansPreview = [
  {
    name: 'Básico',
    price: 'R$ 197',
    period: '/mês',
    highlight: false,
    features: ['Até 200 leads/mês', '2 canais integrados', 'Priorização automática'],
  },
  {
    name: 'Pro',
    price: 'R$ 397',
    period: '/mês',
    highlight: true,
    features: ['Até 1.000 leads/mês', 'Canais ilimitados', 'Sugestões de resposta', 'Alertas em tempo real'],
  },
  {
    name: 'Avançado',
    price: 'R$ 697',
    period: '/mês',
    highlight: false,
    features: ['Leads ilimitados', 'API de integração', 'Relatórios avançados', 'Suporte prioritário'],
  },
];

export function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Texto */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                IA de decisão de vendas
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Pare de perder vendas por{' '}
                <span className="text-blue-600">demora</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl">
                A IA mostra <strong className="text-slate-800">quem atender agora</strong>, sugere o que responder e alerta quando um lead está esfriando. 
                Você vende mais atendendo melhor.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/cadastro">
                  <Button size="lg" className="w-full sm:w-auto">
                    Testar grátis por 14 dias
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/como-funciona">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Ver como funciona
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Sem cartão de crédito
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Setup em 10 min
                </span>
              </div>
            </div>
            
            {/* Mockup */}
            <div className="animate-fade-in-up delay-200 lg:pl-8">
              <DashboardMockup />
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none" />
      </section>

      {/* Seção: O Problema */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Você sabe quanto está perdendo?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A maioria das empresas perde 30-50% das vendas por problemas que poderiam ser evitados.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <div 
                key={index}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <problem.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {problem.title}
                </h3>
                <p className="text-slate-600 mb-4">
                  {problem.description}
                </p>
                <p className="text-sm font-medium text-red-600 bg-red-50 px-3 py-2 rounded-lg inline-block">
                  {problem.stat}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção: Como funciona */}
      <section className="py-20 lg:py-28 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Como funciona
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Do lead que chega até a venda fechada. Simples assim.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-slate-800 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 mb-3">
                  {step.description}
                </p>
                <p className="text-sm text-slate-500">
                  {step.detail}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-slate-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/como-funciona">
              <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 hover:border-slate-500">
                Ver explicação detalhada
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Seção: Para quem é */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Para quem é o Prioriza.AI
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Empresas que já vendem e recebem leads, mas perdem vendas por desorganização ou demora.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {segments.map((segment, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <segment.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {segment.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {segment.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção: Prova / Resultados */}
      <section className="py-20 lg:py-28 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Resultados reais de quem usa
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Dados médios de empresas que usam o Prioriza.AI há mais de 3 meses.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center bg-white/10 backdrop-blur rounded-2xl p-8"
              >
                <div className="text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-xl font-medium text-blue-100 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-blue-200">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-white/10 backdrop-blur rounded-2xl p-8 max-w-3xl mx-auto">
            <blockquote className="text-center">
              <p className="text-lg sm:text-xl mb-4">
                "Antes eu perdia leads sem saber. Agora vejo exatamente quem precisa de atenção e quanto dinheiro está em risco. No primeiro mês já recuperei o investimento de 6 meses."
              </p>
              <footer className="text-blue-200">
                <strong className="text-white">Ricardo Mendes</strong> — Clínica Odontológica Premium
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Seção: Planos */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Planos simples, sem surpresas
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Escolha pelo volume de leads. Cancele quando quiser.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plansPreview.map((plan, index) => (
              <div 
                key={index}
                className={cn(
                  "rounded-2xl p-8 transition-all",
                  plan.highlight 
                    ? "bg-slate-900 text-white shadow-xl scale-105" 
                    : "bg-white border border-slate-200"
                )}
              >
                {plan.highlight && (
                  <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
                    Mais popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={plan.highlight ? "text-slate-400" : "text-slate-500"}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className={cn(
                        "w-4 h-4",
                        plan.highlight ? "text-blue-400" : "text-green-500"
                      )} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/cadastro" className="block">
                  <Button 
                    variant={plan.highlight ? "primary" : "outline"}
                    className="w-full"
                  >
                    Começar grátis
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/planos" className="text-blue-600 font-medium hover:underline">
              Ver comparação completa dos planos →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-6">
            <Timer className="w-4 h-4" />
            Configure em menos de 10 minutos
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Cada lead que esfria é dinheiro perdido
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Comece a ver quem você deveria estar atendendo agora. 
            14 dias grátis, sem cartão de crédito.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/cadastro">
              <Button size="lg" className="w-full sm:w-auto">
                Criar conta grátis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <MessageSquare className="w-4 h-4 mr-2" />
                Falar com especialista
              </Button>
            </a>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              Dados seguros
            </span>
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" />
              Cancele quando quiser
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
