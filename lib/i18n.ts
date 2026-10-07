export type Locale = "pt" | "es" | "en";

export interface LocaleInfo {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
  path: string;
}

export const LOCALES: LocaleInfo[] = [
  { code: "pt", name: "Português", nativeName: "Português (BR)", flag: "🇧🇷", path: "/" },
  { code: "es", name: "Espanhol", nativeName: "Español", flag: "🇪🇸", path: "/es" },
  { code: "en", name: "Inglês", nativeName: "English", flag: "🇺🇸", path: "/en" },
];

export interface TranslationDictionary {
  nav: {
    tools: string;
    categories: string;
    blog: string;
    favorites: string;
    support: string;
    searchPlaceholder: string;
    appWindows: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    exploreBtn: string;
    searchPlaceholder: string;
    popularBadge: string;
  };
  features: {
    privacy: string;
    privacyDesc: string;
    speed: string;
    speedDesc: string;
    freeForever: string;
    freeForeverDesc: string;
  };
  topTools: {
    title: string;
    subtitle: string;
    seeAll: string;
  };
  msStore: {
    availableOn: string;
    title: string;
    compatible: string;
    getApp: string;
    badge: string;
  };
  support: {
    title: string;
    subtitle: string;
    cta: string;
  };
  footer: {
    tagline: string;
    about: string;
    privacy: string;
    terms: string;
    roadmap: string;
    rights: string;
  };
}

export const TRANSLATIONS: Record<Locale, TranslationDictionary> = {
  pt: {
    nav: {
      tools: "Ferramentas",
      categories: "Categorias",
      blog: "Blog",
      favorites: "Favoritas",
      support: "Apoiar",
      searchPlaceholder: "Buscar ferramenta...",
      appWindows: "App Windows",
    },
    hero: {
      badge: "Mais de 70 ferramentas 100% no seu navegador",
      titleStart: "Ferramentas gratuitas para",
      titleHighlight: "criar, converter e resolver.",
      titleEnd: "",
      subtitle: "Tudo o que você precisa no dia a dia em um só lugar. Rápido, seguro, sem anúncios invasivos e 100% processado no seu dispositivo.",
      exploreBtn: "Explorar catálogo completo",
      searchPlaceholder: "Buscar ferramenta (ex: png para jpg, qrcode, senha)...",
      popularBadge: "Mais Populares:",
    },
    features: {
      privacy: "100% Privado e Seguro",
      privacyDesc: "Seus arquivos e dados nunca são enviados para a internet. Todo o processamento acontece localmente no seu computador ou celular.",
      speed: "Velocidade Instantânea",
      speedDesc: "Sem filas de espera ou tempo de upload. Converta, calcule e gere resultados em milissegundos.",
      freeForever: "Sempre Gratuito",
      freeForeverDesc: "Livre de planos 'Pro' ocultos, cobranças surpresa ou limite abusivo de arquivos diários.",
    },
    topTools: {
      title: "Ferramentas em Destaque",
      subtitle: "As ferramentas mais utilizadas diariamente por milhares de pessoas e profissionais.",
      seeAll: "Ver todas as ferramentas",
    },
    msStore: {
      availableOn: "Disponível na",
      title: "Microsoft Store",
      compatible: "Compatível com Windows 10 e Windows 11",
      getApp: "Baixar App Grátis",
      badge: "Aplicativo Oficial para PC",
    },
    support: {
      title: "Gostou do Crie Grátis?",
      subtitle: "Ajude a manter os servidores ativos, rápidos e livres de anúncios abusivos para todo mundo.",
      cta: "Apoiar o projeto",
    },
    footer: {
      tagline: "Ferramentas online gratuitas para todos. Processamento 100% no seu navegador com privacidade total.",
      about: "Sobre o Crie Grátis",
      privacy: "Política de Privacidade",
      terms: "Termos de Uso",
      roadmap: "Roadmap (100 Ferramentas)",
      rights: "Todos os direitos reservados.",
    },
  },
  es: {
    nav: {
      tools: "Herramientas",
      categories: "Categorías",
      blog: "Blog",
      favorites: "Favoritas",
      support: "Apoyar",
      searchPlaceholder: "Buscar herramienta...",
      appWindows: "App Windows",
    },
    hero: {
      badge: "Más de 70 herramientas 100% en tu navegador",
      titleStart: "Herramientas gratuitas para",
      titleHighlight: "crear, convertir y resolver.",
      titleEnd: "",
      subtitle: "Todo lo que necesitas a diario en un solo lugar. Rápido, seguro, sin anuncios invasivos y 100% procesado en tu dispositivo.",
      exploreBtn: "Explorar catálogo completo",
      searchPlaceholder: "Buscar herramienta (ej: unir pdf, código qr, contraseña)...",
      popularBadge: "Más Populares:",
    },
    features: {
      privacy: "100% Privado y Seguro",
      privacyDesc: "Tus archivos y datos nunca se suben a internet. Todo el procesamiento se realiza localmente en tu equipo o móvil.",
      speed: "Velocidad Instantánea",
      speedDesc: "Sin filas de espera ni demoras de subida. Convierte, calcula y genera resultados en milisegundos.",
      freeForever: "Siempre Gratis",
      freeForeverDesc: "Sin suscripciones ocultas, cobros sorpresa ni límites molestos de documentos diarios.",
    },
    topTools: {
      title: "Herramientas Destacadas",
      subtitle: "Las soluciones más utilizadas a diario por miles de usuarios y profesionales.",
      seeAll: "Ver todas las herramientas",
    },
    msStore: {
      availableOn: "Disponible en",
      title: "Microsoft Store",
      compatible: "Compatible con Windows 10 y Windows 11",
      getApp: "Descargar App Gratis",
      badge: "Aplicación Oficial para PC",
    },
    support: {
      title: "¿Te gusta Crie Grátis?",
      subtitle: "Ayuda a mantener los servidores rápidos, activos y libres de anuncios invasivos para todo el mundo.",
      cta: "Apoyar el proyecto",
    },
    footer: {
      tagline: "Herramientas online gratuitas para todos. Procesamiento 100% en tu navegador con privacidad absoluta.",
      about: "Sobre Crie Grátis",
      privacy: "Política de Privacidad",
      terms: "Términos de Uso",
      roadmap: "Roadmap (100 Herramientas)",
      rights: "Todos los derechos reservados.",
    },
  },
  en: {
    nav: {
      tools: "Tools",
      categories: "Categories",
      blog: "Blog",
      favorites: "Favorites",
      support: "Support",
      searchPlaceholder: "Search tool...",
      appWindows: "Windows App",
    },
    hero: {
      badge: "70+ free utility tools 100% in your browser",
      titleStart: "Free web tools to",
      titleHighlight: "create, convert and solve.",
      titleEnd: "",
      subtitle: "Everything you need in your daily workflow in one place. Fast, private, no invasive ads and 100% client-side processing.",
      exploreBtn: "Explore all tools",
      searchPlaceholder: "Search tools (e.g. merge pdf, qr code, passwords)...",
      popularBadge: "Most Popular:",
    },
    features: {
      privacy: "100% Private & Secure",
      privacyDesc: "Your files and confidential data never leave your device. All operations happen in-memory in your browser.",
      speed: "Instant Speed",
      speedDesc: "No queue times or cloud upload delays. Convert, compute and download your files in milliseconds.",
      freeForever: "Always Free",
      freeForeverDesc: "No sneaky subscriptions, unexpected fees or artificial daily file limits.",
    },
    topTools: {
      title: "Featured Tools",
      subtitle: "The most popular productivity and developer tools used daily worldwide.",
      seeAll: "Browse all tools",
    },
    msStore: {
      availableOn: "Available on",
      title: "Microsoft Store",
      compatible: "Compatible with Windows 10 & Windows 11",
      getApp: "Get Free PC App",
      badge: "Official Windows Desktop App",
    },
    support: {
      title: "Enjoying Crie Grátis?",
      subtitle: "Help keep our independent servers fast, online and free of intrusive advertising.",
      cta: "Support the Project",
    },
    footer: {
      tagline: "Free online utility tools for everyone. 100% client-side in-browser processing with total privacy.",
      about: "About Crie Grátis",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      roadmap: "Roadmap (100 Tools)",
      rights: "All rights reserved.",
    },
  },
};

