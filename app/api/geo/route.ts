import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const headersList = await headers();
    // Vercel geolocation header
    const country =
      headersList.get("x-vercel-ip-country") ||
      headersList.get("cf-ipcountry") ||
      null;

    const isInternational = country ? country.toUpperCase() !== "BR" : false;

    return NextResponse.json({
      country,
      isInternational,
    });
  } catch {
    return NextResponse.json({
      country: null,
      isInternational: false,
    });
  }
}
