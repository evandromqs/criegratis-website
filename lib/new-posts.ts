import type { BlogPost } from "./posts";

type Draft = Pick<BlogPost, "slug" | "title" | "description" | "category" | "summary" | "content"> & { toolName: string; toolHref: string };

const drafts: Draft[] = [
  {
    slug: "como-criar-papel-timbrado-com-logo-pdf", title: "Como Criar Papel Timbrado com Logo em PDF", description: "Monte uma folha A4 com logotipo, nome e contato e entenda quando usar um modelo novo ou aplicar o timbre a um PDF existente.", category: "PDF e documentos", toolName: "Criar Papel Timbrado", toolHref: "/criar-papel-timbrado", summary: "Papel timbrado novo e sobreposição em documento pronto são tarefas diferentes. Veja qual delas resolve seu caso.",
    content: `## Você precisa de uma folha nova ou de timbrar um documento pronto?
Se vai começar uma carta, proposta ou comunicado do zero, crie uma folha A4 em branco com cabeçalho e rodapé. Se já tem um PDF escrito, use a ferramenta de aplicar folha timbrada para preservar o conteúdo existente. Essa escolha evita cobrir texto por acidente.

## O que colocar no cabeçalho
Use um logotipo legível, o nome da organização e, se fizer sentido, uma linha curta de identificação. Reserve o rodapé para e-mail, telefone ou site. Evite dados em excesso: a área central precisa continuar livre para o documento.

## Como montar
1. Envie o logotipo em JPG ou PNG.
2. Preencha nome, subtítulo e contato.
3. Escolha uma cor que combine com a identidade visual.
4. Confira a prévia A4 e baixe o PDF.

Para uso frequente, guarde uma cópia original e preencha o documento em outro editor. Se o logotipo contiver letras pequenas, teste uma impressão: o que parece legível na tela pode ficar apertado no papel.`,
  },
  {
    slug: "como-numerar-paginas-pdf-online", title: "Como Numerar Páginas de um PDF sem Alterar o Conteúdo", description: "Adicione números no rodapé de contratos, apostilas e propostas, com posição e início configuráveis.", category: "PDF e documentos", toolName: "Numerar Páginas de PDF", toolHref: "/numerar-paginas-pdf", summary: "A numeração facilita referência a cláusulas e páginas; confira as margens antes de enviar o documento.",
    content: `## Quando numerar o PDF?
Em propostas, apostilas e contratos, dizer “veja a página 7” é mais claro do que pedir para procurar um trecho. A numeração adicionada ao PDF permanece no arquivo baixado e também aparece na impressão.

## Antes de começar
Confira se o rodapé já contém texto, assinatura ou carimbo. Um número novo pode sobrepor esse conteúdo. Se a primeira folha é uma capa, talvez você queira começar a contagem em 0 ou retirar a capa antes de numerar, conforme a convenção do documento.

## Passo a passo
1. Escolha o PDF sem senha.
2. Informe o número que aparecerá na primeira página.
3. Selecione esquerda, centro ou direita do rodapé.
4. Gere o arquivo, examine a prévia e baixe.

O texto e as imagens originais não são substituídos. A ferramenta acrescenta apenas um número em cada página. Em documentos que serão impressos frente e verso, faça uma prova para conferir se o rodapé não fica muito próximo da borda.`,
  },
  {
    slug: "como-colocar-marca-dagua-pdf", title: "Como Colocar Marca d'Água em PDF: Rascunho e Confidencial", description: "Inclua uma marca textual semitransparente em todas as páginas de um PDF e escolha uma aparência legível.", category: "PDF e documentos", toolName: "Marca d'Água em PDF", toolHref: "/marca-dagua-pdf", summary: "Uma marca visual indica o estado do documento, mas não impede cópias nem substitui proteção por senha.",
    content: `## Para que serve uma marca d'água?
Palavras como RASCUNHO, CÓPIA ou CONFIDENCIAL ajudam quem recebe a identificar rapidamente o propósito de uma versão. Em uma proposta interna, por exemplo, o aviso evita que uma versão preliminar seja confundida com a final.

## Ajuste a legibilidade
Escolha uma cor discreta e opacidade moderada. Uma marca muito escura esconde o texto; uma marca quase invisível não cumpre seu papel. Confira páginas com gráficos e páginas com texto, porque o contraste varia.

## Como aplicar
1. Abra o PDF sem senha.
2. Digite o texto que deve aparecer.
3. Ajuste a cor e a opacidade.
4. Gere, examine a prévia e baixe.

A marca é inserida em todas as páginas. Ela é apenas visual: não impede que alguém copie, edite ou encaminhe o arquivo. Para restringir abertura, considere também uma senha e um canal adequado de compartilhamento.`,
  },
  {
    slug: "como-converter-pagina-pdf-jpg-png", title: "Como Converter uma Página de PDF em JPG ou PNG", description: "Transforme uma página de PDF em imagem para apresentações, mensagens ou formulários que não aceitam PDF.", category: "PDF e imagens", toolName: "PDF para JPG ou PNG", toolHref: "/pdf-para-jpg", summary: "JPG costuma gerar arquivos menores para fotos; PNG preserva melhor bordas e capturas com texto pequeno.",
    content: `## Quando uma imagem ajuda?
Às vezes um formulário aceita apenas JPG ou PNG, ou você precisa inserir uma página de PDF em uma apresentação. Converter a página em imagem resolve esse formato de entrega sem alterar o PDF original.

## JPG ou PNG?
JPG costuma ser menor e funciona bem para páginas com fotografias. PNG pode manter bordas, letras e linhas mais nítidas, mas o arquivo tende a ficar maior. A resolução escolhida também influencia o tamanho final.

## Passo a passo
1. Selecione o PDF e a página desejada.
2. Escolha JPG ou PNG.
3. Selecione a resolução e converta.
4. Confira a prévia antes de baixar.

Ao converter, o texto vira pixels e deixa de ser selecionável. Para contratos e documentos que exigem pesquisa no texto, mantenha o PDF original. Se o destino impõe limite de tamanho, comece pela resolução padrão e aumente apenas se a leitura ficar ruim.`,
  },
  {
    slug: "como-escrever-em-pdf-sem-campos", title: "Como Escrever em um PDF que Não Tem Campos para Preencher", description: "Acrescente texto a um PDF comum, posicionando a anotação na página correta sem recriar o documento.", category: "PDF e documentos", toolName: "Adicionar Texto em PDF", toolHref: "/adicionar-texto-pdf", summary: "Adicionar texto por cima da página é diferente de editar palavras que já fazem parte do PDF.",
    content: `## Por que alguns PDFs não aceitam digitação?
Muitos arquivos são apenas páginas estáticas. Diferentemente de um formulário preenchível, não há campos em que clicar e escrever. Nesse caso, você pode acrescentar texto sobre a página, como nome, data ou uma observação.

## Como posicionar sem cobrir conteúdo
Escolha a página, digite um trecho curto e ajuste as distâncias a partir do topo e da esquerda. Comece com uma fonte pequena e veja a prévia. Se o texto cair sobre uma linha ou assinatura, altere a posição e gere novamente.

## Passo a passo
1. Carregue o PDF sem senha.
2. Informe o número da página e o texto.
3. Ajuste posição e tamanho da fonte.
4. Confira o PDF gerado e baixe.

O texto original não é removido nem reescrito. Para corrigir uma frase já existente, o ideal é editar o arquivo de origem ou solicitar uma versão corrigida do PDF.`,
  },
  {
    slug: "como-ajustar-pdf-para-a4-impressao", title: "Como Ajustar um PDF para Folha A4 sem Distorcer", description: "Centralize páginas de tamanhos diferentes em A4, mantendo as proporções e escolhendo margens para impressão.", category: "PDF e impressão", toolName: "Ajustar PDF para A4", toolHref: "/ajustar-pdf-a4", summary: "Escala proporcional evita esticar logos e letras, mas pode deixar espaços brancos nas laterais.",
    content: `## Por que um PDF imprime cortado?
O arquivo pode ter sido criado em tamanho Carta, etiqueta, slide ou medida personalizada. Ao mandar imprimir em A4, o visualizador pode cortar a borda ou ampliar automaticamente o conteúdo.

## O que significa ajustar proporcionalmente
A ferramenta coloca cada página original no centro de uma página A4 e altera a escala sem esticar largura e altura de forma diferente. Assim, círculos continuam circulares e textos não ficam deformados. Dependendo da proporção original, sobrará espaço em branco nas bordas.

## Como fazer
1. Abra o PDF.
2. Defina uma margem em milímetros.
3. Gere o novo PDF A4.
4. Verifique se tabelas, assinaturas e rodapés continuam visíveis.

Na hora de imprimir, selecione A4 e confira as opções de escala da impressora. Se o arquivo já foi ajustado, uma segunda opção de “ajustar à página” pode reduzir tudo novamente.`,
  },
  {
    slug: "como-imprimir-foto-3x4-folha-a4", title: "Como Imprimir Várias Fotos 3x4 em uma Folha A4", description: "Ajuste o corte da foto e monte um PDF A4 com cópias de 3 × 4 cm prontas para imprimir e recortar.", category: "Foto 3x4", toolName: "Foto 3x4 em Folha A4", toolHref: "/foto-3x4-folha-a4", summary: "O tamanho no papel depende da escala de impressão: use 100% e evite ajustar à página.",
    content: `## A foto precisa medir 3 × 4 cm no papel
Ter uma imagem na proporção 3:4 não basta. Ela também precisa ser colocada na folha com 30 × 40 mm e impressa no tamanho real. Programas que ampliam a página automaticamente podem mudar a medida.

## Monte a folha
1. Escolha uma foto nítida e bem iluminada.
2. Ajuste zoom e posição até enquadrar o rosto.
3. Selecione quantas cópias deseja.
4. Baixe o PDF A4 e faça uma impressão de teste.

Na caixa de impressão, escolha **tamanho real** ou **100%**, sem “ajustar à página”. Meça uma foto com régua antes de imprimir várias folhas.

Cada órgão ou cadastro pode ter exigências próprias sobre fundo, expressão, data e tamanho. A ferramenta organiza e dimensiona as cópias; ela não verifica automaticamente se a foto atende a um edital.`,
  },
  {
    slug: "foto-3x4-inscricao-limite-kb", title: "Como Preparar Foto 3x4 Digital com Limite de 200 KB", description: "Corte a foto em 3x4, ajuste o arquivo JPG ao limite em KB e confira os requisitos do formulário.", category: "Foto 3x4", toolName: "Foto 3x4 para Inscrição", toolHref: "/foto-3x4-para-inscricao", summary: "Uma foto pode ter o enquadramento correto e ainda ser recusada por tamanho de arquivo, formato ou regra do cadastro.",
    content: `## Medida física e tamanho do arquivo são coisas diferentes
“Foto 3x4” descreve a proporção ou a dimensão exigida para impressão. “Até 200 KB” é o limite do arquivo enviado. Você precisa conferir ambos, além do formato aceito pelo formulário.

## Prepare a versão digital
1. Abra a foto original em JPG ou PNG.
2. Ajuste o corte para manter o rosto centralizado.
3. Informe o limite em KB mostrado pelo sistema.
4. Gere e baixe o JPG, verificando o tamanho informado.

Para caber no limite, a ferramenta reduz primeiro a qualidade e, se necessário, a resolução. Limites muito baixos podem deixar o rosto pouco nítido. Se isso acontecer, tente uma foto original com fundo uniforme e boa iluminação.

Confira também a largura e a altura em pixels exigidas pelo edital. Um arquivo abaixo do limite em KB ainda pode ser recusado se as dimensões ou o fundo não estiverem corretos.`,
  },
  {
    slug: "criar-assinatura-png-transparente", title: "Como Criar uma Assinatura PNG com Fundo Transparente", description: "Desenhe com mouse ou dedo e baixe uma imagem de assinatura para inserir em documentos e apresentações.", category: "Assinatura", toolName: "Criar Assinatura PNG", toolHref: "/criar-assinatura-png", summary: "Uma imagem de assinatura é prática para compor documentos, mas não é uma assinatura digital certificada.",
    content: `## Para que serve o PNG transparente?
Um arquivo PNG com fundo transparente mostra apenas o traço. Assim, ele pode ser colocado sobre uma linha de assinatura em uma apresentação ou documento sem criar um retângulo branco ao redor.

## Como desenhar
1. Use o mouse, dedo ou caneta para desenhar no quadro.
2. Escolha a cor da tinta antes de começar.
3. Se necessário, limpe o quadro e refaça.
4. Prepare e baixe o PNG.

Guarde a imagem com cuidado: qualquer pessoa que tenha acesso ao arquivo pode reutilizá-la visualmente. Para assinar um PDF dentro do CrieGrátis, use a ferramenta Assinar PDF, que posiciona uma assinatura no documento.

Esta imagem não oferece identificação verificada, certificado digital nem prova criptográfica de autoria. Se o destinatário exigir um método específico de assinatura, siga essa exigência.`,
  },
  {
    slug: "rg-frente-verso-mesma-folha-pdf", title: "Como Colocar Frente e Verso do RG na Mesma Folha PDF", description: "Reúna duas fotos de um documento em uma única folha A4 para enviar ou imprimir, verificando a legibilidade.", category: "Documentos", toolName: "Frente e Verso em PDF", toolHref: "/documento-frente-verso-pdf", summary: "Uma página com os dois lados pode facilitar o envio, desde que o órgão ou formulário aceite esse formato.",
    content: `## Antes de montar o arquivo
Leia o pedido de quem receberá o documento. Alguns sistemas querem frente e verso no mesmo arquivo; outros pedem imagens separadas ou duas páginas. A montagem em uma folha A4 serve apenas quando esse formato é aceito.

## Faça fotos legíveis
Coloque o documento sobre uma superfície plana, com luz uniforme. Evite reflexos, dedos sobre os dados e cortes nas bordas. Confira se números e nomes continuam legíveis na prévia reduzida.

## Monte o PDF
1. Envie a imagem da frente.
2. Envie a imagem do verso.
3. Escolha disposição vertical ou lado a lado.
4. Confira a prévia e baixe o PDF A4.

As imagens são combinadas no navegador. O arquivo gerado não substitui autenticação, reconhecimento ou outros requisitos formais. Por conter dados pessoais, revise o destinatário antes de compartilhar.`,
  },
  {
    slug: "como-fazer-placa-pix-para-imprimir",
    title: "Como Fazer Placa Pix com QR Code para Imprimir Grátis",
    description: "Aprenda a criar uma placa Pix profissional em PDF com seu QR Code para colocar no balcão da loja ou restaurante.",
    category: "Negócios e vendas",
    toolName: "Gerador de Placa Pix em PDF",
    toolHref: "/placa-pix-pdf",
    summary: "Facilite o pagamento no balcão gerando uma placa Pix legível e pronta para imprimir em folha A4.",
    content: `## Por que ter uma Placa Pix no balcão?
Digitar chave Pix no celular do cliente gera erros e filas. Uma placa impressa com QR Code e chave visível acelera o pagamento e passa mais profissionalismo.

## O que colocar na placa
- Nome do estabelecimento ou recebedor
- Chave Pix visível (para quem preferir digitar)
- QR Code grande e com bom contraste

## Como criar grátis
1. Acesse o Gerador de Placa Pix em PDF.
2. Digite sua chave Pix e o nome que aparecerá na placa.
3. Baixe o PDF e imprima em papel A4 ou papel fotográfico.`,
  },
  {
    slug: "como-preencher-declaracao-conteudo-correios",
    title: "Como Preencher Declaração de Conteúdo dos Correios em PDF",
    description: "Vai enviar encomenda sem nota fiscal? Veja como preencher a Declaração de Conteúdo obrigatória e gerar o PDF pronto.",
    category: "PDF e documentos",
    toolName: "Declaração de Conteúdo Correios",
    toolHref: "/declaracao-conteudo-correios",
    summary: "Evite que sua encomenda seja barrada na agência gerando a Declaração de Conteúdo no padrão oficial.",
    content: `## Quando a Declaração de Conteúdo é obrigatória?
Sempre que você envia um produto pelos Correios ou transportadora sem Nota Fiscal (como vendas de desapego, presentes ou envios de pequenos vendedores).

## Dados necessários
- Nome, CPF/CNPJ e endereço completo do remetente e do destinatário.
- Lista dos itens com quantidade e valor unitário.

## Como gerar em 1 minuto
1. Abra o Gerador de Declaração de Conteúdo.
2. Preencha os campos e adicione os itens.
3. Baixe o PDF, assine e cole na parte externa da embalagem.`,
  },
  {
    slug: "como-fazer-curriculo-pdf-aprovado-ats",
    title: "Como Fazer um Currículo em PDF Aprovado por Sistemas ATS",
    description: "Entenda o que são sistemas ATS e como montar um currículo em PDF limpo, legível e sem erros de formatação.",
    category: "Carreira e documentos",
    toolName: "Gerador de Currículo em PDF",
    toolHref: "/gerador-curriculo-pdf",
    summary: "Layouts cheios de gráficos podem reprovar seu currículo antes mesmo de um humano ler. Veja como fazer do jeito certo.",
    content: `## O que é um sistema ATS?
ATS (Applicant Tracking System) é o software que empresas usam para filtrar currículos automaticamente. Tabelas complexas, ícones e texto em imagem dificultam a leitura.

## Boas práticas
- Use seções claras: Resumo, Experiência, Formação e Habilidades.
- Exporte sempre em PDF com texto selecionável.
- Destaque resultados com números sempre que possível.

## Monte o seu grátis
Use nosso Gerador de Currículo em PDF para preencher seus dados e baixar um modelo limpo e pronto para enviar.`,
  },
  {
    slug: "como-fazer-contrato-prestacao-servicos-simples",
    title: "Como Fazer um Contrato de Prestação de Serviços Simples em PDF",
    description: "Proteja seu trabalho como autônomo ou MEI criando um contrato claro de prestação de serviços com valor, prazo e escopo.",
    category: "Negócios e vendas",
    toolName: "Contrato de Prestação de Serviços",
    toolHref: "/gerador-contrato-prestacao-servicos",
    summary: "Combinar tudo só por mensagem pode gerar dor de cabeça. Veja as cláusulas essenciais de um contrato simples.",
    content: `## Por que formalizar mesmo serviços pequenos?
Um contrato simples evita mal-entendidos sobre prazo de entrega, número de revisões e data de pagamento.

## O que não pode faltar
- Dados completos de quem contrata e de quem presta o serviço.
- Descrição clara do que está incluso.
- Valor total, forma de pagamento e prazo de entrega.

## Gere em PDF
Preencha nosso Gerador de Contrato de Prestação de Serviços, baixe o PDF e envie para assinatura.`,
  },
  {
    slug: "como-fazer-capa-folha-rosto-abnt-pdf",
    title: "Como Fazer Capa e Folha de Rosto ABNT em PDF sem Sofrer no Word",
    description: "Gere capa e folha de rosto já com as margens e alinhamentos das normas ABNT e junte ao seu trabalho em PDF.",
    category: "Estudos e acadêmico",
    toolName: "Gerador de Capa ABNT",
    toolHref: "/capa-abnt-pdf",
    summary: "Economize tempo na formatação do TCC ou trabalho escolar gerando a capa ABNT pronta em PDF.",
    content: `## Padrão básico da capa ABNT
A norma pede margens de 3 cm (superior e esquerda) e 2 cm (inferior e direita), com nome da instituição, autor, título, cidade e ano centralizados.

## Como fazer rápido
1. Acesse o Gerador de Capa e Folha de Rosto ABNT.
2. Preencha os campos do seu trabalho.
3. Baixe o PDF e, se precisar, use o Juntar PDF para unir com o restante do arquivo.`,
  },
  {
    slug: "qual-tamanho-foto-3x4-em-pixels-e-cm",
    title: "Qual o Tamanho da Foto 3x4 em Pixels e Centímetros?",
    description: "Descubra as medidas exatas da foto 3x4 em cm e pixels (300 DPI) para RG, CNH, concursos e impressão em folha A4.",
    category: "Imagens e fotos",
    toolName: "Gerador de Foto 3x4",
    toolHref: "/foto-3x4",
    summary: "Veja a conversão exata de 3x4 cm para pixels e como preparar sua foto pelo celular sem perder qualidade.",
    content: `## Medidas oficiais da foto 3x4
- **Em centímetros:** 3 cm de largura por 4 cm de altura.
- **Em pixels (300 DPI para impressão):** 354 x 472 pixels.
- **Para web/formulários:** proporção 3:4 (ex: 450 x 600 px).

## Dicas para não ter a foto recusada
- Use fundo claro e uniforme (preferencialmente branco).
- Evite sombras fortes no rosto e mantenha expressão neutra.

## Faça grátis no navegador
Use nossa ferramenta de Foto 3x4 para recortar na proporção exata e baixar pronta para envio ou impressão.`,
  },
  {
    slug: "como-colocar-papel-timbrado-em-pdf-pronto",
    title: "Como Colocar Papel Timbrado em um PDF Já Pronto",
    description: "Tem um documento pronto e precisa aplicar o cabeçalho e rodapé da sua empresa? Veja como sobrepor timbre em PDF.",
    category: "PDF e documentos",
    toolName: "Folha Timbrada em PDF",
    toolHref: "/folha-timbrada-pdf",
    summary: "Aplique sua marca em contratos, laudos e propostas já existentes sem precisar refazer o documento.",
    content: `## Quando usar a sobreposição de timbre?
Quando você já exportou um orçamento, laudo ou contrato de outro sistema e quer aplicar a identidade visual da sua empresa por cima ou por trás do texto.

## Passo a passo
1. Acesse a ferramenta Folha Timbrada em PDF.
2. Envie seu documento PDF e a imagem do seu timbre/logo.
3. Ajuste a posição e baixe o arquivo timbrado.`,
  },
  {
    slug: "como-fazer-recibo-pagamento-simples-validade",
    title: "Como Fazer um Recibo de Pagamento Simples com Validade",
    description: "Saiba quais informações são obrigatórias em um recibo de pagamento e gere o PDF pronto para assinar.",
    category: "Negócios e vendas",
    toolName: "Gerador de Recibo PDF",
    toolHref: "/gerador-recibo-declaracao-pdf",
    summary: "Um recibo bem preenchido protege tanto quem paga quanto quem recebe. Veja o que incluir.",
    content: `## O que torna um recibo válido?
- Valor numérico e por extenso.
- Nome completo e CPF/CNPJ de quem pagou e de quem recebeu.
- Descrição clara do serviço ou produto pago.
- Data, local e assinatura do recebedor.

## Gere seu recibo agora
Use o Gerador de Recibo em PDF para preencher tudo em segundos e baixar pronto para impressão ou envio digital.`,
  },
  {
    slug: "como-fazer-orcamento-profissional-pdf-whatsapp",
    title: "Como Fazer um Orçamento Profissional em PDF para Enviar no WhatsApp",
    description: "Pare de mandar preços soltos em texto: aprenda a gerar orçamentos em PDF organizados que aumentam sua taxa de fechamento.",
    category: "Negócios e vendas",
    toolName: "Gerador de Orçamento PDF",
    toolHref: "/gerador-orcamento-pdf",
    summary: "Um orçamento em PDF com itens, validade e seus dados passa muito mais confiança para o cliente.",
    content: `## Por que enviar orçamento em PDF?
Mensagens de texto se perdem fácil e parecem informais. Um PDF organizado mostra profissionalismo e justifica melhor o seu preço.

## O que incluir
- Seus dados de contato e logo.
- Lista detalhada de itens ou serviços.
- Prazo de validade da proposta e condições de pagamento.

## Crie grátis
Use nosso Gerador de Orçamento em PDF e envie direto no WhatsApp do cliente.`,
  },
  {
    slug: "como-assinar-pdf-pelo-celular-sem-imprimir",
    title: "Como Assinar um PDF pelo Celular sem Precisar Imprimir",
    description: "Veja como desenhar ou inserir sua assinatura em contratos e documentos PDF direto do celular em poucos segundos.",
    category: "PDF e documentos",
    toolName: "Assinar PDF Online",
    toolHref: "/assinar-pdf",
    summary: "Economize papel e tempo assinando documentos PDF diretamente na tela do seu celular ou computador.",
    content: `## Como funciona a assinatura no navegador?
Você carrega o PDF, desenha sua assinatura com o dedo ou mouse, posiciona no local indicado e baixa o novo PDF assinado. Tudo acontece no seu aparelho, sem enviar o documento para servidores.

## Passo a passo
1. Abra a ferramenta Assinar PDF.
2. Selecione o documento e desenhe sua assinatura.
3. Posicione na página desejada e clique em baixar.`,
  },
];

export const NEW_POSTS: BlogPost[] = drafts.map((post) => ({
  slug: post.slug,
  title: post.title,
  description: post.description,
  publishedAt: "20 de Outubro de 2026",
  readTime: "3 min de leitura",
  category: post.category,
  badgeColor: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
  author: { name: "Evandro Mqs", role: "Criador do CrieGrátis", avatar: "/evandromqs.png" },
  tool: { name: post.toolName, href: post.toolHref, actionText: "Usar ferramenta grátis" },
  summary: post.summary,
  content: post.content,
}));