// Ferramentas com maior demanda global (tradução dos títulos e descrições para a vitrine internacional)
export interface InternationalToolItem {
  slug: string;
  href: string;
  iconName: string;
  category: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  actionText: Record<Locale, string>;
  badge?: string;
}

export const INTERNATIONAL_SHOWCASE_TOOLS: InternationalToolItem[] = [
  {
    slug: "criar-qr-code",
    href: "/criar-qr-code",
    iconName: "QrCode",
    category: "qr-code",
    badge: "Popular",
    title: {
      pt: "Gerador de QR Code",
      es: "Generador de Código QR",
      en: "QR Code Generator",
    },
    description: {
      pt: "Crie QR Codes estáticos em alta definição para sites, Wi-Fi e links que nunca expiram.",
      es: "Crea códigos QR estáticos en alta definición para sitios web, Wi-Fi y enlaces que nunca vencen.",
      en: "Create crisp, high-resolution static QR codes for links, Wi-Fi and text that never expire.",
    },
    actionText: {
      pt: "Criar QR Code",
      es: "Crear Código QR",
      en: "Generate QR Code",
    },
  },
  {
    slug: "juntar-pdf",
    href: "/juntar-pdf",
    iconName: "Files",
    category: "pdf",
    badge: "Essencial",
    title: {
      pt: "Juntar Arquivos PDF",
      es: "Unir Archivos PDF",
      en: "Merge PDF Files",
    },
    description: {
      pt: "Combine vários documentos e folhas PDF em um único arquivo organizado e sem limites.",
      es: "Combina múltiples documentos PDF en un solo archivo ordenado sin límites ni marcas de agua.",
      en: "Combine multiple PDF files into one clean, well-ordered document with zero upload limits.",
    },
    actionText: {
      pt: "Juntar PDFs",
      es: "Unir PDFs",
      en: "Merge PDFs",
    },
  },
  {
    slug: "assinar-pdf",
    href: "/assinar-pdf",
    iconName: "FileSignature",
    category: "pdf",
    badge: "Top",
    title: {
      pt: "Assinar PDF Online",
      es: "Firmar PDF Online",
      en: "Sign PDF Online",
    },
    description: {
      pt: "Desenhe sua assinatura touch ou insira imagem para assinar contratos sem imprimir papel.",
      es: "Dibuja tu firma digital o inserta tu rúbrica para firmar contratos sin imprimir papel.",
      en: "Draw your signature or upload initials to sign digital contracts without printing paper.",
    },
    actionText: {
      pt: "Assinar Documento",
      es: "Firmar Documento",
      en: "Sign Document",
    },
  },
  {
    slug: "comprimir-imagem",
    href: "/comprimir-imagem",
    iconName: "Minimize2",
    category: "imagens",
    title: {
      pt: "Comprimir Imagem",
      es: "Comprimir Imagen",
      en: "Compress Image",
    },
    description: {
      pt: "Reduza o peso de imagens JPG, PNG e WebP em até 90% mantendo máxima nitidez visual.",
      es: "Reduce el tamaño de imágenes JPG, PNG y WebP hasta un 90% preservando la calidad visual.",
      en: "Reduce the file size of JPG, PNG and WebP images by up to 90% with zero quality loss.",
    },
    actionText: {
      pt: "Comprimir Agora",
      es: "Comprimir Ahora",
      en: "Compress Image",
    },
  },
  {
    slug: "foto-3x4",
    href: "/foto-3x4",
    iconName: "UserSquare2",
    category: "imagens",
    title: {
      pt: "Foto 3x4 & Documentos",
      es: "Foto Carnet & Pasaporte",
      en: "Passport & ID Photo Maker",
    },
    description: {
      pt: "Enquadre fotos para documentos oficiais e monte a folha de impressão 10x15cm com 8 fotos.",
      es: "Encuadra fotos para DNI, pasaporte y credenciales en hoja de impresión 10x15 cm.",
      en: "Crop and align ID, visa and passport photos ready to print on standard 4x6 photo paper.",
    },
    actionText: {
      pt: "Gerar Foto",
      es: "Crear Foto Carnet",
      en: "Create Photo",
    },
  },
  {
    slug: "converter-para-webp",
    href: "/converter-para-webp",
    iconName: "RefreshCw",
    category: "imagens",
    title: {
      pt: "Converter para WebP",
      es: "Convertir a WebP",
      en: "Convert to WebP",
    },
    description: {
      pt: "Transforme PNG e JPG no formato moderno do Google para acelerar sites e melhorar SEO.",
      es: "Convierte PNG y JPG al formato moderno de Google para acelerar sitios web y mejorar SEO.",
      en: "Convert PNG and JPG to Google's modern WebP format for faster page speed and SEO.",
    },
    actionText: {
      pt: "Converter Imagem",
      es: "Convertir a WebP",
      en: "Convert to WebP",
    },
  },
  {
    slug: "mockup-dispositivos",
    href: "/mockup-dispositivos",
    iconName: "MonitorSmartphone",
    category: "imagens",
    title: {
      pt: "Mockup de Dispositivos",
      es: "Mockup de Dispositivos",
      en: "Device Mockup Generator",
    },
    description: {
      pt: "Enquadre capturas de tela em molduras elegantes de smartphone, notebook e navegador.",
      es: "Inserta capturas de pantalla en marcos modernos de smartphone, laptop y navegador.",
      en: "Wrap your screenshots inside realistic smartphone, laptop and browser device frames.",
    },
    actionText: {
      pt: "Criar Mockup",
      es: "Generar Mockup",
      en: "Create Mockup",
    },
  },
  {
    slug: "proteger-pdf",
    href: "/proteger-pdf",
    iconName: "Lock",
    category: "pdf",
    title: {
      pt: "Proteger PDF com Senha",
      es: "Proteger PDF con Contraseña",
      en: "Protect PDF with Password",
    },
    description: {
      pt: "Criptografe seus arquivos confidenciais com senha segura direto na memória do navegador.",
      es: "Cifra tus documentos confidenciales con contraseña segura directamente en el navegador.",
      en: "Encrypt your sensitive documents with strong password protection directly in-browser.",
    },
    actionText: {
      pt: "Proteger PDF",
      es: "Proteger PDF",
      en: "Protect PDF",
    },
  },
];
