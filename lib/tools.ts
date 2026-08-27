export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolInfo {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: "imagens" | "calculadoras" | "texto" | "desenvolvedor" | "qr-code";
  keywords: string[];
  icon: string; // Lucide icon identifier
  href: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  badge?: string;
  usageSteps: string[];
  features: string[];
  faqs: FAQItem[];
  isPopular?: boolean;
}

export const TOOLS: ToolInfo[] = [
  {
    slug: "criar-qr-code",
    name: "Gerador de QR Code",
    shortDescription: "Crie QR Codes grátis para sites, redes sociais ou textos rapidamente.",
    fullDescription: "Ferramenta gratuita para criar QR Code instantaneamente. Digite um link ou texto e baixe seu QR Code em alta definição no formato PNG sem precisar de cadastro.",
    category: "qr-code",
    keywords: ["criar qr code", "gerar qr code", "qr code gratis", "gerador de qr code", "qr code png"],
    icon: "QrCode",
    href: "/criar-qr-code",
    metaTitle: "Criar QR Code Grátis | CrieGrátis",
    metaDescription: "Crie QR Codes grátis. Gere QR Code para links, textos e informações rapidamente, sem instalar programas.",
    h1: "Criar QR Code Grátis",
    badge: "Popular",
    isPopular: true,
    usageSteps: [
      "Cole ou digite a URL, link ou texto no campo indicado.",
      "O QR Code é gerado instantaneamente no seu navegador.",
      "Clique no botão 'Baixar PNG' para salvar a imagem ou em 'Copiar' para colar onde quiser."
    ],
    features: [
      "Geração 100% instantânea no navegador",
      "Suporte a links HTTP/HTTPS, e-mails, Wi-Fi e textos",
      "Download em imagem PNG cristalina de alta resolução",
      "Garantia total de privacidade (dados não são salvos em servidor)"
    ],
    faqs: [
      {
        question: "O QR Code gerado possui data de validade?",
        answer: "Não! Os QR Codes estáticos gerados no CrieGrátis nunca expiram e continuam funcionando por tempo indeterminado."
      },
      {
        question: "Preciso pagar ou me cadastrar para baixar o QR Code?",
        answer: "Não. A ferramenta é 100% gratuita e livre de cadastro ou limites de download."
      },
      {
        question: "Meus dados ou links são armazenados em algum servidor?",
        answer: "Não. O QR Code é gerado inteiramente no seu próprio navegador utilizando tecnologia client-side."
      }
    ]
  },
  {
    slug: "gerar-senha",
    name: "Gerador de Senha Forte",
    shortDescription: "Gere senhas aleatórias e ultra seguras com tamanho e caracteres customizáveis.",
    fullDescription: "Crie senhas fortes e aleatórias para proteger suas contas. Personalize a quantidade de caracteres, símbolos, números e letras com indicador visual de segurança.",
    category: "desenvolvedor",
    keywords: ["gerar senha", "gerador de senha forte", "criar senha segura", "gerador de senhas aleatorias"],
    icon: "KeyRound",
    href: "/gerar-senha",
    metaTitle: "Gerador de Senha Forte e Segura | CrieGrátis",
    metaDescription: "Gere senhas fortes, aleatórias e seguras. Personalize tamanho, caracteres especiais e números com proteção 100% no navegador.",
    h1: "Gerador de Senha Forte e Segura",
    isPopular: true,
    usageSteps: [
      "Defina o tamanho desejado para a sua senha (de 4 a 64 caracteres).",
      "Marque as opções de caracteres: letras maiúsculas, minúsculas, números e símbolos.",
      "Veja o indicador visual de força da senha e clique no botão 'Copiar' para utilizá-la."
    ],
    features: [
      "Geração criptograficamente segura usando a API nativa do navegador",
      "Indicador em tempo real de força da senha (Fraca, Média, Forte, Muito Forte)",
      "Opção de regerar a senha com um único clique",
      "Nenhuma senha é armazenada ou transmitida pela internet"
    ],
    faqs: [
      {
        question: "Como esta ferramenta garante a segurança das minhas senhas?",
        answer: "Utilizamos a API 'crypto.getRandomValues' nativa dos navegadores modernos, garantindo aleatoriedade verdadeira. Suas senhas nunca saem da memória do seu dispositivo."
      },
      {
        question: "Qual o tamanho ideal para uma senha considerada forte?",
        answer: "Recomendamos senhas de no mínimo 12 a 16 caracteres contendo uma combinação de letras maiúsculas, minúsculas, números e símbolos especiais."
      }
    ]
  },
  {
    slug: "contador-de-palavras",
    name: "Contador de Palavras",
    shortDescription: "Conte palavras, caracteres e linhas do seu texto em tempo real.",
    fullDescription: "Ferramenta essencial para redatores, estudantes e profissionais. Conte palavras, caracteres com e sem espaços, linhas e estime o tempo de leitura do seu texto.",
    category: "texto",
    keywords: ["contador de palavras", "contar palavras", "quantas palavras tem o texto", "contador texto"],
    icon: "FileText",
    href: "/contador-de-palavras",
    metaTitle: "Contador de Palavras e Caracteres | CrieGrátis",
    metaDescription: "Conte palavras, caracteres totais, caracteres sem espaço e linhas do seu texto em tempo real. Grátis, rápido e preciso.",
    h1: "Contador de Palavras e Linhas",
    isPopular: true,
    usageSteps: [
      "Cole ou digite o texto na caixa de entrada principal.",
      "Acompanhe as métricas atualizadas instantaneamente em tempo real.",
      "Utilize os botões de copiar ou limpar para gerenciar o conteúdo."
    ],
    features: [
      "Contagem exata de palavras, caracteres totais e sem espaços",
      "Estimativa inteligente de tempo de leitura e tempo de fala",
      "Contagem de linhas e parágrafos",
      "Atualização instantânea enquanto você digita"
    ],
    faqs: [
      {
        question: "Existe limite de tamanho para a contagem do texto?",
        answer: "Não! Você pode colar artigos longos, TCCs ou livros inteiros que o contador processará instantaneamente no seu dispositivo."
      }
    ]
  },
  {
    slug: "contador-de-caracteres",
    name: "Contador de Caracteres",
    shortDescription: "Verifique o limite de caracteres para redes sociais (Twitter/X, Instagram, LinkedIn).",
    fullDescription: "Evite passar do limite em publicações do Twitter/X, Instagram, LinkedIn e títulos de SEO. Defina um limite personalizado com alerta visual intuitivo.",
    category: "texto",
    keywords: ["contador de caracteres", "limite de caracteres twitter", "caracteres instagram", "contar caracteres"],
    icon: "AlignLeft",
    href: "/contador-de-caracteres",
    metaTitle: "Contador de Caracteres com Limite Configurável | CrieGrátis",
    metaDescription: "Contador de caracteres ideal para redes sociais e SEO. Configure limites para Twitter/X, Instagram, Meta Ads e acompanhe em tempo real.",
    h1: "Contador de Caracteres",
    usageSteps: [
      "Digite ou cole o texto no campo de edição.",
      "Selecione um preset de rede social (ex: Twitter 280 caracteres) ou defina seu próprio limite.",
      "Observe a barra visual de progresso e o saldo de caracteres restantes."
    ],
    features: [
      "Presets para Twitter/X (280 chars), Instagram Bio (150 chars), SEO Title (60 chars) e Meta Description (160 chars)",
      "Barra visual de progresso com mudança de cor (Verde, Amarelo, Vermelho)",
      "Cópia rápida com um único clique"
    ],
    faqs: [
      {
        question: "Os espaços contam como caracteres?",
        answer: "Sim! Na contagem padrão de redes sociais os espaços são contabilizados. No entanto, nossa ferramenta exibe tanto a contagem com quanto sem espaços."
      }
    ]
  },
  {
    slug: "calculadora-de-porcentagem",
    name: "Calculadora de Porcentagem",
    shortDescription: "Calcule X% de um valor, diferença percentual, aumentos e descontos rapidamente.",
    fullDescription: "Resolva qualquer cálculo de porcentagem de forma simples. Calcule porcentagem de um número, porcentagem entre dois valores, acréscimos e descontos com resultado instantâneo.",
    category: "calculadoras",
    keywords: ["calculadora de porcentagem", "calcular porcentagem", "como calcular porcentagem", "desconto percentual", "porcentagem de um valor"],
    icon: "Percent",
    href: "/calculadora-de-porcentagem",
    metaTitle: "Calculadora de Porcentagem Fácil e Rápida | CrieGrátis",
    metaDescription: "Calcule porcentagem de um valor, aumento, desconto e variação percentual entre dois números sem complicações.",
    h1: "Calculadora de Porcentagem",
    badge: "Essencial",
    isPopular: true,
    usageSteps: [
      "Escolha o tipo de cálculo percentual que deseja realizar.",
      "Informe os valores nos campos numéricos.",
      "O resultado exato e a fórmula explicativa aparecem na mesma hora."
    ],
    features: [
      "Quanto é X% de Y (Cálculo direto)",
      "O valor X representa qual porcentagem de Y? (Proporção)",
      "Aumento percentual de X para Y (+%)",
      "Desconto/redução percentual de X para Y (-%)"
    ],
    faqs: [
      {
        question: "Como funciona o cálculo de desconto percentual?",
        answer: "Informando o valor original e o valor final ou a taxa de desconto, nossa calculadora exibe quanto você economizou em reais e em porcentagem."
      }
    ]
  },
  {
    slug: "redimensionar-imagem",
    name: "Redimensionar Imagem",
    shortDescription: "Altere a largura e altura de fotos JPG, PNG e WebP mantendo a proporção.",
    fullDescription: "Redimensione imagens sem perder qualidade. Ajuste dimensões em pixels, escolha se quer travar a proporção e baixe a nova imagem em poucos segundos.",
    category: "imagens",
    keywords: ["redimensionar imagem", "mudar tamanho de foto", "redimensionar jpg", "alterar dimensoes imagem"],
    icon: "Scaling",
    href: "/redimensionar-imagem",
    metaTitle: "Redimensionar Imagem Grátis | CrieGrátis",
    metaDescription: "Redimensione fotos e imagens JPG, PNG e WebP. Ajuste largura e altura em pixels no seu navegador com total privacidade.",
    h1: "Redimensionar Imagem",
    isPopular: true,
    usageSteps: [
      "Faça o upload ou arraste sua imagem (JPG, PNG ou WebP) para a área de soltura.",
      "Insira as novas dimensões de largura ou altura em pixels.",
      "Marque a opção 'Manter proporção' se deseja evitar distorção.",
      "Clique em 'Redimensionar e Baixar'."
    ],
    features: [
      "Processamento 100% no navegador via Canvas HTML5",
      "Trava de proporção automática inteligente",
      "Suporte aos formatos populares: JPG, PNG, WebP",
      "Sem limitações de tamanho ou marcas d'água"
    ],
    faqs: [
      {
        question: "A imagem perde qualidade ao ser redimensionada?",
        answer: "Reduzir o tamanho da imagem mantém a nitidez perfeita. Ao aumentar além do tamanho original, a imagem pode apresentar suavização natural do navegador."
      }
    ]
  },
  {
    slug: "comprimir-imagem",
    name: "Comprimir Imagem",
    shortDescription: "Reduza o tamanho em KB/MB de fotos mantendo excelente qualidade visual.",
    fullDescription: "Otimize suas fotos para o site, blog ou e-mail. Diminua o peso dos arquivos de imagem diretamente no navegador sem enviar nenhum arquivo para servidores externos.",
    category: "imagens",
    keywords: ["comprimir imagem", "diminuir peso foto", "otimizar imagem", "compressor de imagem gratis"],
    icon: "Minimize2",
    href: "/comprimir-imagem",
    metaTitle: "Comprimir Imagem Grátis | CrieGrátis",
    metaDescription: "Comprima fotos e imagens JPG, PNG e WebP mantendo a qualidade. Reduza o peso dos seus arquivos rapidamente no navegador.",
    h1: "Comprimir Imagem Grátis",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Arraste ou selecione a imagem que deseja comprimir.",
      "Ajuste o slider de qualidade visual conforme sua preferência.",
      "Compare o tamanho original com o tamanho comprimido e o percentual de redução.",
      "Baixe o arquivo otimizado."
    ],
    features: [
      "Redução expressiva do tamanho do arquivo (até 80% menor)",
      "Comparador em tempo real de peso original vs peso comprimido",
      "Sem envio de fotos para servidores (privacidade máxima)",
      "Download instantâneo sem filas de espera"
    ],
    faqs: [
      {
        question: "Por que comprimir imagens no meu navegador é mais seguro?",
        answer: "Porque suas fotos pessoais ou profissionais nunca trafegam pela internet. Todo o processamento matemático de compressão ocorre no chip do seu próprio computador ou celular."
      }
    ]
  },
  {
    slug: "jpg-para-png",
    name: "Converter JPG para PNG",
    shortDescription: "Converta fotos JPG/JPEG em imagens PNG sem perda de qualidade.",
    fullDescription: "Transforme imagens no formato JPG/JPEG para PNG em um clique. Ideal para garantir compatibilidade com sistemas que exigem o formato PNG.",
    category: "imagens",
    keywords: ["jpg para png", "converter jpg em png", "transformar foto em png", "conversor jpg png"],
    icon: "Image",
    href: "/jpg-para-png",
    metaTitle: "Converter JPG para PNG Grátis | CrieGrátis",
    metaDescription: "Conversor JPG para PNG grátis. Transforme fotos JPEG em PNG instantaneamente no seu navegador sem instalar software.",
    h1: "Converter JPG para PNG",
    usageSteps: [
      "Selecione ou arraste o arquivo JPG/JPEG para o conversor.",
      "O preview da conversão é exibido na tela.",
      "Clique no botão 'Baixar PNG' para obter a imagem convertida."
    ],
    features: [
      "Conversão limpa e sem perda de nitidez",
      "Processamento ultra-rápido em milissegundos",
      "100% gratuito e ilimitado"
    ],
    faqs: [
      {
        question: "Qual a diferença entre JPG e PNG?",
        answer: "O formato JPG utiliza compressão com perdas leve e é ideal para fotografias. O PNG utiliza compressão sem perdas e suporta fundos transparentes."
      }
    ]
  },
  {
    slug: "png-para-jpg",
    name: "Converter PNG para JPG",
    shortDescription: "Converta imagens PNG em JPG com fundo branco ou colorido personalizável.",
    fullDescription: "Converta arquivos PNG em JPG para diminuir o tamanho ou atender requisitos de envio. Inclui tratamento de transparência com fundo branco ou customizável.",
    category: "imagens",
    keywords: ["png para jpg", "converter png em jpg", "transformar png para jpg", "conversor de imagem"],
    icon: "FileImage",
    href: "/png-para-jpg",
    metaTitle: "Converter PNG para JPG Grátis | CrieGrátis",
    metaDescription: "Converta imagens PNG para JPG com controle de qualidade e preenchimento de fundo transparente. Rápido e gratuito.",
    h1: "Converter PNG para JPG",
    usageSteps: [
      "Faça o upload do seu arquivo PNG.",
      "Se a imagem tiver transparência, escolha a cor de fundo (padrão é branco).",
      "Ajuste a qualidade final se desejado e clique em 'Baixar JPG'."
    ],
    features: [
      "Tratamento automático e perfeito de transparência PNG",
      "Opção de escolher a cor de fundo para a área transparente",
      "Controle de qualidade do arquivo JPG final"
    ],
    faqs: [
      {
        question: "O que acontece com as partes transparentes do PNG?",
        answer: "Como o formato JPG não suporta transparência, a nossa ferramenta preenche a área transparente com uma cor de sua escolha (por padrão, cor branca pura)."
      }
    ]
  },
  {
    slug: "formatar-json",
    name: "Formatador e Validador JSON",
    shortDescription: "Formate, idente, minifique e valide códigos JSON com detecção de erros.",
    fullDescription: "Utilitário completo para desenvolvedores. Formate estruturas JSON bagunçadas com indentação limpa (2 ou 4 espaços), minifique para produção e encontre erros de sintaxe rapidamente.",
    category: "desenvolvedor",
    keywords: ["formatar json", "json formatter", "validar json", "json minifier", "identar json"],
    icon: "Code",
    href: "/formatar-json",
    metaTitle: "Formatador e Validador JSON | CrieGrátis",
    metaDescription: "Formate, valide e minifique seu código JSON. Detecte erros de sintaxe amigáveis com indicação exata de linha e posição.",
    h1: "Formatador e Validador JSON",
    badge: "Dev",
    isPopular: true,
    usageSteps: [
      "Cole o seu texto JSON bruto na caixa de edição da esquerda.",
      "Escolha entre 'Formatar (2 Espaços)', 'Formatar (4 Espaços)' ou 'Minificar'.",
      "Se houver erros de sintaxe, uma mensagem destacada indicará o ponto exato da falha.",
      "Copie o resultado limpo com um único clique."
    ],
    features: [
      "Validação estrita de sintaxe JSON com mensageria de erro amigável",
      "Opção de formatação legível (Beautify) ou minificação compacta (Minify)",
      "Botão de carregar exemplo de teste rápido e botão de limpar",
      "Funciona totalmente offline/client-side (privacidade para suas APIs e tokens)"
    ],
    faqs: [
      {
        question: "Meus dados de JSON ou tokens de API são enviados para algum servidor?",
        answer: "Jamais! Todo a análise de sintaxe e formatação é feita usando o motor JavaScript interno do seu próprio navegador."
      }
    ]
  },
  {
    slug: "imagem-para-pdf",
    name: "Converter Imagem para PDF",
    shortDescription: "Transforme fotos JPG, PNG e WebP em um arquivo PDF organizado e leve.",
    fullDescription: "Converta múltiplas imagens para PDF diretamente no navegador. Organize as páginas na ordem desejada, defina orientação (retrato/paisagem) e baixe seu documento PDF em segundos sem enviar arquivos para servidores.",
    category: "imagens",
    keywords: ["imagem para pdf", "jpg para pdf", "png para pdf", "converter foto em pdf", "juntar fotos em pdf"],
    icon: "FileText",
    href: "/imagem-para-pdf",
    metaTitle: "Converter Imagem para PDF Grátis | CrieGrátis",
    metaDescription: "Converta imagens JPG, PNG e WebP para PDF grátis no navegador. Junte várias fotos em um único arquivo PDF sem cadastro e com privacidade 100%.",
    h1: "Converter Imagem para PDF Grátis",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Arraste ou selecione uma ou mais imagens (JPG, PNG ou WebP).",
      "Reordene as fotos arrastando ou usando as setas para definir a sequência das páginas.",
      "Ajuste a orientação da página (Retrato ou Paisagem) e as margens desejadas.",
      "Clique em 'Gerar e Baixar PDF' para salvar seu arquivo imediatamente."
    ],
    features: [
      "Suporte a múltiplos arquivos simultâneos (JPG, PNG, WebP)",
      "Reordenação visual e intuitiva de páginas",
      "Opções de margem (Sem margem, Pequena, Grande) e orientação de página",
      "Processamento 100% no navegador (seus documentos são privados)"
    ],
    faqs: [
      {
        question: "Quantas imagens posso juntar em um único PDF?",
        answer: "Não há limite fixo imposto pela plataforma. Você pode adicionar dezenas de fotos e documentos de uma só vez."
      },
      {
        question: "Minhas fotos são enviadas para algum servidor?",
        answer: "Não. A conversão é feita inteiramente na memória RAM do seu próprio dispositivo via biblioteca client-side."
      }
    ]
  },
  {
    slug: "gerador-validador-cpf",
    name: "Gerador e Validador de CPF",
    shortDescription: "Gere CPFs válidos para testes e valide números com algoritmo oficial.",
    fullDescription: "Ferramenta essencial para desenvolvedores e testers. Gere números de CPF válidos com ou sem pontuação (individual ou em lote) e valide qualquer CPF através do cálculo dos dígitos verificadores (Módulo 11).",
    category: "desenvolvedor",
    keywords: ["gerador de cpf", "validar cpf", "validador de cpf", "gerar cpf valido", "cpf para testes"],
    icon: "CheckCircle",
    href: "/gerador-validador-cpf",
    metaTitle: "Gerador e Validador de CPF Grátis | CrieGrátis",
    metaDescription: "Gere CPFs válidos para testes de software e valide dígitos de CPF com cálculo oficial. Rápido, seguro e sem armazenar dados.",
    h1: "Gerador e Validador de CPF",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Para Gerar: escolha a quantidade de CPFs, opção de máscara (pontuação) e clique em 'Gerar CPF'.",
      "Para Validar: digite ou cole um CPF no campo de validação e veja o resultado em tempo real.",
      "Copie os números gerados individualmente ou em lote com 1 clique."
    ],
    features: [
      "Geração individual e em lote (até 50 CPFs de uma vez)",
      "Opção com máscara (000.000.000-00) ou apenas números",
      "Identificação do estado/região fiscal brasileira de emissão",
      "Algoritmo oficial de Módulo 11 da Receita Federal"
    ],
    faqs: [
      {
        question: "Os CPFs gerados são de pessoas reais?",
        answer: "Não. Os números são gerados de forma puramente algorítmica seguindo as regras matemáticas de dígitos verificadores, destinados exclusivamente para testes de software e homologação de sistemas."
      }
    ]
  },
  {
    slug: "gerador-link-whatsapp",
    name: "Gerador de Link de WhatsApp",
    shortDescription: "Crie links wa.me personalizados com mensagem e QR Code instantâneo.",
    fullDescription: "Crie links diretos para conversas no WhatsApp com número e mensagem pré-formatada. Copie o link curto wa.me ou baixe o QR Code exclusivo para usar em redes sociais, cartões e banners.",
    category: "qr-code",
    keywords: ["link whatsapp", "gerador link whatsapp", "criar link zap", "link wa me", "qr code whatsapp"],
    icon: "MessageSquare",
    href: "/gerador-link-whatsapp",
    metaTitle: "Gerador de Link de WhatsApp Grátis | CrieGrátis",
    metaDescription: "Crie link direto para WhatsApp com mensagem personalizada e QR Code para download. Ideal para negócios, Instagram e marketing.",
    h1: "Gerador de Link de WhatsApp",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Informe o número de telefone com DDD (ex: 11 99999-9999).",
      "Escreva a mensagem inicial que você deseja que o cliente envie.",
      "Visualize a prévia da mensagem no balão estilizado.",
      "Clique em 'Copiar Link', 'Testar Link' ou 'Baixar QR Code'."
    ],
    features: [
      "Formatação automática de DDI (+55 Brasil) e DDD",
      "Preview visual em tempo real no estilo balão de mensagem do WhatsApp",
      "Geração instantânea de QR Code PNG em alta resolução",
      "Compatível com WhatsApp Web e aplicativo mobile"
    ],
    faqs: [
      {
        question: "O link gerado tem prazo de validade?",
        answer: "Não! Os links wa.me utilizam o protocolo oficial do WhatsApp e nunca expiram."
      }
    ]
  },
  {
    slug: "converter-maiusculas-minusculas",
    name: "Conversor Maiúsculas e Minúsculas",
    shortDescription: "Transforme textos em MAIÚSCULAS, minúsculas, camelCase, snake_case e mais.",
    fullDescription: "Transforme qualquer texto instantaneamente. Converta entre MAIÚSCULAS, minúsculas, Primeira Letra Maiúscula (Title Case), Início de Frases, camelCase, snake_case, kebab-case e PascalCase com 1 clique.",
    category: "texto",
    keywords: ["converter maiusculas", "converter minusculas", "texto maiusculo", "title case", "camelcase"],
    icon: "Type",
    href: "/converter-maiusculas-minusculas",
    metaTitle: "Conversor Maiúsculas e Minúsculas Online | CrieGrátis",
    metaDescription: "Altere o formato de letras do seu texto online. Converta para maiúsculas, minúsculas, camelCase, snake_case e primeira letra em maiúscula.",
    h1: "Conversor de Maiúsculas e Minúsculas",
    badge: "Novo",
    usageSteps: [
      "Cole ou digite o texto na caixa de entrada.",
      "Clique no botão do estilo desejado (ex: MAIÚSCULAS, minúsculas, Title Case, camelCase).",
      "O texto é convertido instantaneamente na caixa de resultado.",
      "Clique em 'Copiar' para colar onde precisar."
    ],
    features: [
      "Mais de 9 modos de formatação de caixa de texto",
      "Suporte completo a caracteres acentuados da língua portuguesa",
      "Estatísticas em tempo real (palavras e caracteres)",
      "Botão de troca rápida e cópia em 1 clique"
    ],
    faqs: [
      {
        question: "A ferramenta suporta textos longos?",
        answer: "Sim! Não há limite de caracteres para conversão, e todo o processamento ocorre instantaneamente no seu navegador."
      }
    ]
  },
  {
    slug: "juntar-pdf",
    name: "Juntar PDF (Merge PDF)",
    shortDescription: "Combine múltiplos arquivos PDF em um único documento no navegador.",
    fullDescription: "Junte vários arquivos PDF em um único documento com facilidade. Arraste e solte seus PDFs, ordene as páginas como preferir e baixe o arquivo unificado com segurança e privacidade 100% client-side.",
    category: "desenvolvedor",
    keywords: ["juntar pdf", "mesclar pdf", "merge pdf", "combinar pdf", "unir pdf gratis"],
    icon: "Files",
    href: "/juntar-pdf",
    metaTitle: "Juntar PDF Online Grátis — Mesclar Arquivos PDF | CrieGrátis",
    metaDescription: "Junte múltiplos arquivos PDF em um só documento online e grátis. Rápido, seguro e processado 100% no seu navegador.",
    h1: "Juntar PDF Online Grátis",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Selecione ou arraste dois ou mais arquivos PDF para a área de envio.",
      "Ordene os arquivos na sequência desejada usando os botões de subir/descer.",
      "Clique no botão 'Juntar e Baixar PDF'.",
      "O novo arquivo combinado será gerado e baixado instantaneamente."
    ],
    features: [
      "Combinação de múltiplos arquivos PDF de qualquer tamanho",
      "Reordenação fácil da sequência dos documentos",
      "Mantém resolução, qualidade e hiperlinks originais",
      "Zero envio de dados para a nuvem (privacidade total)"
    ],
    faqs: [
      {
        question: "Existe limite no número de arquivos PDF que posso juntar?",
        answer: "Não há limites artificiais de quantidade de arquivos ou de tamanho, dependendo apenas da memória do seu navegador."
      }
    ]
  },
  {
    slug: "calculadora-juros-compostos",
    name: "Calculadora de Juros Compostos",
    shortDescription: "Simule rendimentos financeiros com aportes mensais e gráficos visuais.",
    fullDescription: "Calcule a evolução dos seus investimentos com juros compostos. Insira valor inicial, aportes mensais, taxa de juros e prazo para visualizar o total acumulado, total investido e gráficos interativos de rendimento.",
    category: "calculadoras",
    keywords: ["calculadora juros compostos", "juros compostos", "simulador de investimento", "calcular rendimento"],
    icon: "TrendingUp",
    href: "/calculadora-juros-compostos",
    metaTitle: "Calculadora de Juros Compostos Online | CrieGrátis",
    metaDescription: "Calcule o rendimento de investimentos com juros compostos e aportes mensais. Veja tabela detalhada e gráfico visual de evolução patrimonial.",
    h1: "Calculadora de Juros Compostos",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Informe o valor inicial do investimento (R$).",
      "Digite o valor do aporte mensal recorrente (opcional).",
      "Defina a taxa de juros (% ao mês ou % ao ano).",
      "Escolha o período em meses ou anos e veja os resultados calculados automaticamente."
    ],
    features: [
      "Simulação de juros mensais ou anuais com conversão automática",
      "Detalhamento claro entre valor investido do próprio bolso e juros acumulados",
      "Gráfico visual interativo de crescimento ano a ano",
      "Tabela completa de evolução mês a mês para download ou consulta"
    ],
    faqs: [
      {
        question: "Qual a diferença entre juros simples e juros compostos?",
        answer: "Nos juros compostos, os rendimentos de cada período são somados ao capital principal para render mais no período seguinte ('juros sobre juros'), multiplicando o patrimônio a longo prazo."
      }
    ]
  },
  {
    slug: "webp-para-png-jpg",
    name: "Converter WebP para PNG / JPG",
    shortDescription: "Converta imagens WebP para formatos compatíveis JPG ou PNG em 1 clique.",
    fullDescription: "Transforme imagens no formato WebP baixadas da internet para JPG ou PNG compatíveis com qualquer programa de edição ou visualizador. Rápido, nítido e direto no navegador.",
    category: "imagens",
    keywords: ["webp para png", "webp para jpg", "converter webp", "transformar webp em foto"],
    icon: "Image",
    href: "/webp-para-png-jpg",
    metaTitle: "Converter WebP para PNG e JPG Grátis | CrieGrátis",
    metaDescription: "Converta arquivos de imagem WebP para PNG ou JPG online e grátis. Conversão de alta qualidade no navegador sem cadastro.",
    h1: "Converter WebP para PNG e JPG",
    badge: "Novo",
    usageSteps: [
      "Arraste ou selecione os arquivos de imagem .webp do seu computador ou celular.",
      "Escolha o formato de saída desejado: PNG (ideal para transparência) ou JPG.",
      "Se escolher JPG, ajuste a barra de qualidade visual conforme preferir.",
      "Baixe suas imagens convertidas individualmente ou em lote."
    ],
    features: [
      "Conversão super rápida e direta no Canvas HTML5",
      "Preservação de fundo transparente na conversão para PNG",
      "Ajuste de qualidade e compressão para saída em JPG",
      "Suporte a múltiplos arquivos simultâneos"
    ],
    faqs: [
      {
        question: "Por que converter WebP para JPG ou PNG?",
        answer: "Embora o WebP seja muito leve na web, muitos editores clássicos, plataformas de envio de documentos e redes sociais ainda exigem o formato PNG ou JPG tradicional."
      }
    ]
  },
  {
    slug: "cortar-imagem",
    name: "Cortar Imagem (Crop Tool)",
    shortDescription: "Recorte fotos em proporções livres ou presets para Stories e redes sociais.",
    fullDescription: "Ferramenta visual e intuitiva para cortar imagens online. Escolha proporções livres ou presets consagrados (1:1 Quadrado, 9:16 Stories/Reels, 16:9 Vídeo, 4:5 Feed) e exporte sem perder qualidade.",
    category: "imagens",
    keywords: ["cortar imagem", "recortar foto", "crop image", "cortar foto para instagram", "cortar quadrado 1:1"],
    icon: "Crop",
    href: "/cortar-imagem",
    metaTitle: "Cortar Imagem Online Grátis — Recorte de Fotos | CrieGrátis",
    metaDescription: "Recorte fotos e imagens online com facilidade. Proporções para Instagram, Stories, TikTok e formatos personalizados no navegador.",
    h1: "Cortar Imagem Online Grátis",
    badge: "Novo",
    usageSteps: [
      "Envie a imagem que deseja recortar.",
      "Selecione uma proporção pré-definida (1:1, 9:16, 16:9, etc.) ou escolha formato livre.",
      "Arraste e redimensione a área de seleção sobre a imagem.",
      "Clique em 'Recortar e Baixar' para salvar a imagem final."
    ],
    features: [
      "Presets prontos para Instagram Feed, Stories, Reels, TikTok e YouTube",
      "Ajuste interativo de corte com pré-visualização em tempo real",
      "Exportação em alta resolução sem marcas d'água",
      "Processamento 100% client-side (suas fotos não saem do dispositivo)"
    ],
    faqs: [
      {
        question: "Qual o tamanho recomendado para postar no Feed do Instagram?",
        answer: "Para o feed quadrado use a proporção 1:1 (1080x1080px); para o feed vertical use 4:5 (1080x1350px); e para Stories/Reels use 9:16 (1080x1920px)."
      }
    ]
  },
  {
    slug: "calculadora-regra-de-tres",
    name: "Calculadora de Regra de Três",
    shortDescription: "Calcule proporções diretas e inversas com explicação passo a passo.",
    fullDescription: "Resolva qualquer problema de regra de três simples em segundos. Calcule proporções diretas ou inversamente proporcionais e veja a demonstração detalhada da equação passo a passo.",
    category: "calculadoras",
    keywords: ["regra de tres", "calculadora regra de tres", "regra de tres simples", "calcular proporcao"],
    icon: "Percent",
    href: "/calculadora-regra-de-tres",
    metaTitle: "Calculadora de Regra de Três Simples Online | CrieGrátis",
    metaDescription: "Calcule regra de três simples direta e inversa online. Veja a fórmula e resolução passo a passo de forma didática e instantânea.",
    h1: "Calculadora de Regra de Três Simples",
    badge: "Novo",
    usageSteps: [
      "Escolha entre 'Diretamente Proporcional' ou 'Inversamente Proporcional'.",
      "Preencha os três valores conhecidos (A, B e C).",
      "O valor da incógnita X é calculado automaticamente enquanto você digita.",
      "Acompanhe a explicação passo a passo e copie o resultado com 1 clique."
    ],
    features: [
      "Modo Direto (se um sobe, o outro sobe) e Inverso (se um sobe, o outro desce)",
      "Cálculo instantâneo em tempo real",
      "Demonstração didática de cada etapa da fórmula matemática",
      "Exemplos práticos de uso do cotidiano carregáveis com 1 clique"
    ],
    faqs: [
      {
        question: "Quando usar regra de três inversa?",
        answer: "Use quando o aumento de uma grandeza provoca a redução da outra. Exemplo: se 2 pedreiros levam 6 dias para construir um muro, 4 pedreiros levarão menos tempo (3 dias)."
      }
    ]
  },
  {
    slug: "gerar-uuid",
    name: "Gerador de UUID / GUID (v4)",
    shortDescription: "Gere identificadores únicos universais aleatórios criptografados em lote.",
    fullDescription: "Gere UUIDs (Universally Unique Identifiers) versão 4 em lote ou individualmente com base na API Web Crypto nativa do navegador. Configure maiúsculas, minúsculas, chaves e separadores com facilidade.",
    category: "desenvolvedor",
    keywords: ["gerar uuid", "uuid v4 generator", "guid generator", "gerador de guid", "identificador unico"],
    icon: "Key",
    href: "/gerar-uuid",
    metaTitle: "Gerador de UUID / GUID v4 Online | CrieGrátis",
    metaDescription: "Gere UUIDs versão 4 criptograficamente seguros em lote ou individualmente. Personalize maiúsculas, chaves e copie com 1 clique.",
    h1: "Gerador de UUID / GUID v4",
    badge: "Novo",
    usageSteps: [
      "Escolha a quantidade de UUIDs desejada (de 1 a 100).",
      "Selecione as opções: letras maiúsculas/minúsculas, com ou sem hifens, e envolver em chaves.",
      "Clique em 'Gerar Novos UUIDs'.",
      "Copie a lista inteira ou copie os itens individualmente."
    ],
    features: [
      "Geração criptograficamente segura via crypto.randomUUID",
      "Geração em lote de até 100 identificadores por clique",
      "Opções flexíveis de formatação (hifens, chaves {...}, maiúsculas)",
      "Funciona totalmente offline no navegador"
    ],
    faqs: [
      {
        question: "O que é um UUID v4 e qual a chance de colisão?",
        answer: "Um UUID v4 é um identificador de 128 bits gerado aleatoriamente. A probabilidade de gerar dois UUIDs iguais é astronomicamente baixa (praticamente impossível na prática)."
      }
    ]
  },
  {
    slug: "base64-codificador-decodificador",
    name: "Base64 Codificador e Decodificador",
    shortDescription: "Codifique e decodifique textos em Base64 com suporte total a UTF-8.",
    fullDescription: "Codifique textos simples para o formato Base64 ou decodifique sequências Base64 de volta para texto legível. Suporte avançado a caracteres especiais, acentuação em português e emojis com total privacidade.",
    category: "desenvolvedor",
    keywords: ["base64 decode", "base64 encode", "codificar base64", "decodificar base64", "base64 utf8"],
    icon: "Binary",
    href: "/base64-codificador-decodificador",
    metaTitle: "Base64 Encoder e Decoder de Texto Online | CrieGrátis",
    metaDescription: "Codifique e decodifique textos em Base64 online. Suporte completo a acentuação UTF-8 e caracteres especiais com 100% de privacidade.",
    h1: "Base64 Codificador e Decodificador de Texto",
    badge: "Novo",
    usageSteps: [
      "Escolha a aba 'Codificar (Texto → Base64)' ou 'Decodificar (Base64 → Texto)'.",
      "Digite ou cole o conteúdo no campo de entrada.",
      "O resultado correspondente é gerado instantaneamente no campo de saída.",
      "Clique no botão 'Copiar Resultado' para utilizar."
    ],
    features: [
      "Codificação e decodificação bidirecional instantânea",
      "Suporte completo a UTF-8 (acentos, cedilha, símbolos e emojis)",
      "Detecção e tratamento de erros de decodificação com alertas claros",
      "100% client-side (seus dados nunca são enviados a servidores)"
    ],
    faqs: [
      {
        question: "Para que serve a codificação Base64?",
        answer: "O Base64 é utilizado para transmitir dados binários ou caracteres especiais em meios que suportam apenas texto ASCII seguro (como cabeçalhos HTTP, e-mails e APIs)."
      }
    ]
  }
];

export function getToolBySlug(slug: string): ToolInfo | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): ToolInfo[] {
  return TOOLS.filter((tool) => tool.category === category);
}

export function searchTools(query: string): ToolInfo[] {
  const q = query.toLowerCase().trim();
  if (!q) return TOOLS;

  return TOOLS.filter((tool) => {
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.shortDescription.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });
}
