"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  Search,
  Filter,
  Layers,
  Image as ImageIcon,
  FileText,
  Calculator,
  Code,
  QrCode,
  FileSpreadsheet,
  Share2,
  Lock,
  Flame,
} from "lucide-react";

export interface RoadmapToolItem {
  id: number;
  name: string;
  category: "imagens" | "pdf" | "texto" | "desenvolvedor" | "calculadoras" | "social" | "seguranca" | "qr-code";
  categoryLabel: string;
  status: "available" | "in_progress" | "planned";
  phase: "Fase 1 (MVP)" | "Fase 2 (v1.1)" | "Fase 3 (v1.2)" | "Fase 4 (v1.3)" | "Fase 5 (v1.4)" | "Fase 6 (v2.0)";
  description: string;
  href?: string;
  badge?: string;
}

export const ROADMAP_ITEMS: RoadmapToolItem[] = [
  // --- FASE 1: DISPONÍVEIS AGORA (1 a 10) ---
  {
    id: 1,
    name: "Gerador de QR Code",
    category: "qr-code",
    categoryLabel: "QR Code & Links",
    status: "available",
    phase: "Fase 1 (MVP)",
    description: "Criação instantânea de QR Codes para links e textos em alta resolução PNG.",
    href: "/criar-qr-code",
  },
  {
    id: 2,
    name: "Gerador de Senha Forte",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "available",
    phase: "Fase 1 (MVP)",
    description: "Senhas aleatórias seguras com medidor de força e caracteres customizáveis.",
    href: "/gerar-senha",
  },
  {
    id: 3,
    name: "Contador de Palavras",
    category: "texto",
    categoryLabel: "Texto",
    status: "available",
    phase: "Fase 1 (MVP)",
    description: "Contagem em tempo real de palavras, caracteres, linhas e tempo de leitura.",
    href: "/contador-de-palavras",
  },
  {
    id: 4,
    name: "Contador de Caracteres",
    category: "texto",
    categoryLabel: "Texto",
    status: "available",
    phase: "Fase 1 (MVP)",
    description: "Verificador de limite para redes sociais (Twitter/X, Instagram, LinkedIn).",
    href: "/contador-de-caracteres",
  },
  {
    id: 5,
    name: "Calculadora de Porcentagem",
    category: "calculadoras",
    categoryLabel: "Calculadoras",
    status: "available",
    phase: "Fase 1 (MVP)",
    description: "4 modos práticos de cálculo percentual: valor, proporção, acréscimo e desconto.",
    href: "/calculadora-de-porcentagem",
  },
  {
    id: 6,
    name: "Redimensionar Imagem",
    category: "imagens",
    categoryLabel: "Imagens",
    status: "available",
    phase: "Fase 1 (MVP)",
    description: "Ajuste de largura e altura em pixels mantendo a proporção no Canvas HTML5.",
    href: "/redimensionar-imagem",
  },
  {
    id: 7,
    name: "Comprimir Imagem",
    category: "imagens",
    categoryLabel: "Imagens",
    status: "available",
    phase: "Fase 1 (MVP)",
    description: "Redução do peso em KB/MB de fotos JPG, PNG e WebP sem enviar arquivos ao servidor.",
    href: "/comprimir-imagem",
  },
  {
    id: 8,
    name: "Converter JPG para PNG",
    category: "imagens",
    categoryLabel: "Imagens",
    status: "available",
    phase: "Fase 1 (MVP)",
    description: "Conversão rápida e nítida de fotos JPEG para PNG no navegador.",
    href: "/jpg-para-png",
  },
  {
    id: 9,
    name: "Converter PNG para JPG",
    category: "imagens",
    categoryLabel: "Imagens",
    status: "available",
    phase: "Fase 1 (MVP)",
    description: "Conversão de PNG para JPG com preenchimento de fundo transparente.",
    href: "/png-para-jpg",
  },
  {
    id: 10,
    name: "Formatador e Validador JSON",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "available",
    phase: "Fase 1 (MVP)",
    description: "Indentação limpa, minificação e detecção de erros de sintaxe em código JSON.",
    href: "/formatar-json",
  },

  // --- FASE 2: LANÇADO & DISPONÍVEL (11 a 21) ---
  {
    id: 11,
    name: "Converter Imagem para PDF (JPG/PNG para PDF)",
    category: "pdf",
    categoryLabel: "PDFs & Docs",
    status: "available",
    phase: "Fase 2 (v1.1)",
    description: "Junta fotos e documentos escaneados em um único arquivo PDF organizado direto no navegador.",
    href: "/imagem-para-pdf",
    badge: "Novo",
  },
  {
    id: 12,
    name: "Gerador e Validador de CPF",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "available",
    phase: "Fase 2 (v1.1)",
    description: "Gera CPFs válidos com pontuação para testes e valida dígitos verificadores.",
    href: "/gerador-validador-cpf",
    badge: "Novo",
  },
  {
    id: 13,
    name: "Gerador de Link de WhatsApp",
    category: "social",
    categoryLabel: "Redes & Links",
    status: "available",
    phase: "Fase 2 (v1.1)",
    description: "Cria links diretos wa.me com número e mensagem pré-formatada pronta para envio.",
    href: "/gerador-link-whatsapp",
    badge: "Novo",
  },
  {
    id: 14,
    name: "Conversor Maiúsculas e Minúsculas",
    category: "texto",
    categoryLabel: "Texto",
    status: "available",
    phase: "Fase 2 (v1.1)",
    description: "Transforma textos em MAIÚSCULAS, minúsculas, Primeira Letra, camelCase e snake_case.",
    href: "/converter-maiusculas-minusculas",
    badge: "Novo",
  },
  {
    id: 15,
    name: "Juntar PDF (Merge PDF)",
    category: "pdf",
    categoryLabel: "PDFs & Docs",
    status: "available",
    phase: "Fase 2 (v1.1)",
    description: "Combina múltiplos arquivos PDF em um único documento arrastando e soltando.",
    href: "/juntar-pdf",
    badge: "Novo",
  },
  {
    id: 16,
    name: "Calculadora de Juros Compostos",
    category: "calculadoras",
    categoryLabel: "Calculadoras",
    status: "available",
    phase: "Fase 2 (v1.1)",
    description: "Simulação financeira de rendimentos e aportes mensais com gráfico interativo.",
    href: "/calculadora-juros-compostos",
    badge: "Novo",
  },
  {
    id: 17,
    name: "Converter WebP para PNG / JPG",
    category: "imagens",
    categoryLabel: "Imagens",
    status: "available",
    phase: "Fase 2 (v1.1)",
    description: "Transforma imagens WebP da web em JPG ou PNG tradicionais em 1 clique.",
    href: "/webp-para-png-jpg",
    badge: "Novo",
  },
  {
    id: 18,
    name: "Cortar Imagem (Crop Tool)",
    category: "imagens",
    categoryLabel: "Imagens",
    status: "available",
    phase: "Fase 2 (v1.1)",
    description: "Recorte retangular, quadrado (1:1) e formatos para Stories e redes sociais.",
    href: "/cortar-imagem",
    badge: "Novo",
  },
  {
    id: 19,
    name: "Calculadora de Regra de Três",
    category: "calculadoras",
    categoryLabel: "Calculadoras",
    status: "available",
    phase: "Fase 2 (v1.1)",
    description: "Cálculo instantâneo de proporções diretas e inversamente proporcionais.",
    href: "/calculadora-regra-de-tres",
    badge: "Novo",
  },
  {
    id: 20,
    name: "Gerador de UUID / GUID (v4)",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "available",
    phase: "Fase 2 (v1.1)",
    description: "Geração individual ou em lote de identificadores únicos universais criptografados.",
    href: "/gerar-uuid",
    badge: "Novo",
  },
  {
    id: 21,
    name: "Base64 Encoder / Decoder de Texto",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "available",
    phase: "Fase 2 (v1.1)",
    description: "Codifica e decodifica textos em formato Base64 instantaneamente no navegador.",
    href: "/base64-codificador-decodificador",
    badge: "Novo",
  },

  // --- FASE 3: IMAGENS & PDFS NO NAVEGADOR (22 a 40) ---
  {
    id: 22,
    name: "Gerador e Validador de CNPJ",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Gera números de CNPJ fictícios válidos para testes e valida documentos de empresas.",
  },
  {
    id: 23,
    name: "Dividir / Extrair Páginas de PDF",
    category: "pdf",
    categoryLabel: "PDFs & Docs",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Separa páginas individuais ou intervalos específicos de um PDF.",
  },
  {
    id: 24,
    name: "Compactador e Descompactador ZIP no Navegador",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Cria e extrai arquivos .zip com múltiplos documentos sem enviar nada à nuvem.",
  },
  {
    id: 25,
    name: "PDF para Imagens (JPG/PNG)",
    category: "pdf",
    categoryLabel: "PDFs & Docs",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Converte cada página de um arquivo PDF em imagem de alta qualidade para download.",
  },
  {
    id: 26,
    name: "Girar Páginas de PDF",
    category: "pdf",
    categoryLabel: "PDFs & Docs",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Rotaciona páginas de PDF em 90°, 180° ou 270° diretamente no navegador.",
  },
  {
    id: 26,
    name: "Remover Páginas de PDF",
    category: "pdf",
    categoryLabel: "PDFs & Docs",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Exclui páginas indesejadas de um arquivo PDF com facilidade.",
  },
  {
    id: 27,
    name: "Comprimir PDF no Navegador",
    category: "pdf",
    categoryLabel: "PDFs & Docs",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Reduz o tamanho em MB de documentos PDF sem enviar arquivos a servidores.",
  },
  {
    id: 28,
    name: "Inverter e Girar Imagem",
    category: "imagens",
    categoryLabel: "Imagens",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Gira fotos e espelha horizontal ou verticalmente com download rápido.",
  },
  {
    id: 29,
    name: "Desfocar / Pixelar Imagem (Censura)",
    category: "imagens",
    categoryLabel: "Imagens",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Oculte rostos, placas e dados sensíveis em fotos com efeito blur ou pixelado.",
  },
  {
    id: 30,
    name: "Extrator de Paleta de Cores",
    category: "imagens",
    categoryLabel: "Imagens",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Identifica as cores dominantes de uma imagem e fornece os códigos HEX e RGB.",
  },
  {
    id: 31,
    name: "Gerador de Favicon & App Icons",
    category: "imagens",
    categoryLabel: "Imagens",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Gera pacote de ícones .ico e PNGs (16x16, 32x32, 192x192, 512x512) para sites.",
  },
  {
    id: 32,
    name: "Seletor de Cores de Imagem (Eyedropper)",
    category: "imagens",
    categoryLabel: "Imagens",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Conta-gotas interativo para capturar a cor exata de qualquer pixel de uma foto.",
  },
  {
    id: 33,
    name: "Gerador de Imagem Placeholder",
    category: "imagens",
    categoryLabel: "Imagens",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Cria imagens temporárias para layouts com dimensões e cores customizáveis.",
  },
  {
    id: 34,
    name: "Converter SVG para PNG / JPG",
    category: "imagens",
    categoryLabel: "Imagens",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Renderiza vetores SVG em imagens bitmap de qualquer resolução.",
  },
  {
    id: 35,
    name: "Gerador de Marca D'Água em Fotos",
    category: "imagens",
    categoryLabel: "Imagens",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Aplica textos ou logotipos transparentes para proteção de fotos autorais.",
  },
  {
    id: 36,
    name: "Gerador de Gradientes CSS & PNG",
    category: "imagens",
    categoryLabel: "Imagens",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Criador de gradientes suaves com código CSS e exportação em imagem de fundo.",
  },
  {
    id: 37,
    name: "Converter Imagem para Base64",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Converte imagens em tags data:image/png;base64 para embutir em HTML e CSS.",
  },
  {
    id: 38,
    name: "Converter Base64 para Imagem",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Decodifica strings Base64 e recupera o arquivo de imagem para download.",
  },
  {
    id: 39,
    name: "Proteger PDF com Senha",
    category: "pdf",
    categoryLabel: "PDFs & Docs",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Criptografa documentos PDF e adiciona senha de proteção no navegador.",
  },
  {
    id: 40,
    name: "Gerador de Recibo em PDF",
    category: "pdf",
    categoryLabel: "PDFs & Docs",
    status: "planned",
    phase: "Fase 3 (v1.2)",
    description: "Formulário prático para preencher e emitir recibos de pagamento em PDF prontos para impressão.",
  },

  // --- FASE 4: TEXTO, DADOS & PRODUTIVIDADE (41 a 60) ---
  {
    id: 41,
    name: "Remover Linhas Duplicadas",
    category: "texto",
    categoryLabel: "Texto",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Limpa listas e tabelas mantendo apenas os registros e linhas únicas.",
  },
  {
    id: 42,
    name: "Ordenar Listas e Textos (A-Z / 0-9)",
    category: "texto",
    categoryLabel: "Texto",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Ordenação alfabética, numérica, reversa e embaralhamento aleatório (Shuffle).",
  },
  {
    id: 43,
    name: "Comparador de Textos (Diff Checker)",
    category: "texto",
    categoryLabel: "Texto",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Compara dois blocos de texto e destaca as alterações, inclusões e exclusões.",
  },
  {
    id: 44,
    name: "Remover Espaços Extras e Quebras",
    category: "texto",
    categoryLabel: "Texto",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Limpeza de espaços em branco duplicados, tabulações e quebras de linha em excesso.",
  },
  {
    id: 45,
    name: "Substituidor de Texto em Lote (Find & Replace)",
    category: "texto",
    categoryLabel: "Texto",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Localiza e substitui palavras ou frases em documentos longos.",
  },
  {
    id: 46,
    name: "Extrator de E-mails e URLs de Texto",
    category: "texto",
    categoryLabel: "Texto",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Varre textos brutos e extrai todos os endereços de e-mail e links encontrados.",
  },
  {
    id: 47,
    name: "Gerador de Texto Lorem Ipsum",
    category: "texto",
    categoryLabel: "Texto",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Gera parágrafos e frases clássicas de texto de preenchimento para designers.",
  },
  {
    id: 48,
    name: "Remover Acentos de Texto",
    category: "texto",
    categoryLabel: "Texto",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Normaliza caracteres especiais e acentuação (ex: 'Atenção' → 'Atencao').",
  },
  {
    id: 49,
    name: "Adicionar Prefixo e Sufixo em Linhas",
    category: "texto",
    categoryLabel: "Texto",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Insere caracteres ou tags no começo e no fim de cada linha de uma lista.",
  },
  {
    id: 50,
    name: "Contador de Frequência de Palavras",
    category: "texto",
    categoryLabel: "Texto",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Analisa a densidade de palavras-chave em textos e redações para SEO.",
  },
  {
    id: 51,
    name: "Conversor de Número por Extenso",
    category: "texto",
    categoryLabel: "Texto",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Transforma números cardinais e monetários em texto por extenso em português.",
  },
  {
    id: 52,
    name: "Texto para Binário / Binário para Texto",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Conversor didático de caracteres em código binário (0s e 1s).",
  },
  {
    id: 53,
    name: "URL Encoder / Decoder",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Codifica caracteres especiais para formato seguro de URL (%20, etc.) e decodifica.",
  },
  {
    id: 54,
    name: "Testador e Validador de Regex",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Editor interativo para testar expressões regulares com destaque em tempo real.",
  },
  {
    id: 55,
    name: "Formatador e Validador SQL",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Identação limpa e destaque de comandos SQL para consultas de banco de dados.",
  },
  {
    id: 56,
    name: "Formatador e Validador XML / HTML",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Embeleza e organiza arquivos XML e códigos HTML bagunçados.",
  },
  {
    id: 57,
    name: "Conversor JSON para CSV / Excel",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Converte listas de objetos JSON em planilhas CSV prontas para download.",
  },
  {
    id: 58,
    name: "Conversor CSV para JSON",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Transforma arquivos CSV tabulares em objetos JSON estruturados.",
  },
  {
    id: 59,
    name: "Conversor JSON para YAML & YAML para JSON",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Conversão bidirecional entre formatos comuns de configuração dev.",
  },
  {
    id: 60,
    name: "Decodificador de JWT (JSON Web Token)",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "planned",
    phase: "Fase 4 (v1.3)",
    description: "Decodifica o Header e Payload de tokens JWT de autenticação com privacidade total.",
  },

  // --- FASE 5: CALCULADORAS & UTILIDADES DO DIA A DIA (61 a 80) ---
  {
    id: 61,
    name: "Calculadora de Salário Líquido (CLT)",
    category: "calculadoras",
    categoryLabel: "Calculadoras",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Cálculo detalhado com descontos de INSS, Imposto de Renda (IRRF) e dependentes.",
  },
  {
    id: 62,
    name: "Calculadora de Rescisão Trabalhista",
    category: "calculadoras",
    categoryLabel: "Calculadoras",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Estimativa de saldo de salário, 13º proporcional, férias vencidas e multa FGTS.",
  },
  {
    id: 63,
    name: "Calculadora de Horas e Minutos",
    category: "calculadoras",
    categoryLabel: "Calculadoras",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Soma e subtração de intervalos de horas para controle de ponto e banco de horas.",
  },
  {
    id: 64,
    name: "Calculadora de Dias Entre Datas",
    category: "calculadoras",
    categoryLabel: "Calculadoras",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Calcula a quantidade exata de dias corridos, dias úteis e semanas entre duas datas.",
  },
  {
    id: 65,
    name: "Calculadora de Idade Exata",
    category: "calculadoras",
    categoryLabel: "Calculadoras",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Mostra sua idade detalhada em anos, meses, dias, horas e minutos vividos.",
  },
  {
    id: 66,
    name: "Calculadora de IMC (Índice de Massa Corporal)",
    category: "calculadoras",
    categoryLabel: "Calculadoras",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Calcula o IMC com base em peso e altura, indicando a faixa de peso ideal da OMS.",
  },
  {
    id: 67,
    name: "Calculadora de Combustível (Álcool vs Gasolina)",
    category: "calculadoras",
    categoryLabel: "Calculadoras",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Informa qual combustível compensa mais financeiramente com base no preço por litro.",
  },
  {
    id: 68,
    name: "Calculadora de Margem de Lucro & Markup",
    category: "calculadoras",
    categoryLabel: "Calculadoras",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Calcula o preço de venda ideal para produtos com base em custos e margem desejada.",
  },
  {
    id: 69,
    name: "Calculadora de Média Aritmética e Ponderada",
    category: "calculadoras",
    categoryLabel: "Calculadoras",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Cálculo de médias escolares e estatísticas com pesos customizáveis.",
  },
  {
    id: 70,
    name: "Conversor de Timestamp Unix / Epoch",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Converte timestamps numéricos em datas legíveis e vice-versa no fuso horário local.",
  },
  {
    id: 71,
    name: "Conversor de Cores (HEX, RGB, HSL, CMYK)",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Conversão instantânea entre códigos de cores para designers e desenvolvedores.",
  },
  {
    id: 72,
    name: "Conversor de Unidades de Medida",
    category: "calculadoras",
    categoryLabel: "Calculadoras",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Converte metros, centímetros, milímetros, pés, polegadas, jardas e milhas.",
  },
  {
    id: 73,
    name: "Conversor de Temperatura",
    category: "calculadoras",
    categoryLabel: "Calculadoras",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Conversão simultânea entre escalas Celsius (°C), Fahrenheit (°F) e Kelvin (K).",
  },
  {
    id: 74,
    name: "Conversor de Armazenamento Digital",
    category: "calculadoras",
    categoryLabel: "Calculadoras",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Conversor de Bytes, KB, MB, GB, TB e Petabytes com precisão decimal e binária.",
  },
  {
    id: 75,
    name: "Minificador de CSS e JavaScript",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Remove espaços e comentários de código para acelerar o carregamento de sites.",
  },
  {
    id: 76,
    name: "Gerador de .gitignore Rápido",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Gera arquivos .gitignore para Node.js, Python, Next.js, Rust, Go e outros.",
  },
  {
    id: 77,
    name: "Gerador de URL com Parâmetros UTM",
    category: "social",
    categoryLabel: "Redes & Links",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Cria links rastreáveis de marketing com utm_source, utm_medium e utm_campaign.",
  },
  {
    id: 78,
    name: "Simulador de Snippet do Google (SERP)",
    category: "social",
    categoryLabel: "Redes & Links",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Preview visual de como o Título SEO, URL e Meta Descrição aparecem na busca.",
  },
  {
    id: 79,
    name: "Gerador de Letras e Fontes para Bio",
    category: "social",
    categoryLabel: "Redes & Links",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Converte textos normais em fontes estilizadas Unicode para Instagram, TikTok e WhatsApp.",
  },
  {
    id: 80,
    name: "Extrator de Thumbnails do YouTube",
    category: "social",
    categoryLabel: "Redes & Links",
    status: "planned",
    phase: "Fase 5 (v1.4)",
    description: "Baixa a capa de qualquer vídeo do YouTube em qualidade máxima HD (1080p/720p).",
  },

  // --- FASE 6: REDES, CRIPTOGRAFIA & RUMO AO 100 (81 a 100) ---
  {
    id: 81,
    name: "Gerador de Link 'mailto' Personalizado",
    category: "social",
    categoryLabel: "Redes & Links",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Cria links diretos para abrir o e-mail com destinatário, assunto e corpo pré-preenchidos.",
  },
  {
    id: 82,
    name: "Gerador de Assinatura de E-mail HTML",
    category: "social",
    categoryLabel: "Redes & Links",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Criador visual de assinaturas de e-mail profissionais com foto, redes e telefone.",
  },
  {
    id: 83,
    name: "Calculadora de Engajamento para Redes",
    category: "social",
    categoryLabel: "Redes & Links",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Mede a taxa de engajamento percentual com base em seguidores, curtidas e comentários.",
  },
  {
    id: 84,
    name: "Gerador de Cartão de Contato (vCard QR Code)",
    category: "qr-code",
    categoryLabel: "QR Code & Links",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Gera QR Code que adiciona seu contato com nome, telefone e e-mail direto no celular.",
  },
  {
    id: 85,
    name: "Gerador de QR Code de Wi-Fi",
    category: "qr-code",
    categoryLabel: "QR Code & Links",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Cria QR Code para conectar smartphones à sua rede Wi-Fi sem digitar senha.",
  },
  {
    id: 86,
    name: "Gerador de Hash MD5",
    category: "seguranca",
    categoryLabel: "Segurança & Criptografia",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Cria checksums e hashes MD5 de textos e strings instantaneamente.",
  },
  {
    id: 87,
    name: "Gerador de Hash SHA-256 e SHA-512",
    category: "seguranca",
    categoryLabel: "Segurança & Criptografia",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Gera hashes criptográficos seguros utilizando a Web Crypto API nativa do navegador.",
  },
  {
    id: 88,
    name: "Sorteador de Nomes e Números",
    category: "seguranca",
    categoryLabel: "Segurança & Criptografia",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Sorteios transparentes para rifas, brindes, dinâmicas de equipes e redes sociais.",
  },
  {
    id: 89,
    name: "Gerador de Chave HMAC",
    category: "seguranca",
    categoryLabel: "Segurança & Criptografia",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Calcula assinaturas HMAC-SHA256 para validação de webhooks e APIs.",
  },
  {
    id: 90,
    name: "Gerador de Cartão de Crédito Fictício (Testes)",
    category: "desenvolvedor",
    categoryLabel: "Desenvolvedor",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Gera números fictícios com algoritmo de Luhn para testes de gateways de pagamento.",
  },
  {
    id: 91,
    name: "Tradutor de Texto para Código Morse",
    category: "texto",
    categoryLabel: "Texto",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Converte textos em código Morse com reprodução de áudio via sintetizador sonoro.",
  },
  {
    id: 92,
    name: "Contador de Sílabas e Legibilidade (Flesch)",
    category: "texto",
    categoryLabel: "Texto",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Mede o índice de legibilidade e facilidade de leitura do texto em português.",
  },
  {
    id: 93,
    name: "Calculadora de Desconto à Vista vs Parcelado",
    category: "calculadoras",
    categoryLabel: "Calculadoras",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Descubra se vale mais a pena pagar à vista com desconto ou investir o dinheiro.",
  },
  {
    id: 94,
    name: "Calculadora de Consumo de Energia Elétrica (kWh)",
    category: "calculadoras",
    categoryLabel: "Calculadoras",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Estima o custo mensal de eletrodomésticos com base na potência em Watts e tarifa local.",
  },
  {
    id: 95,
    name: "Inversor de Texto e Palavras",
    category: "texto",
    categoryLabel: "Texto",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Inverte a ordem das palavras ou a sequência de caracteres de qualquer frase.",
  },
  {
    id: 96,
    name: "Preto e Branco / Filtros Canvas",
    category: "imagens",
    categoryLabel: "Imagens",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Aplica filtros de escala de cinza, sépia, contraste e brilho em fotos diretamente no browser.",
  },
  {
    id: 97,
    name: "Borda e Arredondamento de Fotos",
    category: "imagens",
    categoryLabel: "Imagens",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Adiciona molduras coloridas e arredonda as bordas de imagens para download.",
  },
  {
    id: 98,
    name: "Numerar Páginas de PDF",
    category: "pdf",
    categoryLabel: "PDFs & Docs",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Adiciona numeração sequencial personalizada no rodapé de documentos PDF.",
  },
  {
    id: 99,
    name: "Adicionar Marca D'Água em PDF",
    category: "pdf",
    categoryLabel: "PDFs & Docs",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Estampa marca d'água de texto de segurança em todas as páginas de um PDF.",
  },
  {
    id: 100,
    name: "CrieGrátis Studio 100",
    category: "desenvolvedor",
    categoryLabel: "Ecossistema",
    status: "planned",
    phase: "Fase 6 (v2.0)",
    description: "Central definitiva unificada reunindo todas as 100 ferramentas em uma única suíte ultra-rápida.",
    badge: "Marco Histórico",
  },
];

