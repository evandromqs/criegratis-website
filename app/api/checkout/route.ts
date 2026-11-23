import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY não configurada no servidor." },
      { status: 500 }
    );
  }

  try {
    const { toolSlug, title, priceCents = 490, returnPath } = await req.json();
    if (!toolSlug || !title) {
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "https://www.criegratis.com.br";
    const path = returnPath || `/${toolSlug}`;

    const params = new URLSearchParams();
    params.append("mode", "payment");
    params.append("payment_method_types[]", "card");
    params.append("line_items[0][price_data][currency]", "brl");
    params.append("line_items[0][price_data][product_data][name]", title);
    params.append("line_items[0][price_data][unit_amount]", String(priceCents));
    params.append("line_items[0][quantity]", "1");
    params.append("metadata[toolSlug]", toolSlug);
    params.append("success_url", `${origin}${path}?session_id={CHECKOUT_SESSION_ID}`);
    params.append("cancel_url", `${origin}${path}?canceled=1`);

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Erro ao criar sessão no Stripe." },
        { status: response.status }
      );
    }

    return NextResponse.json({ url: data.url, id: data.id });
  } catch {
    return NextResponse.json({ error: "Erro interno ao iniciar checkout." }, { status: 500 });
  }
}
