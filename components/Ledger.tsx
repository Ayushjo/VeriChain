import React from 'react';
import type { Block } from '../types';
import { BlockCard } from './BlockCard';

interface LedgerProps {
  chain: Block[];
  isChainValid: boolean;
}

export const Ledger: React.FC<LedgerProps> = ({ chain, isChainValid }) => {
  const blocks = [...chain].reverse().filter(b => b.index > 0);

  return (
    <div className="max-w-5xl mx-auto animate-fade-in mt-8">
      <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
        <h2 className="text-3xl font-black text-newspaper-ink" style={{ fontFamily: 'Playfair Display, serif' }}>Verification Ledger</h2>
        <div className={`font-serif uppercase tracking-widest text-sm border-2 border-black px-4 py-2 ${isChainValid ? 'bg-white text-black' : 'bg-black text-white'}`}>
          CHAIN INTEGRITY: {isChainValid ? 'VERIFIED' : 'COMPROMISED'}
        </div>
      </div>
      
      <p className="text-center text-newspaper-gray mb-8 font-body">
        This is a simulated, immutable ledger of all AI-driven article analyses. Each block is cryptographically linked to the previous one.
      </p>

      {chain.length === 1 && (
         <div className="text-center py-16 elegant-card border-4 border-black border-dashed">
           <p className="text-newspaper-ink font-bold font-serif uppercase tracking-widest text-lg">The ledger is empty</p>
           <p className="text-newspaper-gray text-sm mt-3 font-body">Analyze an article to add the first verification block.</p>
         </div>
      )}

      {blocks.length > 0 && (
        <div className="relative">
          {blocks.map((block, i) => (
            <div key={block.index} className="relative pl-10 mb-6">
              {/* Vertical connector line — not shown for last block */}
              {i < blocks.length - 1 && (
                <div className="absolute top-10 left-4 w-0.5 h-full bg-gray-400" />
              )}
              {/* Connector dot */}
              <div className="absolute top-8 left-[11px] w-3 h-3 bg-black border-2 border-black rounded-full" />
              <BlockCard block={block} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
