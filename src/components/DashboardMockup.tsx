import { Clock, MessageSquare, TrendingUp, AlertTriangle, User, Phone } from 'lucide-react';
import { cn } from '@/utils/cn';

// Dados simulados de leads
const mockLeads = [
  {
    id: 1,
    name: 'Maria Santos',
    source: 'WhatsApp',
    priority: 'urgent',
    lastMessage: '2 min',
    score: 94,
    action: 'Responder agora',
    value: 'R$ 4.500',
    intent: 'Perguntou preço e disponibilidade'
  },
  {
    id: 2,
    name: 'João Oliveira',
    source: 'Instagram',
    priority: 'high',
    lastMessage: '8 min',
    score: 87,
    action: 'Lead quente',
    value: 'R$ 2.800',
    intent: 'Comparando com concorrente'
  },
  {
    id: 3,
    name: 'Ana Costa',
    source: 'Site',
    priority: 'medium',
    lastMessage: '15 min',
    score: 72,
    action: 'Fazer follow-up',
    value: 'R$ 1.200',
    intent: 'Pediu mais informações'
  },
  {
    id: 4,
    name: 'Carlos Lima',
    source: 'WhatsApp',
    priority: 'cooling',
    lastMessage: '1h 20min',
    score: 45,
    action: 'Lead esfriando',
    value: 'R$ 3.200',
    intent: 'Sem resposta há muito tempo'
  },
];

const priorityStyles = {
  urgent: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  medium: 'bg-blue-100 text-blue-700 border-blue-200',
  cooling: 'bg-slate-100 text-slate-600 border-slate-200',
};

const priorityLabels = {
  urgent: 'Urgente',
  high: 'Alta',
  medium: 'Média',
  cooling: 'Esfriando',
};

export function DashboardMockup() {
  return (
    <div className="bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
      {/* Header do mockup */}
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-slate-400 text-sm">Prioriza.AI - Dashboard</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Atualizado agora
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        {/* Stats rápidos */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Clock className="w-3 h-3" />
              Tempo médio
            </div>
            <div className="text-white font-bold text-lg">3.2 min</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <TrendingUp className="w-3 h-3" />
              Conversão
            </div>
            <div className="text-emerald-400 font-bold text-lg">24%</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <AlertTriangle className="w-3 h-3" />
              Em risco
            </div>
            <div className="text-amber-400 font-bold text-lg">R$ 8.4k</div>
          </div>
        </div>

        {/* Lista de leads */}
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-medium text-sm">Leads priorizados</span>
            <span className="text-slate-400 text-xs">12 ativos</span>
          </div>
          
          {mockLeads.map((lead) => (
            <div
              key={lead.id}
              className={cn(
                "bg-slate-800/30 rounded-lg p-3 border transition-all hover:bg-slate-800/50",
                lead.priority === 'urgent' ? 'border-red-500/30' : 'border-slate-700'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">{lead.name}</span>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full border",
                        priorityStyles[lead.priority as keyof typeof priorityStyles]
                      )}>
                        {priorityLabels[lead.priority as keyof typeof priorityLabels]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-slate-400 text-xs">{lead.source}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400 text-xs">{lead.lastMessage}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-emerald-400 text-xs font-medium">{lead.value}</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-1">{lead.intent}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-right">
                    <div className="text-slate-400 text-xs">Score</div>
                    <div className={cn(
                      "font-bold text-lg",
                      lead.score >= 80 ? 'text-emerald-400' : 
                      lead.score >= 60 ? 'text-amber-400' : 'text-slate-400'
                    )}>
                      {lead.score}
                    </div>
                  </div>
                  <button className={cn(
                    "text-xs px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5",
                    lead.priority === 'urgent' 
                      ? 'bg-red-500 text-white' 
                      : lead.priority === 'high'
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-700 text-slate-200'
                  )}>
                    {lead.priority === 'urgent' && <Phone className="w-3 h-3" />}
                    {lead.priority !== 'urgent' && <MessageSquare className="w-3 h-3" />}
                    {lead.action}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
