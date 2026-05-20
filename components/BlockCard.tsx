import React from 'react';
import type { Block } from '../types';

interface BlockCardProps {
  block: Block;
}

export const BlockCard: React.FC<BlockCardProps> = ({ block }) => {

  const getVoteColor = (vote: string) => {
    if (vote === 'TRUE') return 'text-green-700';
    if (vote === 'FALSE') return 'text-red-700';
    return 'text-yellow-700';
  }

  const getBorderColor = (vote: string) => {
    if (vote === 'TRUE') return 'border-l-green-600';
    if (vote === 'FALSE') return 'border-l-red-600';
    return 'border-l-yellow-600';
  }

  const getBadgeBorder = (vote: string) => {
    if (vote === 'TRUE') return 'border-green-700';
    if (vote === 'FALSE') return 'border-red-700';
    return 'border-yellow-700';
  }

  const verdict = block.data.gameMechanism?.finalVerdict || 'UNCERTAIN';

  return (
    <div className={`bg-white border-2 border-black rounded-sm border-l-[8px] ${getBorderColor(verdict)} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000]`}>
        <div className="p-5">
            <div className="flex justify-between items-start mb-4">
                <div>
                   <span className="text-xs text-gray-500 font-serif font-bold uppercase tracking-widest">Block #{block.index}</span>
                   <h3 className="text-xl font-bold text-black mt-1" style={{ fontFamily: 'Playfair Display, serif' }}>{block.data.summary}</h3>
                </div>
                <div className={`px-4 py-2 border-2 ${getBadgeBorder(verdict)} bg-white text-center ml-4`}>
                    <p className={`font-serif font-black text-lg tracking-wider ${getVoteColor(verdict)}`}>
                      {verdict}
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase font-serif mt-1 tracking-widest border-t border-gray-200 pt-1">Consensus</p>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-200 text-sm text-gray-700 space-y-2 font-serif">
                <p><strong className="text-black uppercase tracking-wider text-xs">Evidence:</strong> {block.data.factuality}</p>
                <p><strong className="text-black uppercase tracking-wider text-xs">Equilibrium:</strong> {block.data.gameMechanism?.rounds[block.data.gameMechanism.rounds.length - 1]?.equilibriumType || 'N/A'}</p>
                <div className="flex gap-2 mt-3 pt-2">
                  {block.data.gameMechanism?.rounds[0]?.agents.map((agent, idx) => (
                    <span key={idx} className="bg-gray-100 px-2 py-1 border border-gray-300 text-xs font-bold text-gray-800">
                      {agent.name.split(' ')[0]}: <span className={`${getVoteColor(agent.vote)}`}>{agent.vote}</span>
                    </span>
                  ))}
                </div>
            </div>
        </div>
        <div className="bg-gray-50 px-5 py-3 border-t-2 border-black font-[Courier_Prime] text-xs text-gray-600 space-y-2 overflow-hidden">
             <p className="truncate"><strong className="text-black">Timestamp:</strong> {new Date(block.timestamp).toISOString()}</p>
             <p className="truncate"><strong className="text-black">Hash:</strong> <span className="text-black font-bold">{block.hash}</span></p>
             <p className="truncate"><strong className="text-black">Prev. Hash:</strong> {block.previousHash}</p>
        </div>
    </div>
  );
};
