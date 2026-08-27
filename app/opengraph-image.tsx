import { ImageResponse } from "next/og";

export const alt = "Crie Grátis — Ferramentas Gratuitas";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0B0F19 0%, #0F172A 50%, #1E293B 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Luzes / Efeitos de Fundo */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            background: "rgba(37, 99, 235, 0.25)",
            borderRadius: "50%",
            filter: "blur(90px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            background: "rgba(6, 182, 212, 0.2)",
            borderRadius: "50%",
            filter: "blur(90px)",
          }}
        />

        {/* Container Central */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "950px",
          }}
        >
          {/* Logo da Marca */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "28px",
            }}
          >
            {/* Ícone Estilizado */}
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 25px rgba(37, 99, 235, 0.4)",
              }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M12 12v9" />
                <path d="m8 17 4 4 4-4" />
              </svg>
            </div>

            {/* Texto Logo */}
            <div
              style={{
                display: "flex",
                fontSize: "52px",
                fontWeight: "900",
                letterSpacing: "-1px",
              }}
            >
              <span style={{ color: "#FFFFFF" }}>Crie</span>
              <span style={{ color: "#38BDF8", marginLeft: "12px" }}>Grátis</span>
            </div>
          </div>

          {/* Slogan Principal */}
          <h1
            style={{
              fontSize: "44px",
              fontWeight: "800",
              color: "#FFFFFF",
              lineHeight: 1.2,
              margin: "0 0 20px 0",
              letterSpacing: "-0.5px",
            }}
          >
            Ferramentas gratuitas para criar, converter e resolver.
          </h1>

          {/* Subtítulo */}
          <p
            style={{
              fontSize: "22px",
              color: "#94A3B8",
              margin: "0 0 36px 0",
              lineHeight: 1.4,
            }}
          >
            QR Code • Comprimir Imagens • Gerar Senha • Calculadoras • Formatador JSON
          </p>

          {/* Badges de Destaque */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(30, 41, 59, 0.8)",
                border: "1px solid rgba(51, 65, 85, 0.8)",
                borderRadius: "9999px",
                padding: "8px 20px",
                fontSize: "16px",
                fontWeight: "600",
                color: "#38BDF8",
              }}
            >
              ⚡ 100% no Navegador
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(30, 41, 59, 0.8)",
                border: "1px solid rgba(51, 65, 85, 0.8)",
                borderRadius: "9999px",
                padding: "8px 20px",
                fontSize: "16px",
                fontWeight: "600",
                color: "#34D399",
              }}
            >
              🔒 Sem Cadastro
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(30, 41, 59, 0.8)",
                border: "1px solid rgba(51, 65, 85, 0.8)",
                borderRadius: "9999px",
                padding: "8px 20px",
                fontSize: "16px",
                fontWeight: "600",
                color: "#FBBF24",
              }}
            >
              🆓 Totalmente Grátis
            </div>
          </div>
        </div>

        {/* Rodapé do Card */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            display: "flex",
            fontSize: "15px",
            color: "#64748B",
            fontWeight: "500",
          }}
        >
          criegratis.com.br
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
