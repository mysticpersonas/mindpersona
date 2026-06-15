"use client";

import React, { useState } from "react";
import Script from "next/script";

const BOOKING_SRC =
  "https://api.leadconnectorhq.com/widget/booking/Q77nXFmBMCGDOlTb5gUC";
const BOOKING_ID = "Q77nXFmBMCGDOlTb5gUC_1780052948307";

/**
 * Shared GoHighLevel booking widget.
 *
 * Why this exists: the booking call is the conversion moment of the whole site,
 * so it has to feel instant. Three things make that happen here —
 *   1. The resize script loads `afterInteractive` (Next's default), NOT
 *      `lazyOnload`. lazyOnload waits for browser idle time, which left the
 *      iframe blank/mis-sized for seconds. afterInteractive runs it right away.
 *   2. A skeleton shows immediately so the user never stares at empty space and
 *      assumes "there's no call here" (the drop-off we're killing).
 *   3. Origins are preconnected in the root layout, so the fetch starts warm.
 */
export default function BookingEmbed({ height = 700 }: { height?: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full" style={{ minHeight: height }}>
      {/* Skeleton — shown until the iframe fires onLoad, then fades out. */}
      {!loaded && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl"
          style={{ background: "var(--surface)" }}
          aria-hidden="true"
        >
          <div className="booking-spinner" />
          <p
            className="text-sm"
            style={{ color: "var(--text-dim)", letterSpacing: "0.02em" }}
          >
            Loading available times…
          </p>
        </div>
      )}

      <iframe
        src={BOOKING_SRC}
        title="Book a Discovery Call"
        loading="eager"
        scrolling="no"
        id={BOOKING_ID}
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height,
          border: "none",
          overflow: "hidden",
          background: "transparent",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
