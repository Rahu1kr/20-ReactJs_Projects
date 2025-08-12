"use client";

import { useEffect, useMemo, useState } from "react";
import { extractFileKeyFromUrl, extractTopLevelFrames, type FigmaDocument, type ExtractedFrame } from "@/lib/figma";

export default function Home() {
  const [input, setInput] = useState("");
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [frames, setFrames] = useState<ExtractedFrame[]>([]);
  const [imageMap, setImageMap] = useState<Record<string, string>>({});
  const [scale, setScale] = useState("2");

  const canFetch = useMemo(() => !!fileKey, [fileKey]);

  useEffect(() => {
    if (!fileKey) return;
    const currentKey: string = fileKey; // narrow for inner async function
    let cancelled = false;

    async function run(k: string) {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/figma/file?key=${encodeURIComponent(k)}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Request failed: ${res.status}`);
        }
        const json = (await res.json()) as FigmaDocument;
        const extracted = extractTopLevelFrames(json);
        if (!cancelled) {
          setFrames(extracted);
        }
        if (extracted.length > 0) {
          const ids = extracted.map((f) => f.id).join(",");
          const imgRes = await fetch(`/api/figma/image?key=${encodeURIComponent(k)}&ids=${encodeURIComponent(ids)}&scale=${encodeURIComponent(scale)}&format=png`, {
            cache: "no-store",
          });
          if (!imgRes.ok) {
            const text = await imgRes.text();
            throw new Error(text || `Image request failed: ${imgRes.status}`);
          }
          const imgJson = await imgRes.json();
          const images: Record<string, string> = imgJson.images || {};
          if (!cancelled) {
            setImageMap(images);
          }
        } else {
          setImageMap({});
        }
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        if (!cancelled) setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run(currentKey);
    return () => {
      cancelled = true;
    };
  }, [fileKey, scale]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const key = extractFileKeyFromUrl(input.trim());
    if (!key) {
      setError("Please enter a valid Figma file URL or key");
      return;
    }
    setFileKey(key);
  }

  return (
    <div className="min-h-screen w-full bg-white text-gray-900">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-semibold">Figma File Preview</h1>
        <p className="mt-2 text-sm text-gray-600">Enter your Figma file URL or key. We fetch top-level frames and render images via a server proxy.</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            placeholder="https://www.figma.com/file/<FILE_KEY>/... or <FILE_KEY>"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select
            value={scale}
            onChange={(e) => setScale(e.target.value)}
            className="rounded-md border border-gray-300 px-2 py-2"
            title="Image scale"
          >
            <option value="1">@1x</option>
            <option value="2">@2x</option>
            <option value="3">@3x</option>
          </select>
          <button
            type="submit"
            className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Loading…" : "Load"}
          </button>
        </form>

        {error && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {canFetch && (
          <div className="mt-8">
            <div className="mb-4 text-sm text-gray-700">File key: <code className="bg-gray-100 px-1 py-0.5 rounded">{fileKey}</code></div>
            {frames.length === 0 && !loading && (
              <div className="text-sm text-gray-600">No top-level frames found.</div>
            )}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {frames.map((frame) => {
                const src = imageMap[frame.id];
                return (
                  <div key={frame.id} className="rounded-lg border border-gray-200 p-3">
                    <div className="mb-2 text-xs uppercase tracking-wide text-gray-500">{frame.pageName}</div>
                    <div className="font-medium">{frame.name}</div>
                    <div className="mt-3 overflow-hidden rounded-md border bg-white">
                      {src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={src} alt={frame.name} className="h-auto w-full" />
                      ) : (
                        <div className="flex h-48 items-center justify-center text-gray-400">No image</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
