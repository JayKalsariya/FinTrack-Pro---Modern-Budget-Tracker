
import React, { useState, useMemo } from 'react';
import { UserSettings, Transaction } from '../types';
import { CURRENCIES, CurrencyItem } from '../constants';
import { Card } from './ui/Card';
import { 
  Moon, Sun, Download, 
  ChevronRight, Bell, 
  Trash2, Search, Globe, X, LogOut,
  User as UserIcon, Check, Sparkles
} from 'lucide-react';

interface SettingsProps {
  settings: UserSettings;
  userName?: string;
  transactions: Transaction[];
  onUpdate: (settings: UserSettings) => void;
  onUpdateName: (name: string) => void;
  onLoadDemoData?: () => void;
  onReset: () => void;
  onExport: () => void;
  onLogout: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ 
  settings, 
  userName = '', 
  transactions, 
  onUpdate, 
  onUpdateName,
  onLoadDemoData,
  onReset, 
  onExport, 
  onLogout 
}) => {
  const [currencySearch, setCurrencySearch] = useState('');
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const filteredCurrencies = useMemo(() => {
    return CURRENCIES.filter(c => 
      c.name.toLowerCase().includes(currencySearch.toLowerCase()) || 
      c.code.toLowerCase().includes(currencySearch.toLowerCase())
    );
  }, [currencySearch]);

  const handleCurrencySelect = (currency: CurrencyItem) => {
    onUpdate({ 
      ...settings, 
      currency: currency.symbol, 
      currencyCode: currency.code 
    });
    setShowCurrencyModal(false);
  };

  const handleSaveName = () => {
    onUpdateName(tempName);
    setEditingName(false);
  };

  const currentCurrency = CURRENCIES.find(c => c.code === settings.currencyCode) || CURRENCIES[0];

  return (
    <div className="space-y-6 pb-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white px-1">Settings</h2>

      <div className="space-y-4">
        {/* Profile Info Section */}
        <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-1">Account Profile</h3>
        <Card className="p-0 overflow-hidden border-none shadow-md shadow-gray-200/50 dark:shadow-none">
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <UserIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left flex-1">
                <p className="font-bold text-sm text-gray-900 dark:text-white">Your Name</p>
                {editingName ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input 
                      autoFocus
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      placeholder="Enter name"
                      className="bg-gray-50 dark:bg-gray-800 text-xs font-medium p-1 px-2 rounded-lg border-none focus:ring-1 focus:ring-blue-500 outline-none text-gray-900 dark:text-white w-32"
                    />
                    <button onClick={handleSaveName} className="p-1 bg-emerald-500 text-white rounded-md">
                      <Check className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 font-medium">
                    {userName || 'Set a name to personalize your app'}
                  </p>
                )}
              </div>
            </div>
            {!editingName && (
              <button 
                onClick={() => setEditingName(true)}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Edit
              </button>
            )}
          </div>
        </Card>

        {/* Screenshot Helper Section */}
        {onLoadDemoData && (
          <button 
            onClick={onLoadDemoData}
            className="w-full flex items-center justify-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl border border-blue-100 dark:border-blue-800/50 text-xs font-bold transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            Prep Demo Data for Screenshots
          </button>
        )}

        <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-1 pt-2">Global Preferences</h3>
        
        <Card className="divide-y divide-gray-100 dark:divide-gray-800 p-0 overflow-hidden transition-colors border-none shadow-md shadow-gray-200/50 dark:shadow-none">
          <button 
            onClick={() => setShowCurrencyModal(true)}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl transition-colors">
                <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-gray-900 dark:text-white">Active Currency</p>
                <p className="text-xs text-gray-400 font-medium">{currentCurrency.flag} {currentCurrency.code} ({currentCurrency.symbol})</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
          </button>

          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 rounded-xl transition-colors">
                {settings.darkMode ? <Sun className="w-5 h-5 text-purple-600 dark:text-purple-400" /> : <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-gray-900 dark:text-white">Appearance</p>
                <p className="text-xs text-gray-400 font-medium">{settings.darkMode ? 'Dark Mode Active' : 'Light Mode Active'}</p>
              </div>
            </div>
            <button 
              onClick={() => onUpdate({ ...settings, darkMode: !settings.darkMode })}
              className={`w-14 h-7 rounded-full transition-all relative ${settings.darkMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all ${settings.darkMode ? 'left-8' : 'left-1'}`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-orange-100 dark:bg-orange-900/30 rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-gray-900 dark:text-white">Monthly Limit</p>
                <p className="text-xs text-gray-400 font-medium">Alert after {settings.currency}{settings.budgetLimit.toLocaleString()}</p>
              </div>
            </div>
            <input 
              type="number"
              value={settings.budgetLimit}
              onChange={(e) => onUpdate({ ...settings, budgetLimit: parseInt(e.target.value) || 0 })}
              className="w-24 bg-gray-50 dark:bg-gray-800 text-sm font-black p-2.5 rounded-xl text-right outline-none border-none text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </Card>

        <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-1 pt-4">Security & Data</h3>
        
        <Card className="divide-y divide-gray-100 dark:divide-gray-800 p-0 overflow-hidden transition-colors border-none shadow-md shadow-gray-200/50 dark:shadow-none">
          <button 
            onClick={onExport}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl transition-colors">
                <Download className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-gray-900 dark:text-white">Back Up Data</p>
                <p className="text-xs text-gray-400 font-medium">Download encrypted CSV report</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
          </button>

          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl transition-colors">
                <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-gray-900 dark:text-white">Log Out</p>
                <p className="text-xs text-gray-400 font-medium italic">Data remains safe on this device</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
          </button>

          <button 
            onClick={onReset}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-rose-100 dark:bg-rose-900/30 rounded-xl transition-colors group-hover:bg-rose-200 dark:group-hover:bg-rose-900/50">
                <Trash2 className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-rose-600 dark:text-rose-400">Clear Vault</p>
                <p className="text-xs text-gray-400 font-medium italic">Permanently delete current profile</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
          </button>
        </Card>
      </div>

      {/* Currency Selection Modal */}
      {showCurrencyModal && (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl h-[80vh] flex flex-col border-t sm:border border-gray-100 dark:border-gray-800 transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Choose Currency</h2>
              <button onClick={() => setShowCurrencyModal(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-600" />
              <input 
                type="text"
                placeholder="Search global markets..."
                value={currencySearch}
                onChange={(e) => setCurrencySearch(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-2xl py-4 pl-12 pr-4 text-sm text-gray-900 dark:text-white border-none focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 hide-scrollbar">
              {filteredCurrencies.map(c => (
                <button
                  key={c.code}
                  onClick={() => handleCurrencySelect(c)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border-2 ${settings.currencyCode === c.code ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-transparent bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl drop-shadow-sm">{c.flag}</span>
                    <div className="text-left">
                      <p className="font-bold text-sm text-gray-900 dark:text-white">{c.name}</p>
                      <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 tracking-widest">{c.code}</p>
                    </div>
                  </div>
                  <span className="text-lg font-black text-blue-600 dark:text-blue-400">{c.symbol}</span>
                </button>
              ))}
              {filteredCurrencies.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-400 dark:text-gray-600 italic text-sm">No match for "{currencySearch}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
