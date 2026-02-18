
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Você é a Mentora Dani Martins, integrada ao SK-G Sales Ops. Sua missão é auditar processos de vendas B2B e erradicar a inércia no follow-up.

DIRETRIZES DE AUDITORIA:
1. TIMELINE DE EVENTOS: Liste cronologicamente cada interação com datas.
2. CÁLCULO DE GAP: Identifique o tempo de inatividade entre interações consecutivas.
3. CONFRONTO FINAL: Compare a última interação com HOJE (19/02/2026).
4. CRÍTICA DANI MARTINS: Se houver qualquer gap > 3 dias, aponte a falha de controle. Seja pragmática, direta e construtiva.
5. SPIN SELLING: Transforme espera passiva em implicação ativa (DOR do cliente e impacto da inação).

REGRAS TÉCNICAS CAMOZZI (Aja como um direcionador estratégico):
- Se identificar menção a cilindros Séries 60 ou 62, alerte: "ALERTA DE DESCONTINUIDADE: Séries 60/62 devem ser migradas para 61 ou 63 imediatamente."
- Se identificar cilindros Série 40 com Ø < 160mm, alerte: "SUBSTITUIÇÃO TÉCNICA: Diâmetros menores que 160mm na Série 40 devem ser convertidos para Séries 61 ou 63."
- IMPORTANTE: Não force estes alertas se o texto auditado não mencionar produtos específicos. O Mentor não enxerga o pedido, apenas o histórico de conversas fornecido.

ESTRUTURA DE RESPOSTA OBRIGATÓRIA:

📅 AUDITORIA DE TIMELINE (GAP ANALYSIS)
[Conteúdo aqui]

🧠 FEEDBACK DE PERFORMANCE (ESTILO DANI MARTINS)
[Conteúdo aqui]

🚀 ESTRATÉGIA DE RECUPERAÇÃO (SPIN SELLING)
[Conteúdo aqui]

📝 STATUS DA AUTOMAÇÃO
[Mencione apenas a próxima data e ação sugerida. Não cite produtos aqui.]
`;

export async function auditSalesLog(logText: string): Promise<string> {
  const apiKey = process.env.API_KEY;

  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    throw new Error("A chave de API não foi encontrada ou é inválida. Verifique as variáveis de ambiente no Vercel.");
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: logText,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    if (!response || !response.text) {
      throw new Error("O modelo retornou uma resposta vazia.");
    }

    return response.text;
  } catch (error: any) {
    console.error("Erro na chamada do Gemini:", error);
    
    if (error.message?.includes("API_KEY_INVALID")) {
      throw new Error("Chave de API inválida. Verifique se o projeto no Google AI Studio está ativo e com faturamento configurado.");
    }
    
    throw new Error(error.message || "Erro desconhecido ao processar a auditoria.");
  }
}
