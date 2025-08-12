import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileKey = searchParams.get("key");
  const ids = searchParams.get("ids");
  const scale = searchParams.get("scale") ?? "2"; // default @2x
  const format = searchParams.get("format") ?? "png";
  const token = process.env.FIGMA_TOKEN;

  if (!fileKey || !ids) {
    return new Response(JSON.stringify({ error: "Missing key or ids" }), { status: 400 });
  }
  if (!token) {
    return new Response(JSON.stringify({ error: "Missing FIGMA_TOKEN on server" }), { status: 500 });
  }

  const qs = new URLSearchParams({ ids, scale, format });
  const resp = await fetch(`https://api.figma.com/v1/images/${encodeURIComponent(fileKey)}?${qs.toString()}`, {
    headers: { "X-Figma-Token": token },
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