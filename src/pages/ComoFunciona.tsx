import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageSquare, 
  Instagram, 
  Globe,
  Brain,
  ListOrdered,
  Bell,
  Lightbulb,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertTriangle,
  Users
} from 'lucide-react';
import { Button } from '@/components/Button';

// Inputs da IA
const inputs = [
  {
    icon: MessageSquare,
    title: 'Mensagens de WhatsApp',
    description: 'Todas as conversas do seu WhatsApp Business, incluindo histórico e contexto.',
  },
  {
    icon: Instagram,
    title: 'DMs do Instagram',
    description: 'Mensagens diretas e comentários que se transformam em conversas.',
  },
  {
    icon: Globe,
    title: 'Formulários do site',
    description: 'Leads que entram pelo seu site, landing pages ou chatbot.',
  },
  {
    icon: Users,
    title: 'Histórico do cliente',
    description: 'Compras anteriores, interações passadas e valor do cliente.',
  },
];

// O que a IA faz
const processing = [
  {
    icon: Brain,
    title: 'Análise de intenção',
    description: 'A IA lê cada mensagem e identifica se o lead está pronto para comprar, apenas pesquisando ou com dúvidas específicas.',
    example: '"Quanto custa?" → Alta intenção | "Vocês existem há quanto tempo?" → Baixa intenção',
  },
  {
    icon: Clock,
    title: 'Tempo de resposta',
    description: 'Quanto tempo passou desde a última mensagem do lead? Leads esfriam rápido.',
    example: '0-5 min: Quente | 5-30 min: Morno | +1h: Esfriando',
  },
  {
    icon: TrendingUp,
    title: 'Valor estimado',
    description: 'Baseado no que o lead perguntou e no seu histórico, a IA estima o valor potencial.',
    example: 'Lead perguntando sobre pacote premium = valor alto',
  },
  {
    icon: AlertTriangle,
    title: 'Risco de perda',
    description: 'Combina todos os fatores para calcular a probabilidade de você perder esse lead.',
    example: 'Intenção alta + demora = risco crítico',
  },
];

// Outputs da IA
const outputs = [
  {
    icon: ListOrdered,
    title: 'Lista priorizada',
    description: 'Seus leads ordenados por quem você deveria atender primeiro. Score de 0-100 para cada um.',
    benefit: 'Nunca mais perca tempo decidindo quem atender.',
  },
  {
    icon: Bell,
    title: 'Alertas inteligentes',
    description: 'Notificações quando um lead quente chega ou quando um lead importante está esfriando.',
    benefit: 'Aja no momento certo, sem ficar olhando a tela o dia todo.',
  },
  {
    icon: Lightbulb,
    title: 'Sugestões de resposta',
    description: 'A IA sugere o que responder baseado no contexto. Você decide se usa ou adapta.',
    benefit: 'Respostas melhores e mais rápidas.',
  },
];

// O que NÃO é
const notList = [
  'Chatbot que responde automaticamente por você',
  'IA genérica de conversação',
  'Ferramenta de disparo em massa',
  'CRM tradicional com campos intermináveis',
];

// O que É
const isList = [
  'IA de decisão que mostra prioridades',
  'Assistente que sugere (você decide)',
  'Ferramenta de foco e produtividade',
  'Visualização clara de oportunidades',
];

export function ComoFunciona() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Como o Prioriza.AI funciona
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explicação prática e direta. Sem termos técnicos, sem promessas vazias.
          </p>
        </div>
      </section>

      {/* Seção: Inputs */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Passo 1
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-4">
              O que entra: seus leads e conversas
            </h2>
            <p className="text-slate-600 max-w-2xl">
              Você conecta seus canais de atendimento. A partir daí, a IA tem acesso às mensagens para analisar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {inputs.map((input, index) => (
              <div 
                key={index}
                className="bg-slate-50 rounded-xl p-6 border border-slate-100"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <input.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  {input.title}
                </h3>
                <p className="text-sm text-slate-600">
                  {input.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>Privacidade:</strong> As mensagens são processadas para análise, não armazenamos o conteúdo completo. 
              Você mantém controle total sobre seus dados.
            </p>
          </div>
        </div>
      </section>

      {/* Seção: Processamento */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
              Passo 2
            </span>
            <h2 className="text-3xl font-bold mt-2 mb-4">
              O que a IA analisa
            </h2>
            <p className="text-slate-400 max-w-2xl">
              A IA processa cada lead considerando múltiplos fatores para calcular a prioridade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {processing.map((item, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-3">
                      {item.description}
                    </p>
                    <p className="text-xs text-slate-500 bg-slate-800 px-3 py-2 rounded-lg">
                      {item.example}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção: Outputs */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Passo 3
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-4">
              O que você recebe
            </h2>
            <p className="text-slate-600 max-w-2xl">
              Informação acionável para você vender mais e perder menos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {outputs.map((output, index) => (
              <div 
                key={index}
                className="bg-gradient-to-b from-blue-50 to-white rounded-xl p-6 border border-blue-100"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <output.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {output.title}
                </h3>
                <p className="text-slate-600 mb-4">
                  {output.description}
                </p>
                <p className="text-sm font-medium text-blue-600">
                  → {output.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção: O que é / O que não é */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Para ficar claro
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* O que NÃO é */}
            <div className="bg-white rounded-xl p-8 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                ❌ O Prioriza.AI NÃO é
              </h3>
              <ul className="space-y-4">
                {notList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-600">
                    <span className="text-red-500 mt-0.5">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* O que É */}
            <div className="bg-blue-600 rounded-xl p-8 text-white">
              <h3 className="text-lg font-semibold mb-6">
                ✓ O Prioriza.AI É
              </h3>
              <ul className="space-y-4">
                {isList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fluxo visual simples */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Fluxo resumido
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="bg-slate-100 rounded-xl px-6 py-4 text-center">
              <div className="text-2xl mb-2">📱</div>
              <div className="font-medium text-slate-900">Lead chega</div>
              <div className="text-sm text-slate-500">WhatsApp, Insta, Site</div>
            </div>
            
            <ArrowRight className="w-6 h-6 text-slate-300 rotate-90 md:rotate-0" />
            
            <div className="bg-blue-100 rounded-xl px-6 py-4 text-center">
              <div className="text-2xl mb-2">🧠</div>
              <div className="font-medium text-slate-900">IA analisa</div>
              <div className="text-sm text-slate-500">Intenção, tempo, valor</div>
            </div>
            
            <ArrowRight className="w-6 h-6 text-slate-300 rotate-90 md:rotate-0" />
            
            <div className="bg-green-100 rounded-xl px-6 py-4 text-center">
              <div className="text-2xl mb-2">📋</div>
              <div className="font-medium text-slate-900">Você vê</div>
              <div className="text-sm text-slate-500">Prioridades claras</div>
            </div>
            
            <ArrowRight className="w-6 h-6 text-slate-300 rotate-90 md:rotate-0" />
            
            <div className="bg-emerald-100 rounded-xl px-6 py-4 text-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-medium text-slate-900">Você vende</div>
              <div className="text-sm text-slate-500">Mais e melhor</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para parar de perder vendas?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Configure em 10 minutos. Veja seus leads priorizados hoje.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cadastro">
              <Button size="lg">
                Começar grátis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/planos">
              <Button variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-800">
                Ver planos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
