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
    <div className="elegant-card p-6 h-full smooth-transition animate-slide-up">
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

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-pastel-mint';
    if (score >= 5) return 'text-pastel-peach';
    return 'text-pastel-pink';
  }

  const getScoreBg = (score: number) => {
    if (score >= 8) return 'bg-pastel-mint';
    if (score >= 5) return 'bg-pastel-peach';
    return 'bg-pastel-pink';
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
          <h2 className="text-4xl font-serif font-black text-center text-newspaper-ink mb-8 pb-4 border-b-4 border-black" style={{ fontFamily: 'Playfair Display, serif' }}>
            Analysis Report
          </h2>

          <div className="text-center mb-8 border-4 border-black p-8 bg-newspaper-cream">
            <p className="text-newspaper-gray text-xs font-bold uppercase tracking-widest mb-3" style={{ fontFamily: 'Merriweather, serif' }}>Overall Credibility Score</p>
            <div className="relative inline-block">
              <p className="text-7xl font-black my-3 text-newspaper-ink" style={{ fontFamily: 'Playfair Display, serif' }}>
                {result.credibilityScore}
                <span className="text-2xl text-newspaper-gray">/10</span>
              </p>
              <div className="w-24 h-1 mx-auto mt-2 bg-black"></div>
            </div>
            <p className="text-newspaper-ink max-w-xl mx-auto mt-4 text-base leading-relaxed font-body">{result.summary}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-8">
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
              <div className="mb-8">
                  <ResultCard title="Sources Found by AI" icon={<LinkIcon />}>
                      <ul className="space-y-3">
                          {result.sources.map((source, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                  <span className="text-newspaper-ink mt-1">▸</span>
                                  <a
                                    href={source.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-newspaper-ink hover:underline break-words smooth-transition font-body underline"
                                  >
                                      {source.title}
                                  </a>
                              </li>
                          ))}
                      </ul>
                  </ResultCard>
              </div>
          )}

          <div className="text-center pt-4 border-t-2 border-black">
            <button
              onClick={onRecord}
              className="px-10 py-4 bg-black hover:bg-newspaper-ink text-white font-bold text-sm smooth-transition uppercase tracking-widest ink-bleed"
              style={{ fontFamily: 'Merriweather, serif' }}
            >
              RECORD TO BLOCKCHAIN LEDGER
            </button>
            <p className="text-xs text-newspaper-gray mt-3 font-body tracking-wide">
              Create an immutable record on the simulated ledger
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