export default function RoadmapView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const categories = [
    { id: "all", label: "Todas as Categorias", icon: Layers },
    { id: "imagens", label: "Imagens", icon: ImageIcon },
    { id: "pdf", label: "PDFs & Docs", icon: FileSpreadsheet },
    { id: "texto", label: "Texto", icon: FileText },
    { id: "desenvolvedor", label: "Desenvolvedor", icon: Code },
    { id: "calculadoras", label: "Calculadoras", icon: Calculator },
    { id: "social", label: "Redes & Links", icon: Share2 },
    { id: "seguranca", label: "Segurança", icon: Lock },
    { id: "qr-code", label: "QR Code", icon: QrCode },
  ];

  // Contadores dinâmicos
  const counts = useMemo(() => {
    const available = ROADMAP_ITEMS.filter((i) => i.status === "available").length;
    const inProgress = ROADMAP_ITEMS.filter((i) => i.status === "in_progress").length;
    const planned = ROADMAP_ITEMS.filter((i) => i.status === "planned").length;
    return {
      total: ROADMAP_ITEMS.length,
      available,
      inProgress,
      planned,
    };
  }, []);

  const filteredTools = useMemo(() => {
    return ROADMAP_ITEMS.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.phase.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const matchesStatus =
        selectedStatus === "all" || item.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  // Definição rica de cada Fase do Roadmap
  const phases = [
    {
      id: "Fase 1 (MVP)",
      phaseNumber: "1",
      title: "Fase 1 • MVP Oficial",
      subtitle: "10 Ferramentas Lançadas & Disponíveis",
      badge: "🟢 Lançado • 100% Funcional",
      badgeClass:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/80",
      accentBorder: "border-emerald-200 dark:border-emerald-900/60",
      accentBg: "from-emerald-500/10 via-transparent to-transparent",
      description:
        "As primeiras ferramentas essenciais construídas com arquitetura 100% client-side (Canvas API, QR Code, gerador de senhas e formatador JSON).",
    },
    {
      id: "Fase 2 (v1.1)",
      phaseNumber: "2",
      title: "Fase 2 • Expansão Imediata (v1.1)",
      subtitle: "11 Ferramentas Lançadas & Disponíveis",
      badge: "🟢 Lançado • 100% Funcional",
      badgeClass:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/80",
      accentBorder: "border-emerald-200 dark:border-emerald-900/60",
      accentBg: "from-emerald-500/10 via-transparent to-transparent",
      description:
        "Utilitários essenciais construídos: Converter Imagem para PDF, Gerador/Validador de CPF, Link do WhatsApp, Juntar PDF, Juros Compostos, WebP, Crop, Regra de 3, UUID e Base64.",
    },
    {
      id: "Fase 3 (v1.2)",
      phaseNumber: "3",
      title: "Fase 3 • Suíte de PDFs & Imagens (v1.2)",
      subtitle: "19 Ferramentas Planejadas",
      badge: "🔵 Próximo no Radar",
      badgeClass:
        "bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border-sky-300 dark:border-sky-800/80",
      accentBorder: "border-sky-200 dark:border-sky-900/60",
      accentBg: "from-sky-500/10 via-transparent to-transparent",
      description:
        "Manipulação avançada de documentos PDF no navegador (Dividir, Girar, Extrair, Proteger) e utilitários visuais de edição com Canvas HTML5.",
    },
    {
      id: "Fase 4 (v1.3)",
      phaseNumber: "4",
      title: "Fase 4 • Produtividade de Texto & Dados Dev (v1.3)",
      subtitle: "20 Ferramentas Planejadas",
      badge: "🟣 Planejado",
      badgeClass:
        "bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-300 dark:border-purple-800/80",
      accentBorder: "border-purple-200 dark:border-purple-900/60",
      accentBg: "from-purple-500/10 via-transparent to-transparent",
      description:
        "Conversores estruturais (JSON ↔ CSV, JSON ↔ YAML), testador de Regex, formatadores de SQL/XML, diff checker de textos e decodificador JWT.",
    },
    {
      id: "Fase 5 (v1.4)",
      phaseNumber: "5",
      title: "Fase 5 • Calculadoras & Finanças do Dia a Dia (v1.4)",
      subtitle: "20 Ferramentas Planejadas",
      badge: "🔵 Planejado",
      badgeClass:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800/80",
      accentBorder: "border-indigo-200 dark:border-indigo-900/60",
      accentBg: "from-indigo-500/10 via-transparent to-transparent",
      description:
        "Cálculos trabalhistas (Salário Líquido CLT, rescisão, ponto), combustível (Álcool vs Gasolina), IMC, conversor de unidades e ferramentas de SEO.",
    },
    {
      id: "Fase 6 (v2.0)",
      phaseNumber: "6",
      title: "Fase 6 • Criptografia, Redes & Marco Histórico 100 (v2.0)",
      subtitle: "20 Ferramentas Planejadas",
      badge: "🔴 Meta Final de 100 Ferramentas",
      badgeClass:
        "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-800/80",
      accentBorder: "border-rose-200 dark:border-rose-900/60",
      accentBg: "from-rose-500/10 via-transparent to-transparent",
      description:
        "Criptografia Web Crypto API (SHA-256/512, MD5, HMAC), QR Codes de Wi-Fi e vCard, sorteadores, e a central definitiva unificada CrieGrátis Studio 100.",
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Barra de Filtros, Busca e Navegação por Status */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-5 sm:p-7 shadow-xs backdrop-blur-md space-y-5">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Input de Busca com Botão de Limpar */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Buscar ferramentas por nome, categoria ou fase..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/80 pl-10 pr-10 py-2.5 sm:py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                title="Limpar busca"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filtros por Status (Segmented Tabs Modernos) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedStatus("all")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedStatus === "all"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                  : "border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              Todos ({counts.total})
            </button>

            <button
              onClick={() => setSelectedStatus("available")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedStatus === "available"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Prontas ({counts.available})</span>
            </button>

            <button
              onClick={() => setSelectedStatus("in_progress")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedStatus === "in_progress"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50"
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>Em Produção ({counts.inProgress})</span>
            </button>

            <button
              onClick={() => setSelectedStatus("planned")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedStatus === "planned"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Planejadas ({counts.planned})</span>
            </button>
          </div>
        </div>

        {/* Categorias (Pills Horizontais com Ícones) */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 dark:bg-blue-500 text-white dark:text-slate-950 shadow-xs font-bold"
                      : "border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contador de Resultados Filtrados */}
        {(searchQuery || selectedCategory !== "all" || selectedStatus !== "all") && (
          <div className="flex items-center justify-between pt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>
              Exibindo <strong>{filteredTools.length}</strong> de <strong>{counts.total}</strong> ferramentas encontradas
            </span>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedStatus("all");
              }}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
            >
              Redefinir Filtros
            </button>
          </div>
        )}
      </div>

      {/* Exibição dos Itens Agrupados por Fase */}
      <div className="space-y-12 sm:space-y-16">
        {phases.map((phase) => {
          const phaseItems = filteredTools.filter(
            (item) => item.phase === phase.id
          );

          if (phaseItems.length === 0) return null;

          return (
            <section key={phase.id} className="space-y-5">
              {/* Header da Fase com Estilo Visual de Linha do Tempo */}
              <div
                className={`relative overflow-hidden rounded-3xl border ${phase.accentBorder} bg-gradient-to-r ${phase.accentBg} bg-white dark:bg-slate-900/80 p-5 sm:p-6 shadow-xs`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-black">
                        {phase.phaseNumber}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        {phase.title}
                      </h2>
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-bold shadow-2xs ${phase.badgeClass}`}
                      >
                        {phase.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                      {phase.description}
                    </p>
                  </div>

                  <div className="shrink-0 self-start md:self-auto">
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <span>{phaseItems.length} ferramenta{phaseItems.length > 1 ? "s" : ""}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Grid de Cards das Ferramentas da Fase */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {phaseItems.map((tool) => {
                  const isAvailable = tool.status === "available";
                  const isInProgress = tool.status === "in_progress";
                  const isHighPriority = tool.badge === "Prioridade Alta";

                  const CardWrapper = isAvailable && tool.href ? Link : "div";

                  return (
                    <CardWrapper
                      key={tool.id}
                      href={tool.href || "#"}
                      className={`group relative rounded-3xl border p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between ${
                        isAvailable
                          ? "border-emerald-200/90 dark:border-emerald-900/60 bg-gradient-to-b from-emerald-50/40 via-white to-white dark:from-emerald-950/20 dark:via-slate-900/90 dark:to-slate-900 shadow-2xs hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md cursor-pointer hover:-translate-y-0.5"
                          : isInProgress
                          ? "border-amber-200/90 dark:border-amber-900/60 bg-gradient-to-b from-amber-50/40 via-white to-white dark:from-amber-950/20 dark:via-slate-900/90 dark:to-slate-900 shadow-2xs hover:border-amber-400 dark:hover:border-amber-500/70"
                          : "border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Header do Card: Número + Badge + Categoria */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
                            #{String(tool.id).padStart(2, "0")}
                          </span>

                          <div className="flex items-center gap-1.5">
                            {tool.badge && (
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold inline-flex items-center gap-1 ${
                                  isHighPriority
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950/90 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60"
                                    : tool.badge === "Popular"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-950/90 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60"
                                    : "bg-purple-100 text-purple-800 dark:bg-purple-950/90 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60"
                                }`}
                              >
                                {isHighPriority ? (
                                  <Flame className="h-3 w-3 fill-amber-500 text-amber-500 shrink-0" />
                                ) : (
                                  <Sparkles className="h-3 w-3 text-blue-500 shrink-0" />
                                )}
                                <span>{tool.badge}</span>
                              </span>
                            )}
                            <span className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                              {tool.categoryLabel}
                            </span>
                          </div>
                        </div>

                        {/* Título da Ferramenta */}
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between leading-snug">
                          <span>{tool.name}</span>
                          {isAvailable && (
                            <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                          )}
                        </h3>

                        {/* Descrição com Alto Conforto de Leitura */}
                        <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                          {tool.description}
                        </p>
                      </div>

                      {/* Rodapé do Card com Status */}
                      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                        {isAvailable ? (
                          <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Usar agora</span>
                          </span>
                        ) : isInProgress ? (
                          <span className="inline-flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
                            <Clock className="h-3.5 w-3.5 animate-spin" />
                            <span>Em produção</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 font-medium text-slate-400 dark:text-slate-500">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Planejada</span>
                          </span>
                        )}

                        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                          100% Client-Side
                        </span>
                      </div>
                    </CardWrapper>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Estado Vazio de Busca */}
        {filteredTools.length === 0 && (
          <div className="text-center py-14 px-4 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/50 space-y-4">
            <Search className="h-10 w-10 text-slate-400 dark:text-slate-500 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Nenhuma ferramenta encontrada
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Não encontramos nenhuma ferramenta correspondente à sua busca. Tente buscar por termos mais genéricos ou redefinir os filtros.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedStatus("all");
              }}
              className="mt-2 rounded-xl bg-blue-600 dark:bg-blue-500 text-white dark:text-slate-950 px-5 py-2.5 text-xs font-bold shadow-xs hover:bg-blue-700 cursor-pointer"
            >
              Limpar Todos os Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
