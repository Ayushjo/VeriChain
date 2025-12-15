import React from 'react';
import type { Block } from '../types';

interface BlockCardProps {
  block: Block;
}

export const BlockCard: React.FC<BlockCardProps> = ({ block }) => {

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'border-[#39ff14]';
    if (score >= 5) return 'border-[#ffa500]';
    return 'border-[#ff0040]';
  }

  const getScoreTextColor = (score: number) => {
    if (score >= 8) return 'text-[#39ff14]';
    if (score >= 5) return 'text-[#ffa500]';
    return 'text-[#ff0040]';
  }

  const getScoreGlow = (score: number) => {
    if (score >= 8) return 'neon-glow-green';
    if (score >= 5) return 'neon-glow-orange';
    return 'shadow-[0_0_20px_rgba(255,0,64,0.4)]';
  }

  return (
    <div className={`glass rounded-xl border-l-4 ${getScoreColor(block.data.credibilityScore)} transition-all duration-300 hover:border-[#00f0ff] hover:shadow-2xl hover:shadow-[#00f0ff]/20 overflow-hidden relative group animate-slide-up`}>
        {/* Holographic overlay on hover */}
        <div className="holographic absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>

        <div className="p-6 relative z-10">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                   <span className="text-xs font-mono text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-1 rounded border border-[#00f0ff]/30">
                     BLOCK #{block.index}
                   </span>
                   <h3 className="text-lg font-orbitron font-bold text-white mt-3 leading-tight">
                     {block.data.summary}
                   </h3>
                </div>

                <div className={`glass px-5 py-3 rounded-lg border-2 ${getScoreColor(block.data.credibilityScore)} ${getScoreGlow(block.data.credibilityScore)} ml-4`}>
                    <p className={`font-orbitron font-black text-3xl text-center ${getScoreTextColor(block.data.credibilityScore)}`}>
                      {block.data.credibilityScore}
                      <span className="text-base text-gray-500">/10</span>
                    </p>
                    <p className="text-xs text-gray-400 text-center font-mono mt-1 uppercase">Score</p>
                </div>
            </div>

            <div className="mt-5 pt-5 border-t border-[#00f0ff]/30 text-xs text-gray-400 space-y-3 font-rajdhani">
                <div className="flex items-start space-x-2">
                  <span className="text-[#00f0ff] font-mono">▸</span>
                  <p className="flex-1">
                    <strong className="font-semibold text-gray-300 font-mono">FACTUALITY:</strong>{' '}
                    <span className="text-gray-400">{block.data.factuality}</span>
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-[#ff6b00] font-mono">▸</span>
                  <p className="flex-1">
                    <strong className="font-semibold text-gray-300 font-mono">BIAS:</strong>{' '}
                    <span className="text-gray-400">{block.data.biasAnalysis}</span>
                  </p>
                </div>
            </div>
        </div>

        {/* Blockchain metadata footer */}
        <div className="bg-black/60 px-6 py-4 rounded-b-xl font-mono text-xs text-gray-500 space-y-2 border-t border-[#00f0ff]/20">
             <div className="flex items-center space-x-2">
               <span className="text-[#00f0ff]">⧗</span>
               <strong className="text-gray-400">TIMESTAMP:</strong>
               <span className="text-gray-500">{new Date(block.timestamp).toISOString()}</span>
             </div>
             <div className="flex items-start space-x-2 overflow-hidden">
               <span className="text-[#00f0ff]">⬢</span>
               <strong className="text-gray-400">HASH:</strong>
               <span className="text-[#00f0ff] truncate">{block.hash}</span>
             </div>
             <div className="flex items-start space-x-2 overflow-hidden">
               <span className="text-[#ff6b00]">⬡</span>
               <strong className="text-gray-400">PREV:</strong>
               <span className="text-gray-500 truncate">{block.previousHash}</span>
             </div>
        </div>
    </div>
  );
};
