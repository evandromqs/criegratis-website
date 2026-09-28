export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  category: string;
  badgeColor: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tool?: {
    name: string;
    href: string;
    actionText: string;
  };
  summary: string;
  content: string; // Markdown or rich HTML content
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "como-tirar-imprimir-foto-3x4-em-casa",
    title: "Como Tirar e Imprimir Foto 3x4 em Casa Dentro das Regras Oficiais",
    description: "Aprenda o passo a passo para fazer foto 3x4 no padrão oficial para RG, CNH, carteira de trabalho ou passaporte e monte a folha de impressão 10x15cm grátis.",
    publishedAt: "28 de Setembro de 2026",
    readTime: "4 min de leitura",
    category: "Guias & Tutoriais",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50",
    author: {
      name: "Evandro Mqs",
      role: "Criador do CrieGrátis",
      avatar: "/evandromqs.png",
    },
    tool: {
      name: "Gerador de Foto 3x4 para Documentos",
      href: "/foto-3x4",
      actionText: "Criar Foto 3x4 Agora",
    },
    summary: "Descubra como economizar tempo e dinheiro tirando sua foto 3x4 com a câmera do celular e gerando uma folha 10x15cm com 8 fotos prontas para impressão.",
    content: `
## Por que pagar por fotos 3x4 quando você pode fazer no celular?

Tradicionalmente, sempre que precisamos renovar a **CNH**, emitir a **nova Carteira de Identidade Nacional (CIN)**, fazer um crachá de empresa ou matrícula escolar, precisamos ir até uma papelaria ou estúdio fotográfico e pagar caro por um pacote de fotos 3x4.

Com a qualidade das câmeras de smartphones atuais e ferramentas inteligentes que rodam direto no navegador, você pode tirar sua própria foto em poucos segundos, enquadrar milimetricamente no padrão exigido pelos órgãos oficiais e gerar um arquivo de impressão perfeito.

---

## 1. As 5 Regras Oficiais para uma Foto 3x4 Válida

Para garantir que sua foto seja aceita em órgãos públicos (Detran, Poupatempo, Polícia Federal, consulados), siga atentamente estes critérios:

1. **Fundo Claro e Neutro:** O fundo deve ser preferencialmente branco ou cinza bem claro, sem texturas, sombras ou objetos ao redor.
2. **Iluminação Frontal Uniforme:** Evite fontes de luz que venham de apenas um lado do rosto, pois criam sombras fortes. Fique de frente para uma janela de dia ou use uma luz difusa.
3. **Expressão Neutra:** Mantenha a boca fechada (sem sorrir excessivamente), olhos abertos e voltados diretamente para a lente da câmera.
4. **Sem Acessórios Obstrutivos:** Evite óculos de sol, bonés, chapéus ou brincos muito chamativos. Óculos de grau devem estar sem reflexo e sem cobrir os olhos.
5. **Enquadramento Proporcional:** O rosto deve ocupar cerca de 70% a 80% da altura da imagem, do topo da cabeça até a base do queixo e início dos ombros.

---

## 2. Passo a Passo: Tirando e Ajustando sua Foto

1. **Tire a foto:** Peça para alguém fotografar você a cerca de 1,5 metro de distância, com a câmera na altura dos seus olhos. Evite selfies com a câmera frontal muito próxima para não distorcer o formato do nariz.
2. **Abra o Gerador de Foto 3x4 do CrieGrátis:** Acesse nossa ferramenta gratuita no celular ou computador.
3. **Ajuste o Enquadramento:** Use a grade guia para centralizar os olhos e queixo nas linhas pontilhadas.
4. **Escolha o Formato de Saída:**
   * **Foto individual:** ideal para upload em formulários digitais e cadastros de faculdades ou empregos.
   * **Gabarito de Impressão 10x15 cm (4x6 pol):** organiza automaticamente **8 fotos 3x4** lado a lado em uma folha fotográfica tradicional de alta resolução (300 DPI).

---

## 3. Dica de Ouro para Imprimir por Centavos

Em vez de pedir para uma gráfica imprimir "foto para documento", leve o arquivo gerado (10x15 cm) e peça para **revelar uma foto comum 10x15cm em papel fotográfico brilhante ou fosco**.

Uma revelação de foto 10x15 custa normalmente entre **R$ 1,50 e R$ 3,00**, e você sairá com **8 fotos 3x4 prontas** para recortar!
    `,
  },
  {
    slug: "como-assinar-pdf-online-gratis",
    title: "Como Assinar PDF Digitalmente no Celular ou PC Sem Imprimir",
    description: "Guia prático para assinar contratos, termos e documentos em PDF com assinatura eletrônica e rubrica direta no navegador, sem pagar assinaturas.",
    publishedAt: "28 de Setembro de 2026",
    readTime: "5 min de leitura",
    category: "Documentos & PDF",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50",
    author: {
      name: "Evandro Mqs",
      role: "Criador do CrieGrátis",
      avatar: "/evandromqs.png",
    },
    tool: {
      name: "Assinar PDF Online",
      href: "/assinar-pdf",
      actionText: "Assinar Documento PDF Grátis",
    },
    summary: "Evite o trabalho de imprimir folhas, assinar com caneta e escanear de volta. Descubra como assinar contratos e acordos digitalmente em segundos.",
    content: `
## Chega de imprimir papel só para assinar e digitalizar de volta

Você já deve ter passado por isso: alguém envia um contrato de locação, termo de matrícula, autorização escolar ou prestação de serviços por e-mail em formato PDF. Para devolver assinado, muitas pessoas ainda:
1. Imprimem o PDF na impressora;
2. Assinam com caneta esferográfica;
3. Baixam um app de scanner no celular ou usam uma impressora multifuncional;
4. Enviam o arquivo de volta com qualidade degradada e fundo cinzento.

Esse ciclo consome papel, tinta, tempo e paciência. Hoje em dia, a **assinatura eletrônica** é legalmente aceita na grande maioria dos documentos civis e comerciais no Brasil.

---

## Assinatura Eletrônica vs. Assinatura Digital: Qual a Validade Jurídica?

No Brasil, a **Lei nº 14.063/2020** estabelece três níveis de assinaturas eletrônicas:
* **Assinatura Eletrônica Simples:** Aquela em que você desenha sua assinatura na tela ou anexa uma imagem da sua firma para manifestar concordância. É amplamente aceita em contratos de aluguel, propostas de prestação de serviços, formulários admissionais e declarações entre particulares.
* **Assinatura Eletrônica Avançada:** Utiliza logins governamentais (como a conta Gov.br) ou certificados institucionais.
* **Assinatura Eletrônica Qualificada:** Exige certificado digital ICP-Brasil (token ou cartão físico).

Para 90% dos atos do dia a dia, a **assinatura eletrônica simples** tem total respaldo jurídico quando ambas as partes aceitam o formato digital.

---

## Como Assinar seu PDF em Menos de 1 Minuto no CrieGrátis

1. **Acesse a Ferramenta:** Abra a página **Assinar PDF Online** no seu celular ou computador.
2. **Carregue o Documento:** Selecione o arquivo PDF do seu contrato.
3. **Crie sua Assinatura:**
   * **Desenhar na Tela:** Desenhe com o dedo ou caneta stylus na tela touch do smartphone ou tablet.
   * **Carregar Imagem:** Se já tiver uma foto da sua assinatura em papel branco, você pode carregá-la.
4. **Posicione e Redimensione:** Arraste sua assinatura para o campo exato de assinatura ou carimbo no PDF. Você também pode navegar pelas páginas do documento e adicionar rubricas em cada folha.
5. **Baixar PDF Assinado:** Clique em "Baixar PDF" e o arquivo será salvo instantaneamente com a assinatura gravada diretamente nas camadas do documento.

---

## Dica de Segurança: Seus Contratos Não Saem do Seu Aparelho

Muitos sites de assinatura online enviam seu contrato confidencial para servidores de terceiros na nuvem. No **CrieGrátis**, todo o processo é feito **100% no seu navegador**. Ninguém além de você tem acesso ao conteúdo do contrato.
    `,
  },
  {
    slug: "como-censurar-dados-sensiveis-pdf-lgpd",
    title: "Como Censurar e Ocultar Dados Pessoais em PDF para Conformidade LGPD",
    description: "Saiba como aplicar tarja preta definitiva em CPF, endereços e contas bancárias em arquivos PDF antes de compartilhar documentos sensíveis.",
    publishedAt: "28 de Setembro de 2026",
    readTime: "4 min de leitura",
    category: "Segurança & Privacidade",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/50",
    author: {
      name: "Evandro Mqs",
      role: "Criador do CrieGrátis",
      avatar: "/evandromqs.png",
    },
    tool: {
      name: "Censurar e Redigir PDF (Redaction)",
      href: "/censurar-pdf",
      actionText: "Censurar Dados no PDF",
    },
    summary: "Cuidado: pintar um texto de preto no Word ou desenhar uma linha por cima não remove o texto do arquivo! Veja como aplicar tarjas pretas verdadeiras e permanentes.",
    content: `
## O Perigo Silencioso da 'Censura Falsa' em Documentos Digitais

Você já precisou enviar um comprovante de residência, contracheque ou extrato bancário para alguém e quis esconder o saldo, CPF ou número da agência?

Muitas pessoas cometem o erro grave de:
* Abrir o PDF em um visualizador e colocar um retângulo preto por cima;
* Usar o marcador de texto preto em editores comuns;
* Fazer um rabisco usando o editor de fotos do celular.

**O problema?** Na maioria desses casos, o texto que está embaixo da tarja continua intacto no código do PDF! Qualquer pessoa que abrir o documento pode selecionar o texto com o cursor do mouse, copiar (\`Ctrl + C\`) e colar (\`Ctrl + V\`) em outro lugar para ler exatamente o que estava escondido.

---

## O que a LGPD (Lei Geral de Proteção de Dados) Exige?

A **LGPD (Lei nº 13.709/2018)** determina que dados pessoais desnecessários para a finalidade de um processo ou transação devem ser eliminados ou anonimizados.

Ao compartilhar documentos como:
* Extratos bancários para comprovação de renda;
* Petições judiciais e contratos de trabalho;
* Diplomas e laudos médicos com histórico confidencial;

É fundamental utilizar um processo de **Redaction (Redação/Censura Real)**, que sobrepõe vetores e queima as marcações de forma irreversível nas páginas.

---

## Como Ocultar Informações Sensíveis Corretamente no CrieGrátis

1. **Acesse a ferramenta Censurar PDF:** No CrieGrátis, clique em "Censurar PDF".
2. **Importe seu Documento:** Carregue o PDF que contém os dados a serem mascarados.
3. **Selecione a Região de Censura:** Com o mouse ou dedo, arraste e crie uma caixa preta sobre o CPF, telefone, número de cartão ou qualquer dado sigiloso.
4. **Revise todas as páginas:** Você pode adicionar quantas caixas de censura quiser em qualquer página do documento.
5. **Processamento Irreversível:** Ao clicar em "Salvar PDF Censurado", o motor do CrieGrátis redesenha o documento incorporando as tarjas pretas diretamente na estrutura gráfica do PDF.

Pronto! Seu documento fica 100% protegido contra vazamento de dados, cumprindo as melhores práticas de privacidade.
    `,
  },
  {
    slug: "como-reduzir-tamanho-pdf-imagem-email-whatsapp",
    title: "Como Reduzir o Tamanho de PDFs e Imagens para Enviar no E-mail ou WhatsApp",
    description: "Aprenda técnicas simples para comprimir fotos pesadas e documentos PDF sem perder a qualidade legível, respeitando o limite de 25MB do Gmail e Outlook.",
    publishedAt: "28 de Setembro de 2026",
    readTime: "4 min de leitura",
    category: "Otimização & Performance",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50",
    author: {
      name: "Evandro Mqs",
      role: "Criador do CrieGrátis",
      avatar: "/evandromqs.png",
    },
    tool: {
      name: "Comprimir PDF e Imagens",
      href: "/comprimir-pdf",
      actionText: "Comprimir PDF Agora",
    },
    summary: "Seu arquivo foi rejeitado porque ultrapassou o limite do Gmail (25MB) ou do portal do PJe? Veja como reduzir o tamanho mantendo o texto 100% nítido.",
    content: `
## "O arquivo é muito grande para ser enviado": Como resolver esse erro

Quem trabalha com envio de relatórios, apostilas, fotos de câmeras de alta resolução ou processos jurídicos já se deparou com estes limites chatos:
* **Gmail e Outlook:** limite padrão de **25 MB** por e-mail;
* **Portais Jurídicos (PJe, Projudi, e-SAJ):** frequentemente limitam anexos a **5 MB** ou **10 MB** por arquivo;
* **WhatsApp:** comprime imagens agressivamente na conversa, mas como documento tem limites e consome dados móveis do destinatário.

Quando um PDF ou imagem ultrapassa esses tamanhos, você não precisa pagar por softwares caros como Adobe Acrobat para diminuir o peso do arquivo.

---

## O que faz um PDF ou imagem ficar tão pesado?

Existem três motivos principais:
1. **Resolução excessiva de imagens embutidas:** Imagens tiradas por celulares modernos têm 48MP ou mais e são inseridas no documento em tamanho gigantesco.
2. **Metadados e históricos:** Softwares de edição acumulam histórico de alterações, perfis de cor e fontes inteiras desnecessárias dentro do arquivo.
3. **Falta de compressão eficiente de vetores:** O documento não está otimizado para compactação de fluxos de dados.

---

## Como Comprimir sem Transformar o Texto em Borrão

Ao comprimir, o objetivo é reduzir os megabytes **sem que os números e letras fiquem ilegíveis**.

### Para Documentos e Livros em PDF:
1. Acesse o **Comprimir PDF** do CrieGrátis;
2. Arraste seu arquivo (ex: um contrato de 30 MB);
3. Escolha o nível de compressão desejado (Leve, Balanceado ou Forte);
4. O motor analisa o documento no seu navegador e reduz o tamanho em até **70% a 90%**, preservando a legibilidade para leitura em telas e impressão.

### Para Fotos e Imagens (PNG, JPG, WebP):
1. Acesse o **Comprimir Imagem** do CrieGrátis;
2. Ajuste o controle de qualidade visual (dica: qualidade entre **75% e 85%** costuma reduzir mais de 80% do peso do arquivo com diferença visual praticamente invisível ao olho humano);
3. Baixe a imagem otimizada e envie instantaneamente pelo WhatsApp ou e-mail.
    `,
  },
  {
    slug: "privacidade-conversores-online-processamento-local",
    title: "Por Que Ferramentas 100% no Navegador São Mais Seguras que Conversores em Nuvem?",
    description: "Entenda os riscos ocultos de enviar contratos e fotos para servidores de terceiros e como a tecnologia client-side protege sua privacidade e sigilo bancário.",
    publishedAt: "28 de Setembro de 2026",
    readTime: "5 min de leitura",
    category: "Segurança & Tecnologia",
    badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50",
    author: {
      name: "Evandro Mqs",
      role: "Criador do CrieGrátis",
      avatar: "/evandromqs.png",
    },
    tool: {
      name: "Explorar as 70 Ferramentas Gratuitas",
      href: "/ferramentas",
      actionText: "Ver Todas as Ferramentas",
    },
    summary: "Para onde vão seus documentos quando você os envia para um conversor tradicional na internet? Conheça a revolução do processamento client-side.",
    content: `
## O que realmente acontece quando você faz upload de um arquivo confidencial?

Você provavelmente já usou conversores populares de PDF ou imagens na web para juntar arquivos, converter Word em PDF ou remover o fundo de uma foto.

Na grande maioria dessas plataformas gratuitas, o processo funciona assim:
1. Seu arquivo sai do seu computador e é enviado para um servidor remoto (muitas vezes em outros países);
2. O servidor processa o documento na nuvem;
3. O servidor gera um link temporário para você baixar;
4. O site promete apagar o arquivo em algumas horas ou dias.

**Mas você já parou para pensar no risco?**
Se você estiver convertendo um contrato comercial confidencial, folha de pagamento com dados de funcionários, imposto de renda ou exames médicos, enviar esse arquivo para um servidor desconhecido viola normas de segurança da informação e gera riscos severos de vazamento de dados.

---

## A Nova Era: Processamento 100% Client-Side (No Seu Próprio Aparelho)

Nos últimos anos, os navegadores modernos (Google Chrome, Microsoft Edge, Safari, Firefox) evoluíram de simples visualizadores de páginas para verdadeiras plataformas de computação de alto desempenho.

Com tecnologias como **WebAssembly (WASM)**, **HTML5 Canvas**, **Web Workers** e bibliotecas em JavaScript puro (como \`pdf-lib\` e \`Tesseract.js\`), o processamento que antes exigia um servidor dedicado agora acontece **diretamente no hardware do seu computador ou celular**.

---

## 4 Vantagens Imbatíveis do Modelo do CrieGrátis

1. **Privacidade Absoluta (Zero Upload):** Nenhum arquivo, foto, senha ou texto é transmitido pela internet. Tudo é executado na memória RAM do seu navegador. Se você desligar o Wi-Fi após carregar a página, a maioria das ferramentas continuará funcionando perfeitamente!
2. **Velocidade Instantânea:** Não há tempo de espera para enviar arquivos pesados pela internet e depois baixar novamente. O processamento inicia imediatamente.
3. **Sem Filas e Sem Limites:** Em servidores de terceiros, usuários gratuitos sofrem com filas de espera para forçar a compra de assinaturas "Pro". No CrieGrátis, como o poder computacional utilizado é o do seu próprio dispositivo, não existem limites diários.
4. **Conformidade Automática com a LGPD e GDPR:** Sua empresa não precisa se preocupar com termos de transferência internacional de dados ou armazenamento em nuvens não auditadas.

---

## O Compromisso CrieGrátis

Nascemos com a missão de democratizar ferramentas de alta utilidade, mantendo-as **100% gratuitas, rápidas e com privacidade total**. Conheça nosso catálogo com mais de 70 ferramentas prontas para o seu dia a dia!
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
