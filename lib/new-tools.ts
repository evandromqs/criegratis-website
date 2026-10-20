import type { ToolInfo } from "./tools";

type Draft = Omit<ToolInfo, "href" | "badge">;
const drafts: Draft[] = [
  {
    slug: "criar-papel-timbrado", name: "Criar Papel Timbrado com Logo", category: "imagens", icon: "FileText",
    shortDescription: "Crie uma folha A4 com logotipo e dados de contato.", fullDescription: "Monte um papel timbrado em PDF a partir do seu logotipo, nome e informações de contato, com prévia antes de baixar.",
    keywords: ["criar papel timbrado", "papel timbrado com logo", "folha timbrada pdf"], metaTitle: "Criar Papel Timbrado com Logo Online Grátis", metaDescription: "Crie papel timbrado A4 com logotipo, nome e contato. Veja a prévia e baixe o PDF sem cadastro.", h1: "Criar Papel Timbrado com Logo",
    usageSteps: ["Envie o logotipo e preencha o nome e contato.", "Confira a prévia da página A4.", "Baixe o papel timbrado em PDF."], features: ["Prévia A4", "Logotipo opcional", "Rodapé de contato", "PDF gerado no navegador"],
    faqs: [{ question: "Preciso ter um PDF pronto?", answer: "Não. Esta ferramenta cria uma folha nova. Se você já tem um documento, use a ferramenta de aplicar folha timbrada em PDF." }],
  },
  {
    slug: "numerar-paginas-pdf", name: "Numerar Páginas de PDF", category: "texto", icon: "FileText",
    shortDescription: "Adicione números no rodapé de todas as páginas.", fullDescription: "Numere páginas de um PDF com posição e número inicial configuráveis, preservando o conteúdo original.",
    keywords: ["numerar paginas pdf", "numero de pagina pdf", "adicionar numeros pdf"], metaTitle: "Numerar Páginas de PDF Online Grátis", metaDescription: "Adicione números de página ao PDF com posição e início personalizados. Faça tudo no navegador.", h1: "Numerar Páginas de PDF",
    usageSteps: ["Escolha o PDF.", "Defina a posição e o número inicial.", "Gere e baixe o documento numerado."], features: ["Três posições no rodapé", "Número inicial ajustável", "Mantém as páginas originais", "Sem upload"],
    faqs: [{ question: "Posso começar a numeração em outro número?", answer: "Sim. Informe o número que deve aparecer na primeira página." }],
  },
  {
    slug: "marca-dagua-pdf", name: "Adicionar Marca d'Água em PDF", category: "texto", icon: "FileText",
    shortDescription: "Inclua texto semitransparente em todas as páginas.", fullDescription: "Coloque uma marca d'água textual em um PDF com tamanho, cor e transparência ajustáveis.",
    keywords: ["marca d agua pdf", "colocar marca d agua pdf", "pdf confidencial"], metaTitle: "Colocar Marca d'Água em PDF Online", metaDescription: "Adicione texto como RASCUNHO ou CONFIDENCIAL a todas as páginas de um PDF, direto no navegador.", h1: "Adicionar Marca d'Água em PDF",
    usageSteps: ["Selecione o PDF.", "Digite o texto e ajuste a aparência.", "Baixe a cópia com marca d'água."], features: ["Texto personalizado", "Cor e opacidade", "Todas as páginas", "Processamento local"],
    faqs: [{ question: "A marca d'água impede cópia?", answer: "Não. É uma identificação visual e não substitui proteção por senha ou controles de acesso." }],
  },
  {
    slug: "pdf-para-jpg", name: "Converter PDF para JPG ou PNG", category: "imagens", icon: "FileImage",
    shortDescription: "Salve páginas de PDF como imagens JPG ou PNG.", fullDescription: "Renderize páginas de um PDF como imagens, com escolha de formato e qualidade, para usar em apresentações ou compartilhamentos.",
    keywords: ["pdf para jpg", "pdf para png", "converter pdf em imagem", "salvar pagina pdf jpg"], metaTitle: "Converter PDF para JPG ou PNG Online Grátis", metaDescription: "Converta páginas de PDF em imagens JPG ou PNG no navegador. Escolha a página e baixe sem cadastro.", h1: "Converter PDF para JPG ou PNG",
    usageSteps: ["Carregue o PDF.", "Escolha página e formato.", "Converta e baixe a imagem."], features: ["JPG e PNG", "Página selecionável", "Qualidade ajustável", "Sem enviar o arquivo"],
    faqs: [{ question: "A imagem mantém texto selecionável?", answer: "Não. A página é transformada em pixels. Para manter texto editável, use o PDF original." }],
  },
  {
    slug: "adicionar-texto-pdf", name: "Adicionar Texto em PDF", category: "texto", icon: "Type",
    shortDescription: "Escreva sobre uma página de PDF sem campos de formulário.", fullDescription: "Insira uma anotação de texto em uma página de PDF, posicionando por medidas simples e conferindo o resultado.",
    keywords: ["adicionar texto pdf", "escrever em pdf", "preencher pdf sem formulario"], metaTitle: "Adicionar Texto em PDF Online Grátis", metaDescription: "Escreva sobre uma página de PDF sem campos preenchíveis. Ajuste posição e tamanho e baixe o arquivo.", h1: "Adicionar Texto em PDF",
    usageSteps: ["Selecione o PDF e a página.", "Escreva o texto e ajuste a posição.", "Baixe o PDF com a anotação."], features: ["Texto sobre PDF comum", "Tamanho e posição ajustáveis", "Página selecionável", "Sem upload"],
    faqs: [{ question: "Isso altera o texto original?", answer: "Não. A ferramenta acrescenta texto sobre a página; não substitui trechos existentes." }],
  },
  {
    slug: "ajustar-pdf-a4", name: "Ajustar PDF para A4", category: "texto", icon: "Scaling",
    shortDescription: "Centralize páginas de outro tamanho em folhas A4.", fullDescription: "Redimensione páginas de um PDF proporcionalmente para caber em folhas A4, com margens configuráveis.",
    keywords: ["pdf para a4", "ajustar pdf a4", "redimensionar pagina pdf"], metaTitle: "Ajustar Páginas de PDF para A4 Online", metaDescription: "Coloque páginas de PDF em formato A4 com escala proporcional e margens, sem distorcer o conteúdo.", h1: "Ajustar PDF para A4",
    usageSteps: ["Selecione o PDF.", "Escolha a margem.", "Gere páginas A4 e baixe."], features: ["Escala proporcional", "Margens ajustáveis", "Conteúdo centralizado", "Sem upload"],
    faqs: [{ question: "O conteúdo fica distorcido?", answer: "Não. A página mantém suas proporções, podendo deixar espaços em branco nas bordas." }],
  },
  {
    slug: "foto-3x4-folha-a4", name: "Foto 3x4 para Imprimir em A4", category: "imagens", icon: "Image",
    shortDescription: "Monte uma folha A4 com várias fotos 3x4.", fullDescription: "Recorte uma foto na proporção 3x4 e monte uma folha A4 com cópias no tamanho físico correto para impressão.",
    keywords: ["foto 3x4 a4", "imprimir foto 3x4 em folha a4", "varias fotos 3x4 a4"], metaTitle: "Foto 3x4 em Folha A4 para Imprimir", metaDescription: "Monte uma folha A4 com várias fotos 3x4 cm. Ajuste o enquadramento e baixe em PDF.", h1: "Foto 3x4 para Imprimir em A4",
    usageSteps: ["Escolha uma foto.", "Ajuste o enquadramento em 3x4.", "Baixe o PDF A4 e imprima em escala 100%."], features: ["Folha A4", "Várias cópias 3x4", "Prévia do corte", "PDF pronto para imprimir"],
    faqs: [{ question: "Como manter 3x4 cm na impressão?", answer: "Imprima em tamanho real ou escala 100%, sem a opção ajustar à página." }],
  },
  {
    slug: "foto-3x4-para-inscricao", name: "Preparar Foto 3x4 para Inscrição", category: "imagens", icon: "Image",
    shortDescription: "Exporte foto 3x4 digital dentro do limite em KB.", fullDescription: "Recorte uma foto em proporção 3x4 e ajuste a qualidade JPG para cumprir o limite de tamanho do formulário.",
    keywords: ["foto 3x4 200kb", "foto 3x4 inscricao", "reduzir foto 3x4 kb"], metaTitle: "Foto 3x4 Digital para Inscrição em KB", metaDescription: "Prepare uma foto 3x4 digital em JPG e ajuste o arquivo ao limite em KB do seu formulário.", h1: "Preparar Foto 3x4 para Inscrição",
    usageSteps: ["Selecione a foto e informe o limite em KB.", "Confira o corte e o tamanho final.", "Baixe o JPG para enviar."], features: ["Corte 3x4", "Limite em KB", "Prévia", "Processamento local"],
    faqs: [{ question: "A ferramenta garante aceitação da foto?", answer: "Não. Confira também fundo, iluminação, enquadramento e regras específicas do órgão ou formulário." }],
  },
  {
    slug: "criar-assinatura-png", name: "Criar Assinatura em PNG Transparente", category: "imagens", icon: "PenTool",
    shortDescription: "Desenhe com mouse ou dedo e baixe PNG transparente.", fullDescription: "Crie uma imagem de assinatura manuscrita com fundo transparente para inserir em documentos e apresentações.",
    keywords: ["assinatura png transparente", "criar assinatura online", "desenhar assinatura png"], metaTitle: "Criar Assinatura PNG Transparente Online", metaDescription: "Desenhe sua assinatura com mouse ou dedo e baixe PNG de fundo transparente, grátis no navegador.", h1: "Criar Assinatura PNG Transparente",
    usageSteps: ["Desenhe no quadro com mouse ou dedo.", "Apague e refaça se necessário.", "Baixe a imagem PNG transparente."], features: ["Mouse e toque", "Fundo transparente", "Cor ajustável", "Download PNG"],
    faqs: [{ question: "É uma assinatura digital certificada?", answer: "Não. É uma imagem de assinatura manuscrita e não oferece certificado digital nem validação de identidade." }],
  },
  {
    slug: "documento-frente-verso-pdf", name: "Documento Frente e Verso na Mesma Folha", category: "imagens", icon: "Files",
    shortDescription: "Reúna fotos da frente e do verso em um PDF A4.", fullDescription: "Combine duas imagens de um documento em uma única folha A4, lado a lado ou empilhadas, para envio ou impressão.",
    keywords: ["rg frente e verso pdf", "documento frente verso mesma folha", "frente e verso pdf a4"], metaTitle: "RG Frente e Verso na Mesma Folha PDF", metaDescription: "Reúna imagens da frente e do verso de um documento em uma página A4 e baixe o PDF no navegador.", h1: "Documento Frente e Verso em PDF",
    usageSteps: ["Envie uma imagem da frente e outra do verso.", "Escolha a disposição e confira a prévia.", "Baixe o PDF A4."], features: ["Uma folha A4", "Duas imagens", "Prévia antes de baixar", "Arquivos ficam no dispositivo"],
    faqs: [{ question: "O PDF substitui uma cópia autenticada?", answer: "Não. Verifique o formato e os requisitos pedidos por quem receberá o documento." }],
  },
];

export const NEW_TOOLS: ToolInfo[] = drafts.map((draft) => ({ ...draft, href: `/${draft.slug}`, badge: "Novo" }));
