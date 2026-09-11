# 🚀 Expansão Crie Grátis: 50 Ferramentas

> Planejamento estratégico e catálogo técnico das **29 novas ferramentas** que expandem a plataforma de **21 para 50 ferramentas**, priorizadas com base nos dados reais do **Google Search Console (GSC)** e nas maiores demandas de pesquisa orgânica no Brasil.

---

## 📊 Diagnóstico do Google Search Console (GSC)

Os dados de cliques e impressões do GSC revelaram:
1. **Cluster de Imagens concentra mais de 75% das impressões:**
   - `jpg-para-png` (135 impressões) e `png-para-jpg` (116 impressões) lideram de longe a indexação orgânica.
   - `redimensionar-imagem` (38 impressões) e `comprimir-imagem` completam o grupo mais forte.
2. **Cluster de Geradores com avanço rápido no ranking:**
   - `gerar-senha` alcançou a posição média **27.62** (página 3 do Google), mostrando rápida autoridade temática.
3. **Linkagem de Oportunidade:**
   - Quem busca `criar-qr-code` frequentemente busca `código de barras`.
   - Quem busca conversores de imagens busca variações para **WebP**, **SVG**, **Base64** e **remoção de fundo branco**.

---

## 🛠️ Catálogo das 29 Novas Ferramentas (Organizadas por Categoria)

### 🖼️ 1. Imagens & Mídia (Fortalecendo o Cluster Líder do GSC)

| # | Ferramenta | Slug | Categoria | Justificativa SEO & GSC | Implementação Client-Side |
|---|---|---|---|---|---|
| 01 | **Converter SVG para PNG** | `/svg-para-png` | `imagens` | Complementa o cluster líder (`png-para-jpg` / `jpg-para-png`). Altíssima busca por designers e devs. | Canvas 2D renderiza o arquivo SVG vetorial e exporta em PNG com transparência. |
| 02 | **Converter para WebP** | `/converter-para-webp` | `imagens` | Exigência prioritária do Google PageSpeed Insights para otimização de sites. | HTML5 Canvas com `toBlob('image/webp', quality)` e seletor de compressão. |
| 03 | **Imagem para Base64** | `/imagem-para-base64` | `imagens` | Conecta o público de imagens ao público dev (`formatar-json`, `base64`). | `FileReader.readAsDataURL()` gerando preview e tags `<img>` e CSS prontas. |
| 04 | **Remover Fundo Branco / Sólido** | `/remover-fundo-branco` | `imagens` | Uma das maiores dores de quem converte JPG para PNG (logos, assinaturas, ícones). | Leitura de `ImageData` no Canvas, cálculo de distância de cor com tolerância e alpha = 0. |
| 05 | **Conta-gotas de Imagem (Color Picker)** | `/conta-gotas-imagem` | `imagens` | Identificação de cores em fotos e logos sem precisar abrir Photoshop/Figma. | Leitura de coordenadas do mouse no Canvas 2D, exibindo HEX, RGB e HSL com cópia rápida. |
| 06 | **Espelhar Imagem (Flip Horizontal/Vertical)** | `/espelhar-imagem` | `imagens` | Correção de fotos de câmera frontal ou espelhamento para estamparia e sublimação. | Transformação `ctx.scale(-1, 1)` e `ctx.scale(1, -1)` no Canvas e download PNG/JPG. |

---

### 📄 2. Documentos & PDF (Alta Intenção de Busca / iLovePDF Alternativa)

| # | Ferramenta | Slug | Categoria | Justificativa SEO & GSC | Implementação Client-Side |
|---|---|---|---|---|---|
| 07 | **Dividir PDF / Extrair Páginas** | `/dividir-pdf` | `desenvolvedor` | Top buscas em PDF no Brasil. Separação de contratos, boletos e relatórios. | `pdf-lib` lendo o PDF na memória, extraindo intervalos de páginas e gerando novo PDF. |
| 08 | **Girar / Rotacionar PDF** | `/girar-pdf` | `desenvolvedor` | Documentos digitalizados invertidos ou em orientação mista (retrato/paisagem). | `pdf-lib` aplicando rotação (`degrees(90)`) nas páginas selecionadas ou em lote. |
| 09 | **Proteger PDF com Senha** | `/proteger-pdf` | `desenvolvedor` | Proteção de dados confidenciais (LGPD, contracheques, contratos). | Criptografia client-side do documento com senha de abertura. |
| 10 | **Desproteger PDF / Remover Senha** | `/desproteger-pdf` | `desenvolvedor` | Usuários que possuem a senha de um PDF e desejam salvar uma cópia desprotegida. | Desbloqueio em memória via chave fornecida e regravação do arquivo limpo. |

---

### 💻 3. Desenvolvedores & Webmasters

