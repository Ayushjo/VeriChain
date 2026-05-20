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
    <div className="elegant-card p-6 h-full smooth-transition hover:-translate-y-0.5 hover:shadow-lg">
        <div className="flex items-center mb-3 border-b-2 border-black pb-2">
            {icon}
            <h3 className="text-sm font-bold ml-3 text-newspaper-ink tracking-wide uppercase" style={{ fontFamily: 'Merriweather, serif' }}>{title}</h3>
        </div>
        <div className="text-newspaper-gray text-sm leading-relaxed font-body">{children}</div>
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

  const getVoteColor = (vote: string) => {
    if (vote === 'TRUE') return 'text-green-700';
    if (vote === 'FALSE') return 'text-red-700';
    return 'text-yellow-700';
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="elegant-card p-8 animate-slide-up">
        <div className="text-center mb-6 pb-4 border-b-2 border-black">
          <h2 className="text-4xl font-serif font-black text-newspaper-ink mb-2 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            Article Authenticity Analyzer
          </h2>
          <p className="text-newspaper-gray text-xs tracking-wider uppercase font-body">
            Paste article text or fetch latest headlines to analyze
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="relative">
            <textarea
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
              placeholder="Enter article text here..."
              className="w-full h-52 p-5 bg-white border-2 border-black focus:outline-none focus:ring-0 smooth-transition text-newspaper-ink resize-none placeholder:text-newspaper-gray font-mono"
              style={{ fontFamily: 'Courier Prime, monospace' }}
              disabled={isLoading}
            />
            <div className="absolute bottom-3 right-3 font-mono text-newspaper-gray text-xs bg-newspaper-cream px-3 py-1 border border-black">
              {articleText.length} CHARS
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-5 py-4 bg-black hover:bg-newspaper-ink text-white font-bold text-sm smooth-transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center uppercase tracking-widest ink-bleed"
            style={{ fontFamily: 'Merriweather, serif' }}
            disabled={isLoading || !articleText.trim()}
          >
            {isLoading ? <Loader /> : 'ANALYZE ARTICLE'}
          </button>
        </form>

        <div className="ornamental-divider">
          <span>OR</span>
        </div>

        <button
            onClick={onFetchNews}
            className="w-full py-4 bg-white hover:bg-newspaper-cream text-newspaper-ink font-bold text-sm smooth-transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border-2 border-black uppercase tracking-widest"
            style={{ fontFamily: 'Merriweather, serif' }}
            disabled={isFetchingNews || isLoading}
        >
            {isFetchingNews ? <Loader /> : 'FETCH LATEST NEWS HEADLINES'}
        </button>
      </div>

      {error && (
        <div className="mt-6 elegant-card border-4 border-black text-newspaper-ink p-5 text-center animate-fade-in">
          <span className="font-bold uppercase tracking-wider" style={{ fontFamily: 'Merriweather, serif' }}>Error:</span> <span className="font-body">{error}</span>
        </div>
      )}

      {newsError && (
        <div className="mt-6 elegant-card border-4 border-black text-newspaper-ink p-5 text-center animate-fade-in">
          <span className="font-bold uppercase tracking-wider" style={{ fontFamily: 'Merriweather, serif' }}>Error:</span> <span className="font-body">{newsError}</span>
        </div>
      )}

      {newsArticles.length > 0 && (
          <div className="mt-8 animate-fade-in">
              <h2 className="text-3xl font-serif font-black text-center text-newspaper-ink mb-6 pb-2 border-b-4 border-black" style={{ fontFamily: 'Playfair Display, serif' }}>
                Latest Headlines
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                  {newsArticles.map((article, index) => (
                      <div
                        key={index}
                        className="elegant-card p-5 flex flex-col justify-between animate-slide-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                          <div>
                            <h3 className="font-bold text-base text-newspaper-ink mb-3 font-serif">{article.title}</h3>
                            <p className="text-sm text-newspaper-gray leading-relaxed font-body">{article.snippet}</p>
                          </div>
                          <button
                            onClick={() => handleAnalyzeArticle(article)}
                            className="mt-4 w-full py-3 bg-black hover:bg-newspaper-ink text-white text-xs font-bold smooth-transition uppercase tracking-widest ink-bleed"
                            style={{ fontFamily: 'Merriweather, serif' }}
                          >
                              Analyze
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {result && (
        <div className="mt-8 elegant-card p-8 animate-fade-in">
          <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
            <h2 className="text-3xl font-serif font-black text-newspaper-ink tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Consensus Report</h2>
            <div className="text-right">
              <span className="text-xs text-newspaper-gray uppercase" style={{ fontFamily: 'Merriweather, serif' }}>Final Verdict</span>
              <div className={`text-3xl font-black font-[Courier_Prime] ${getVoteColor(result.gameMechanism?.finalVerdict || 'UNCERTAIN')}`}>
                {result.gameMechanism?.finalVerdict || 'UNCERTAIN'}
              </div>
            </div>
          </div>
          
          <div className="mb-8 p-6 border-4 border-black bg-newspaper-cream text-center">
            <p className="text-newspaper-ink text-base font-body leading-relaxed max-w-2xl mx-auto italic">
              {result.summary}
            </p>
          </div>

          <div className="space-y-8">
            {result.gameMechanism?.rounds.map((round, rIdx) => (
              <div key={rIdx} className="relative">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-100 border border-black text-black text-xs font-bold px-3 py-1 mr-3 uppercase font-serif">Round {round.roundNumber}</div>
                  <div className="h-0.5 flex-grow bg-black"></div>
                  <div className="ml-3 text-xs font-[Courier_Prime] text-gray-800 uppercase font-bold">
                    Equilibrium: <span className={round.equilibriumType === 'Nash' ? 'text-green-700' : 'text-red-700'}>{round.equilibriumType}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {round.agents.map((agent, aIdx) => (
                    <div key={aIdx} className={`p-5 elegant-card h-full`}>
                      <div className="flex justify-between items-start mb-3 border-b-2 border-black pb-2">
                        <span className="text-xs font-bold text-black uppercase tracking-wider font-serif">{agent.name}</span>
                        <span className={`text-xs font-[Courier_Prime] font-bold ${agent.payoff >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                          {agent.payoff >= 0 ? '+' : ''}{agent.payoff} PTS
                        </span>
                      </div>
                      <div className={`text-xl font-black mb-3 font-[Courier_Prime] ${getVoteColor(agent.vote)}`}>
                        {agent.vote}
                      </div>
                      <p className="text-sm text-gray-800 leading-relaxed font-body flex-grow">
                        {agent.reasoning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t-2 border-black grid md:grid-cols-3 gap-5">
            <ResultCard title="Evidence Grounding" icon={<CheckCircleIcon />}>
                {result.factuality}
            </ResultCard>
            <ResultCard title="Incentive Analysis" icon={<ScaleIcon />}>
                {result.biasAnalysis}
            </ResultCard>
             <ResultCard title="Oracle Audit" icon={<XCircleIcon />}>
                {result.sourceAnalysis}
            </ResultCard>
          </div>
          
          {result.sources && result.sources.length > 0 && (
            <div className="mt-6">
              <ResultCard title="Grounding Chunks" icon={<LinkIcon />}>
                <div className="grid grid-cols-1 gap-2">
                  {result.sources.map((source, index) => (
                    <a key={index} href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-black hover:underline font-[Courier_Prime] truncate border border-gray-300 p-2 bg-white flex">
                      <span className="mr-2 font-bold">[{index + 1}]</span>
                      <span className="truncate">{source.title}</span>
                    </a>
                  ))}
                </div>
              </ResultCard>
            </div>
          )}

          <div className="mt-10 p-8 border-4 border-black bg-white text-center">
            <div className="flex justify-center items-center mb-6 space-x-12">
              <div>
                <span className="block text-xs text-gray-600 uppercase font-[Courier_Prime] mb-1">Reward Pool</span>
                <span className="text-3xl font-bold text-green-700 font-[Courier_Prime]">{result.gameMechanism?.totalRewardPool || 0}</span>
              </div>
              <div className="h-12 w-0.5 bg-gray-300"></div>
              <div>
                <span className="block text-xs text-gray-600 uppercase font-[Courier_Prime] mb-1">Consensus</span>
                <span className="text-3xl font-bold text-black font-[Courier_Prime]">
                  {result.gameMechanism?.rounds[result.gameMechanism.rounds.length - 1]?.consensusReached ? 'STABLE' : 'UNSTABLE'}
                </span>
              </div>
            </div>
            <button
              onClick={onRecord}
              className="bg-black text-white font-serif uppercase tracking-widest px-6 py-3 border-2 border-black hover:bg-white hover:text-black transition-colors"
            >
              Commit to Immutable Ledger
            </button>
            <p className="text-xs text-gray-500 mt-4 font-[Courier_Prime]">
              HASHING CONSENSUS STATE FOR BLOCKCHAIN PERSISTENCE
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
