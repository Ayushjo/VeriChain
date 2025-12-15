import React, { useState } from 'react';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { Detector } from './components/Detector';
import { Ledger } from './components/Ledger';
import { useBlockchain } from './hooks/useBlockchain';
import { analyzeNewsArticle, fetchLatestNews } from './services/geminiService';
import type { AnalysisResult, NewsArticle } from './types';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Detector);
  const { chain, addBlock, isChainValid } = useBlockchain();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [isFetchingNews, setIsFetchingNews] = useState<boolean>(false);
  const [newsError, setNewsError] = useState<string | null>(null);


  const handleAnalyze = async (articleContent: string) => {
    if (!articleContent.trim()) {
      setError("Please enter some article text to analyze.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const result = await analyzeNewsArticle(articleContent);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze the article. The AI model might be unavailable or returned an unexpected format. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchNews = async () => {
    setIsFetchingNews(true);
    setNewsError(null);
    setNewsArticles([]);
    setAnalysisResult(null);
    try {
      const articles = await fetchLatestNews();
      setNewsArticles(articles);
    } catch (err) {
      console.error(err);
      setNewsError("Failed to fetch latest news. Please try again later.");
    } finally {
      setIsFetchingNews(false);
    }
  };


  const handleRecordToLedger = () => {
    if (analysisResult) {
      addBlock(analysisResult);
      setAnalysisResult(null);
      setActiveTab(Tab.Ledger);
    }
  };

  return (
    <div className="min-h-screen relative bg-newspaper-cream">
      <Header />
      <main className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-200px)]">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-0">
          {activeTab === Tab.Detector && (
            <Detector
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              error={error}
              result={analysisResult}
              onRecord={handleRecordToLedger}
              onFetchNews={handleFetchNews}
              isFetchingNews={isFetchingNews}
              newsArticles={newsArticles}
              newsError={newsError}
            />
          )}
          {activeTab === Tab.Ledger && (
            <Ledger chain={chain} isChainValid={isChainValid()} />
          )}
        </div>
      </main>
      <footer className="bg-newspaper-paper text-center p-6 mt-12 border-t-4 border-black">
        <p className="font-serif font-black text-newspaper-ink text-sm tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
          VeriChain
        </p>
        <p className="text-newspaper-gray text-xs mt-1 font-body">
          © 2024 • AI-powered news verification with blockchain ledger
        </p>
      </footer>
    </div>
  );
};

export default App;
