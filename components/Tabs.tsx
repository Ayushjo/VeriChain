
import React from 'react';
import { Tab } from '../types';

interface TabsProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [Tab.Detector, Tab.Ledger];

  const getTabClass = (tab: Tab) => {
    return activeTab === tab
      ? 'bg-cyan-500 text-white'
      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white';
  };

  return (
    <div className="flex justify-center space-x-2 p-1 bg-gray-900/50 rounded-lg max-w-sm mx-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`w-full py-2.5 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 ${getTabClass(tab)}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
