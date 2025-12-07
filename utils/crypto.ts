
import type { Block } from '../types';

export const calculateHash = async (input: string): Promise<string> => {
  const textAsBuffer = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', textAsBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hash;
};

export const calculateHashForBlock = (block: Omit<Block, 'hash'>): Promise<string> => {
    const dataString = block.index + block.previousHash + block.timestamp + JSON.stringify(block.data);
    return calculateHash(dataString);
}
