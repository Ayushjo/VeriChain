import React from 'react';
import type { Block } from '../types';

interface BlockCardProps {
  block: Block;
}

export const BlockCard: React.FC<BlockCardProps> = ({ block }) => {

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'border-green-500';
    if (score >= 5) return 'border-yellow-500';
    return 'border-red-500';
  }

  return (
    <div className={`bg-gray-800 rounded-lg shadow-lg border-l-4 ${getScoreColor(block.data.credibilityScore)} transition-shadow hover:shadow-cyan-500/20`}>
        <div className="p-4">
            <div className="flex justify-between items-start">
                <div>
                   <span className="text-xs text-gray-500">Block #{block.index}</span>
                   <h3 className="text-lg font-semibold text-gray-200">{block.data.summary}</h3>
                </div>
                <div className={`px-4 py-2 rounded-md bg-gray-900`}>
                    {/* FIX: Corrected className property to use a valid template literal for dynamic classes. The previous syntax was invalid and caused parsing errors. */}
                    <p className={`font-bold text-2xl text-center ${getScoreColor(block.data.credibilityScore).replace('border-','text-')}`}>{block.data.credibilityScore}<span className="text-base text-gray-500">/10</span></p>
                    <p className="text-xs text-gray-400 text-center">Credibility</p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-400 space-y-2">
                <p><strong className="font-medium text-gray-300">Factuality:</strong> {block.data.factuality}</p>
                <p><strong className="font-medium text-gray-300">Bias:</strong> {block.data.biasAnalysis}</p>
            </div>
        </div>
        <div className="bg-gray-900/50 px-4 py-2 rounded-b-lg font-mono text-xs text-gray-500 space-y-1 overflow-hidden">
             <p className="truncate"><strong>Timestamp:</strong> {new Date(block.timestamp).toISOString()}</p>
             <p className="truncate"><strong>Hash:</strong> <span className="text-cyan-400">{block.hash}</span></p>
             <p className="truncate"><strong>Prev. Hash:</strong> {block.previousHash}</p>
        </div>
    </div>
  );
};
