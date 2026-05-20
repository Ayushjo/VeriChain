
import { useState, useEffect, useCallback } from 'react';
import type { Block, AnalysisResult } from '../types';
import { calculateHashForBlock } from '../utils/crypto';

export const useBlockchain = () => {
  const [chain, setChain] = useState<Block[]>([]);

  const createGenesisBlock = useCallback(async () => {
    const genesisData: AnalysisResult = {
      summary: 'Genesis Block',
      factuality: '',
      biasAnalysis: '',
      sourceAnalysis: '',
      gameMechanism: {
        rounds: [{
          roundNumber: 1,
          agents: [
            { name: 'Gemini AI', vote: 'UNCERTAIN', reasoning: 'Genesis block', payoff: 0 },
            { name: 'X (Twitter)', vote: 'UNCERTAIN', reasoning: 'Genesis block', payoff: 0 },
          ],
          consensusReached: true,
          equilibriumType: 'Nash',
        }],
        finalVerdict: 'UNCERTAIN',
        totalRewardPool: 0,
      },
    };
    const genesisBlock: Omit<Block, 'hash'> = {
      index: 0,
      timestamp: new Date().toISOString(),
      data: genesisData,
      previousHash: '0',
    };
    const hash = await calculateHashForBlock(genesisBlock);
    setChain([{ ...genesisBlock, hash }]);
  }, []);

  useEffect(() => {
    createGenesisBlock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLatestBlock = (): Block => {
    return chain[chain.length - 1];
  };

  const addBlock = async (newData: AnalysisResult) => {
    const latestBlock = getLatestBlock();
    const newBlockData: Omit<Block, 'hash'> = {
      index: latestBlock.index + 1,
      timestamp: new Date().toISOString(),
      data: newData,
      previousHash: latestBlock.hash,
    };
    const newHash = await calculateHashForBlock(newBlockData);
    const newBlock: Block = { ...newBlockData, hash: newHash };
    setChain(prevChain => [...prevChain, newBlock]);
  };
  
  const isChainValid = useCallback(() => {
    // We cannot use async function directly in this check, so this is a simplified sync check.
    // A full validation would re-hash every block asynchronously.
    for (let i = 1; i < chain.length; i++) {
        const currentBlock = chain[i];
        const previousBlock = chain[i - 1];

        if (currentBlock.previousHash !== previousBlock.hash) {
            return false;
        }
    }
    return true;
  }, [chain]);


  return { chain, addBlock, isChainValid };
};
