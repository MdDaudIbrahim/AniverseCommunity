'use client';

import Script from 'next/script';

export default function AdSenseScript() {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  // Don't load in development or if no ID is set
  if (process.env.NODE_ENV !== 'production' || !adsenseId) {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
