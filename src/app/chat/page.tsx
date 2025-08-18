// app/chat/page.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Leaflet CSS (safe in client components)
import "leaflet/dist/leaflet.css";

/* =======================
   Types
======================= */
type InitResponse = {
  ok: boolean;
  data_paths: {
    eo: string;
    dem: string;
    points: string;
    lines: string;
    polygons: string;
    tabular: string;
    artifacts: string;
  };
};

type SummaryKV = { url: string; text: string };
type BrowserAgentResponse = {
  query: string;
  used_playwright: boolean;
  browsers: string[];
  links: string[];
  summaries: SummaryKV[];
  answer: string;
};

type ChatMessage =
  | { role: "user"; content: string }
  | {
      role: "assistant";
      content: string;
      answer?: string;
      links?: string[];
      summaries?: SummaryKV[];
      used_playwright?: boolean;
      browsers?: string[];
    }
  | { role: "system"; content: string };

/* =======================
   Config
======================= */
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE?.replace(/\/+$/, "") || "http://localhost:8000";

/* =======================
   Leaflet Map (OSM) with BBox
   - Uses dynamic import to avoid SSR
======================= */
const BBoxMap = dynamic(
  async () => {
    const L = await import("leaflet");
    const { MapContainer, TileLayer, Rectangle, useMap } = await import("react-leaflet");
    const { useCallback, useEffect } = await import("react");

    // Helper to fit bounds when bbox changes
    function FitToBBox({ bounds }: { bounds: L.LatLngBoundsExpression }) {
      const map = useMap();
      useEffect(() => {
        try {
          map.fitBounds(bounds, { padding: [20, 20] });
        } catch {
          // ignore fit errors
        }
      }, [map, bounds]);
      return null;
    }

    // Click-to-set corners: first click sets min corner, second click sets max corner
    function ClickToSetBBox({
      onChange,
      bbox,
    }: {
      onChange: (next: [number, number, number, number]) => void;
      bbox: [number, number, number, number];
    }) {
      const map = useMap();
      const setCorner = useCallback(
        (e: L.LeafletMouseEvent) => {
          // Shift-click = set min corner; Normal click = set max corner
          const lat = e.latlng.lat;
          const lng = e.latlng.lng;
          const [minX, minY, maxX, maxY] = bbox;

          if (e.originalEvent.shiftKey) {
            // Set min corner
            const nminX = Math.min(lng, maxX - 0.0001);
            const nminY = Math.min(lat, maxY - 0.0001);
            onChange([nminX, nminY, maxX, maxY]);
          } else {
            // Set max corner
            const nmaxX = Math.max(lng, minX + 0.0001);
            const nmaxY = Math.max(lat, minY + 0.0001);
            onChange([minX, minY, nmaxX, nmaxY]);
          }
        },
        [bbox, onChange]
      );

      useEffect(() => {
        map.on("click", setCorner);
        return () => {
          map.off("click", setCorner);
        };
      }, [map, setCorner]);

      return null;
    }

    return function BBoxMapImpl({
      bbox,
      onChange,
      className,
    }: {
      bbox: [number, number, number, number];
      onChange: (next: [number, number, number, number]) => void;
      className?: string;
    }) {
      const [minX, minY, maxX, maxY] = bbox; // X=lon, Y=lat

      // Leaflet wants [[south, west], [north, east]] i.e. [[minLat, minLng], [maxLat, maxLng]]
      const bounds: L.LatLngBoundsExpression = [
        [minY, minX],
        [maxY, maxX],
      ];

      // Center is the bbox center
      const center: [number, number] = [(minY + maxY) / 2, (minX + maxX) / 2];

      return (
        <MapContainer
          center={center}
          zoom={8}
          className={className ?? "w-full h-64 rounded-xl overflow-hidden"}
          scrollWheelZoom
        >
          <TileLayer
            // OpenStreetMap Standard tiles
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
          />
          <Rectangle
            bounds={bounds}
            pathOptions={{ color: "#16a34a", weight: 2, fillOpacity: 0.1 }}
          />
          <FitToBBox bounds={bounds} />
          <ClickToSetBBox bbox={bbox} onChange={onChange} />
        </MapContainer>
      );
    };
  },
  { ssr: false }
);

