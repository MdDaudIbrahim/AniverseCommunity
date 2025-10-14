'use client';

import { useEffect } from 'react';

interface AdSidebarProps {
  slot: string;
  className?: string;
}

export default function AdSidebar({ slot, className = '' }: AdSidebarProps) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && adsenseId) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [adsenseId]);

  // Show placeholder in development
  if (process.env.NODE_ENV !== 'production' || !adsenseId) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 rounded-lg p-4 sticky top-20 ${className}`}>
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 font-semibold">Sidebar Ad</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            300x600 or 160x600
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`sticky top-20 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format="vertical"
      />
    </div>
  );
}
