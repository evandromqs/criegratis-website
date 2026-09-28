import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Lock,
  Zap,
  Globe,
  Share2,
} from "lucide-react";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Lançamento: 20 Novas Ferramentas de PDF e Imagem 100% Client-Side | CrieGrátis",
  description: "Conheça as 20 novas ferramentas gratuitas de PDF e edição de imagens lançadas no CrieGrátis: assinar PDF, foto 3x4, censura de dados, mockups, OCR e muito mais.",
  alternates: {
    canonical: `${SITE_URL}/novidades/novas-ferramentas-pdf-e-imagem`,
  },
  openGraph: {
    title: "Lançamento: 20 Novas Ferramentas de PDF e Imagem no CrieGrátis",
    description: "Assine PDF, gere foto 3x4, oculte dados confidenciais com tarja preta, crie mockups e organize PDFs sem enviar nenhum arquivo para a internet.",
    url: `${SITE_URL}/novidades/novas-ferramentas-pdf-e-imagem`,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "article",
  },
};

const PDF_TOOLS = [
  {
    name: "Organizar Páginas do PDF",
    href: "/organizar-pdf",
    desc: "Reordene a sequência de páginas visualmente, gire folhas em 90° e exclua páginas indesejadas com poucos cliques.",
    badge: "Essencial",
  },
  {
    name: "Assinar PDF Online",
    href: "/assinar-pdf",
    desc: "Desenhe sua assinatura ou rubrica com caneta touch ou mouse e carimbe qualquer página de contratos e termos.",
    badge: "Mais Pedido",
  },
  {
    name: "Preencher Formulário PDF",
    href: "/preencher-formulario-pdf",
    desc: "Preencha formulários AcroForm e aplique a função 'flatten' para proteger o arquivo contra modificações posteriores.",
    badge: "Jurídico",
  },
  {
    name: "Censurar e Redigir PDF",
    href: "/censurar-pdf",
    desc: "Aplique tarjas pretas sobre CPFs, dados bancários e nomes em conformidade estrita com a LGPD e privacidade.",
    badge: "Segurança",
  },
  {
    name: "Extrator de Texto e OCR de PDF",
    href: "/ocr-pdf",
    desc: "Extraia todos os fluxos de texto de documentos e apostilas e baixe um arquivo .TXT limpo e pronto para edição.",
    badge: "Produtividade",
  },
  {
    name: "Comparar PDFs Lado a Lado",
    href: "/comparar-pdf",
    desc: "Inspecione diferenças estruturais entre duas versões de minutas e relatórios (páginas, peso, títulos e metadados).",
    badge: "Auditoria",
  },
  {
    name: "Converter PDF para Preto e Branco",
    href: "/pdf-preto-e-branco",
    desc: "Converta documentos para escala de cinza e alto contraste para economizar tinta de impressora e peticionar em tribunais.",
    badge: "Economia",
  },
  {
    name: "Cortar Margens de PDF",
    href: "/cortar-pdf",
    desc: "Elimine margens brancas gigantes de apostilas e e-books para leitura maximizada em celulares, tablets e Kindles.",
    badge: "Leitura",
  },
  {
    name: "Folha Timbrada / Sobrepor PDF",
    href: "/folha-timbrada-pdf",
    desc: "Aplique cabeçalho, rodapé e logomarca institucional de folha timbrada sobre todas as páginas de propostas e relatórios.",
    badge: "Empresarial",
  },
  {
    name: "Visualizador e Limpador de Metadados PDF",
    href: "/metadados-pdf",
    desc: "Inspecione autores, softwares e datas gravadas no arquivo e limpe todos os rastros digitais antes do envio público.",
    badge: "Privacidade",
  },
];

