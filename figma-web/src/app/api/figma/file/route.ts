import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileKey = searchParams.get("key");
  const token = process.env.FIGMA_TOKEN;

  if (!fileKey) {
    return new Response(JSON.stringify({ error: "Missing file key" }), { status: 400 });
  }
  if (!token) {
    return new Response(JSON.stringify({ error: "Missing FIGMA_TOKEN on server" }), { status: 500 });
  }

  const resp = await fetch(`https://api.figma.com/v1/files/${encodeURIComponent(fileKey)}`, {
    headers: {
      "X-Figma-Token": token,
    },
    // Avoid Next.js caching this aggressively
    cache: "no-store",
  });

  if (!resp.ok) {
    const text = await resp.text();
    return new Response(JSON.stringify({ error: "Figma API error", status: resp.status, body: text }), {
      status: resp.status,
    });
  }

  const json = await resp.json();
  return Response.json(json);
}