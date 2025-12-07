
import React from 'react';
import type { Block } from '../types';
import { BlockCard } from './BlockCard';

interface LedgerProps {
  chain: Block[];
  isChainValid: boolean;
}

export const Ledger: React.FC<LedgerProps> = ({ chain, isChainValid }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-cyan-300">Verification Ledger</h2>
        <div className={`flex items-center px-3 py-1 rounded-full text-sm font-semibold ${isChainValid ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${isChainValid ? 'bg-green-400' : 'bg-red-400'}`}></div>
          Chain Integrity: {isChainValid ? 'Valid' : 'Compromised'}
        </div>
      </div>
       <p className="text-center text-gray-400 mb-8">
          This is a simulated, immutable ledger of all AI-driven article analyses. Each block is cryptographically linked to the previous one.
       </p>
      {chain.length === 1 && (
         <div className="text-center py-16 bg-gray-800 rounded-lg border border-gray-700">
           <p className="text-gray-400">The ledger is empty.</p>
           <p className="text-gray-500 text-sm mt-2">Analyze an article to add the first verification block.</p>
         </div>
      )}
      <div className="space-y-4">
        {[...chain].reverse().map((block, index) => (
           <div key={block.hash} className="relative pl-8">
             {/* Connector line */}
            {index < chain.length -1 && (
              <div className="absolute top-10 left-4 w-0.5 h-full bg-gray-700"></div>
            )}
             {/* Dot on the line */}
             <div className="absolute top-8 left-[11px] w-2.5 h-2.5 bg-cyan-400 rounded-full border-2 border-gray-900"></div>

             <BlockCard block={block} />
           </div>
        ))}
      </div>
    </div>
  );
};
