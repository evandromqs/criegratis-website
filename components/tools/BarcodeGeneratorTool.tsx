'use client';

import { useState, useRef, useEffect } from 'react';
import { Copy, Download, Sparkles, Check, Barcode } from 'lucide-react';

const CODE128_PATTERNS = [
  '212222', '222122', '222221', '121223', '121322', '131222', '122213', '122312', '132212', '221213',
  '221312', '231212', '112232', '122132', '122231', '113222', '123122', '123221', '223211', '221132',
  '221231', '213212', '223112', '312131', '311222', '321122', '321221', '312212', '322112', '322211',
  '212123', '212321', '232121', '111323', '131123', '131321', '112313', '132113', '132311', '211313',
  '231113', '231311', '112133', '112331', '132131', '113123', '113321', '133121', '313121', '211331',
  '231131', '213113', '213311', '213131', '311123', '311321', '331121', '312113', '312311', '332111',
  '314111', '221411', '431111', '111224', '111422', '121124', '121421', '141122', '141221', '112214',
  '112412', '122114', '122411', '142112', '142211', '241211', '221114', '413111', '241112', '134111',
  '111242', '121142', '121241', '114212', '124112', '124211', '411212', '421112', '421211', '212141',
  '214121', '412121', '111143', '111341', '131141', '114113', '114311', '411113', '411311', '113141',
  '114131', '311141', '411131', '211412', '211214', '211232', '2331112'
];

// EAN-13 encoding tables
const EAN_L = [
  '0001101', '0011001', '0010011', '0111101', '0100011',
  '0110001', '0101111', '0111011', '0110111', '0001011'
];
const EAN_G = [
  '0100111', '0110011', '0011011', '0100001', '0011101',
  '0111001', '0000101', '0010001', '0001001', '0010111'
];
const EAN_R = [
  '1110010', '1100110', '1101100', '1000010', '1011100',
  '1001110', '1010000', '1000100', '1001000', '1110100'
];
const EAN_STRUCTURE = [
  'LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG',
  'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'
];

type BarcodeFormat = 'CODE128' | 'EAN13';

