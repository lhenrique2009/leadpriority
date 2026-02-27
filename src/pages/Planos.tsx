import { Link } from 'react-router-dom';
import { CheckCircle2, X, ArrowRight, HelpCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/Button';
import { cn } from '@/utils/cn';

// Planos completos
const plans = [
  {
    id: 'basico',
    name: 'Básico',
    description: 'Para empresas que estão começando a organizar seus leads.',
    price: 197,
    period: '/mês',
    highlight: false,
    cta: 'Começar grátis',
    features: [
      { name: 'Leads por mês', value: 'Até 200', included: true },
      { name: 'Canais integrados', value: '2 canais', included: true },
      { name: 'Priorização automática', value: 'Sim', included: true },
      { name: 'Score de leads', value: 'Sim', included: true },
      { name: 'Sugestões de resposta', value: null, included: false },
      { name: 'Alertas em tempo real', value: null, included: false },
      { name: 'Relatórios avançados', value: null, included: false },
      { name: 'API de integração', value: null, included: false },
      { name: 'Suporte', value: 'E-mail', included: true },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Para empresas que querem parar de perder vendas de vez.',
    price: 397,
    period: '/mês',
    highlight: true,
    badge: 'Mais escolhido',
    cta: 'Começar grátis',
    features: [
      { name: 'Leads por mês', value: 'Até 1.000', included: true },
      { name: 'Canais integrados', value: 'Ilimitados', included: true },
      { name: 'Priorização automática', value: 'Sim', included: true },
      { name: 'Score de leads', value: 'Sim', included: true },
      { name: 'Sugestões de resposta', value: 'Sim', included: true },
      { name: 'Alertas em tempo real', value: 'Sim', included: true },
      { name: 'Relatórios avançados', value: 'Básico', included: true },
      { name: 'API de integração', value: null, included: false },
      { name: 'Suporte', value: 'Chat + E-mail', included: true },
    ],
  },
  {
    id: 'avancado',
    name: 'Avançado',
    description: 'Para empresas com alto volume e necessidades específicas.',
    price: 697,
    period: '/mês',
    highlight: false,
    cta: 'Falar com vendas',
    features: [
      { name: 'Leads por mês', value: 'Ilimitados', included: true },
      { name: 'Canais integrados', value: 'Ilimitados', included: true },
      { name: 'Priorização automática', value: 'Sim', included: true },
      { name: 'Score de leads', value: 'Sim', included: true },
      { name: 'Sugestões de resposta', value: 'Sim', included: true },
      { name: 'Alertas em tempo real', value: 'Sim', included: true },
      { name: 'Relatórios avançados', value: 'Completo', included: true },
      { name: 'API de integração', value: 'Sim', included: true },
      { name: 'Suporte', value: 'Prioritário + Telefone', included: true },
    ],
  },
];

// FAQs
const faqs = [
  {
    question: 'O que conta como um lead?',
    answer: 'Cada pessoa única que entra em contato por qualquer canal conta como um lead no mês. Se a mesma pessoa mandar 50 mensagens, ainda é 1 lead.',
  },
  {
    question: 'Posso mudar de plano depois?',
    answer: 'Sim, a qualquer momento. Se fizer upgrade, a diferença é cobrada proporcionalmente. Se fizer downgrade, o novo valor vale no próximo ciclo.',
  },
  {
    question: 'Como funciona o período grátis?',
    answer: '14 dias grátis em qualquer plano, sem precisar de cartão de crédito. Depois você escolhe se quer continuar.',
  },
  {
    question: 'E se eu ultrapassar o limite de leads?',
    answer: 'Avisamos quando você chegar em 80% do limite. Se ultrapassar, os novos leads ainda são registrados, mas você precisa fazer upgrade para continuar usando as funcionalidades.',
  },
  {
    question: 'Tem contrato de fidelidade?',
    answer: 'Não. Cobrança mensal, cancele quando quiser. Sem multa, sem burocracia.',
  },
  {
    question: 'Vocês fazem integração personalizada?',
    answer: 'No plano Avançado, sim. Podemos integrar com seu CRM, ERP ou sistema interno via API.',
  },
];

export function Planos() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Planos simples, preço justo
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Escolha pelo seu volume de leads. Todos os planos incluem 14 dias grátis.
          </p>
        </div>
      </section>

      {/* Planos */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "rounded-2xl p-8 transition-all relative",
                  plan.highlight
                    ? "bg-slate-900 text-white shadow-2xl lg:scale-105 lg:-my-4"
                    : "bg-white border-2 border-slate-200"
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className={cn(
                    "text-sm",
                    plan.highlight ? "text-slate-400" : "text-slate-600"
                  )}>
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-sm">R$</span>
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className={plan.highlight ? "text-slate-400" : "text-slate-500"}>
                    {plan.period}
                  </span>
                </div>

                <Link to={plan.cta === 'Falar com vendas' ? '#' : '/cadastro'}>
                  <Button
                    variant={plan.highlight ? 'primary' : 'outline'}
                    className="w-full mb-8"
                    size="lg"
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className={cn(
                        "flex items-center justify-between text-sm",
                        !feature.included && (plan.highlight ? "text-slate-500" : "text-slate-400")
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {feature.included ? (
                          <CheckCircle2 className={cn(
                            "w-4 h-4",
                            plan.highlight ? "text-blue-400" : "text-green-500"
                          )} />
                        ) : (
                          <X className="w-4 h-4 text-slate-400" />
                        )}
                        {feature.name}
                      </span>
                      {feature.value && (
                        <span className={cn(
                          "font-medium",
                          plan.highlight ? "text-slate-300" : "text-slate-700"
                        )}>
                          {feature.value}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Garantia */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-green-50 text-green-700 px-6 py-3 rounded-full">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">
                14 dias grátis, sem cartão de crédito. Cancele quando quiser.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Comparação detalhada */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">
            Comparação detalhada
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-slate-200">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-4 font-semibold text-slate-900">Funcionalidade</th>
                  <th className="text-center p-4 font-semibold text-slate-900">Básico</th>
                  <th className="text-center p-4 font-semibold text-slate-900 bg-blue-50">Pro</th>
                  <th className="text-center p-4 font-semibold text-slate-900">Avançado</th>
                </tr>
              </thead>
              <tbody>
                {plans[0].features.map((feature, index) => (
                  <tr key={index} className="border-b border-slate-100 last:border-0">
                    <td className="p-4 text-slate-700">{feature.name}</td>
                    {plans.map((plan) => (
                      <td
                        key={plan.id}
                        className={cn(
                          "p-4 text-center",
                          plan.id === 'pro' && "bg-blue-50"
                        )}
                      >
                        {plan.features[index].included ? (
                          plan.features[index].value ? (
                            <span className="font-medium text-slate-900">
                              {plan.features[index].value}
                            </span>
                          ) : (
                            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                          )
                        ) : (
                          <X className="w-5 h-5 text-slate-300 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">
            Perguntas frequentes
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-xl p-6 border border-slate-100"
              >
                <h3 className="font-semibold text-slate-900 mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-slate-600 pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ainda tem dúvidas?
          </h2>
          <p className="text-slate-400 mb-8">
            Fale com nossa equipe. Sem compromisso, sem pressão.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cadastro">
              <Button size="lg">
                Testar grátis agora
              </Button>
            </Link>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-800">
                <MessageSquare className="w-4 h-4 mr-2" />
                Falar no WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
