export interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Loads an HTMLImageElement from a File or Blob.
 */
export function loadImageFromFile(file: File): Promise<{ img: HTMLImageElement; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        resolve({ img, width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => reject(new Error("Não foi possível carregar a imagem. Formato inválido ou corrompido."));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Erro ao ler o arquivo selecionado."));
    reader.readAsDataURL(file);
  });
}

/**
 * Redimensiona uma imagem utilizando HTML5 Canvas e gera um Blob.
 */
export async function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number,
  mimeType: string = "image/jpeg",
  quality: number = 0.9
): Promise<{ blob: Blob; url: string; width: number; height: number }> {
  const { img } = await loadImageFromFile(file);

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Não foi possível inicializar o contexto 2D do Canvas.");

  // Desenho com suavização de imagem ativada
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Se for JPG, preenche fundo branco por garantia
  if (mimeType === "image/jpeg") {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Falha ao gerar a imagem redimensionada."));
        const url = URL.createObjectURL(blob);
        resolve({ blob, url, width: targetWidth, height: targetHeight });
      },
      mimeType,
      quality
    );
  });
}

/**
 * Comprime uma imagem ajustando a qualidade no Canvas.
 */
export async function compressImage(
  file: File,
  qualityPercentage: number
): Promise<{ blob: Blob; url: string; originalSize: number; compressedSize: number; savedPercentage: number }> {
  const { img, width, height } = await loadImageFromFile(file);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Erro ao inicializar Canvas.");

  // Garantir fundo branco se o tipo original for JPEG
  const isJpeg = file.type === "image/jpeg" || file.type === "image/jpg";
  if (isJpeg) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(img, 0, 0, width, height);

  const quality = Math.max(0.05, Math.min(1, qualityPercentage / 100));
  const outputMime = file.type === "image/png" ? "image/jpeg" : file.type || "image/jpeg";

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Falha ao comprimir imagem."));
        const originalSize = file.size;
        const compressedSize = blob.size;
        const savedPercentage = Math.round(((originalSize - compressedSize) / originalSize) * 100);
        const url = URL.createObjectURL(blob);

        resolve({
          blob,
          url,
          originalSize,
          compressedSize,
          savedPercentage: Math.max(0, savedPercentage),
        });
      },
      outputMime,
      quality
    );
  });
}

/**
 * Converte JPG para PNG sem perda.
 */
export async function convertJpgToPng(file: File): Promise<{ blob: Blob; url: string }> {
  const { img, width, height } = await loadImageFromFile(file);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Erro de contexto de Canvas.");

  ctx.drawImage(img, 0, 0, width, height);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject(new Error("Falha na conversão para PNG."));
      const url = URL.createObjectURL(blob);
      resolve({ blob, url });
    }, "image/png");
  });
}

/**
 * Converte PNG para JPG com tratamento de fundo transparente.
 */
export async function convertPngToJpg(
  file: File,
  backgroundColor: string = "#FFFFFF",
  qualityPercentage: number = 90
): Promise<{ blob: Blob; url: string }> {
  const { img, width, height } = await loadImageFromFile(file);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Erro no Canvas.");

  // Preenche fundo para tratar transparência
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  ctx.drawImage(img, 0, 0, width, height);

  const quality = Math.max(0.1, Math.min(1, qualityPercentage / 100));

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Falha na conversão para JPG."));
        const url = URL.createObjectURL(blob);
        resolve({ blob, url });
      },
      "image/jpeg",
      quality
    );
  });
}

/**
 * Formata o tamanho do arquivo em bytes para KB ou MB de forma amigável.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Converte arquivo SVG para PNG em alta definição com suporte a escala (1x, 2x, 4x).
 */