/* =======================
   Page
======================= */
export default function ChatPage() {
  // --- UI State ---
  const [query, setQuery] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "system",
      content:
        "Ask anything in your language about weather, pests, irrigation, prices, or best crops. I’ll search trusted sources and reply quickly.",
    },
  ]);

  // --- Init panel state ---
  const [regenerate, setRegenerate] = useState(false);
  const [bbox, setBbox] = useState<[number, number, number, number]>([
    75.0, 23.5, 76.0, 24.5, // [minX(lon), minY(lat), maxX(lon), maxY(lat)]
  ]);
  const [resDeg, setResDeg] = useState(0.01);
  const [initResult, setInitResult] = useState<InitResponse | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  // --- Browser agent options ---
  const [browsers, setBrowsers] = useState<string[]>(["chromium", "firefox", "webkit"]);
  const [perBrowserLinks, setPerBrowserLinks] = useState(3);
  const [maxPages, setMaxPages] = useState(4);
  const [skipDomains, setSkipDomains] = useState<string>("facebook.com, x.com, twitter.com");
  const [headless, setHeadless] = useState(true);

  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  const skipList = useMemo(
    () =>
      skipDomains
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [skipDomains]
  );

  // --- Handlers ---
  async function handleInit() {
    setIsInitializing(true);
    setInitError(null);
    try {
      const resp = await fetch(`${API_BASE}/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          regenerate,
          bbox,
          res_deg: resDeg,
        }),
      });
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || `Init failed with ${resp.status}`);
      }
      const data: InitResponse = await resp.json();
      setInitResult(data);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Initialization complete. Synthetic EO/DEM ready; encoder built. You can start asking questions now.",
        },
      ]);
    } catch (err: any) {
      setInitError(err?.message || "Init failed");
    } finally {
      setIsInitializing(false);
    }
  }

  async function sendQuery() {
    const q = query.trim();
    if (!q) return;
    setQuery("");
    setIsSending(true);

    // Add user message immediately
    setMessages((m) => [...m, { role: "user", content: q }]);

    // Add a placeholder assistant status
    const loadingNote: ChatMessage = {
      role: "assistant",
      content: "Searching… collecting sources and drafting an answer.",
    };
    setMessages((m) => [...m, loadingNote]);

    try {
      const resp = await fetch(`${API_BASE}/browser-agent/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: q,
          browsers,
          per_browser_links: perBrowserLinks,
          headless,
          max_pages: maxPages,
          skip_domains: skipList,
        }),
      });
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || `Search failed with ${resp.status}`);
      }
      const data: BrowserAgentResponse = await resp.json();

      // Replace the last placeholder with the real assistant message
      setMessages((m) => {
        const updated = [...m];
        for (let i = updated.length - 1; i >= 0; i--) {
          if (updated[i].role === "assistant" && updated[i].content.startsWith("Searching")) {
            updated.splice(i, 1);
            break;
          }
        }
        updated.push({
          role: "assistant",
          content: "Here’s what I found.",
          answer: data.answer,
          links: data.links,
          summaries: data.summaries,
          used_playwright: data.used_playwright,
          browsers: data.browsers,
        });
        return updated;
      });
    } catch (err: any) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `Sorry — something went wrong: ${err?.message || "Unknown error"}`,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function toggleBrowser(name: string) {
    setBrowsers((b) => (b.includes(name) ? b.filter((x) => x !== name) : [...b, name]));
  }

  

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-green-50 via-white to-white text-gray-900 overflow-hidden">

      {/* Header / Hero strip */}
      <section className="relative px-6 md:px-12 lg:px-20 py-10">
        <div className="max-w-5xl">
          <p className="text-sm tracking-wide text-gray-500 mb-3">
            Sustainable Industry for a <span className="text-green-600 font-medium">Green Planet</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Ask AgriSense • <span className="bg-green-100 px-2 rounded">WhatsApp-style</span> Chat
          </h1>
          <p className="text-base md:text-lg text-gray-600 mt-3">
            Hyperlocal, verified answers using satellite data, GIS models and AI reasoning.
          </p>
        </div>

        {/* subtle line like home page */}
        <div className="absolute left-0 top-13.5 w-80 h-10 z-0 opacity-70">
          <svg width="320" height="40" viewBox="0 0 320 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0 24C80 8, 160 8, 240 24C280 32, 300 40, 320 24" stroke="#22c55e" strokeWidth="6" fill="none"/>
          </svg>
        </div>
      </section>

      {/* Main grid: Chat (left) • Controls (right) */}
      <section className="px-6 md:px-12 lg:px-20 pb-16">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          {/* Chat panel */}
          <Card className="rounded-2xl border border-gray-100 shadow-sm p-0 overflow-hidden">
            <div
              className="bg-white relative"
              style={{
                backgroundImage: "url('/wpBg.jpg')",
                backgroundSize: "cover",
                backgroundRepeat: "repeat",
                backgroundPosition: "center",
              }}
            >
              {/* message list */}
              <div className="h-[60vh] md:h-[64vh] overflow-y-auto p-4 md:p-6 space-y-4">
                {messages.map((m, idx) => {
                  if (m.role === "user") {
                    return (
                      <div key={idx} className="flex justify-start">
                        <div className="bg-gray-100 text-gray-900 rounded-2xl px-4 py-3 shadow-sm max-w-[80%]">
                          <p className="leading-relaxed">{m.content}</p>
                        </div>
                      </div>
                    );
                  }
                  if (m.role === "assistant" && (m.answer || m.links || m.summaries)) {
                    return (
                      <div key={idx} className="flex justify-end">
                        <div className="bg-green-100 text-gray-900 rounded-2xl px-4 py-3 shadow-md max-w-[80%] space-y-3">
                          <p className="italic">{m.content}</p>

                          {m.used_playwright !== undefined && (
                            <div className="text-xs text-gray-600">
                              Engine: {m.used_playwright ? "Playwright" : "HTTP fallback"} • Browsers:{" "}
                              {(m.browsers || []).join(", ") || "—"}
                            </div>
                          )}

                          {m.answer && (
                            <div className="whitespace-pre-wrap leading-relaxed">{m.answer}</div>
                          )}

                          {m.links && m.links.length > 0 && (
                            <div className="text-sm">
                              <div className="font-semibold mb-1">Sources</div>
                              <div className="flex flex-wrap gap-2">
                                {m.links.map((u, i) => (
                                  <a
                                    key={i}
                                    href={u}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-green-700 hover:text-green-800 underline underline-offset-2 break-all"
                                  >
                                    [{i + 1}] {new URL(u).hostname}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                          {m.summaries && m.summaries.length > 0 && (
                            <details className="text-sm open:mb-1">
                              <summary className="cursor-pointer font-medium">
                                Page summaries ({m.summaries.length})
                              </summary>
                              <div className="mt-2 space-y-3">
                                {m.summaries.map((s, i) => (
                                  <div key={i} className="bg-white/70 border border-green-200 rounded-lg p-3">
                                    <a
                                      href={s.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-green-700 font-medium hover:underline break-all"
                                    >
                                      {s.url}
                                    </a>
                                    <p className="text-gray-700 mt-1 whitespace-pre-wrap">{s.text}</p>
                                  </div>
                                ))}
                              </div>
                            </details>
                          )}
                        </div>
                      </div>
                    );
                  }
                  // simple assistant/system
                  return (
                    <div key={idx} className="flex justify-end">
                      <div className="bg-green-50 text-gray-900 rounded-2xl px-4 py-3 shadow-sm max-w-[80%]">
                        <p className="leading-relaxed">{m.content}</p>
                      </div>
                    </div>
                  );
                })}
                <div ref={chatBottomRef} />
              </div>

              {/* composer */}
              <div className="border-t border-gray-200 bg-white p-3 md:p-4">
                <div className="flex items-end gap-3">
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (!isSending) sendQuery();
                      }
                    }}
                    placeholder="Type your question… e.g., 'Mera gehu me keede lag gaye hain, kya karu?'"
                    className="w-full min-h-[52px] max-h-40 rounded-xl border border-gray-200 bg-white px-3 py-3 outline-none focus:ring-2 focus:ring-green-200"
                  />
                  <Button
                    onClick={sendQuery}
                    disabled={isSending || !query.trim()}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6"
                  >
                    {isSending ? "Sending…" : "Send"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Controls / Init panel */}
          <div className="space-y-6">
            {/* Init */}
            <Card className="p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-1">Initialize Data</h3>
              <p className="text-sm text-gray-600 mb-4">
                Prepare synthetic EO/DEM and build encoders (runs <code>/init</code>).
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <label className="col-span-2 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={regenerate}
                    onChange={(e) => setRegenerate(e.target.checked)}
                    className="accent-green-600"
                  />
                  Regenerate if exists
                </label>

                <div className="col-span-2">
                  <label className="text-xs text-gray-500">BBox (minX, minY, maxX, maxY)</label>
                  <div className="mt-1 grid grid-cols-4 gap-2">
                    {bbox.map((v, i) => (
                      <input
                        key={i}
                        type="number"
                        step="0.001"
                        value={v}
                        onChange={(e) => {
                          const nv = Number(e.target.value);
                          setBbox((b) => {
                            const nb = [...b] as [number, number, number, number];
                            nb[i] = nv;
                            return nb;
                          });
                        }}
                        className="w-full rounded-lg border border-gray-200 px-2 py-2 focus:ring-2 focus:ring-green-200"
                      />
                    ))}
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="text-xs text-gray-500">Resolution (deg)</label>
                  <input
                    type="number"
                    step="0.001"
                    value={resDeg}
                    onChange={(e) => setResDeg(Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-200 px-2 py-2 focus:ring-2 focus:ring-green-200"
                  />
                </div>
              </div>

              {/* OSM Map with BBox rectangle */}
              <div className="space-y-2">
                <div className="text-xs text-gray-500">
                  Map (OpenStreetMap). <kbd className="px-1 py-0.5 rounded bg-gray-100">Click</kbd> to set{" "}
                  <span className="font-medium">max</span> corner •{" "}
                  <kbd className="px-1 py-0.5 rounded bg-gray-100">Shift + Click</kbd> to set{" "}
                  <span className="font-medium">min</span> corner.
                </div>
                <BBoxMap
                  bbox={bbox}
                  onChange={(next) => setBbox(next)}
                  className="w-full h-64 rounded-xl overflow-hidden border border-gray-200"
                />
              </div>

              <div className="flex items-center gap-3 mt-4">
                <Button
                  onClick={handleInit}
                  disabled={isInitializing}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5"
                >
                  {isInitializing ? "Initializing…" : "Run /init"}
                </Button>
                {initResult?.ok && <span className="text-sm text-green-700">Ready ✓</span>}
              </div>

              {initError && <p className="text-sm text-red-600 mt-3">Error: {initError}</p>}

              {initResult?.ok && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-gray-700">Data paths</summary>
                  <ul className="mt-2 text-xs text-gray-600 space-y-1">
                    {Object.entries(initResult.data_paths).map(([k, v]) => (
                      <li key={k} className="break-all">
                        <span className="font-medium">{k}:</span> {v}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </Card>

            {/* Browser agent options */}
            <Card className="p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-1">Search Settings</h3>
              <p className="text-sm text-gray-600 mb-4">
                Configure the Playwright browser agent (<code>/browser-agent/run</code>).
              </p>

              <div className="space-y-4">
                {/* browsers */}
                <div>
                  <div className="text-xs text-gray-500 mb-1">Browsers</div>
                  <div className="flex flex-wrap gap-2">
                    {["chromium", "firefox", "webkit"].map((b) => {
                      const active = browsers.includes(b);
                      return (
                        <button
                          key={b}
                          onClick={() => toggleBrowser(b)}
                          className={[
                            "px-3 py-1.5 rounded-full text-sm border transition",
                            active
                              ? "bg-green-600 text-white border-green-600"
                              : "bg-white text-gray-700 border-gray-200 hover:border-green-300",
                          ].join(" ")}
                        >
                          {b}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* per browser links */}
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-xs text-gray-500">
                    Links per browser
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={perBrowserLinks}
                      onChange={(e) => setPerBrowserLinks(Number(e.target.value))}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-2 py-2 focus:ring-2 focus:ring-green-200"
                    />
                  </label>

                  <label className="text-xs text-gray-500">
                    Max pages to summarize
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={maxPages}
                      onChange={(e) => setMaxPages(Number(e.target.value))}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-2 py-2 focus:ring-2 focus:ring-green-200"
                    />
                  </label>
                </div>

                {/* headless */}
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={headless}
                    onChange={(e) => setHeadless(e.target.checked)}
                    className="accent-green-600"
                  />
                  Run headless
                </label>

                {/* skip domains */}
                <div>
                  <label className="text-xs text-gray-500">Skip domains (comma-separated)</label>
                  <input
                    type="text"
                    value={skipDomains}
                    onChange={(e) => setSkipDomains(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-green-200"
                    placeholder="example.com, another.com"
                  />
                </div>

                <div className="text-xs text-gray-500">
                  API: <code>{API_BASE}</code>
                </div>
              </div>
            </Card>

            {/* Tips */}
            <Card className="p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-sm text-gray-700">
                <div className="font-semibold mb-1">Try these:</div>
                <ul className="list-disc list-inside space-y-1">
                  <li>“Aaj shaam ko barish hogi kya?”</li>
                  <li>“Mera gehu me keede lag gaye hain, kya dawa lagau?”</li>
                  <li>“Mitti retili hai, kaunse crop sahi rahenge?”</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA footer strip */}
      <section className="px-6 md:px-20 py-14 text-center bg-gradient-to-r from-green-600 to-green-700 text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Get hyperlocal answers, fast</h2>
        <p className="max-w-2xl mx-auto mb-6 text-green-100">
          Backed by satellite data, GIS and an AI browser agent that cites its sources.
        </p>
        <Button className="bg-white text-green-700 hover:bg-green-100 rounded-full px-8 py-3 text-lg">
          Start Asking
        </Button>
      </section>
    </main>
  );
}