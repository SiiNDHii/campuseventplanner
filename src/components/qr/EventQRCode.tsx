"use client";

import { QRCodeCanvas } from "qrcode.react";
import { Download, QrCode } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface EventQRCodeProps {
  eventId: string;
  eventTitle: string;
}

export function EventQRCode({ eventId, eventTitle }: EventQRCodeProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [scanUrl, setScanUrl] = useState("");

  useEffect(() => {
    const url = `${typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/events/${eventId}/scan`;
    setScanUrl(url);
  }, [eventId]);

  const handleDownload = () => {
    setIsDownloading(true);
    const canvas = qrRef.current?.querySelector("canvas") as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${eventTitle}-attendance-qr.png`;
      link.click();
    }
    setIsDownloading(false);
  };

  if (!scanUrl) return null;

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="flex items-center gap-2">
        <QrCode className="h-5 w-5 text-violet-400" />
        <h3 className="font-semibold text-[var(--foreground)]">Attendance QR Code</h3>
      </div>

      <div ref={qrRef} className="rounded-lg bg-white p-4">
        <QRCodeCanvas
          value={scanUrl}
          size={256}
          level="H"
          includeMargin={true}
        />
      </div>

      <p className="text-center text-sm text-[var(--muted-foreground)]">
        Students can scan this code to mark their attendance
      </p>

      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="inline-flex items-center gap-2 rounded-lg bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-400 hover:bg-violet-500/20 transition-colors disabled:opacity-50"
      >
        <Download className="h-4 w-4" />
        {isDownloading ? "Downloading..." : "Download QR Code"}
      </button>

      <code className="max-w-sm break-all rounded bg-[var(--muted)]/30 px-3 py-2 text-xs text-[var(--muted-foreground)]">
        {scanUrl}
      </code>
    </div>
  );
}
