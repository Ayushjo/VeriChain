
import React from 'react';
import type { Block } from '../types';

interface LedgerProps {
  chain: Block[];
  isChainValid: boolean;
}

export const Ledger: React.FC<LedgerProps> = ({ chain, isChainValid }) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-pastel-mint bg-opacity-40 text-gray-800';
    if (score >= 5) return 'bg-pastel-peach bg-opacity-40 text-gray-800';
    return 'bg-pastel-pink bg-opacity-40 text-gray-800';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 8) return 'High';
    if (score >= 5) return 'Medium';
    return 'Low';
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 pb-4 border-b-4 border-black">
        <h2 className="text-5xl font-serif font-black text-newspaper-ink tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
          Blockchain Ledger
        </h2>

        <div className={`
          flex items-center px-5 py-2 font-bold text-xs border-2 uppercase tracking-widest
          ${isChainValid
            ? 'bg-white text-newspaper-ink border-black'
            : 'bg-black text-white border-black'
          }
        `} style={{ fontFamily: 'Merriweather, serif' }}>
          <div className={`w-3 h-3 mr-3 ${isChainValid ? 'bg-newspaper-ink' : 'bg-white'}`}></div>
          <span>
            {isChainValid ? 'Chain Valid' : 'Chain Compromised'}
          </span>
        </div>
      </div>

      <div className="elegant-card p-6 mb-8">
        <p className="text-center text-newspaper-gray text-sm leading-relaxed font-body tracking-wide">
          Immutable ledger of AI-driven article analyses • Each block is cryptographically linked
        </p>
      </div>

      {chain.length === 1 && (
         <div className="text-center py-20 elegant-card">
           <div className="mb-4">
             <svg className="w-20 h-20 mx-auto text-newspaper-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
             </svg>
           </div>
           <p className="text-newspaper-ink font-bold text-lg uppercase tracking-wider" style={{ fontFamily: 'Merriweather, serif' }}>Ledger Empty</p>
           <p className="text-newspaper-gray text-sm mt-2 font-body">Analyze an article to create the first verification block</p>
         </div>
      )}

      {chain.length > 1 && (
        <>
          {/* Table View */}
          <div className="elegant-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="ledger-table w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left">Block #</th>
                    <th className="text-left">Timestamp</th>
                    <th className="text-left">Summary</th>
                    <th className="text-center">Score</th>
                    <th className="text-left">Factuality</th>
                    <th className="text-left">Bias Analysis</th>
                    <th className="text-left">Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {[...chain].reverse().filter(block => block.index !== 0).map((block, index) => (
                    <tr key={block.hash} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                      <td className="font-mono font-bold text-newspaper-ink">
                        #{block.index}
                      </td>
                      <td className="font-mono text-xs text-newspaper-gray">
                        {new Date(block.timestamp).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="max-w-xs">
                        <p className="text-newspaper-ink font-medium line-clamp-2">{block.data.summary}</p>
                      </td>
                      <td className="text-center">
                        <div className="inline-flex items-center justify-center">
                          <span className="px-3 py-1.5 border-2 border-black font-bold text-sm bg-white text-newspaper-ink">
                            {block.data.credibilityScore}/10
                          </span>
                        </div>
                        <p className="text-xs text-newspaper-gray mt-1 uppercase tracking-wider">{getScoreBadge(block.data.credibilityScore)}</p>
                      </td>
                      <td className="max-w-xs">
                        <p className="text-newspaper-gray text-xs line-clamp-2">{block.data.factuality}</p>
                      </td>
                      <td className="max-w-xs">
                        <p className="text-newspaper-gray text-xs line-clamp-2">{block.data.biasAnalysis}</p>
                      </td>
                      <td className="font-mono text-xs">
                        <span className="text-newspaper-ink font-semibold">{block.hash.substring(0, 12)}...</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Footer */}
          <div className="mt-8 elegant-card p-6 grid grid-cols-3 gap-4 text-center animate-slide-up">
            <div className="border-r-2 border-black">
              <p className="text-5xl font-black text-newspaper-ink" style={{ fontFamily: 'Playfair Display, serif' }}>{chain.length - 1}</p>
              <p className="text-xs text-newspaper-gray uppercase mt-2 font-bold tracking-widest" style={{ fontFamily: 'Merriweather, serif' }}>Total Blocks</p>
            </div>
            <div className="border-r-2 border-black">
              <p className="text-5xl font-black text-newspaper-ink" style={{ fontFamily: 'Playfair Display, serif' }}>{chain.length > 1 ? chain[chain.length - 1].index : 0}</p>
              <p className="text-xs text-newspaper-gray uppercase mt-2 font-bold tracking-widest" style={{ fontFamily: 'Merriweather, serif' }}>Latest Block</p>
            </div>
            <div>
              <p className="text-5xl font-black text-newspaper-ink" style={{ fontFamily: 'Playfair Display, serif' }}>
                {isChainValid ? '100%' : '0%'}
              </p>
              <p className="text-xs text-newspaper-gray uppercase mt-2 font-bold tracking-widest" style={{ fontFamily: 'Merriweather, serif' }}>Integrity</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