export default function BarcodeGeneratorTool() {
  const [text, setText] = useState('CRIEGRATIS-2026');
  const [format, setFormat] = useState<BarcodeFormat>('CODE128');
  const [barWidth, setBarWidth] = useState(2);
  const [barHeight, setBarHeight] = useState(80);
  const [showText, setShowText] = useState(true);
  const [lineColor, setLineColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);

  // Encode logic
  const encodeBarcode = (): { modules: number[]; displayText: string } | null => {
    if (!text.trim()) return null;

    if (format === 'CODE128') {
      const validChars = text.replace(/[^\x20-\x7E]/g, '');
      if (!validChars) return null;

      const indices: number[] = [];
      let checksum = 104; // START B

      for (let i = 0; i < validChars.length; i++) {
        const code = validChars.charCodeAt(i) - 32;
        indices.push(code);
        checksum += (i + 1) * code;
      }

      const checkCode = checksum % 103;
      const allCodes = [104, ...indices, checkCode, 106];

      const modules: number[] = [];
      // 10 quiet zone modules
      for (let q = 0; q < 10; q++) modules.push(0);

      allCodes.forEach(code => {
        const pattern = CODE128_PATTERNS[code];
        if (!pattern) return;
        let isBar = true;
        for (const char of pattern) {
          const width = Number(char);
          for (let w = 0; w < width; w++) {
            modules.push(isBar ? 1 : 0);
          }
          isBar = !isBar;
        }
      });

      // 10 quiet zone modules
      for (let q = 0; q < 10; q++) modules.push(0);

      return { modules, displayText: validChars };
    }

    if (format === 'EAN13') {
      const digits = text.replace(/\D/g, '');
      if (digits.length < 12) {
        return null;
      }

      // Take first 12 digits, calculate 13th checksum digit
      const base12 = digits.slice(0, 12);
      let sum = 0;
      for (let i = 0; i < 12; i++) {
        const n = Number(base12[i]);
        sum += i % 2 === 0 ? n : n * 3;
      }
      const checkDigit = (10 - (sum % 10)) % 10;
      const full13 = base12 + checkDigit.toString();

      const firstDigit = Number(full13[0]);
      const leftDigits = full13.slice(1, 7);
      const rightDigits = full13.slice(7, 13);
      const structure = EAN_STRUCTURE[firstDigit];

      const modules: number[] = [];
      // Quiet zone
      for (let q = 0; q < 10; q++) modules.push(0);

      // Start guard: 101
      modules.push(1, 0, 1);

      // Left 6 digits
      for (let i = 0; i < 6; i++) {
        const d = Number(leftDigits[i]);
        const encType = structure[i];
        const pattern = encType === 'L' ? EAN_L[d] : EAN_G[d];
        for (const bit of pattern) modules.push(Number(bit));
      }

      // Center guard: 01010
      modules.push(0, 1, 0, 1, 0);

      // Right 6 digits
      for (let i = 0; i < 6; i++) {
        const d = Number(rightDigits[i]);
        const pattern = EAN_R[d];
        for (const bit of pattern) modules.push(Number(bit));
      }

      // End guard: 101
      modules.push(1, 0, 1);

      // Quiet zone
      for (let q = 0; q < 10; q++) modules.push(0);

      return { modules, displayText: full13 };
    }

    return null;
  };

  const encoded = encodeBarcode();

  useEffect(() => {
    if (!text.trim()) {
      setError('Insira um texto ou número para gerar o código.');
    } else if (format === 'EAN13' && text.replace(/\D/g, '').length < 12) {
      setError('EAN-13 requer no mínimo 12 dígitos numéricos.');
    } else {
      setError(null);
    }
  }, [text, format]);

  const totalWidth = encoded ? encoded.modules.length * barWidth : 300;
  const textHeight = showText ? 24 : 0;
  const totalHeight = barHeight + textHeight + 20;

  const handleDownloadSvg = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codigo-de-barras-${text.slice(0, 15).replace(/\W+/g, '-')}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPng = () => {
    if (!encoded) return;
    const canvas = document.createElement('canvas');
    const scale = 2;
    canvas.width = totalWidth * scale;
    canvas.height = totalHeight * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(scale, scale);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, totalWidth, totalHeight);

    // Bars
    ctx.fillStyle = lineColor;
    let x = 0;
    for (let i = 0; i < encoded.modules.length; i++) {
      if (encoded.modules[i] === 1) {
        ctx.fillRect(x, 10, barWidth, barHeight);
      }
      x += barWidth;
    }

    // Text
    if (showText) {
      ctx.fillStyle = lineColor;
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(encoded.displayText, totalWidth / 2, barHeight + 22);
    }

    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `codigo-de-barras-${text.slice(0, 15).replace(/\W+/g, '-')}.png`;
    a.click();
  };

  const handleCopySvg = async () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    await navigator.clipboard.writeText(svgData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Configuration Form */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Text Input */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Conteúdo do Código de Barras
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={format === 'EAN13' ? 'Ex: 789123456789 (12 ou 13 dígitos)' : 'Ex: PROD-998273'}
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-amber-500 font-mono"
              />
              <button
                onClick={() => setText(format === 'EAN13' ? '789123456789' : `PROD-${Math.floor(100000 + Math.random() * 900000)}`)}
                className="px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors"
                title="Gerar código aleatório"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                Exemplo
              </button>
            </div>
            {error && (
              <p className="text-xs text-amber-400 mt-2">{error}</p>
            )}
          </div>

          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Padrão / Simbologia
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setFormat('CODE128');
                  if (/^\d{12,13}$/.test(text)) setText('PROD-2026');
                }}
                className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-colors text-left ${
                  format === 'CODE128'
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className="font-semibold">Code 128</div>
                <div className="text-xs opacity-75">Alfanumérico (Geral)</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormat('EAN13');
                  setText('789100031550');
                }}
                className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-colors text-left ${
                  format === 'EAN13'
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className="font-semibold">EAN-13</div>
                <div className="text-xs opacity-75">Produtos Comerciais</div>
              </button>
            </div>
          </div>

          {/* Sizing sliders */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">
                Largura da Barra: {barWidth}px
              </label>
              <input
                type="range"
                min="1"
                max="4"
                step="0.5"
                value={barWidth}
                onChange={(e) => setBarWidth(Number(e.target.value))}
                className="w-full accent-amber-500 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">
                Altura da Barra: {barHeight}px
              </label>
              <input
                type="range"
                min="40"
                max="160"
                step="5"
                value={barHeight}
                onChange={(e) => setBarHeight(Number(e.target.value))}
                className="w-full accent-amber-500 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Toggle show text & colors */}
          <div className="flex flex-wrap items-center gap-6 md:col-span-2 pt-2 border-t border-neutral-800/60">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-300">
              <input
                type="checkbox"
                checked={showText}
                onChange={(e) => setShowText(e.target.checked)}
                className="w-4 h-4 rounded accent-amber-500 bg-neutral-950 border-neutral-800"
              />
              Exibir texto abaixo das barras
            </label>

            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <span>Barras:</span>
              <input
                type="color"
                value={lineColor}
                onChange={(e) => setLineColor(e.target.value)}
                className="w-8 h-8 rounded border border-neutral-700 bg-transparent cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <span>Fundo:</span>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-8 h-8 rounded border border-neutral-700 bg-transparent cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[260px] space-y-6">
        {encoded ? (
          <div className="overflow-x-auto max-w-full p-4 rounded-xl border border-neutral-800/80 shadow-inner" style={{ backgroundColor: bgColor }}>
            <svg
              ref={svgRef}
              width={totalWidth}
              height={totalHeight}
              viewBox={`0 0 ${totalWidth} ${totalHeight}`}
              xmlns="http://www.w3.org/2000/svg"
              className="max-w-none"
            >
              <rect width={totalWidth} height={totalHeight} fill={bgColor} />
              {encoded.modules.map((bit, idx) => {
                if (bit === 1) {
                  return (
                    <rect
                      key={idx}
                      x={idx * barWidth}
                      y={10}
                      width={barWidth}
                      height={barHeight}
                      fill={lineColor}
                    />
                  );
                }
                return null;
              })}
              {showText && (
                <text
                  x={totalWidth / 2}
                  y={barHeight + 24}
                  textAnchor="middle"
                  fill={lineColor}
                  fontFamily="monospace"
                  fontSize="14"
                  fontWeight="bold"
                  letterSpacing="1"
                >
                  {encoded.displayText}
                </text>
              )}
            </svg>
          </div>
        ) : (
          <div className="text-center py-8 text-neutral-500">
            <Barcode className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Digite dados válidos acima para visualizar o código de barras.</p>
          </div>
        )}

        {/* Action Buttons */}
        {encoded && (
          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            <button
              onClick={handleDownloadPng}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold rounded-xl text-sm flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
            >
              <Download className="w-4 h-4" />
              Baixar PNG
            </button>
            <button
              onClick={handleDownloadSvg}
              className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-xl text-sm flex items-center gap-2 transition-colors border border-neutral-700"
            >
              <Download className="w-4 h-4" />
              Baixar Vetor SVG
            </button>
            <button
              onClick={handleCopySvg}
              className="px-4 py-2.5 bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 font-medium rounded-xl text-sm flex items-center gap-2 transition-colors border border-neutral-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar SVG'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
