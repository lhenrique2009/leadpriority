import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Prioriza.AI</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm mb-6">
              IA de decisão de vendas que mostra quem atender primeiro e onde você está perdendo dinheiro.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:contato@prioriza.ai" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                contato@prioriza.ai
              </a>
              <a href="tel:+5511999999999" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                (11) 99999-9999
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                São Paulo, SP
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Produto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/como-funciona" className="hover:text-white transition-colors">
                  Como funciona
                </Link>
              </li>
              <li>
                <Link to="/planos" className="hover:text-white transition-colors">
                  Planos e preços
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Integrações
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Casos de uso
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sobre nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Termos de uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Prioriza.AI. Todos os direitos reservados.
          </p>
          <p className="text-sm text-slate-500">
            CNPJ: 00.000.000/0001-00
          </p>
        </div>
      </div>
    </footer>
  );
}