| # | Ferramenta | Slug | Categoria | Justificativa SEO & GSC | Implementação Client-Side |
|---|---|---|---|---|---|
| 11 | **Gerador e Validador de CNPJ** | `/gerador-validador-cnpj` | `desenvolvedor` | Par essencial do CPF (já existente). Criação de massa de testes de sistemas no Brasil. | Algoritmo oficial dos 2 dígitos verificadores, com opções com/sem pontuação e cópia rápida. |
| 12 | **Gerador de Lorem Ipsum** | `/gerador-lorem-ipsum` | `desenvolvedor` | Essencial para designers, redatores e devs gerarem textos de marcação. | Geração instantânea por parágrafos, frases ou palavras com botão de cópia. |
| 13 | **URL Encoder / Decoder** | `/url-encoder-decoder` | `desenvolvedor` | Tratamento de links com acentos, espaços e parâmetros de campanhas/APIs. | `encodeURIComponent` e `decodeURIComponent` bidirecional em tempo real. |
| 14 | **Gerador de Hash (MD5, SHA-256, SHA-512)** | `/gerador-hash` | `desenvolvedor` | Verificação de integridade de arquivos, senhas e segurança da informação. | `crypto.subtle.digest()` nativa do browser para SHA e algoritmo MD5 rápido. |
| 15 | **Formatador de SQL** | `/formatar-sql` | `desenvolvedor` | Formatação de queries em SELECT, JOIN, WHERE para documentação e debug. | Parser de regras SQL com indentação limpa e destaque de palavras-chave. |
| 16 | **Formatador e Validador de XML** | `/formatar-xml` | `desenvolvedor` | Altamente buscado no Brasil por conta de Notas Fiscais Eletrônicas (NF-e/NFC-e). | `DOMParser` nativo do navegador com validação de erros sintáticos e indentação. |
| 17 | **Gerador de Meta Tags SEO & Open Graph** | `/gerador-metatags` | `desenvolvedor` | Conecta os criadores de sites aos snippets do WhatsApp, Facebook e Google. | Formulário com visualizador em tempo real do card de redes sociais e código pronto. |
| 18 | **Gerador de Código de Barras (CODE128, EAN-13)** | `/gerador-codigo-de-barras` | `qr-code` | Parceiro direto do `criar-qr-code`. Comércio, etiquetas de produtos e inventário. | Renderização vetorial SVG/Canvas para impressão e download de códigos de barras. |

---

### ✍️ 4. Texto, Redação & Produtividade

| # | Ferramenta | Slug | Categoria | Justificativa SEO & GSC | Implementação Client-Side |
|---|---|---|---|---|---|
| 19 | **Remover Linhas Duplicadas** | `/remover-linhas-duplicadas` | `texto` | Limpeza de mailing de e-mails, cadastros e exportações de ERP/planilhas. | Deduplicação por `Set` com opções de sensibilidade a maiúsculas e trim de espaços. |
| 20 | **Comparador de Textos (Diff Checker)** | `/comparar-textos` | `texto` | Comparação lado a lado de versões de contratos, redações ou códigos. | Algoritmo de diff com destaque em verde (adicionado) e vermelho (removido). |
| 21 | **Inverter Texto / Texto Espelhado** | `/inverter-texto` | `texto` | Redes sociais, enigmas, brincadeiras e formatação criativa. | Inversão de caracteres, ordem de palavras e inversão de linhas. |
| 22 | **Ordenador de Listas Alfabético e Numérico** | `/ordenar-lista` | `texto` | Organizar listas desordenadas de A-Z, Z-A, remover linhas vazias e ordenar números. | `localeCompare('pt-BR')` com tratamento de acentuação e ordenação natural. |
| 23 | **Contador de Linhas e Parágrafos** | `/contador-de-linhas` | `texto` | Expande o cluster de `contador-de-caracteres` e `contador-de-palavras` do GSC. | Contagem de linhas totais, não-vazias, parágrafos e densidade média. |

---

### 🧮 5. Calculadoras & Finanças Práticas

| # | Ferramenta | Slug | Categoria | Justificativa SEO & GSC | Implementação Client-Side |
|---|---|---|---|---|---|
| 24 | **Calculadora de IMC (Índice de Massa Corporal)** | `/calculadora-imc` | `calculadoras` | Um dos termos de saúde mais buscados no Brasil com alto apelo popular. | Cálculo com classificação da OMS e régua visual colorida de progresso. |
| 25 | **Calculadora de Dias entre Datas** | `/calculadora-de-dias` | `calculadoras` | Prazos judiciais, contagem regressiva para viagens, eventos e contratos. | Diferença em dias corridos, semanas, meses, anos e detalhamento de fins de semana. |
| 26 | **Calculadora de Dias Úteis** | `/calculadora-dias-uteis` | `calculadoras` | Cálculo de prazos bancários, fretes de e-commerce e entregas empresariais. | Exclusão de sábados, domingos e calendário de feriados nacionais brasileiros. |
| 27 | **Calculadora de Idade Exata** | `/calculadora-de-idade` | `calculadoras` | Saber anos, meses, dias, horas de vida e contagem regressiva para o aniversário. | Cálculo exato baseado no momento atual e ano bissexto. |
| 28 | **Calculadora de Desconto Comercial** | `/calculadora-de-desconto` | `calculadoras` | Compras, Black Friday e precificação rápida de produtos e promoções. | Cálculo bidirecional: informe o preço e % de desconto ou preço original e final. |
| 29 | **Calculadora de Divisão de Lucros / Sociedade** | `/calculadora-divisao-lucros` | `calculadoras` | Divisão justa de lucros e despesas de projetos entre sócios conforme aporte. | Entrada dinâmica de sócios com cálculo de percentuais e valores líquidos. |

---

## 🎯 Meta Consolidada das 50 Ferramentas

- **Ferramentas Atuais no Ar:** 21 ferramentas
- **Novas Ferramentas neste Planejamento:** 29 ferramentas
- **Total:** 50 ferramentas 100% gratuitas, privadas e sem servidor.
