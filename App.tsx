
import React, { useState, useCallback, useMemo } from 'react';
import { auditSalesLog } from './services/geminiService.ts';
import { AuditStatus } from './types.ts';
import { 
  ClipboardCheck, 
  AlertCircle, 
  Clock, 
  TrendingUp, 
  Activity, 
  Search,
  MessageSquare,
  RefreshCw,
  UserCheck,
  ChevronRight,
  ShieldAlert,
  Calendar,
  Target
} from 'lucide-react';

export default function App() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<AuditStatus>(AuditStatus.IDLE);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleAudit = useCallback(async () => {
    if (!input.trim()) return;
    
    setStatus(AuditStatus.LOADING);
    setError(null);
    setResult('');
    
    try {
      console.debug("Iniciando auditoria com a Mentora Dani Martins...");
      const response = await auditSalesLog(input);
      setResult(response);
      setStatus(AuditStatus.SUCCESS);
    } catch (err: any) {
      console.error("Erro capturado no App:", err);
      setError(err.message || "Falha na conexão com a Mentora Dani Martins. Verifique o log de vendas e as configurações de ambiente.");
      setStatus(AuditStatus.ERROR);
    }
  }, [input]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased">
      {/* Top Banner / Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img 
              src="https://imgur.com/hURknEb.png" 
              alt="SK-G Automação" 
              className="h-9 object-contain"
            />
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800 tracking-tight leading-none mb-1">SALES OPS AUDITOR</span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none">Mentora Dani Martins</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
              <Calendar size={14} className="text-blue-600" />
              <span className="text-[11px] font-bold text-blue-700">BASE: 19/02/2026</span>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
              <Activity size={14} className="text-slate-500" />
              <span className="text-[11px] font-bold text-slate-600">SLA AUDIT: &lt; 3 DIAS</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-[1600px] mx-auto w-full p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Section: Input & Guidance (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[550px] overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-900 rounded-lg text-white">
                  <Search size={18} />
                </div>
                <h2 className="font-bold text-slate-800 text-sm">Histórico de Vendas</h2>
              </div>
              <button 
                onClick={() => setInput('')}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                title="Limpar conversa"
              >
                <RefreshCw size={16} />
              </button>
            </div>
            
            <div className="flex-1 p-6 relative bg-slate-50/20">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Cole aqui o texto do WhatsApp, e-mail ou transcrição de prints..."
                className="w-full h-full resize-none border-none focus:ring-0 text-slate-700 font-mono text-sm placeholder:text-slate-300 bg-transparent leading-relaxed"
              />
            </div>

            <div className="p-6 bg-white border-t border-slate-100">
              <button
                onClick={handleAudit}
                disabled={status === AuditStatus.LOADING || !input.trim()}
                className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2.5 font-bold transition-all ${
                  status === AuditStatus.LOADING 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200 active:scale-[0.98]'
                }`}
              >
                {status === AuditStatus.LOADING ? (
                  <RefreshCw className="animate-spin" size={18} />
                ) : (
                  <ClipboardCheck size={18} />
                )}
                <span>{status === AuditStatus.LOADING ? 'AUDITANDO...' : 'AUDITAR AGORA'}</span>
              </button>
            </div>
          </div>

          {/* Quick Stats/Alerts Box */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <ShieldAlert size={18} className="text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Guardião da Margem</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                "Não aceite o 'vou ver e te retorno' sem um compromisso. Inércia mata o fechamento."
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  SÉRIES 60/62: SEMPRE MIGRAR
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  SÉRIE 40 &lt; 160mm: SEMPRE MIGRAR
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Right Section: Auditor Output (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[700px] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <UserCheck size={18} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800 text-sm">Parecer Mentora Dani Martins</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Audit Result</p>
                </div>
              </div>
              {status === AuditStatus.SUCCESS && (
                 <div className="flex items-center gap-1 text-emerald-600 font-bold text-[11px] bg-emerald-50 px-2 py-1 rounded">
                   <Target size={12} />
                   <span>FOCO EM RESULTADO</span>
                 </div>
              )}
            </div>

            <div className="flex-1 p-8 overflow-y-auto bg-white">
              {status === AuditStatus.IDLE && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                    <MessageSquare size={40} />
                  </div>
                  <div className="max-w-xs">
                    <h3 className="text-slate-900 font-bold mb-2">Aguardando Histórico</h3>
                    <p className="text-sm text-slate-500 leading-relaxed italic">
                      "A inércia é a principal causa da perda de pipeline no B2B de automação. Cole a conversa ao lado para identificar o gargalo."
                    </p>
                  </div>
                </div>
              )}

              {status === AuditStatus.ERROR && (
                <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-start gap-4 text-red-700 animate-in zoom-in duration-300">
                  <AlertCircle className="shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold mb-1 uppercase tracking-tight">Falha Técnica Detectada</h4>
                    <p className="text-sm leading-relaxed mb-4">{error}</p>
                    <div className="p-3 bg-red-100/50 rounded-lg text-[11px] font-mono">
                      Dica: Verifique se a variável "API_KEY" foi adicionada corretamente no painel do Vercel (Settings > Environment Variables) e se um novo deploy foi realizado.
                    </div>
                  </div>
                </div>
              )}

              {status === AuditStatus.SUCCESS && result && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <AuditRenderer text={result} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 bg-white border-t border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <span>© 2026 SK-G AUTOMAÇÃO - SALES OPS</span>
          <div className="flex items-center gap-6">
            <span className="hover:text-blue-500 transition-colors">AUDITORIA DE PERFORMANCE</span>
            <span className="hover:text-blue-500 transition-colors">MÉTODO DANI MARTINS</span>
            <span className="hover:text-blue-500 transition-colors">SPIN SELLING</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const AuditRenderer: React.FC<{ text: string }> = ({ text }) => {
  const sections = useMemo(() => {
    // Split by our mandatory emoji markers
    const parts = text.split(/(?=📅|🧠|🚀|📝)/g);
    return parts.filter(p => p.trim().length > 0);
  }, [text]);

  return (
    <div className="space-y-10 pb-10">
      {sections.map((section, idx) => {
        const lines = section.split('\n');
        const titleLine = lines[0].trim();
        const content = lines.slice(1).join('\n').trim();
        
        const isTimeline = section.includes('📅');
        const isFeedback = section.includes('🧠');
        const isStrategy = section.includes('🚀');
        const isStatus = section.includes('📝');

        let themeClass = "border-slate-100 bg-white";
        let icon = <ChevronRight size={16} />;
        let headerColor = "text-slate-900";

        if (isTimeline) { 
          themeClass = "border-blue-100 bg-blue-50/20"; 
          icon = <Clock className="text-blue-500" size={18} />;
        }
        if (isFeedback) { 
          themeClass = "border-amber-100 bg-amber-50/20"; 
          icon = <Activity className="text-amber-500" size={18} />;
        }
        if (isStrategy) { 
          themeClass = "border-emerald-100 bg-emerald-50/20"; 
          icon = <Target className="text-emerald-500" size={18} />;
        }
        if (isStatus) { 
          themeClass = "border-slate-900 bg-slate-900 text-white shadow-xl"; 
          icon = <Calendar className="text-blue-400" size={18} />;
          headerColor = "text-white";
        }

        return (
          <div key={idx} className={`relative rounded-3xl border p-8 ${themeClass} transition-all`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-white shadow-sm rounded-xl">
                {icon}
              </div>
              <h3 className={`text-base font-black uppercase tracking-tight ${headerColor}`}>{titleLine}</h3>
            </div>
            <div className="space-y-4">
              {content.split('\n').map((line, i) => {
                const trimmedLine = line.trim();
                if (!trimmedLine) return null;

                // Handle Alerts specifically
                if (trimmedLine.includes('🚨') || trimmedLine.includes('ALERTA') || trimmedLine.includes('SUBSTITUIÇÃO')) {
                  return (
                    <div key={i} className="my-6 p-5 bg-red-600 rounded-2xl text-white font-bold text-sm shadow-lg flex items-start gap-4 ring-4 ring-red-100">
                      <ShieldAlert className="shrink-0" size={20} />
                      <span className="leading-tight uppercase tracking-tight">{trimmedLine.replace(/🚨|ALERTA DE DESCONTINUIDADE:|SUBSTITUIÇÃO TÉCNICA:/g, '').trim()}</span>
                    </div>
                  );
                }

                // Standard Bullet points
                if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || /^\d+\./.test(trimmedLine)) {
                  return (
                    <div key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span className="text-blue-500 font-bold shrink-0">•</span>
                      <span className={isStatus ? "text-slate-300" : "text-slate-600 font-medium"}>{trimmedLine.replace(/^[•\-\d.]\s*/, '')}</span>
                    </div>
                  );
                }

                // Paragraphs
                return (
                  <p key={i} className={`text-sm leading-relaxed ${isStatus ? "text-slate-400" : "text-slate-600 font-medium"}`}>
                    {trimmedLine}
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