export async function convertSvgToPng(
  file: File,
  scale: number = 2,
  backgroundColor: string = "transparent"
): Promise<{ blob: Blob; url: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const w = (img.naturalWidth || 800) * scale;
        const h = (img.naturalHeight || 800) * scale;

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Erro de contexto Canvas."));

        if (backgroundColor && backgroundColor !== "transparent") {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, w, h);
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, w, h);

        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error("Falha ao exportar SVG para PNG."));
          const url = URL.createObjectURL(blob);
          resolve({ blob, url, width: w, height: h });
        }, "image/png");
      };
      img.onerror = () => reject(new Error("Não foi possível carregar o arquivo SVG."));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Falha ao ler o arquivo SVG."));
    reader.readAsDataURL(file);
  });
}

/**
 * Converte qualquer imagem compatível (PNG, JPG, BMP) para o formato moderno WebP.
 */
export async function convertToWebp(
  file: File,
  qualityPercentage: number = 85
): Promise<{ blob: Blob; url: string; originalSize: number; convertedSize: number; savedPercentage: number; width: number; height: number }> {
  const { img, width, height } = await loadImageFromFile(file);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Erro de contexto Canvas.");

  ctx.drawImage(img, 0, 0, width, height);

  const quality = Math.max(0.1, Math.min(1, qualityPercentage / 100));

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Falha ao converter para WebP."));
        const originalSize = file.size;
        const convertedSize = blob.size;
        const savedPercentage = Math.round(((originalSize - convertedSize) / originalSize) * 100);
        const url = URL.createObjectURL(blob);

        resolve({
          blob,
          url,
          originalSize,
          convertedSize,
          savedPercentage,
          width,
          height,
        });
      },
      "image/webp",
      quality
    );
  });
}

/**
 * Converte arquivo de imagem para Base64 Data URI e string limpa.
 */
export async function imageToBase64(
  file: File
): Promise<{ base64: string; dataUri: string; width: number; height: number; size: number }> {
  const { img, width, height } = await loadImageFromFile(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      const base64 = dataUri.split(",")[1] || "";
      resolve({
        base64,
        dataUri,
        width,
        height,
        size: file.size,
      });
    };
    reader.onerror = () => reject(new Error("Falha ao ler arquivo para Base64."));
    reader.readAsDataURL(file);
  });
}

/**
 * Remove fundo branco ou sólido claro da imagem tornando os pixels transparentes.
 */
export async function removeWhiteBackground(
  file: File,
  tolerance: number = 30
): Promise<{ blob: Blob; url: string; width: number; height: number }> {
  const { img, width, height } = await loadImageFromFile(file);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Erro ao acessar contexto 2D do Canvas.");

  ctx.drawImage(img, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Threshold baseado na tolerância (0 a 100)
  const threshold = (tolerance / 100) * 441.67; // sqrt(255^2 * 3) = 441.67

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Distância até o branco puro (255, 255, 255)
    const dist = Math.sqrt(
      Math.pow(255 - r, 2) + Math.pow(255 - g, 2) + Math.pow(255 - b, 2)
    );

    if (dist <= threshold) {
      // Se estiver dentro da tolerância, calcula fade out suave na borda
      if (dist <= threshold * 0.7) {
        data[i + 3] = 0; // 100% transparente
      } else {
        const factor = (dist - threshold * 0.7) / (threshold * 0.3);
        data[i + 3] = Math.round(data[i + 3] * factor);
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject(new Error("Falha ao processar remoção de fundo."));
      const url = URL.createObjectURL(blob);
      resolve({ blob, url, width, height });
    }, "image/png");
  });
}

/**
 * Espelha a imagem horizontalmente e/ou verticalmente.
 */
export async function flipImage(
  file: File,
  horizontal: boolean = true,
  vertical: boolean = false
): Promise<{ blob: Blob; url: string; width: number; height: number }> {
  const { img, width, height } = await loadImageFromFile(file);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Erro de contexto Canvas.");

  ctx.save();
  ctx.translate(horizontal ? width : 0, vertical ? height : 0);
  ctx.scale(horizontal ? -1 : 1, vertical ? -1 : 1);
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();

  const mime = file.type === "image/png" ? "image/png" : "image/jpeg";

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject(new Error("Falha ao espelhar imagem."));
      const url = URL.createObjectURL(blob);
      resolve({ blob, url, width, height });
    }, mime);
  });
}

