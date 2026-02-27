import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Bell,
  Settings,
  LogOut,
  Search,
  Clock,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  User,
  Phone,
  MessageSquare,
  ChevronDown,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Instagram,
  Globe,
  Lightbulb,
  X,
} from 'lucide-react';
import { cn } from '@/utils/cn';

// Dados simulados de leads
const mockLeads = [
  {
    id: 1,
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '(11) 98765-4321',
    source: 'WhatsApp',
    sourceIcon: MessageSquare,
    priority: 'urgent',
    lastMessage: '2 min atrás',
    lastMessageContent: 'Oi, gostaria de saber o preço do pacote completo e se tem disponibilidade para amanhã.',
    score: 94,
    action: 'Responder agora',
    value: 4500,
    intent: 'Alta intenção de compra',
    history: '3 interações anteriores',
    suggestedResponse: 'Olá Maria! O pacote completo está R$ 4.500 e temos disponibilidade amanhã às 14h ou 16h. Qual horário funciona melhor para você?',
  },
  {
    id: 2,
    name: 'João Oliveira',
    email: 'joao.oliveira@gmail.com',
    phone: '(11) 91234-5678',
    source: 'Instagram',
    sourceIcon: Instagram,
    priority: 'high',
    lastMessage: '8 min atrás',
    lastMessageContent: 'Vi que vocês fazem orçamento personalizado. Quanto fica para 500 unidades?',
    score: 87,
    action: 'Lead quente',
    value: 2800,
    intent: 'Comparando preços',
    history: 'Primeira interação',
    suggestedResponse: 'Olá João! Para 500 unidades, conseguimos um valor especial de R$ 5,60 por unidade. Posso enviar uma proposta detalhada por e-mail?',
  },
  {
    id: 3,
    name: 'Ana Costa',
    email: 'ana.costa@empresa.com.br',
    phone: '(21) 99876-5432',
    source: 'Site',
    sourceIcon: Globe,
    priority: 'medium',
    lastMessage: '15 min atrás',
    lastMessageContent: 'Preciso de mais informações sobre o plano empresarial.',
    score: 72,
    action: 'Fazer follow-up',
    value: 1200,
    intent: 'Pesquisando opções',
    history: '1 interação anterior',
    suggestedResponse: 'Olá Ana! Nosso plano empresarial inclui suporte prioritário, usuários ilimitados e relatórios personalizados. Posso agendar uma demonstração de 15 minutos?',
  },
  {
    id: 4,
    name: 'Carlos Lima',
    email: 'carlos@lima.adv.br',
    phone: '(11) 97654-3210',
    source: 'WhatsApp',
    sourceIcon: MessageSquare,
    priority: 'cooling',
    lastMessage: '1h 20min atrás',
    lastMessageContent: 'Interessado no serviço mensal.',
    score: 45,
    action: 'Lead esfriando',
    value: 3200,
    intent: 'Interesse inicial',
    history: '2 interações anteriores',
    suggestedResponse: 'Olá Carlos! Vi que você demonstrou interesse no serviço mensal. Posso tirar alguma dúvida? Estou à disposição.',
  },
  {
    id: 5,
    name: 'Fernanda Almeida',
    email: 'fernanda.almeida@hotmail.com',
    phone: '(31) 98888-7777',
    source: 'Instagram',
    sourceIcon: Instagram,
    priority: 'high',
    lastMessage: '12 min atrás',
    lastMessageContent: 'Vocês atendem em BH? Preciso para a próxima semana.',
    score: 82,
    action: 'Responder',
    value: 1800,
    intent: 'Urgência identificada',
    history: 'Primeira interação',
    suggestedResponse: 'Olá Fernanda! Sim, atendemos em BH! Temos agenda disponível para a próxima semana. Qual dia seria melhor para você?',
  },
  {
    id: 6,
    name: 'Roberto Dias',
    email: 'roberto.dias@gmail.com',
    phone: '(11) 95555-4444',
    source: 'Site',
    sourceIcon: Globe,
    priority: 'low',
    lastMessage: '3h atrás',
    lastMessageContent: 'Gostaria de saber mais sobre a empresa.',
    score: 28,
    action: 'Nutrir',
    value: 800,
    intent: 'Apenas pesquisando',
    history: 'Primeira interação',
    suggestedResponse: 'Olá Roberto! Somos especialistas em [área] desde 2018. Posso enviar um material com cases de sucesso?',
  },
];