const IMAGE_TOOLS = [
  {
    name: "Criador de Foto 3x4 para Documentos",
    href: "/foto-3x4",
    desc: "Guia biométrica para enquadrar selfies e exportar folha 10x15cm pronta para impressão econômica com 6 fotos 3x4 (RG/CNH).",
    badge: "Destaque",
  },
  {
    name: "Inverter Cores de Imagem (Negativo)",
    href: "/inverter-cores-imagem",
    desc: "Revele negativos analógicos e inverta esquemas técnicos de fundo escuro para impressão com fundo branco limpo.",
    badge: "Útil",
  },
  {
    name: "Ajuste de Brilho, Contraste e Nitidez",
    href: "/ajustar-foto",
    desc: "Editor fotográfico leve a 60 FPS com controles de exposição, saturação e máscara de nitidez (Unsharp Mask).",
    badge: "Fotografia",
  },
  {
    name: "Gerador de Mockup de Dispositivos",
    href: "/mockup-dispositivos",
    desc: "Emoldure prints de tela em smartphones elegantes ou janelas de navegadores modernos com sombras suaves e gradientes.",
    badge: "Design",
  },
  {
    name: "Criador de Colagem de Fotos",
    href: "/colagem-de-fotos",
    desc: "Junte de 2 a 4 fotos em modelos lado a lado, verticais ou grade 2x2 com cantos arredondados e molduras.",
    badge: "Criativo",
  },
  {
    name: "Extrator de Paleta de Cores de Imagem",
    href: "/paleta-de-cores-imagem",
    desc: "Identifique as cores predominantes de imagens e logotipos com amostras, códigos HEX/RGB e variáveis CSS prontas.",
    badge: "Para Devs",
  },
  {
    name: "Remover Dados EXIF e Localização de Fotos",
    href: "/remover-exif",
    desc: "Apague coordenadas de GPS de sua residência, modelo do celular e data antes de postar fotos em classificados.",
    badge: "Anti-Rastreio",
  },
  {
    name: "Conversor de Imagem para Pixel Art",
    href: "/pixel-art",
    desc: "Transforme qualquer foto em ilustração retrô estilo videogame arcade 8-bit com controle do tamanho dos blocos.",
    badge: "Retrô",
  },
  {
    name: "Divisor de Grid e Carrossel para Instagram",
    href: "/grade-instagram",
    desc: "Fatie fotos panorâmicas em 3 partes para carrossel contínuo ou 9 quadrados para grade 3x3 no feed do Instagram.",
    badge: "Redes Sociais",
  },
  {
    name: "Gerador de Efeito Tilt-Shift (Miniatura)",
    href: "/efeito-tilt-shift",
    desc: "Simule lentes ópticas tilt-shift com foco seletivo horizontal, transformando cidades e fotos aéreas em maquetes.",
    badge: "Efeito Visual",
  },
];

export default function ReleasePostPage() {
  return (
    <article className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Header do Post */}
        <header className="space-y-4 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-xs font-bold text-blue-600 dark:text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            Grande Atualização da Fase 4 • CrieGrátis v1.3
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Lançamento: 20 Novas Ferramentas de PDF e Imagem 100% Client-Side
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            O CrieGrátis atinge a marca histórica de <strong>70 ferramentas gratuitas ativas</strong>. Agora você pode assinar contratos, enquadrar fotos 3x4 com guias biométricas, ocultar dados confidenciais com tarjas pretas e criar mockups profissionais — tudo direto no seu navegador com privacidade absoluta.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pt-2">
            <span>📅 Atualização Oficial</span>
            <span>•</span>
            <span>⚡ 100% Gratuito & Sem Cadastro</span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Zero Upload de Arquivos
            </span>
          </div>
        </header>

        {/* Manifesto de Privacidade Client-Side */}
        <div className="p-6 rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/30 space-y-3">
          <h2 className="text-base font-bold text-blue-950 dark:text-blue-200 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Por que a arquitetura Client-Side faz toda a diferença?
          </h2>
          <p className="text-xs sm:text-sm text-blue-900/80 dark:text-blue-300/80 leading-relaxed">
            Diferente de portais tradicionais que exigem enviar seus contratos, fotos e dados pessoais para servidores remotos na nuvem, todas as 20 ferramentas operam exclusivamente na memória RAM do seu navegador via <strong>HTML5 Canvas, WebAssembly e Web Workers</strong>. Seus arquivos nunca deixam seu celular ou computador.
          </p>
        </div>

        {/* Seção 1: 10 Ferramentas de PDF */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                10 Novas Ferramentas para PDF
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Manipulação documental completa, rápida e segura
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PDF_TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-blue-500 hover:-translate-y-0.5 transition-all flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {t.name}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {t.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {t.desc}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 gap-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Acessar ferramenta</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Seção 2: 10 Ferramentas de Imagens */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                10 Novas Ferramentas para Imagens
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Edição, criatividade, privacidade e mídias sociais
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {IMAGE_TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-blue-500 hover:-translate-y-0.5 transition-all flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {t.name}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {t.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {t.desc}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 gap-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Acessar ferramenta</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Rodapé do Post */}
        <footer className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-4">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Explore o ecossistema CrieGrátis
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Todas as ferramentas são 100% gratuitas, não exigem login e funcionam no computador, tablet e celular.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/ferramentas"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all"
            >
              Ver Catálogo Completo (70 Ferramentas)
            </Link>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all"
            >
              Acompanhar o Roadmap (Rumo a 100)
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
