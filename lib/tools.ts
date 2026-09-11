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
  },
  {
    slug: "svg-para-png",
    name: "Converter SVG para PNG",
    shortDescription: "Converta arquivos vetoriais SVG para PNG em alta definição com fundo transparente ou sólido.",
    fullDescription: "Ferramenta gratuita para converter arquivos vetoriais SVG para imagens PNG com fundo transparente ou cores sólidas. Escolha a escala de exportação (até 8x) para obter gráficos e logos super nítidos sem perda de qualidade.",
    category: "imagens",
    keywords: ["converter svg para png", "svg para png", "svg to png", "transformar svg em png", "vetor para imagem"],
    icon: "FileCode",
    href: "/svg-para-png",
    metaTitle: "Converter SVG para PNG Grátis em Alta Resolução | CrieGrátis",
    metaDescription: "Converta arquivos vetoriais SVG para PNG grátis. Escolha escalas até 8x para logos e ícones de altíssima definição com fundo transparente.",
    h1: "Converter SVG para PNG em Alta Definição",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Selecione ou arraste seu arquivo .SVG para a área de upload.",
      "Defina a resolução/escala desejada (1x, 2x Ideal, 4x ou 8x Ultra HD).",
      "Escolha o fundo: transparente, branco ou preto.",
      "Clique no botão 'Baixar Imagem em PNG' para salvar seu arquivo renderizado."
    ],
    features: [
      "Renderização vetorial com antialiasing de alta qualidade",
      "Multiplicador de resolução até 8x para impressão ou telas 4K",
      "Suporte a fundo transparente nativo com canal alfa",
      "Processamento 100% privado na memória do seu navegador"
    ],
    faqs: [
      {
        question: "Por que converter SVG para PNG?",
        answer: "Embora o SVG seja perfeito para a web, muitos editores de imagem, redes sociais e ferramentas de apresentação aceitam apenas formatos rasterizados como PNG."
      },
      {
        question: "A qualidade da imagem diminui ao converter?",
        answer: "Não! Por ser um vetor, você pode escolher escalas maiores (como 2x ou 4x) para exportar uma imagem PNG nítida em altíssima resolução."
      }
    ]
  },
  {
    slug: "converter-para-webp",
    name: "Converter para WebP",
    shortDescription: "Converta imagens PNG ou JPG para WebP e reduza o peso do seu site mantendo a qualidade.",
    fullDescription: "Otimize suas imagens convertendo para o formato moderno WebP. Reduza o peso dos arquivos em até 80% mantendo alta fidelidade visual, ideal para acelerar o carregamento de sites e blogs.",
    category: "imagens",
    keywords: ["converter para webp", "imagem para webp", "jpg para webp", "png para webp", "otimizar webp"],
    icon: "Sparkles",
    href: "/converter-para-webp",
    metaTitle: "Converter para WebP Online e Grátis | CrieGrátis",
    metaDescription: "Converta PNG e JPG para WebP grátis. Reduza o tamanho de imagens em até 80% sem perder qualidade no navegador.",
    h1: "Converter Imagens para WebP",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Selecione uma imagem nos formatos PNG, JPG, JPEG ou BMP.",
      "Ajuste a porcentagem de qualidade no controle deslizante (recomendado: 85%).",
      "Acompanhe a economia de espaço e o comparador de tamanho em tempo real.",
      "Baixe a imagem otimizada em formato WebP imediatamente."
    ],
    features: [
      "Economia expressiva de até 80% no tamanho dos arquivos",
      "Slider de ajuste fino de compressão com preview ao vivo",
      "Compatível com todos os navegadores modernos e motores de busca",
      "Conversão rápida e 100% offline via HTML5 Canvas"
    ],
    faqs: [
      {
        question: "Quais as vantagens de usar WebP em vez de PNG ou JPG?",
        answer: "O formato WebP foi criado pelo Google para oferecer arquivos significativamente menores com a mesma qualidade perceptível, tornando sites muito mais rápidos e bem ranqueados no SEO."
      },
      {
        question: "O formato WebP suporta transparência?",
        answer: "Sim! O WebP suporta transparência alfa (como o PNG) com um tamanho de arquivo muito menor."
      }
    ]
  },
  {
    slug: "imagem-para-base64",
    name: "Imagem para Base64",
    shortDescription: "Converta qualquer imagem para código Base64 Data URI, tag <img> ou CSS background.",
    fullDescription: "Ferramenta para converter imagens (PNG, JPG, SVG, WebP) em sequências de texto Base64. Obtenha o Data URI completo, tags HTML <img> ou regras CSS prontas para colar diretamente no seu código sem requisições HTTP adicionais.",
    category: "imagens",
    keywords: ["imagem para base64", "converter imagem base64", "image to base64", "data uri imagem", "base64 img"],
    icon: "Binary",
    href: "/imagem-para-base64",
    metaTitle: "Converter Imagem para Base64 Online e Grátis | CrieGrátis",
    metaDescription: "Converta imagens para Base64 e Data URI grátis. Gere tags HTML e CSS prontas para desenvolvedores sem enviar nada para servidores.",
    h1: "Converter Imagem para Base64",
    badge: "Novo",
    usageSteps: [
      "Arraste ou escolha qualquer arquivo de imagem no seu computador.",
      "Veja o preview e as dimensões da imagem instantaneamente.",
      "Escolha a aba desejada: Data URI, Tag <img> HTML, CSS Background ou Base64 Puro.",
      "Clique em 'Copiar' para transferir o código ou baixe em arquivo .TXT."
    ],
    features: [
      "Gera Data URI, tag <img> HTML e CSS background-image prontos",
      "Calcula o tamanho exato da string Base64",
      "Botão de cópia rápida com 1 clique e opção de download em .txt",
      "Zero envio de arquivos para a nuvem (máxima segurança e privacidade)"
    ],
    faqs: [
      {
        question: "Quando vale a pena embutir imagens em Base64?",
        answer: "O Base64 é recomendado para ícones pequenos e imagens decorativas leves, pois elimina requisições HTTP extras e evita que a imagem 'pisque' ao carregar."
      },
      {
        question: "Existe limite de tamanho para converter em Base64?",
        answer: "Não há limite no CrieGrátis porque o processamento ocorre no seu computador, mas é uma boa prática evitar imagens muito grandes para não sobrecarregar o CSS ou HTML."
      }
    ]
  },
  {
    slug: "remover-fundo-branco",
    name: "Remover Fundo Branco",
    shortDescription: "Torne o fundo branco ou sólido de logos, assinaturas e fotos 100% transparente.",
    fullDescription: "Remova fundos brancos e claros de logotipos, ícones, desenhos e assinaturas digitalizadas. Ajuste a tolerância de sensibilidade em tempo real para obter bordas perfeitas e salve o resultado em PNG com transparência total.",
    category: "imagens",
    keywords: ["remover fundo branco", "tirar fundo branco imagem", "remover fundo png", "fundo transparente logo", "assinatura sem fundo"],
    icon: "Eraser",
    href: "/remover-fundo-branco",
    metaTitle: "Remover Fundo Branco de Imagem Grátis | CrieGrátis",
    metaDescription: "Tire o fundo branco de logotipos, assinaturas e desenhos grátis. Salve em PNG transparente com controle de tolerância 100% no navegador.",
    h1: "Remover Fundo Branco de Imagem",
    badge: "Novo",
    usageSteps: [
      "Carregue a imagem (PNG, JPG, WebP) com fundo branco ou claro.",
      "Ajuste a régua de tolerância para regular a precisão das bordas.",
      "Veja o resultado em tempo real sobre a grade xadrez de transparência.",
      "Clique em 'Baixar Imagem sem Fundo' para salvar em PNG transparente."
    ],
    features: [
      "Remoção rápida de fundos brancos com suavização inteligente de bordas",
      "Slider de sensibilidade para evitar apagar detalhes finos",
      "Grade de preview com transparência alfa autêntica",
      "Ideal para assinaturas de contratos, carimbos, logos e ilustrações"
    ],
    faqs: [
      {
        question: "Esta ferramenta funciona bem para assinaturas escaneadas?",
        answer: "Sim! É uma das melhores aplicações: você faz o upload da foto do papel com a assinatura, ajusta a tolerância e obtém um arquivo PNG transparente pronto para assinar PDFs."
      },
      {
        question: "Minha foto pessoal ou assinatura é enviada para algum servidor?",
        answer: "Não! A remoção do fundo é feita pixel a pixel diretamente no processador da sua máquina via HTML5 Canvas."
      }
    ]
  },
  {
    slug: "conta-gotas-imagem",
    name: "Conta-gotas de Imagem (Color Picker)",
    shortDescription: "Identifique e copie cores exatas de qualquer foto em HEX, RGB e HSL com 1 clique.",
    fullDescription: "Extraia paletas de cores e códigos cromáticos de qualquer foto, arte ou print. Basta passar o mouse ou tocar na imagem para inspecionar pixels com zoom e copiar instantaneamente os códigos HEX, RGB e HSL.",
    category: "imagens",
    keywords: ["conta gotas imagem", "color picker imagem", "pegar cor de imagem", "extrair cor foto", "hex da imagem"],
    icon: "Pipette",
    href: "/conta-gotas-imagem",
    metaTitle: "Conta-gotas de Imagem — Extrair Cores HEX e RGB | CrieGrátis",
    metaDescription: "Identifique e copie cores de imagens grátis em HEX, RGB e HSL. Conta-gotas com lupa interativa e histórico de paleta no navegador.",
    h1: "Conta-gotas de Imagem (Color Picker)",
    badge: "Novo",
    usageSteps: [
      "Faça upload da foto, print de tela ou ilustração.",
      "Mova o cursor do mouse sobre a área da imagem cuja cor você quer descobrir.",
      "Clique para fixar a cor na paleta de histórico recente.",
      "Clique no botão de cópia ao lado dos códigos HEX, RGB ou HSL."
    ],
    features: [
      "Leitura precisa de pixels em tempo real sob o cursor",
      "Códigos prontos nos formatos HEX (#FFFFFF), RGB e HSL",
      "Histórico com as últimas 10 cores capturadas para fácil comparação",
      "Não requer instalação de extensões de navegador ou softwares pesados"
    ],
    faqs: [
      {
        question: "O conta-gotas funciona com imagens de qualquer resolução?",
        answer: "Sim! Ele lê as coordenadas exatas da imagem original, garantindo que você capture a cor autêntica do pixel mesmo em fotos de alta resolução."
      },
      {
        question: "Como copio a cor para o Photoshop ou Figma?",
        answer: "Basta clicar no ícone de cópia ao lado do código HEX (ex: #2563EB) e colar diretamente no seletor de cores do seu software favorito."
      }
    ]
  },
  {
    slug: "espelhar-imagem",
    name: "Espelhar Imagem (Flip)",
    shortDescription: "Espelhe imagens horizontalmente ou verticalmente em segundos sem perder qualidade.",
    fullDescription: "Inverta e espelhe fotos na horizontal (efeito espelho) ou vertical (de cabeça para baixo). Perfeito para corrigir fotos tiradas com a câmera frontal do celular, preparar artes para estamparia e sublimação ou composições criativas.",
    category: "imagens",
    keywords: ["espelhar imagem", "inverter foto", "flip image", "espelhar foto horizontal", "efeito espelho foto"],
    icon: "FlipHorizontal",
    href: "/espelhar-imagem",
    metaTitle: "Espelhar Imagem Online — Inverter Horizontal e Vertical | CrieGrátis",
    metaDescription: "Espelhe fotos na horizontal e vertical grátis. Corrija fotos de câmera frontal ou prepare artes de sublimação sem perder qualidade.",
    h1: "Espelhar Imagem (Flip Horizontal e Vertical)",
    badge: "Novo",
    usageSteps: [
      "Envie a foto ou arte que você deseja inverter.",
      "Clique em 'Espelhar Horizontal' (efeito espelho) e/ou 'Espelhar Vertical' (de ponta-cabeça).",
      "Confira a transformação no preview em tempo real.",
      "Clique em 'Baixar Imagem Espelhada' para salvar no seu computador."
    ],
    features: [
      "Espelhamento horizontal e vertical independente ou combinado",
      "Preservação integral da resolução e nitidez original da foto",
      "Botão de restauração rápida para comparar com o arquivo original",
      "Processamento instantâneo e seguro sem upload externo"
    ],
    faqs: [
      {
        question: "Por que as fotos da câmera frontal saem invertidas?",
        answer: "Muitos smartphones salvam a foto frontal como se alguém estivesse olhando para você, e não como você se enxerga no espelho. A ferramenta de espelhamento horizontal corrige isso em 1 segundo."
      },
      {
        question: "Essa ferramenta serve para preparar artes para sublimação e estampas?",
        answer: "Sim! Na sublimação em camisetas e canecas, a arte precisa ser espelhada antes da impressão para que textos e logos apareçam corretamente no produto final."
      }
    ]
  },
  {
    slug: "remover-linhas-duplicadas",
    name: "Remover Linhas Duplicadas",
    shortDescription: "Elimine repetições de listas, e-mails ou cadastros com filtros inteligentes e ordenação.",
    fullDescription: "Ferramenta rápida para remover linhas duplicadas e limpar listas de e-mails, cadastros, códigos ou dados exportados de planilhas. Configure diferenciação de maiúsculas/minúsculas, remoção de espaços em branco e ordenação de A-Z.",
    category: "texto",
    keywords: ["remover linhas duplicadas", "deduplicar lista", "tirar linhas repetidas", "limpar lista de emails", "remover duplicadas excel"],
    icon: "ListFilter",
    href: "/remover-linhas-duplicadas",
    metaTitle: "Remover Linhas Duplicadas Online e Grátis | CrieGrátis",
    metaDescription: "Remova linhas duplicadas de listas e textos grátis. Deduplicação inteligente com filtros de maiúsculas, espaços e ordenação no navegador.",
    h1: "Remover Linhas Duplicadas de Texto",
    badge: "Novo",
    usageSteps: [
      "Cole sua lista de itens ou linhas no campo da esquerda.",
      "Ative opções opcionais: ignorar espaços, diferenciar maiúsculas ou ordenar de A-Z.",
      "Acompanhe o total de linhas únicas e duplicadas removidas em tempo real.",
      "Clique em 'Copiar Linhas Únicas' ou faça o download em arquivo .TXT."
    ],
    features: [
      "Processamento instantâneo para milhares de linhas",
      "Filtros de sensibilidade a maiúsculas e corte de espaços nas pontas",
      "Contador comparativo de linhas originais vs. linhas únicas",
      "Garantia de privacidade total: dados processados na memória local"
    ],
    faqs: [
      {
        question: "Como a ferramenta lida com espaços extras?",
        answer: "Com a opção 'Ignorar Espaços' ativada, linhas como ' email@teste.com ' e 'email@teste.com' são identificadas como a mesma linha, garantindo uma lista perfeitamente limpa."
      },
      {
        question: "Existe limite no número de linhas?",
        answer: "Não! Como o algoritmo roda localmente no seu computador, ele é capaz de processar dezenas de milhares de linhas instantaneamente sem travar."
      }
    ]
  },
  {
    slug: "comparar-textos",
    name: "Comparador de Textos (Diff Checker)",
    shortDescription: "Compare duas versões de um texto e veja as adições, remoções e alterações lado a lado.",
    fullDescription: "Encontre rapidamente as diferenças entre dois textos, contratos, redações ou trechos de código. O comparador visual destaca linhas adicionadas em verde e linhas removidas em vermelho com contadores de alterações.",
    category: "texto",
    keywords: ["comparar textos", "diff checker online", "comparador de texto", "diferenca entre textos", "ver mudancas texto"],
    icon: "GitCompare",
    href: "/comparar-textos",
    metaTitle: "Comparador de Textos Online — Diff Checker Grátis | CrieGrátis",
    metaDescription: "Compare dois textos e veja diferenças lado a lado grátis. Destaque colorido para linhas adicionadas e removidas sem enviar dados para a internet.",
    h1: "Comparador de Textos (Diff Checker)",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Cole o texto original no campo 'Texto Original (Antes)'.",
      "Cole a versão revisada no campo 'Texto Modificado (Depois)'.",
      "Veja instantaneamente o relatório colorido de adições e remoções.",
      "Identifique alterações pontuais em contratos, códigos ou minutas."
    ],
    features: [
      "Algoritmo de diff em tempo real com destaque visual claro",
      "Numeração de linhas sincronizada entre os dois documentos",
      "Contadores de linhas adicionadas e removidas",
      "100% privado: seus contratos e documentos confidenciais nunca saem da sua máquina"
    ],
    faqs: [
      {
        question: "É seguro comparar contratos ou documentos confidenciais nesta ferramenta?",
        answer: "Sim, 100% seguro. O algoritmo de comparação é executado puramente em JavaScript no seu navegador. Nenhum caractere é enviado ou armazenado em servidores externos."
      },
      {
        question: "O comparador funciona para código de programação?",
        answer: "Sim! É excelente para revisar alterações em scripts SQL, HTML, JSON, CSS, JavaScript e qualquer linguagem de programação."
      }
    ]
  },
  {
    slug: "inverter-texto",
    name: "Inverter Texto",
    shortDescription: "Inverta caracteres, palavras, linhas inteiras ou vire o texto de cabeça para baixo.",
    fullDescription: "Ferramenta divertida e prática para inverter texto de múltiplas maneiras: letra por letra (efeito espelho), ordem das palavras, linhas de trás para frente ou até virar o texto de ponta-cabeça usando caracteres especiais Unicode.",
    category: "texto",
    keywords: ["inverter texto", "texto invertido", "texto de cabeca para baixo", "inverter letras", "texto espelhado"],
    icon: "RotateCw",
    href: "/inverter-texto",
    metaTitle: "Inverter Texto Online — Letras, Palavras e Cabeça p/ Baixo | CrieGrátis",
    metaDescription: "Inverta textos grátis. Inversão de letras, ordem de palavras, linhas e texto de cabeça para baixo para redes sociais e brincadeiras.",
    h1: "Inverter Texto Online",
    badge: "Novo",
    usageSteps: [
      "Digite ou cole o texto na caixa de entrada.",
      "Selecione o modo: Inverter Caracteres, Palavras, Linhas ou De Cabeça para Baixo.",
      "Veja o resultado transformado imediatamente na caixa de saída.",
      "Clique no botão 'Copiar Texto Invertido' para colar nas redes sociais ou mensagens."
    ],
    features: [
      "4 modos completos de inversão em tempo real",
      "Texto de cabeça para baixo compatível com WhatsApp, Instagram e Twitter",
      "Preservação de quebras de linha e pontuações",
      "Botão de cópia rápida com 1 clique"
    ],
    faqs: [
      {
        question: "O texto de cabeça para baixo funciona no WhatsApp e Instagram?",
        answer: "Sim! Ele utiliza caracteres Unicode reais (como ɐ, q, ɔ), que são suportados por todos os aplicativos de mensagens e redes sociais modernos."
      }
    ]
  },
  {
    slug: "ordenar-lista",
    name: "Ordenar Lista Alfabética e Numérica",
    shortDescription: "Classifique listas de A-Z, Z-A ou numérica com tratamento de acentos e numeração automática.",
    fullDescription: "Organize listas desordenadas em ordem alfabética crescente (A-Z) ou decrescente (Z-A), ou por valor numérico. Trata acentos em português automaticamente e oferece opção para adicionar numeração sequencial (1., 2., 3.).",
    category: "texto",
    keywords: ["ordenar lista", "colocar em ordem alfabetica", "ordenar az", "organizar lista alfabetica", "ordenador de nomes"],
    icon: "ArrowUpDown",
    href: "/ordenar-lista",
    metaTitle: "Ordenar Lista Alfabética e Numérica Online | CrieGrátis",
    metaDescription: "Coloque listas em ordem alfabética (A-Z) ou numérica grátis. Ignore acentos, remova linhas vazias e adicione numeração com 1 clique.",
    h1: "Ordenar Lista Alfabética e Numérica",
    badge: "Novo",
    usageSteps: [
      "Cole sua lista de palavras, nomes ou números na caixa da esquerda.",
      "Escolha o tipo de ordenação (A-Z, Z-A, Numérico ou Tamanho da Linha).",
      "Marque opções complementares: ignorar acentos, remover vazios ou numerar itens.",
      "Copie a lista perfeitamente organizada ou baixe em arquivo .TXT."
    ],
    features: [
      "Ordenação alfabética natural em português (respeita acentuação)",
      "Ordenação numérica inteligente (entende números em listas de preços e dados)",
      "Opção de numeração sequencial automática (1., 2., 3.)",
      "Download direto em arquivo .TXT limpo"
    ],
    faqs: [
      {
        question: "A ordenação trata letras com acento (como Á, É, Í) corretamente?",
        answer: "Sim! Com a opção 'Ignorar Acentos' ativada, palavras como 'Árvore' e 'Amora' são organizadas de acordo com as normas alfabéticas da língua portuguesa."
      }
    ]
  },
  {
    slug: "contador-de-linhas",
    name: "Contador de Linhas e Parágrafos",
    shortDescription: "Conte linhas totais, linhas com conteúdo, parágrafos, palavras e densidade de texto.",
    fullDescription: "Ferramenta analítica para contagem precisa de linhas totais, linhas com texto, linhas em branco, parágrafos, palavras e caracteres. Ideal para redatores, programadores, advogados e estudantes analisarem a estrutura de seus documentos.",
    category: "texto",
    keywords: ["contador de linhas", "contar linhas texto", "contar paragrafos", "quantas linhas tem o texto", "medir tamanho texto"],
    icon: "AlignJustify",
    href: "/contador-de-linhas",
    metaTitle: "Contador de Linhas e Parágrafos Online e Grátis | CrieGrátis",
    metaDescription: "Conte linhas totais, linhas preenchidas, linhas vazias, parágrafos e caracteres em tempo real. Grátis e sem limites no navegador.",
    h1: "Contador de Linhas e Parágrafos",
    badge: "Novo",
    usageSteps: [
      "Cole ou digite o texto ou código no campo principal.",
      "Visualize instantaneamente os contadores de linhas totais, preenchidas e vazias.",
      "Consulte métricas complementares como média de caracteres por linha e parágrafos.",
      "Clique em 'Copiar Relatório de Métricas' para compartilhar os dados."
    ],
    features: [
      "Cálculo instantâneo sem recarregar a página",
      "Diferenciação clara entre linhas totais, com texto e vazias",
      "Estatísticas de parágrafos, caracteres e linha mais longa",
      "Botão de cópia de relatório formatado para documentação"
    ],
    faqs: [
      {
        question: "Como a ferramenta diferencia uma linha de um parágrafo?",
        answer: "Uma linha é definida por qualquer quebra de linha individual (Enter). Já um parágrafo é identificado como um bloco contínuo de texto separado por uma ou mais linhas vazias."
      }
    ]
  },
  {
    slug: "gerador-validador-cnpj",
    name: "Gerador e Validador de CNPJ",
    shortDescription: "Gere CNPJs válidos para testes ou valide números existentes com identificação de raiz e dígitos.",
    fullDescription: "Ferramenta essencial para desenvolvedores e testers: gere números de CNPJ matematicamente válidos (com ou sem pontuação) ou valide CNPJs existentes com conferência dos dígitos verificadores pelo algoritmo oficial da Receita Federal.",
    category: "desenvolvedor",
    keywords: ["gerador de cnpj", "validador de cnpj", "gerar cnpj valido", "validar cnpj online", "cnpj teste"],
    icon: "Building2",
    href: "/gerador-validador-cnpj",
    metaTitle: "Gerador e Validador de CNPJ Online e Grátis | CrieGrátis",
    metaDescription: "Gere CNPJs válidos para testes de software ou valide dígitos verificadores online grátis. Com ou sem formatação, 100% no navegador.",
    h1: "Gerador e Validador de CNPJ",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Na aba 'Gerador', selecione se deseja a pontuação (00.000.000/0001-00) ou apenas números.",
      "Clique em 'Gerar Novo CNPJ' para criar um número matematicamente válido.",
      "Na aba 'Validador', cole qualquer número de CNPJ para verificar se os dígitos estão corretos.",
      "Copie o resultado com 1 clique para usar em testes de formulários e sistemas."
    ],
    features: [
      "Algoritmo oficial de módulo 11 da Receita Federal",
      "Geração instantânea com ou sem máscara de pontuação",
      "Validador inteligente que aceita números com símbolos, espaços ou limpos",
      "Aviso didático lembrando o uso exclusivo para testes de desenvolvimento"
    ],
    faqs: [
      {
        question: "Os CNPJs gerados são reais?",
        answer: "Não. Os números gerados seguem as regras matemáticas de validação (módulo 11), mas destinam-se estritamente a testes de software e validação de formulários em ambiente de desenvolvimento."
      },
      {
        question: "Como funciona a validação do CNPJ?",
        answer: "O CNPJ possui 14 dígitos, onde os 12 primeiros representam a inscrição e filial, e os dois últimos são calculados a partir de somas ponderadas pelos pesos 5,4,3,2,9,8,7,6,5,4,3,2."
      }
    ]
  },
  {
    slug: "gerador-lorem-ipsum",
    name: "Gerador de Lorem Ipsum",
    shortDescription: "Gere textos fictícios para mockups e layouts por parágrafos, frases ou palavras com tags HTML.",
    fullDescription: "Crie textos de preenchimento Lorem Ipsum sob medida para protótipos de design, interfaces UI e diagramações editoriais. Personalize por número de parágrafos, frases ou palavras, e adicione tags HTML (<p>) com um clique.",
    category: "desenvolvedor",
    keywords: ["gerador lorem ipsum", "lorem ipsum generator", "texto ficticio", "gerar texto para teste", "texto para mockup"],
    icon: "Pilcrow",
    href: "/gerador-lorem-ipsum",
    metaTitle: "Gerador de Lorem Ipsum Online e Grátis | CrieGrátis",
    metaDescription: "Gere texto de preenchimento Lorem Ipsum grátis. Escolha por parágrafos, frases ou palavras com suporte a tags HTML para designers e devs.",
    h1: "Gerador de Lorem Ipsum",
    badge: "Novo",
    usageSteps: [
      "Escolha a unidade desejada: Parágrafos, Frases ou Palavras.",
      "Defina a quantidade exata no controle numérico.",
      "Marque se deseja iniciar com a expressão clássica 'Lorem ipsum dolor sit amet...' e se quer envolver em tags <p>.",
      "Clique em 'Copiar Texto' para colar no Figma, Photoshop ou editor de código."
    ],
    features: [
      "Vocabulário latino autêntico de Cícero (45 a.C.)",
      "3 modos de contagem: Parágrafos, Frases ou Palavras",
      "Opção de saída já formatada com tags HTML (<p>...</p>)",
      "Cálculo instantâneo de caracteres e palavras no preview"
    ],
    faqs: [
      {
        question: "Qual a origem do texto Lorem Ipsum?",
        answer: "O Lorem Ipsum é derivado de seções do tratado ético de Cícero, 'De Finibus Bonorum et Malorum', escrito em 45 a.C., sendo utilizado como padrão gráfico na indústria tipográfica desde o século XVI."
      }
    ]
  },
  {
    slug: "url-encoder-decoder",
    name: "URL Encoder e Decoder",
    shortDescription: "Codifique e decodifique URLs, parâmetros de consulta (querystrings) e caracteres especiais.",
    fullDescription: "Ferramenta para codificar caracteres especiais de endereços web no padrão percent-encoding (%20, %26, %3F) ou decodificar links codificados de volta para o formato legível. Suporta codificação de URL completa ou apenas de parâmetros de consulta.",
    category: "desenvolvedor",
    keywords: ["url encode", "url decode", "codificar url", "decodificar url", "percent encoding online"],
    icon: "Link2",
    href: "/url-encoder-decoder",
    metaTitle: "URL Encoder e Decoder Online — Codificar URLs Grátis | CrieGrátis",
    metaDescription: "Codifique e decodifique URLs e parâmetros online grátis. Converta espaços em %20 ou +, e decodifique URLs complexas com 100% de privacidade.",
    h1: "URL Encoder e Decoder",
    badge: "Novo",
    usageSteps: [
      "Escolha a aba 'Codificar (Encode)' ou 'Decodificar (Decode)'.",
      "Cole o link, texto ou parâmetro que você deseja converter.",
      "Selecione o modo: URL Completa ou Parâmetro de Query (encodeURIComponent).",
      "Copie a URL resultante com 1 clique."
    ],
    features: [
      "Suporte a encodeURI e encodeURIComponent",
      "Decodificação inteligente com detecção de erros de sintaxe",
      "Opção de substituir espaços por '+' ou '%20'",
      "Visualizador de parâmetros de querystring decodificados"
    ],
    faqs: [
      {
        question: "Qual a diferença entre codificar URL completa e parâmetro?",
        answer: "Ao codificar uma URL completa, caracteres estruturais como ':', '/' e '?' são preservados. Ao codificar um parâmetro (encodeURIComponent), todos os caracteres especiais são convertidos para garantir que não quebrem a URL pai."
      }
    ]
  },
  {
    slug: "gerador-hash",
    name: "Gerador de Hash (MD5, SHA-1, SHA-256, SHA-512)",
    shortDescription: "Gere hashes criptográficos instantâneos de qualquer texto com Web Crypto API nativa.",
    fullDescription: "Calcule resumos criptográficos (hashes) de senhas, textos ou códigos usando os algoritmos mais populares do mercado: MD5, SHA-1, SHA-256 e SHA-512. Ideal para verificação de integridade e testes de segurança.",
    category: "desenvolvedor",
    keywords: ["gerador de hash", "sha256 online", "gerar md5", "hash generator", "sha512 calculator"],
    icon: "Fingerprint",
    href: "/gerador-hash",
    metaTitle: "Gerador de Hash Online — MD5, SHA-256, SHA-512 | CrieGrátis",
    metaDescription: "Gere hashes criptográficos MD5, SHA-1, SHA-256 e SHA-512 online grátis. Cálculo seguro via Web Crypto API sem enviar dados a servidores.",
    h1: "Gerador de Hash Criptográfico",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Digite ou cole o texto ou senha no campo de entrada.",
      "Os hashes correspondentes (MD5, SHA-1, SHA-256, SHA-512) são calculados em tempo real.",
      "Alterne entre formato minúsculo ou MAIÚSCULO conforme a necessidade da sua aplicação.",
      "Clique no botão de cópia ao lado do hash desejado."
    ],
    features: [
      "Cálculo simultâneo de 4 algoritmos em paralelo",
      "Implementação segura baseada na API nativa crypto.subtle",
      "Alternância rápida entre representação Hexadecimal minúscula e maiúscula",
      "Zero transmissão de dados: seus textos e senhas nunca saem da máquina"
    ],
    faqs: [
      {
        question: "O que é um hash criptográfico?",
        answer: "Um hash é uma função matemática unidirecional que transforma qualquer entrada de dados em uma sequência de caracteres de tamanho fixo. Não é possível 'descriptografar' um hash de volta para o texto original."
      }
    ]
  },
  {
    slug: "formatar-sql",
    name: "Formatador de SQL (SQL Beautifier)",
    shortDescription: "Indente e formate consultas SQL automaticamente com palavras-chave em maiúsculas.",
    fullDescription: "Organize consultas SQL desordenadas, compactas ou complexas em um layout legível e profissional. Aplique indentação consistente em cláusulas SELECT, FROM, WHERE, JOIN, GROUP BY e padronize palavras-chave em maiúsculas.",
    category: "desenvolvedor",
    keywords: ["formatar sql", "sql formatter", "beautify sql", "identar sql online", "organizar query sql"],
    icon: "Database",
    href: "/formatar-sql",
    metaTitle: "Formatador de SQL Online — Indentar e Embelezar Queries | CrieGrátis",
    metaDescription: "Formate e indente códigos SQL online grátis. Padronize cláusulas SELECT, JOIN e WHERE com palavras-chave em maiúsculas no navegador.",
    h1: "Formatador de SQL Online",
    badge: "Novo",
    usageSteps: [
      "Cole sua consulta SQL (MySQL, PostgreSQL, Oracle, SQL Server, SQLite) no editor.",
      "Clique em 'Formatar SQL' ou use os atalhos de compactação.",
      "Ajuste opções como tamanho da indentação (2 ou 4 espaços) e letras maiúsculas.",
      "Copie o código SQL perfeitamente estruturado ou baixe em arquivo .sql."
    ],
    features: [
      "Reconhecimento de dialetos SQL comuns (Postgres, MySQL, SQLite, T-SQL)",
      "Opção de colocar palavras-chave reservadas em MAIÚSCULAS automaticamente",
      "Modo Minificar para compactar a consulta em uma única linha",
      "Processamento 100% local com segurança para queries de bancos de dados sensíveis"
    ],
    faqs: [
      {
        question: "Minhas consultas e nomes de tabelas ficam salvos em algum lugar?",
        answer: "Não. A formatação ocorre inteiramente no seu navegador via JavaScript. Nenhuma linha de código ou informação sobre a estrutura do seu banco de dados é transmitida."
      }
    ]
  },
  {
    slug: "formatar-xml",
    name: "Formatador de XML (XML Beautifier)",
    shortDescription: "Formate, indente e valide a sintaxe de documentos e arquivos XML com detecção de erros.",
    fullDescription: "Ferramenta para identar, alinhar e validar a estrutura hierárquica de arquivos XML, feeds RSS e documentos fiscais (NFe, CTe). Identifica tags não fechadas ou erros de sintaxe com alertas detalhados.",
    category: "desenvolvedor",
    keywords: ["formatar xml", "xml formatter", "beautify xml", "validar xml online", "identar nfe xml"],
    icon: "FileCode",
    href: "/formatar-xml",
    metaTitle: "Formatador e Validador de XML Online e Grátis | CrieGrátis",
    metaDescription: "Formate e indente documentos XML online grátis. Valide sintaxe com alertas de erro e compacte arquivos sem enviar dados a servidores.",
    h1: "Formatador de XML Online",
    badge: "Novo",
    usageSteps: [
      "Cole o conteúdo XML ou carregue um arquivo .xml no editor.",
      "Clique em 'Formatar XML' para aplicar a indentação hierárquica.",
      "Se houver erros de sintaxe, consulte a linha e o motivo informado pelo validador.",
      "Copie o XML limpo ou faça o download com 1 clique."
    ],
    features: [
      "Validação de sintaxe em tempo real com motor DOMParser nativo",
      "Indentação customizável (2 espaços, 4 espaços ou tabulação)",
      "Modo Minificar para reduzir o tamanho de arquivos XML",
      "Ideal para desenvolvedores que trabalham com APIs SOAP, NFe e feeds"
    ],
    faqs: [
      {
        question: "Esta ferramenta valida arquivos de Nota Fiscal Eletrônica (NFe)?",
        answer: "Sim! Ela verifica se a sintaxe do XML está bem-formada e identa as tags para facilitar a leitura humana dos dados de emissão e produtos."
      }
    ]
  },
  {
    slug: "gerador-metatags",
    name: "Gerador de Meta Tags (Open Graph e SEO)",
    shortDescription: "Crie tags Open Graph, Twitter Cards e SEO para seu site com visualização ao vivo de compartilhamento.",
    fullDescription: "Gere o bloco completo de meta tags HTML para posicionar seu site no topo do Google e garantir prévias perfeitas ao compartilhar links no WhatsApp, Facebook, LinkedIn e Twitter. Acompanhe a prévia visual interativa em tempo real.",
    category: "desenvolvedor",
    keywords: ["gerador de meta tags", "meta tags seo", "open graph generator", "twitter card generator", "preview compartilhamento whatsapp"],
    icon: "Share2",
    href: "/gerador-metatags",
    metaTitle: "Gerador de Meta Tags e Open Graph com Preview | CrieGrátis",
    metaDescription: "Gere meta tags SEO, Open Graph e Twitter Cards grátis. Veja o preview do card do Google, WhatsApp e Twitter em tempo real no navegador.",
    h1: "Gerador de Meta Tags e Open Graph",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Preencha o título da página, descrição, URL canônica e imagem de capa (og:image).",
      "Escolha se a página deve ser indexável por robôs (robots index, follow).",
      "Observe os simuladores visuais ao vivo para Google, WhatsApp e Twitter.",
      "Copie o código HTML gerado e cole dentro da tag <head> do seu site."
    ],
    features: [
      "Simulador visual em tempo real (Google SERP, card WhatsApp/Facebook e Twitter)",
      "Contadores de caracteres recomendados para título e descrição de SEO",
      "Tags Open Graph completas (og:title, og:description, og:image, og:url)",
      "Suporte a Twitter Summary Large Image Card"
    ],
    faqs: [
      {
        question: "Qual o tamanho recomendado para a imagem Open Graph?",
        answer: "A resolução ideal recomendada pelas redes sociais (Facebook, LinkedIn, Twitter, WhatsApp) é 1200 x 630 pixels na proporção 1.91:1."
      }
    ]
  },
  {
    slug: "gerador-codigo-de-barras",
    name: "Gerador de Código de Barras",
    shortDescription: "Gere códigos de barras nos padrões Code 128 e EAN-13 para produtos e etiquetas em PNG e SVG.",
    fullDescription: "Crie códigos de barras de alta resolução para impressão de etiquetas, identificação de produtos comerciais, patrimônio e logística. Suporta simbologias Code 128 (alfanumérico) e EAN-13 com cálculo automático de dígito verificador e download em vetor SVG e imagem PNG.",
    category: "desenvolvedor",
    keywords: ["gerador de codigo de barras", "gerar codigo de barras ean 13", "code 128 online", "codigo de barras etiquetas", "barcode generator svg"],
    icon: "Barcode",
    href: "/gerador-codigo-de-barras",
    metaTitle: "Gerador de Código de Barras Online — Code 128 e EAN-13 | CrieGrátis",
    metaDescription: "Gere códigos de barras Code 128 e EAN-13 grátis. Baixe em vetor SVG ou PNG de alta resolução para etiquetas e embalagens no navegador.",
    h1: "Gerador de Código de Barras",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Escolha o padrão desejado: Code 128 (geral/alfanumérico) ou EAN-13 (produtos comerciais).",
      "Digite o código ou use o botão 'Exemplo' para preenchimento rápido.",
      "Ajuste a largura e altura das barras e escolha se deseja exibir a numeração abaixo.",
      "Baixe em formato PNG para impressão ou em vetor SVG para gráficas."
    ],
    features: [
      "Padrões industriais Code 128 e EAN-13 com cálculo de checksum oficial",
      "Download em vetor SVG escalável e imagem PNG nítida",
      "Customização de dimensões, cores das barras e cor de fundo",
      "100% executado localmente no navegador sem envio a servidores"
    ],
    faqs: [
      {
        question: "Qual a diferença entre Code 128 e EAN-13?",
        answer: "O Code 128 aceita letras, números e símbolos, sendo ideal para etiquetas de logística, estoque e crachás. O EAN-13 é estritamente numérico (13 dígitos) e é o padrão internacional obrigatório para produtos vendidos no varejo."
      },
      {
        question: "Como funciona o 13º dígito do EAN-13?",
        answer: "O último dígito do EAN-13 é um dígito verificador calculado automaticamente a partir dos 12 primeiros números usando uma soma com pesos alternados 1 e 3."
      }
    ]
  },
  {
    slug: "calculadora-imc",
    name: "Calculadora de IMC (Índice de Massa Corporal)",
    shortDescription: "Calcule seu IMC em segundos com classificação oficial da OMS, régua visual e peso ideal.",
    fullDescription: "Calcule seu Índice de Massa Corporal (IMC) com base no seu peso e altura. Acompanhe a régua visual com faixas de classificação oficiais da Organização Mundial da Saúde (OMS), descubra sua faixa de peso ideal e veja dicas de saúde.",
    category: "calculadoras",
    keywords: ["calculadora de imc", "calcular imc online", "tabela imc oms", "peso ideal calculadora", "indice de massa corporal"],
    icon: "Activity",
    href: "/calculadora-imc",
    metaTitle: "Calculadora de IMC Online — Calcular Índice de Massa Corporal | CrieGrátis",
    metaDescription: "Calcule seu IMC online grátis. Classificação oficial da OMS, régua visual interativa e faixa de peso ideal recomendada para sua altura.",
    h1: "Calculadora de IMC (Índice de Massa Corporal)",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Informe seu peso em quilogramas (ex: 70 kg).",
      "Informe sua altura em centímetros ou metros (ex: 175 cm ou 1.75 m).",
      "O IMC e a classificação da OMS são exibidos instantaneamente na régua colorida.",
      "Consulte sua faixa de peso ideal e copie o resumo com 1 clique."
    ],
    features: [
      "Fórmula oficial recomendada pela Organização Mundial da Saúde (OMS)",
      "Régua colorida visual de 6 faixas (do abaixo do peso à obesidade grau III)",
      "Cálculo automático da faixa de peso ideal saudável para sua altura",
      "Diferença em quilos para alcançar a faixa de peso recomendada"
    ],
    faqs: [
      {
        question: "Como o IMC é calculado?",
        answer: "A fórmula divide o peso (em quilos) pelo quadrado da altura (em metros): IMC = peso / (altura x altura)."
      },
      {
        question: "O IMC é indicado para atletas?",
        answer: "O IMC é um indicador populacional geral. Em praticantes intensos de musculação e atletas de alta performance, a grande quantidade de massa muscular pode elevar o IMC sem significar excesso de gordura corporal."
      }
    ]
  },
  {
    slug: "calculadora-de-dias",
    name: "Calculadora de Dias entre Datas",
    shortDescription: "Calcule o intervalo exato em dias corridos, dias úteis, semanas e meses entre duas datas.",
    fullDescription: "Descubra a quantidade exata de dias entre duas datas quaisquer. Ideal para contagem regressiva de viagens, prazos de contratos judiciais, metas de projetos e eventos. Inclui detalhamento de dias de semana e fins de semana.",
    category: "calculadoras",
    keywords: ["calculadora de dias", "dias entre datas", "quantos dias faltam", "contador de dias", "calcular diferenca de datas"],
    icon: "Calendar",
    href: "/calculadora-de-dias",
    metaTitle: "Calculadora de Dias entre Duas Datas Online e Grátis | CrieGrátis",
    metaDescription: "Calcule a diferença em dias entre duas datas grátis. Descubra dias corridos, dias úteis, semanas, meses e horas totais no navegador.",
    h1: "Calculadora de Dias entre Datas",
    badge: "Novo",
    usageSteps: [
      "Escolha a Data Inicial (ou clique em 'Definir Hoje').",
      "Escolha a Data Final (ou use atalhos de +7d, +15d, +30d).",
      "Marque se deseja incluir a data final na contagem total.",
      "Visualize o total de dias corridos, fins de semana e horas totais."
    ],
    features: [
      "Cálculo instantâneo de dias corridos com precisão de calendário gregoriano",
      "Separação entre dias de semana (segunda a sexta) e fins de semana",
      "Conversão automática em semanas completas, meses aproximados e horas totais",
      "Opção de cálculo inclusivo ou exclusivo da data final"
    ],
    faqs: [
      {
        question: "O que é contagem inclusiva?",
        answer: "Na contagem inclusiva, o dia de início e o dia de término contam como dias inteiros. Por exemplo: de segunda a quarta são 3 dias (seg, ter, qua), enquanto na contagem exclusiva são 2 dias de intervalo."
      }
    ]
  },
  {
    slug: "calculadora-dias-uteis",
    name: "Calculadora de Dias Úteis",
    shortDescription: "Calcule prazos e dias úteis excluindo fins de semana e todos os feriados nacionais do Brasil.",
    fullDescription: "Ferramenta indispensável para prazos contratuais, processos judiciais, compras no e-commerce e entregas empresariais. Exclui automaticamente sábados, domingos e feriados nacionais brasileiros (fixos e móveis como Carnaval e Corpus Christi).",
    category: "calculadoras",
    keywords: ["calculadora de dias uteis", "calcular dias uteis", "dias uteis entre datas", "prazo dias uteis correios", "feriados nacionais calculadora"],
    icon: "CalendarDays",
    href: "/calculadora-dias-uteis",
    metaTitle: "Calculadora de Dias Úteis Online com Feriados Nacionais | CrieGrátis",
    metaDescription: "Calcule dias úteis entre duas datas ou some dias úteis com exclusão automática de feriados nacionais brasileiros e fins de semana grátis.",
    h1: "Calculadora de Dias Úteis no Brasil",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Selecione o modo: 'Dias Úteis Entre Duas Datas' ou 'Somar Dias Úteis a uma Data'.",
      "Preencha as datas ou a quantidade de dias do prazo de entrega.",
      "O sistema consulta o calendário oficial de feriados do Brasil e exclui fins de semana.",
      "Consulte a lista de feriados identificados no período e a data final exata de vencimento."
    ],
    features: [
      "Algoritmo astronômico de cálculo de Páscoa, Carnaval, Sexta-feira Santa e Corpus Christi",
      "Inclusão de todos os 12 feriados nacionais oficiais da legislação brasileira",
      "Modo soma de prazo: descubra o dia exato da semana em que um prazo de N dias úteis termina",
      "Detalhamento nominal de cada feriado que cai em dia útil no intervalo"
    ],
    faqs: [
      {
        question: "Quais feriados são considerados no cálculo?",
        answer: "Todos os feriados nacionais vigentes no Brasil: Confraternização Universal (01/01), Carnaval, Paixão de Cristo, Tiradentes (21/04), Dia do Trabalho (01/05), Corpus Christi, Independência (07/09), N. Sra Aparecida (12/10), Finados (02/11), Proclamação da República (15/11), Consciência Negra (20/11) e Natal (25/12)."
      }
    ]
  },
  {
    slug: "calculadora-de-idade",
    name: "Calculadora de Idade Exata",
    shortDescription: "Descubra sua idade exata em anos, meses e dias, total de horas vividas e signo do zodíaco.",
    fullDescription: "Calcule com exatidão quantos anos, meses e dias de vida você tem hoje. Descubra estatísticas fascinantes como total de dias vividos, contagem regressiva para seu próximo aniversário, signo do zodíaco e estimativa de batimentos cardíacos.",
    category: "calculadoras",
    keywords: ["calculadora de idade", "quantos anos eu tenho", "idade exata anos meses dias", "dias vividos calculadora", "contagem aniversario"],
    icon: "Cake",
    href: "/calculadora-de-idade",
    metaTitle: "Calculadora de Idade Exata Online — Anos, Meses e Dias | CrieGrátis",
    metaDescription: "Descubra sua idade exata em anos, meses e dias grátis. Veja quantos dias você já viveu, contagem regressiva para o aniversário e signo.",
    h1: "Calculadora de Idade Exata",
    badge: "Novo",
    usageSteps: [
      "Informe sua data de nascimento (dia, mês e ano).",
      "Opcionalmente, informe o horário de nascimento aproximado.",
      "Veja instantaneamente sua idade desmembrada em anos, meses e dias.",
      "Confira a contagem regressiva de dias restantes para a sua próxima comemoração."
    ],
    features: [
      "Decomposição precisa em anos, meses e dias considerando anos bissextos",
      "Contador de dias totais e horas vividas desde o nascimento",
      "Contagem regressiva automática para o próximo aniversário",
      "Signo astrológico com elemento correspondente"
    ],
    faqs: [
      {
        question: "Como o cálculo considera os anos bissextos?",
        answer: "O cálculo utiliza a representação do calendário gregoriano, compensando automaticamente os anos com 366 dias (como 2024 e 2028) na contagem dos dias vividos."
      }
    ]
  },
  {
    slug: "calculadora-de-desconto",
    name: "Calculadora de Desconto Comercial",
    shortDescription: "Calcule preço com desconto, porcentagem real ou preço original antes da promoção.",
    fullDescription: "Calcule descontos para compras, promoções da Black Friday e liquidações. Informe o valor original e a porcentagem para ver quanto vai pagar e economizar, ou calcule de forma reversa a porcentagem real aplicada sobre qualquer produto.",
    category: "calculadoras",
    keywords: ["calculadora de desconto", "calcular desconto porcentagem", "desconto black friday", "preco com desconto", "calcular promocao"],
    icon: "Tag",
    href: "/calculadora-de-desconto",
    metaTitle: "Calculadora de Desconto Online — Calcular Porcentagem e Economia | CrieGrátis",
    metaDescription: "Calcule preço com desconto e quanto você economiza online grátis. Botões de atalho de 5% a 70% e cálculo reverso no navegador.",
    h1: "Calculadora de Desconto Comercial",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Escolha o modo de cálculo (Preço com Desconto, Descobrir % ou Preço Original).",
      "Digite o preço do produto em Reais (R$).",
      "Insira a porcentagem de desconto ou clique em um dos atalhos rápidos (10%, 20%, 50%).",
      "Veja o valor final a pagar e a economia total em destaque imediato."
    ],
    features: [
      "3 modos completos: direto, percentual reverso e preço original",
      "Atalhos com 1 clique para porcentagens promocionais comuns",
      "Cálculo monetário formatado no padrão brasileiro (R$ 0,00)",
      "Comparador visual entre preço cheio e preço com desconto"
    ],
    faqs: [
      {
        question: "Como calcular 20% de desconto de cabeça?",
        answer: "Para 20%, divida o valor original por 10 (encontrando 10%) e multiplique o resultado por 2. Em seguida, subtraia essa quantia do preço original."
      }
    ]
  },
  {
    slug: "calculadora-divisao-lucros",
    name: "Calculadora de Divisão de Lucros / Sociedade",
    shortDescription: "Distribua lucros líquidos e dividendos entre sócios e parceiros com reserva da empresa.",
    fullDescription: "Calcule a distribuição justa de lucros de projetos ou dividendos de empresas entre sócios conforme porcentagens acordadas ou cotas societárias. Permite deduzir percentual de reserva financeira de emergência antes do repasse aos parceiros.",
    category: "calculadoras",
    keywords: ["calculadora divisao de lucros", "distribuicao de lucros socios", "divisao de dividendos", "calculo quotas sociedade", "divisao lucros empresa"],
    icon: "PieChart",
    href: "/calculadora-divisao-lucros",
    metaTitle: "Calculadora de Divisão de Lucros entre Sócios Online | CrieGrátis",
    metaDescription: "Distribua lucros e dividendos entre sócios proporcionalmente grátis. Adicione múltiplos participantes com dedução de reserva no navegador.",
    h1: "Calculadora de Divisão de Lucros entre Sócios",
    badge: "Novo",
    usageSteps: [
      "Informe o lucro líquido total disponível para distribuição.",
      "Defina a porcentagem de reserva que ficará retida na empresa para caixa ou reinvestimento.",
      "Adicione os sócios ou parceiros com suas respectivas porcentagens ou cotas.",
      "Visualize o valor exato em Reais a ser transferido para cada participante e o gráfico proporcional."
    ],
    features: [
      "Adição e remoção dinâmica de sócios sem limites",
      "Dedução configurável de reserva financeira da empresa",
      "Normalização automática de frações para fechamento exato em 100%",
      "Barra proporcional visual com as cores de cada sócio e exportação de relatório"
    ],
    faqs: [
      {
        question: "O que é reserva financeira da empresa na distribuição de lucros?",
        answer: "É a parcela do lucro líquido mantida no caixa do negócio para capital de giro, pagamento de despesas emergenciais ou reinvestimentos antes de pagar os dividendos aos sócios."
      }
    ]
  },
  {
    slug: "dividir-pdf",
    name: "Dividir PDF (Extrair Páginas)",
    shortDescription: "Divida arquivos PDF e extraia páginas individuais ou intervalos específicos em segundos.",
    fullDescription: "Separe contratos extensos, faturas e relatórios extraindo apenas as páginas necessárias. Permite selecionar intervalos (ex: 1-3, 5, 8-10), páginas ímpares, pares ou páginas avulsas com 100% de privacidade no navegador.",
    category: "desenvolvedor",
    keywords: ["dividir pdf", "extrair paginas pdf", "separar pdf online", "recortar paginas pdf", "split pdf gratis"],
    icon: "FolderArchive",
    href: "/dividir-pdf",
    metaTitle: "Dividir PDF Online — Extrair Páginas de PDF Grátis | CrieGrátis",
    metaDescription: "Divida arquivos PDF e extraia páginas ou intervalos específicos grátis. Separe contratos e relatórios sem enviar arquivos a servidores.",
    h1: "Dividir PDF e Extrair Páginas",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Carregue seu arquivo PDF pelo botão de upload ou arrastando para a tela.",
      "Digite os números das páginas ou intervalos desejados (ex: 1-3, 5).",
      "Use os atalhos de seleção rápida se preferir (1ª metade, páginas pares, etc.).",
      "Clique em 'Dividir e Baixar Novo PDF' para fazer o download imediato."
    ],
    features: [
      "Sintaxe flexível de intervalos múltiplos (ex: 1-5, 8, 12-15)",
      "Seleção rápida com 1 clique para metades, pares e ímpares",
      "Preservação integral da formatação original e vetores do documento",
      "Processamento 100% no navegador (seus documentos nunca sobem para a nuvem)"
    ],
    faqs: [
      {
        question: "Como indicar as páginas que quero extrair?",
        answer: "Basta digitar os números separados por vírgula para páginas isoladas (ex: 1, 4, 7) ou com hífen para intervalos contínuos (ex: 2-6)."
      },
      {
        question: "Meus documentos confidenciais estão seguros?",
        answer: "Sim! Toda a leitura, separação e regravação do PDF ocorrem localmente no seu navegador através do WebAssembly/JavaScript. Nenhum dado sai do seu computador."
      }
    ]
  },
  {
    slug: "girar-pdf",
    name: "Girar PDF (Rotacionar Páginas)",
    shortDescription: "Gire páginas de PDF deitadas ou de ponta-cabeça 90°, 180° ou 270° em lote ou individualmente.",
    fullDescription: "Corrija documentos escaneados na orientação errada. Gire todas as páginas do PDF de uma só vez (90° no sentido horário ou anti-horário) ou ajuste a rotação de páginas avulsas com pré-visualização interativa.",
    category: "desenvolvedor",
    keywords: ["girar pdf", "rotacionar pdf online", "desvirar pdf", "girar pagina pdf", "corrigir orientacao pdf"],
    icon: "RotateCcw",
    href: "/girar-pdf",
    metaTitle: "Girar PDF Online — Rotacionar Páginas de PDF Grátis | CrieGrátis",
    metaDescription: "Gire páginas de PDF 90°, 180° ou 270° grátis. Corrija documentos digitalizados invertidos em lote ou individualmente no navegador.",
    h1: "Girar PDF e Rotacionar Páginas",
    badge: "Novo",
    usageSteps: [
      "Selecione o arquivo PDF que deseja desvirar.",
      "Gire todas as páginas com os botões rápidos (+90°, -90°, 180°).",
      "Ou gire páginas específicas individualmente nos controles de cada cartão.",
      "Clique em 'Salvar e Baixar PDF Rotacionado' para obter o novo arquivo corrigido."
    ],
    features: [
      "Controles de rotação global (todas as páginas) e individual por página",
      "Suporte a ângulos de 90°, 180° e 270° nos dois sentidos",
      "Miniaturas indicativas da orientação angular de cada página",
      "Sem perda de resolução ou compressão destrutiva do documento"
    ],
    faqs: [
      {
        question: "Posso girar apenas uma página que foi digitalizada errada?",
        answer: "Sim! Você pode manter as outras páginas intactas e girar apenas a página que precisa de ajuste."
      }
    ]
  },
  {
    slug: "proteger-pdf",
    name: "Proteger PDF com Senha",
    shortDescription: "Criptografe seus arquivos PDF com senha e proteção militar AES contra acessos não autorizados.",
    fullDescription: "Proteja contratos, demonstrativos financeiros, termos de confidencialidade e dados pessoais (LGPD). Adicione uma senha forte para bloquear a abertura e visualização do PDF em qualquer dispositivo ou leitor.",
    category: "desenvolvedor",
    keywords: ["proteger pdf com senha", "criptografar pdf online", "colocar senha em pdf", "bloquear pdf gratis", "seguranca pdf lgpd"],
    icon: "Lock",
    href: "/proteger-pdf",
    metaTitle: "Proteger PDF com Senha Online e Grátis | CrieGrátis",
    metaDescription: "Coloque senha em arquivos PDF online grátis. Criptografia AES militar no navegador para proteger contratos e relatórios confidenciais.",
    h1: "Proteger PDF com Senha",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Envie o arquivo PDF que deseja proteger.",
      "Digite a senha desejada e confirme no segundo campo.",
      "Clique em 'Proteger e Baixar PDF' para aplicar a criptografia.",
      "Abra o novo PDF e comprove que ele agora exige a senha para ser lido."
    ],
    features: [
      "Criptografia nativa AES padrão internacional de segurança",
      "Compatibilidade universal (abre com senha no Chrome, Edge, Adobe Acrobat, iPhone e Android)",
      "Zero envio de senha ou documento a servidores terceiros",
      "Ideal para cumprimento das exigências de segurança da LGPD"
    ],
    faqs: [
      {
        question: "Se eu esquecer a senha, é possível recuperar o PDF?",
        answer: "Não. Como a criptografia é real e executada localmente sem armazenamento em servidores, não existe cópia de recuperação da sua senha. Guarde-a com cuidado."
      }
    ]
  },
  {
    slug: "desproteger-pdf",
    name: "Desproteger PDF (Remover Senha)",
    shortDescription: "Remova a senha e as travas de restrição de documentos PDF para leitura e impressão livre.",
    fullDescription: "Remova senhas de abertura e restrições de impressão ou cópia de arquivos PDF dos quais você tem a senha. Salve uma cópia livre e desprotegida para não precisar digitar a senha toda vez que for consultar o documento.",
    category: "desenvolvedor",
    keywords: ["desproteger pdf", "remover senha pdf", "desbloquear pdf online", "tirar senha pdf gratis", "unlock pdf"],
    icon: "Unlock",
    href: "/desproteger-pdf",
    metaTitle: "Desproteger PDF Online — Remover Senha de PDF Grátis | CrieGrátis",
    metaDescription: "Remova senhas e restrições de PDF online grátis. Desbloqueie documentos para ler e imprimir sem restrições com total privacidade.",
    h1: "Desproteger PDF e Remover Senha",
    badge: "Novo",
    isPopular: true,
    usageSteps: [
      "Faça upload do arquivo PDF protegido.",
      "Digite a senha correta de abertura do documento (se houver).",
      "Clique em 'Desproteger e Baixar PDF Livre'.",
      "O documento é regravado sem criptografia e baixado imediatamente."
    ],
    features: [
      "Elimina a necessidade de redigitar a senha a cada abertura",
      "Libera permissões de cópia de texto, anotações e impressão",
      "Processamento 100% privado no navegador",
      "Detecção automática de senhas válidas"
    ],
    faqs: [
      {
        question: "Preciso saber a senha do PDF para desbloqueá-lo?",
        answer: "Sim. Se o PDF possui uma senha de abertura criptografada, é necessário digitá-la uma única vez para autenticar o documento e gerar a cópia limpa desprotegida."
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