const priorityStyles = {
  urgent: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
  high: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-500' },
  medium: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  cooling: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  low: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-400' },
};

const priorityLabels = {
  urgent: 'Urgente',
  high: 'Alta',
  medium: 'Média',
  cooling: 'Esfriando',
  low: 'Baixa',
};

export function Dashboard() {
  const [selectedLead, setSelectedLead] = useState<typeof mockLeads[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || lead.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const stats = {
    total: mockLeads.length,
    urgent: mockLeads.filter(l => l.priority === 'urgent').length,
    atRisk: mockLeads.filter(l => ['urgent', 'cooling'].includes(l.priority)).reduce((sum, l) => sum + l.value, 0),
    avgScore: Math.round(mockLeads.reduce((sum, l) => sum + l.score, 0) / mockLeads.length),
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">Prioriza.AI</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-slate-700" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">JD</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium">João Demo</div>
                <div className="text-xs text-slate-400">Plano Pro</div>
              </div>
            </div>
            <Link to="/" className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                <User className="w-4 h-4" />
                Leads ativos
              </div>
              <div className="text-2xl font-bold">{stats.total}</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                <AlertTriangle className="w-4 h-4" />
                Urgentes
              </div>
              <div className="text-2xl font-bold text-red-400">{stats.urgent}</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                <DollarSign className="w-4 h-4" />
                Valor em risco
              </div>
              <div className="text-2xl font-bold text-amber-400">
                R$ {(stats.atRisk / 1000).toFixed(1)}k
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                <TrendingUp className="w-4 h-4" />
                Score médio
              </div>
              <div className="text-2xl font-bold text-green-400">{stats.avgScore}</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar lead por nome ou e-mail..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="all">Todas prioridades</option>
                  <option value="urgent">Urgente</option>
                  <option value="high">Alta</option>
                  <option value="medium">Média</option>
                  <option value="cooling">Esfriando</option>
                  <option value="low">Baixa</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors">
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Atualizar</span>
              </button>
            </div>
          </div>

          {/* Leads List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Leads priorizados</h2>
              <span className="text-sm text-slate-400">
                {filteredLeads.length} lead{filteredLeads.length !== 1 && 's'}
              </span>
            </div>

            {filteredLeads.map((lead) => {
              const priority = priorityStyles[lead.priority as keyof typeof priorityStyles];
              const SourceIcon = lead.sourceIcon;

              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={cn(
                    "bg-slate-800 rounded-xl p-4 border cursor-pointer transition-all hover:bg-slate-750",
                    lead.priority === 'urgent' 
                      ? 'border-red-500/50 hover:border-red-500' 
                      : 'border-slate-700 hover:border-slate-600',
                    selectedLead?.id === lead.id && 'ring-2 ring-blue-500'
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium">
                          {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div className={cn(
                        "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center",
                        lead.source === 'WhatsApp' ? 'bg-green-500' :
                        lead.source === 'Instagram' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                        'bg-blue-500'
                      )}>
                        <SourceIcon className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold truncate">{lead.name}</span>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full border",
                          priority.bg, priority.text, priority.border
                        )}>
                          {priorityLabels[lead.priority as keyof typeof priorityLabels]}
                        </span>
                        {lead.priority === 'urgent' && (
                          <span className="flex items-center gap-1 text-xs text-red-400 animate-pulse">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                            Ação necessária
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-400 mb-2">
                        <span>{lead.source}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lead.lastMessage}
                        </span>
                        <span>•</span>
                        <span className="text-green-400 font-medium">
                          R$ {lead.value.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 line-clamp-1">
                        "{lead.lastMessageContent}"
                      </p>
                    </div>

                    {/* Score & Action */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-right">
                        <div className="text-xs text-slate-400 mb-0.5">Score</div>
                        <div className={cn(
                          "text-2xl font-bold",
                          lead.score >= 80 ? 'text-green-400' :
                          lead.score >= 60 ? 'text-amber-400' : 'text-slate-400'
                        )}>
                          {lead.score}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLead(lead);
                        }}
                        className={cn(
                          "text-xs px-4 py-2 rounded-lg font-medium flex items-center gap-1.5 transition-colors",
                          lead.priority === 'urgent'
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : lead.priority === 'high'
                            ? 'bg-orange-500 hover:bg-orange-600 text-white'
                            : 'bg-slate-700 hover:bg-slate-600 text-white'
                        )}
                      >
                        {lead.priority === 'urgent' && <Phone className="w-3 h-3" />}
                        {lead.priority !== 'urgent' && <MessageSquare className="w-3 h-3" />}
                        {lead.action}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* Lead Detail Sidebar */}
        {selectedLead && (
          <aside className="w-96 bg-slate-800 border-l border-slate-700 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Detalhes do Lead</h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1 text-slate-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lead Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center">
                <span className="text-2xl font-medium">
                  {selectedLead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold">{selectedLead.name}</h4>
                <div className={cn(
                  "inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full mt-1",
                  priorityStyles[selectedLead.priority as keyof typeof priorityStyles].bg,
                  priorityStyles[selectedLead.priority as keyof typeof priorityStyles].text
                )}>
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    priorityStyles[selectedLead.priority as keyof typeof priorityStyles].dot
                  )} />
                  Prioridade {priorityLabels[selectedLead.priority as keyof typeof priorityLabels]}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <MessageSquare className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300">{selectedLead.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300">{selectedLead.phone}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-xs text-slate-400 mb-1">Score</div>
                <div className={cn(
                  "text-2xl font-bold",
                  selectedLead.score >= 80 ? 'text-green-400' :
                  selectedLead.score >= 60 ? 'text-amber-400' : 'text-slate-400'
                )}>
                  {selectedLead.score}
                </div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-xs text-slate-400 mb-1">Valor estimado</div>
                <div className="text-2xl font-bold text-green-400">
                  R$ {selectedLead.value.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Intent */}
            <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
              <div className="text-xs text-slate-400 mb-2">Intenção identificada</div>
              <div className="text-sm font-medium text-white mb-1">{selectedLead.intent}</div>
              <div className="text-xs text-slate-400">{selectedLead.history}</div>
            </div>

            {/* Last Message */}
            <div className="mb-6">
              <div className="text-xs text-slate-400 mb-2">Última mensagem</div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-sm text-slate-300 italic">
                  "{selectedLead.lastMessageContent}"
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  {selectedLead.lastMessage}
                </div>
              </div>
            </div>

            {/* Suggested Response */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Sugestão de resposta
              </div>
              <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
                <p className="text-sm text-blue-100">
                  {selectedLead.suggestedResponse}
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors">
                    Usar resposta
                  </button>
                  <button className="text-xs bg-slate-700 hover:bg-slate-600 text-white py-2 px-3 rounded-lg transition-colors">
                    Editar
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                <Phone className="w-4 h-4" />
                Ligar agora
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                <MessageSquare className="w-4 h-4" />
                Abrir WhatsApp
              </button>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-2 px-3 rounded-lg text-sm transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  Marcar atendido
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-2 px-3 rounded-lg text-sm transition-colors">
                  <XCircle className="w-4 h-4 text-red-400" />
                  Descartar
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
