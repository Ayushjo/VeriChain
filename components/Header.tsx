
import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return time.toLocaleDateString('en-US', options).toUpperCase();
  };

  return (
    <header className="bg-newspaper-paper border-b-4 border-black sticky top-0 z-50">
      {/* Masthead */}
      <div className="container mx-auto px-4 md:px-8 py-8 text-center border-b-2 border-black">
        <div className="mb-2">
          <h1 className="text-6xl md:text-7xl font-serif font-black text-newspaper-ink tracking-tighter" style={{ fontFamily: 'Playfair Display, serif' }}>
            VeriChain
          </h1>
          <p className="text-xs md:text-sm text-newspaper-gray font-body tracking-widest mt-2" style={{ fontFamily: 'EB Garamond, serif' }}>
            TRUTH VERIFICATION PROTOCOL
          </p>
        </div>
      </div>

      {/* Dateline */}
      <div className="dateline">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-newspaper-ink">
            VOL. I — NO. 1 | NEW YORK | {formatDate()} | STATUS: ONLINE | EDITION: TRUTH
          </p>
        </div>
      </div>
    </header>
  );
};
