import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!secretKey) {
    return NextResponse.json({ error: "STRIPE_SECRET_KEY não configurada." }, { status: 500 });
  }
  if (!sessionId) {
    return NextResponse.json({ error: "session_id obrigatório." }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
    });
    const session = await response.json();

    if (!response.ok) {
      return NextResponse.json({ paid: false, error: session.error?.message }, { status: response.status });
    }

    return NextResponse.json({
      paid: session.payment_status === "paid",
      toolSlug: session.metadata?.toolSlug || null,
    });
  } catch {
    return NextResponse.json({ paid: false, error: "Erro ao verificar sessão." }, { status: 500 });
  }
}
