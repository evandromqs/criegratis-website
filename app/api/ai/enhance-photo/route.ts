import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const replicateToken = process.env.REPLICATE_API_TOKEN;
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!replicateToken || !stripeKey) {
    return NextResponse.json(
      { error: "Variáveis REPLICATE_API_TOKEN ou STRIPE_SECRET_KEY não configuradas." },
      { status: 500 }
    );
  }

  try {
    const { sessionId, imageBase64 } = await req.json();
    if (!sessionId || !imageBase64) {
      return NextResponse.json({ error: "sessionId e imageBase64 são obrigatórios." }, { status: 400 });
    }

    // 1. Confirma pagamento no Stripe antes de gastar API de IA
    const stripeRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
      headers: { Authorization: `Bearer ${stripeKey}` },
    });
    const session = await stripeRes.json();
    if (!stripeRes.ok || session.payment_status !== "paid") {
      return NextResponse.json({ error: "Pagamento não confirmado." }, { status: 402 });
    }

    // 2. Chama Replicate (remoção de fundo)
    const predRes = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${replicateToken}`,
        "Content-Type": "application/json",
        Prefer: "wait",
      },
      body: JSON.stringify({
        version: "95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1",
        input: { image: imageBase64 },
      }),
    });

    const prediction = await predRes.json();
    if (!predRes.ok) {
      return NextResponse.json({ error: prediction.detail || "Erro no Replicate." }, { status: 500 });
    }

    return NextResponse.json({ outputUrl: prediction.output });
  } catch {
    return NextResponse.json({ error: "Erro ao processar imagem com IA." }, { status: 500 });
  }
}
