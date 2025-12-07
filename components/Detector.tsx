import React, { useState } from 'react';
import type { AnalysisResult, NewsArticle } from '../types';
import { Loader } from './Loader';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { ScaleIcon } from './icons/ScaleIcon';
import { LinkIcon } from './icons/LinkIcon';

interface DetectorProps {
  onAnalyze: (articleContent: string) => void;
  isLoading: boolean;
  error: string | null;
  result: AnalysisResult | null;
  onRecord: () => void;
  onFetchNews: () => void;
  isFetchingNews: boolean;
  newsArticles: NewsArticle[];
  newsError: string | null;
}

const ResultCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="bg-gray-800/50 rounded-lg p-4 h-full">
        <div className="flex items-center mb-2">
            {icon}
            <h3 className="text-lg font-semibold ml-2 text-gray-200">{title}</h3>
        </div>
        <div className="text-gray-400 text-sm leading-relaxed">{children}</div>
    </div>
);


export const Detector: React.FC<DetectorProps> = ({ 
    onAnalyze, isLoading, error, result, onRecord,
    onFetchNews, isFetchingNews, newsArticles, newsError 
}) => {
  const [articleText, setArticleText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(articleText);
  };
  
  const handleAnalyzeArticle = (article: NewsArticle) => {
    const content = `${article.title}\n\n${article.snippet}`;
    setArticleText(content);
    onAnalyze(content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 5) return 'text-yellow-400';
    return 'text-red-400';
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-center text-cyan-300">Article Authenticity Analyzer</h2>
        <p className="text-center text-gray-400 mb-6">
          Paste the text of a news article below or fetch the latest headlines to analyze.
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={articleText}
            onChange={(e) => setArticleText(e.target.value)}
            placeholder="Enter article text here..."
            className="w-full h-48 p-4 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 text-gray-300 resize-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-md text-white font-bold transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={isLoading || !articleText.trim()}
          >
            {isLoading ? <Loader /> : 'Analyze Pasted Text'}
          </button>
        </form>

        <div className="my-6 flex items-center text-center">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <button
            onClick={onFetchNews}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-bold transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={isFetchingNews || isLoading}
        >
            {isFetchingNews ? <Loader /> : 'Fetch Latest News Headlines'}
        </button>
      </div>

      {error && <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">{error}</div>}
      
      {newsError && <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">{newsError}</div>}
      {newsArticles.length > 0 && (
          <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-center text-cyan-300">Latest Headlines</h2>
              <div className="grid md:grid-cols-2 gap-4">
                  {newsArticles.map((article, index) => (
                      <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-lg text-gray-200">{article.title}</h3>
                            <p className="text-sm text-gray-400 mt-2">{article.snippet}</p>
                          </div>
                          <button
                            onClick={() => handleAnalyzeArticle(article)}
                            className="mt-4 w-full py-2 bg-cyan-800 hover:bg-cyan-700 rounded-md text-white text-sm font-semibold transition-colors duration-200"
                          >
                              Analyze this Article
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {result && (
        <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 text-center text-cyan-300">Analysis Report</h2>
          
          <div className="text-center mb-6">
            <p className="text-gray-400 text-lg">Overall Credibility Score</p>
            <p className={`text-7xl font-bold my-2 ${getScoreColor(result.credibilityScore)}`}>{result.credibilityScore}<span className="text-3xl text-gray-500">/10</span></p>
            <p className="text-gray-400 max-w-xl mx-auto">{result.summary}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <ResultCard title="Factual Accuracy" icon={<CheckCircleIcon />}>
                {result.factuality}
            </ResultCard>
            <ResultCard title="Bias & Tone" icon={<ScaleIcon />}>
                {result.biasAnalysis}
            </ResultCard>
             <ResultCard title="Source Reliability" icon={<XCircleIcon />}>
                {result.sourceAnalysis}
            </ResultCard>
          </div>
          
          {result.sources && result.sources.length > 0 && (
              <div className="mt-6">
                  <ResultCard title="Sources Found by AI" icon={<LinkIcon />}>
                      <ul className="space-y-2">
                          {result.sources.map((source, index) => (
                              <li key={index}>
                                  <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline break-words">
                                      {source.title}
                                  </a>
                              </li>
                          ))}
                      </ul>
                  </ResultCard>
              </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={onRecord}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-bold transition-colors duration-200"
            >
              Record Verification to Ledger
            </button>
            <p className="text-xs text-gray-500 mt-2">
              This will permanently (and immutably) record the analysis result on the simulated public ledger.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
