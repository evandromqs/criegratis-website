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
  {
    slug: "como-criar-link-whatsapp-com-mensagem-personalizada",
    title: "Como Criar Link de WhatsApp com Mensagem Personalizada para Vendas e Instagram",
    description: "Aprenda o passo a passo para gerar links diretos para o WhatsApp com mensagem pré-definida sem precisar salvar o número na agenda. Ideal para bio do Instagram e anúncios.",
    publishedAt: "07 de Outubro de 2026",
    readTime: "4 min de leitura",
    category: "Marketing & Vendas",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50",
    author: {
      name: "Evandro Mqs",
      role: "Criador do CrieGrátis",
      avatar: "/evandromqs.png",
    },
    tool: {
      name: "Gerador de Link de WhatsApp",
      href: "/gerador-link-whatsapp",
      actionText: "Criar Link de WhatsApp Grátis",
    },
    summary: "Elimine a fricção no atendimento ao cliente criando links 'wa.me' personalizados com texto pronto para acelerar conversões.",
    content: `
## Por Que Ter um Link Direto de WhatsApp é Crucial para Suas Vendas?

Você sabia que obrigar um cliente em potencial a digitar o DDD, salvar o número nos contatos do telefone e só depois abrir o WhatsApp reduz a taxa de conversão em mais de **60%**?

Na internet, cada segundo e cada etapa a mais representam vendas perdidas. Quando você utiliza um **link direto do WhatsApp com mensagem personalizada**, o cliente clica no link e a conversa abre imediatamente com uma mensagem pré-digitada, restando apenas apertar "Enviar".

---

## 1. As Principais Vantagens do Link Personalizado

* **Zero Atrito:** O usuário não precisa adicionar você aos contatos do celular.
* **Mensagens Padronizadas:** Você já sabe de onde o cliente veio (ex: *"Olá! Vi a promoção no Instagram e quero saber mais"* ou *"Gostaria de agendar um horário"*).
* **Rastreamento de Campanhas:** Crie links diferentes para bio do Instagram, anúncios do Meta Ads, stories ou panfletos impressos com QR Code para saber qual canal traz mais retorno.
* **Profissionalismo Imediato:** Transmite segurança e agilidade para quem está comprando pela primeira vez.

---

## 2. A Estrutura do Link Oficial (wa.me)

A Meta (empresa dona do WhatsApp) disponibiliza o protocolo oficial de redirecionamento universal através do domínio \`wa.me\`.

A estrutura funciona assim:
\`https://wa.me/55DDDNÚMERO?text=MENSAGEM_CODIFICADA\`

* **Código do País:** No Brasil, sempre começa com **55**.
* **DDD + Telefone:** Apenas os números com 9 dígitos, sem espaços, hífens ou parênteses.
* **Texto com URL Encoding:** Caracteres como espaços e acentos precisam ser convertidos em códigos como \`%20\` para que os navegadores interpretem o texto corretamente.

---

## 3. Como Criar Seu Link em Segundos no CrieGrátis

Em vez de codificar manualmente caracteres especiais e correr risco de errar o formato, você pode utilizar a ferramenta gratuita do CrieGrátis:

1. **Acesse a Ferramenta:** Vá até a página **Gerador de Link de WhatsApp**.
2. **Digite seu Número:** Insira seu DDD e telefone celular (o código 55 é aplicado automaticamente).
3. **Escreva a Mensagem Inicial:** Digite a frase que você gostaria que o cliente enviasse (ex: *"Olá! Quero tirar uma dúvida sobre os planos"*).
4. **Copie o Link ou Gere o QR Code:** Clique em **Copiar Link** para colar na sua bio do Instagram, site ou botão de vendas.
    `,
  },
  {
    slug: "como-criar-qr-code-gratis-que-nao-expira",
    title: "Como Criar QR Code Grátis que Nunca Expira para Cardápios, Wi-Fi e Empresas",
    description: "Cuidado com sites que cobram assinaturas para manter seu QR Code ativo! Saiba como gerar QR Codes estáticos em alta resolução e 100% gratuitos para sempre.",
    publishedAt: "07 de Outubro de 2026",
    readTime: "4 min de leitura",
    category: "Guias & Tutoriais",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50",
    author: {
      name: "Evandro Mqs",
      role: "Criador do CrieGrátis",
      avatar: "/evandromqs.png",
    },
    tool: {
      name: "Gerador de QR Code em Alta Resolução",
      href: "/criar-qr-code",
      actionText: "Gerar QR Code Grátis",
    },
    summary: "Entenda a armadilha dos QR Codes que expiram e aprenda a gerar códigos estáticos permanentes para impressão sem custos ocultos.",
    content: `
## O 'Golpe' do QR Code que Expira Após 14 Dias

Centenas de donos de restaurantes, comércios e profissionais liberais passam por essa situação frustrante todos os meses:
1. Criam um QR Code em um site qualquer para colocar no cardápio de mesa, na fachada da loja ou em cartões de visita;
2. Mandam imprimir centenas de materiais gráficos caros;
3. Poucas semanas depois, o QR Code para de funcionar e exibe uma tela exigindo uma assinatura mensal de R$ 50 a R$ 100 para reativar o link.

Por que isso acontece e como você pode se proteger definitivamente?

---

## QR Code Estático vs. QR Code Dinâmico: Qual a Diferença?

* **QR Code Dinâmico:** O desenho do QR Code não aponta para o seu site original, mas sim para o servidor da empresa intermediária, que depois redireciona para você. Se você não pagar a mensalidade deles, eles bloqueiam o redirecionamento.
* **QR Code Estático (O Formato do CrieGrátis):** O seu link ou texto é gravado diretamente no desenho dos pixels pretos e brancos do QR Code. **Não existe intermediário, não existe servidor e nunca expira.** Uma vez impresso, funcionará para sempre enquanto seu site existir.

---

## 3 Boas Práticas para Imprimir QR Codes com Leitura Perfeita

1. **Contraste Alto:** O fundo deve ser branco e o código escuro (preferencialmente preto). Evite inverter as cores (fundo escuro e código claro), pois câmeras de aparelhos mais antigos têm dificuldade de foco.
2. **Tamanho Mínimo de Impressão:** Para materiais de mão (cartões e panfletos), o tamanho mínimo recomendado é **2 x 2 cm**. Para cardápios de mesa, use ao menos **3 x 3 cm**. Para cartazes e banners distantes, utilize no mínimo **10 x 10 cm**.
3. **Resolução Nítida (PNG sem Borrões):** Nunca tire print com zoom da tela. Baixe o arquivo original em alta resolução gerado pelo navegador.

---

## Como Gerar seu QR Code Estático Permanente no CrieGrátis

1. Acesse o **Gerador de QR Code** do CrieGrátis.
2. Cole a URL do seu site, link do WhatsApp, chave Pix ou texto desejado.
3. O código é desenhado em tempo real no seu dispositivo.
4. Clique em **Baixar PNG** e envie direto para a sua gráfica com a tranquilidade de que ele nunca será desativado.
    `,
  },
  {
    slug: "como-juntar-varios-arquivos-pdf-em-um-so",
    title: "Como Juntar Vários Arquivos PDF em Um Só no Celular ou Computador",
    description: "Guia prático para mesclar múltiplos documentos PDF em um arquivo único e organizado. Ideal para processos seletivos, matrículas e petições jurídicas.",
    publishedAt: "07 de Outubro de 2026",
    readTime: "4 min de leitura",
    category: "Documentos & PDF",
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50",
    author: {
      name: "Evandro Mqs",
      role: "Criador do CrieGrátis",
      avatar: "/evandromqs.png",
    },
    tool: {
      name: "Juntar PDF (Merge)",
      href: "/juntar-pdf",
      actionText: "Juntar Arquivos PDF Agora",
    },
    summary: "Descubra como combinar contratos, extratos e certidões em um único arquivo ordenado sem limites de upload e com 100% de privacidade.",
    content: `
## Por Que Juntar Documentos em um Único PDF?

Ao enviar documentação para inscrições de vestibulares, concursos públicos, processos admissionais em empresas ou petições no tribunal (PJe), os portais quase sempre solicitam: **"Envie todos os comprovantes em um único arquivo PDF compactado"**.

Quando temos vários comprovantes avulsos (RG, CPF, comprovante de residência, certidões e diplomas), tentar enviar vários anexos separados gera desorganização e pode até anular sua inscrição.

---

## O Problema dos Conversores Tradicionais de PDF

Muitas ferramentas famosas na internet impõem barreiras inconvenientes:
* Limite de 2 ou 3 arquivos por dia na versão gratuita;
* Exigência de cadastro com e-mail para baixar o resultado;
* Fila de espera de vários minutos;
* Envio de documentos pessoais sigilosos para servidores na nuvem.

No **CrieGrátis**, todo o processo de fusão (Merge PDF) roda direto na memória do seu navegador através da biblioteca \`pdf-lib\`. Seus arquivos nunca saem do seu computador ou celular.

---

## Passo a Passo para Mesclar PDFs com Sucesso

1. **Reúna seus arquivos:** Separe todos os PDFs que deseja juntar em uma pasta.
2. **Acesse a Ferramenta:** Abra **Juntar PDF** no CrieGrátis.
3. **Selecione os Arquivos:** Arraste e solte os documentos na tela ou clique para selecionar.
4. **Ordene a Sequência:** Você pode arrastar as miniaturas para definir qual folha aparece primeiro, segundo e por diante.
5. **Mesclar e Baixar:** Clique em **Juntar PDFs**. Em poucos segundos, o navegador sintetiza o documento unificado pronto para download.
    `,
  },
  {
    slug: "como-funciona-calculo-digito-verificador-cpf",
    title: "Como Funciona o Cálculo do Dígito Verificador do CPF e Validação em Testes",
    description: "Entenda a lógica matemática do algoritmo do módulo 11 que valida o CPF brasileiro e aprenda a gerar dados válidos para homologação e testes de software.",
    publishedAt: "07 de Outubro de 2026",
    readTime: "5 min de leitura",
    category: "Desenvolvimento & QA",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/50",
    author: {
      name: "Evandro Mqs",
      role: "Criador do CrieGrátis",
      avatar: "/evandromqs.png",
    },
    tool: {
      name: "Gerador e Validador de CPF",
      href: "/gerador-validador-cpf",
      actionText: "Gerar ou Validar CPF para Testes",
    },
    summary: "Conheça o algoritmo oficial da Receita Federal para os 2 dígitos verificadores e saiba por que desenvolvedores precisam de geradores de teste.",
    content: `
## A Matemática por Trás do Cadastro de Pessoas Físicas (CPF)

O CPF brasileiro é composto por **11 dígitos numéricos**, dispostos no formato clássico \`XXX.XXX.XXX-YY\`.
Os 9 primeiros dígitos representam o número-base cadastral e a região fiscal de emissão. Mas você já se perguntou como o sistema bancário ou um site sabe na hora que um número digitado é inválido antes mesmo de consultar a Receita Federal?

A resposta está nos dois últimos números (\`YY\`), conhecidos como **Dígitos Verificadores (DV)**, calculados pelo algoritmo matemático do **Módulo 11**.

---

## 1. O Algoritmo do Módulo 11 Passo a Passo

### Cálculo do Primeiro Dígito Verificador:
1. Tomam-se os primeiros 9 números do CPF;
2. Multiplica-se o primeiro por 10, o segundo por 9, o terceiro por 8, e assim sucessivamente até o nono número ser multiplicado por 2;
3. Soma-se todos os resultados;
4. Calcula-se o resto da divisão da soma por 11;
5. Se o resto for menor que 2, o primeiro dígito é **0**. Caso contrário, subtrai-se o resto de 11 (\`11 - resto\`).

### Cálculo do Segundo Dígito Verificador:
O mesmo processo é repetido, agora incluindo os 9 números originais mais o primeiro dígito verificador recém-descoberto, multiplicando com pesos decrescentes de 11 até 2.

---

## 2. Por Que Desenvolvedores e Testers de Software Usam Geradores de CPF?

Durante o desenvolvimento de novos sistemas (e-commerces, CRMs, portais de seguros, aplicativos financeiros), os engenheiros de software e analistas de qualidade (QA) precisam testar fluxos de cadastro e validação de formulários.

* **Nunca utilize CPFs de pessoas reais:** Inserir dados reais de terceiros em ambientes de homologação viola normas de privacidade e a LGPD.
* **Dados Sintéticos Seguros:** Geradores de teste produzem combinações matematicamente válidas porém fictícias, permitindo testar se o formulário rejeita números incorretos e aceita números válidos.

No CrieGrátis, a ferramenta **Gerador e Validador de CPF** permite tanto testar se um número cumpre a fórmula matemática quanto criar massas de dados de teste para desenvolvedores com ou sem pontuação.
    `,
  },
  {
    slug: "como-calcular-juros-compostos-investimentos-longo-prazo",
    title: "O Efeito Bola de Neve: Como Calcular Juros Compostos e Simular Investimentos",
    description: "Entenda como a fórmula dos juros sobre juros multiplica seu patrimônio ao longo do tempo no Tesouro Direto, CDBs e fundos com aportes mensais.",
    publishedAt: "07 de Outubro de 2026",
    readTime: "5 min de leitura",
    category: "Finanças & Produtividade",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50",
    author: {
      name: "Evandro Mqs",
      role: "Criador do CrieGrátis",
      avatar: "/evandromqs.png",
    },
    tool: {
      name: "Calculadora de Juros Compostos",
      href: "/calculadora-juros-compostos",
      actionText: "Simular Juros Compostos",
    },
    summary: "Descubra como o tempo e aportes consistentes geram mais rendimento do que o próprio valor investido do seu bolso.",
    content: `
## Por Que Albert Einstein Chamava os Juros Compostos de a 'Oitava Maravilha do Mundo'?

Nos **juros simples**, o rendimento incide sempre sobre o capital inicial. Se você investe R$ 1.000 a 10% ao ano, você ganha R$ 100 no primeiro ano, R$ 100 no segundo, e assim por diante de forma linear.

Já nos **juros compostos**, os rendimentos obtidos a cada mês ou ano são somados ao montante principal, e os juros do próximo período incidem sobre esse novo total acumulado. É o clássico efeito **"juros sobre juros"**.

Nos primeiros 2 ou 3 anos, a diferença parece pequena. Porém, a partir do quinto ano, a curva se torna exponencial: o dinheiro começa a trabalhar por você e os rendimentos mensais passam a superar os seus próprios depósitos do bolso!

---

## A Fórmula Matemática dos Juros Compostos

A fórmula clássica para um investimento de aporte único é:
\`M = C × (1 + i)^t\`

Onde:
* **M:** Montante final acumulado;
* **C:** Capital inicial investido;
* **i:** Taxa de juros por período (em formato decimal, ex: 10% = 0,10);
* **t:** Tempo (em meses ou anos, condizente com a taxa).

Quando adicionamos **aportes mensais regulares**, o cálculo envolve uma anuidade financeira com progressão geométrica, somando os rendimentos individuais de cada depósito ao longo dos meses.

---

## Como Simular Seus Objetivos Financeiros no CrieGrátis

Em vez de fazer cálculos complicados em planilhas, utilize a **Calculadora de Juros Compostos** do CrieGrátis:
1. Informe o valor que você tem hoje para começar (Capital Inicial);
2. Defina quanto pretende guardar todos os meses (Aporte Mensal);
3. Insira a taxa de juros estimada (ao mês ou ao ano, como a taxa Selic ou CDI);
4. Escolha o prazo em meses ou anos.

A calculadora exibe na hora o valor total investido do seu bolso vs. o valor ganho puramente em juros, revelando o poder da consistência a longo prazo.
    `,
  },
  {
    slug: "por-que-converter-imagens-para-webp-melhora-seo",
    title: "Por Que Converter Imagens para WebP Melhora a Velocidade e o SEO do Seu Site",
    description: "Descubra como o formato de imagem WebP reduz até 30% do peso em relação a PNG e JPG, melhorando sua pontuação no Core Web Vitals e ranking no Google.",
    publishedAt: "07 de Outubro de 2026",
    readTime: "4 min de leitura",
    category: "Otimização & SEO",
    badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-900/50",
    author: {
      name: "Evandro Mqs",
      role: "Criador do CrieGrátis",
      avatar: "/evandromqs.png",
    },
    tool: {
      name: "Converter Imagens para WebP",
      href: "/converter-para-webp",
      actionText: "Converter para WebP Grátis",
    },
    summary: "Entenda por que o Google prioriza sites leves e como o formato WebP preserva nitidez e transparência consumindo muito menos dados.",
    content: `
## O Impacto das Imagens Pesadas no Desempenho do Seu Site

Você sabia que mais de **50% dos visitantes abandonam uma página** na web se ela demorar mais de 3 segundos para carregar no celular?

Em quase todos os testes do **Google PageSpeed Insights**, o principal vilão apontado pelo diagnóstico é: *"Forneça imagens em formatos modernos (Next-Gen Formats)"*. Sites que insistem em carregar fotos em JPEG de 3 MB ou logotipos em PNG pesados perdem posições no ranking de busca orgânica para concorrentes mais rápidos.

---

## O que é o Formato WebP?

Desenvolvido pela equipe do Google, o **WebP** é um formato moderno de imagem criado especificamente para a internet. Ele combina as melhores características de todos os formatos clássicos:
* **Compactação Superior:** É em média **26% menor que o PNG** e **25% a 34% menor que o JPEG** equivalente, com fidelidade visual idêntica ao olho humano.
* **Suporte a Transparência (Canal Alfa):** Ao contrário do JPG que cria fundo branco, o WebP suporta transparência como o PNG, mas com uma fração do peso.
* **Compatibilidade Universal:** Hoje, mais de **97% de todos os navegadores globais** (Chrome, Safari, Edge, Firefox, iOS e Android) oferecem suporte nativo ao WebP.

---

## Como o WebP Ajuda no SEO (Core Web Vitals)

O Google utiliza as métricas do **Core Web Vitals** como fator oficial de ranqueamento:
* **LCP (Largest Contentful Paint):** Mede o tempo que o maior elemento visual (geralmente a imagem de capa ou banner do post) leva para aparecer na tela. Com WebP, o LCP cai drasticamente.
* **Economia de Dados Móveis:** Visitantes que navegam em conexões 4G ou 3G recebem a página instantaneamente sem travar.

---

## Como Converter Suas Imagens no CrieGrátis

Você não precisa de softwares pesados de edição para migrar seus arquivos:
1. Acesse **Converter para WebP** no CrieGrátis;
2. Arraste suas imagens em JPG ou PNG;
3. Ajuste a barra de qualidade visual (recomendamos entre 80% e 90%);
4. Baixe os arquivos prontos e coloque no seu site ou blog para acelerar seu carregamento imediatamente.
    `,
  },
  {
    slug: "como-colocar-senha-em-pdf-criptografia-segura",
    title: "Como Colocar Senha em PDF com Criptografia Forte Contra Acessos Indevidos",
    description: "Proteja folhas de pagamento, extratos bancários, contratos e dados pessoais com criptografia forte antes de compartilhar arquivos por e-mail ou nuvem.",
    publishedAt: "07 de Outubro de 2026",
    readTime: "4 min de leitura",
    category: "Segurança & Privacidade",
    badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50",
    author: {
      name: "Evandro Mqs",
      role: "Criador do CrieGrátis",
      avatar: "/evandromqs.png",
    },
    tool: {
      name: "Proteger PDF com Senha",
      href: "/proteger-pdf",
      actionText: "Criptografar PDF com Senha",
    },
    summary: "Aprenda a bloquear visualização e cópia de documentos sensíveis com senhas criptografadas diretamente no seu navegador.",
    content: `
## Você Envia Arquivos Confidenciais por E-mail sem Criptografia?

Diariamente, milhares de pessoas enviam anexos contendo:
* Contracheques e declarações de imposto de renda;
* Contratos com cláusulas de sigilo e valores comerciais;
* Laudos médicos e resultados de exames;
* Documentos de identidade e certidões imobiliárias.

Se o seu e-mail ou o da pessoa que recebeu for invadido, ou se a mensagem for encaminhada por engano para o destinatário errado, todas essas informações ficam expostas. Colocar uma **senha de proteção em PDF** é a camada mais simples e eficiente de segurança exigida por normas de compliance e pela LGPD.

---

## Senha de Usuário vs. Senha de Proprietário

O padrão PDF suporta dois tipos de restrições:
1. **Senha de Abertura (User Password):** Sem digitar a senha correta, o arquivo simplesmente não abre em nenhum leitor (Adobe Reader, celular, navegador). O conteúdo fica criptografado.
2. **Senha de Permissões (Owner Password):** Permite que a pessoa leia o documento, mas bloqueia a impressão, a edição ou a seleção e cópia de texto.

---

## Dicas para Criar uma Senha de PDF Realmente Inviolável

* Evite datas de aniversário, telefones ou nomes de familiares;
* Use senhas com pelo menos 8 a 12 caracteres misturando números e letras;
* **Envie a senha por um canal separado:** Se você enviou o PDF anexado por e-mail, informe a senha para a pessoa via WhatsApp ou SMS. Nunca coloque a senha no corpo da própria mensagem com o anexo!

---

## Como Proteger Seu Documento no CrieGrátis

1. Acesse a ferramenta **Proteger PDF com Senha**.
2. Carregue seu documento confidencial.
3. Defina a senha desejada.
4. Clique em **Proteger e Baixar**. O arquivo é criptografado localmente no seu computador sem passar por nenhum servidor externo.
    `,
  },
  {
    slug: "como-remover-localizacao-gps-exif-de-fotos",
    title: "O Risco Oculto da Geolocalização: Como Apagar Dados EXIF de Fotos Antes de Postar",
    description: "Você sabia que fotos tiradas no celular guardam as coordenadas exatas da sua residência? Veja como limpar metadados EXIF e preservar a privacidade da sua família.",
    publishedAt: "07 de Outubro de 2026",
    readTime: "4 min de leitura",
    category: "Segurança & Privacidade",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50",
    author: {
      name: "Evandro Mqs",
      role: "Criador do CrieGrátis",
      avatar: "/evandromqs.png",
    },
    tool: {
      name: "Removedor de Metadados EXIF",
      href: "/remover-exif",
      actionText: "Limpar Metadados EXIF de Fotos",
    },
    summary: "Descubra quais informações confidenciais estão escondidas nas suas fotos e como limpá-las com facilidade antes de publicar na web.",
    content: `
## O Que Sua Foto Revela Sobre Você Sem Você Saber

Quando você tira uma foto com seu iPhone ou smartphone Android, a câmera não grava apenas a imagem visível. Ela embute silenciosamente um bloco de dados ocultos chamado **EXIF (Exchangeable Image File Format)**.

Esse arquivo contém metadados extremamente detalhados:
* **Coordenadas GPS Exatas:** Latitude e longitude com precisão de poucos metros do local exato onde a foto foi tirada (revelando sua casa, escola dos seus filhos ou endereço de trabalho);
* **Data, Hora e Fuso Horário:** Momento exato do clique;
* **Modelo do Dispositivo:** Marca, modelo do telefone e versão do software;
* **Configurações da Câmera:** Abertura, ISO, velocidade do obturador e lente utilizada.

---

## Onde Está o Perigo Real?

Grandes redes sociais (como Instagram e Twitter/X) removem grande parte dos dados EXIF ao carregar a foto no feed. No entanto:
* Ao enviar fotos como **Documento no WhatsApp** ou Telegram, os metadados são mantidos intactos;
* Ao postar em **fóruns, sites de classificados (OLX, Mercado Livre), blogs pessoais ou enviar por e-mail**, o arquivo bruto continua guardando as coordenadas GPS da sua residência;
* Qualquer pessoa pode baixar sua foto, clicar em "Propriedades / Detalhes" ou usar um leitor EXIF e abrir sua localização exata no Google Maps.

---

## Como Higienizar Suas Fotos no CrieGrátis

Para garantir que suas imagens estejam livres de qualquer dado pessoal:
1. Abra a ferramenta **Remover EXIF** no CrieGrátis.
2. Selecione as fotos que deseja compartilhar.
3. O leitor decodifica os pixels puros da imagem e descarta todos os blocos de GPS, registros de aparelho e datas ocultas.
4. Baixe a imagem higienizada e publique com tranquilidade total.
    `,
  },
  {
    slug: "como-calcular-porcentagem-de-cabeca-e-formulas-praticas",
    title: "Como Calcular Porcentagem Rápido: Fórmulas Simples para Descontos e Lucro",
    description: "Aprenda truques mentais para calcular descontos em lojas, acréscimos em contas e margem de lucro em segundos sem complicação e sem errar contas.",
    publishedAt: "07 de Outubro de 2026",
    readTime: "4 min de leitura",
    category: "Educação & Produtividade",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50",
    author: {
      name: "Evandro Mqs",
      role: "Criador do CrieGrátis",
      avatar: "/evandromqs.png",
    },
    tool: {
      name: "Calculadora de Porcentagem Online",
      href: "/calculadora-de-porcentagem",
      actionText: "Calcular Porcentagem Grátis",
    },
    summary: "Domine as regras práticas de 10%, 1% e variações percentuais para tomar decisões financeiras rápidas no dia a dia.",
    content: `
## Por Que Tantas Pessoas Travam na Hora de Calcular Porcentagem?

Você entra em uma loja e vê uma placa: *"Tênis de R$ 240 com 15% de desconto à vista"*. Ou precisa calcular quanto representa um aumento de R$ 300 em um salário de R$ 2.500.

Muitas pessoas entram em pânico ou demoram minutos abrindo a calculadora tradicional do celular tentando lembrar se deve multiplicar, dividir ou apertar a tecla \`%\`. Saber fazer contas básicas de porcentagem economiza dinheiro e evita que você caia em falsas promoções.

---

## 3 Truques Mentais Infalíveis para Fazer de Cabeça

1. **A Regra dos 10% (Andar com a Vírgula):**
   Para achar 10% de qualquer número, basta andar a vírgula uma casa para a esquerda.
   * Exemplo: 10% de R$ 240 = **R$ 24**.
2. **A Regra dos 5% (Metade de 10%):**
   Se 10% é R$ 24, 5% é a metade: **R$ 12**.
   * Quer achar 15% de R$ 240? Some os 10% (24) + os 5% (12) = **R$ 36 de desconto**! O tênis sai por R$ 204.
3. **A Regra dos 1% (Andar duas casas):**
   Para achar 1%, ande a vírgula duas casas para a esquerda.
   * Exemplo: 1% de R$ 800 = **R$ 8**.
   * Quer 7% de R$ 800? Multiplique 8 por 7 = **R$ 56**.

---

## Como Calcular Variação Percentual (Aumento ou Queda)

Para saber qual foi a porcentagem de aumento ou redução entre dois valores:
\`Variação (%) = ((Valor Final - Valor Inicial) / Valor Inicial) × 100\`

* Se um produto custava R$ 50 e foi para R$ 65:
  \`(65 - 50) = 15\`
  \`15 / 50 = 0,30\`
  \`0,30 × 100 = 30% de aumento\`.

---

## Use a Calculadora de Porcentagem do CrieGrátis

Se os números forem fracionados ou você precisar de respostas imediatas para relatórios comerciais:
1. Abra a **Calculadora de Porcentagem** do CrieGrátis;
2. Escolha o tipo de cálculo desejado (Qual é X% de Y? Quanto % X representa de Y? Aumento ou Desconto?);
3. Obtenha a resposta detalhada instantaneamente enquanto digita.
    `,
  },
  {
    slug: "como-criar-mockups-profissionais-de-celular-e-notebook",
    title: "Como Criar Mockups Profissionais de Celular e Notebook para Apresentações",
    description: "Transforme capturas de tela simples em apresentações visuais de alto impacto para portfólios, propostas comerciais e redes sociais sem precisar de Photoshop.",
    publishedAt: "07 de Outubro de 2026",
    readTime: "4 min de leitura",
    category: "Design & Criatividade",
    badgeColor: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-900/50",
    author: {
      name: "Evandro Mqs",
      role: "Criador do CrieGrátis",
      avatar: "/evandromqs.png",
    },
    tool: {
      name: "Gerador de Mockups de Dispositivos",
      href: "/mockup-dispositivos",
      actionText: "Gerar Mockup Grátis",
    },
    summary: "Descubra como valorizar sites, apps e interfaces gráficas inserindo suas imagens dentro de molduras realistas de dispositivos modernos.",
    content: `
## A Diferença Entre um Print Comum e um Mockup Profissional

Se você é designer, desenvolvedor de sites, criador de conteúdo ou profissional de marketing, sabe que a primeira impressão visual define o valor percebido do seu trabalho.

Quando você envia para um cliente ou posta no LinkedIn uma captura de tela quadrada e crua, o projeto parece inacabado. Porém, quando esse mesmo print aparece encaixado perfeitamente na tela de um **iPhone moderno com bordas finas**, dentro de um **MacBook elegante** ou em uma **janela de navegador Safari com cantos arredondados**, seu projeto imediatamente ganha aspecto de agência premium.

---

## 3 Maneiras de Usar Mockups para Vender Mais Seus Serviços

1. **Portfólio no Behance ou LinkedIn:** Mostre seus sites e interfaces funcionando em telas reais para atrair clientes corporativos.
2. **Propostas Comerciais e PDFs de Orçamento:** Insira o rascunho ou protótipo do produto do cliente em um mockup para ele visualizar o resultado final antes de fechar contrato.
3. **Posts e Carrosséis para o Instagram:** Imagens em formato de dispositivos geram muito mais cliques e engajamento visual do que prints estáticos retos.

---

## Chega de Templates Complexos de Photoshop (.PSD)

Antigamente, criar um mockup exigia:
* Baixar arquivos PSD de 500 MB cheios de camadas;
* Ter uma assinatura cara do Adobe Photoshop instalada;
* Ajustar objetos inteligentes (Smart Objects) manualmente.

Hoje, você pode gerar tudo no próprio navegador em menos de 10 segundos!

---

## Como Gerar Seu Mockup no CrieGrátis

1. Acesse o **Gerador de Mockup de Dispositivos** no CrieGrátis;
2. Escolha o dispositivo desejado (Smartphone, Notebook ou Janela de Navegador);
3. Carregue o print da tela do seu site ou aplicativo;
4. Escolha a cor do fundo ou mantenha transparente (PNG);
5. Clique em **Baixar Mockup em Alta Resolução**.
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
