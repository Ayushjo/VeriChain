
import React from 'react';
import { Tab } from '../types';

interface TabsProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: Tab.Detector, label: 'ANALYZER' },
    { name: Tab.Ledger, label: 'LEDGER' }
  ];

  const getTabClass = (tab: Tab) => {
    return activeTab === tab
      ? 'bg-newspaper-paper border-t-2 border-l-2 border-r-2 border-black border-b-0 text-newspaper-ink relative z-10'
      : 'bg-newspaper-cream border-2 border-black border-b-2 text-newspaper-gray hover:bg-newspaper-paper';
  };

  return (
    <div className="flex justify-center max-w-2xl mx-auto animate-slide-up" style={{ marginBottom: '-2px' }}>
      {tabs.map((tab, index) => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          className={`
            py-3 px-8 text-xs font-bold tracking-widest
            smooth-transition font-serif-alt
            focus:outline-none
            ${getTabClass(tab.name)}
            ${index === 0 ? '' : '-ml-[2px]'}
          `}
          style={{ fontFamily: 'Merriweather, serif' }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
