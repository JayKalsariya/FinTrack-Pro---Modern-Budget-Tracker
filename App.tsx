
import React, { useState, useEffect } from 'react';
import { LayoutGrid, PieChart, Settings as SettingsIcon, Plus, History } from 'lucide-react';
import { Transaction, UserSettings, UserProfile } from './types';
import { StorageService } from './services/storage';
import { Dashboard } from './components/Dashboard';
import { Stats } from './components/Stats';
import { Settings } from './components/Settings';
import { TransactionForm } from './components/TransactionForm';
import { Card } from './components/ui/Card';
import { Login } from './components/Login';

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(StorageService.getCurrentUser());
  const [activeTab, setActiveTab] = useState<'dashboard' | 'stats' | 'history' | 'settings'>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Load user-specific data whenever the authenticated user changes
  useEffect(() => {
    if (user) {
      const vault = StorageService.getVault(user);
      setProfile(vault);
      setTransactions(vault.transactions);
      setSettings(vault.settings);
    } else {
      setProfile(null);
      setTransactions([]);
      setSettings(null);
    }
  }, [user]);

  // Update theme based on user settings
  useEffect(() => {
    if (settings?.darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-950');
      document.body.classList.remove('bg-gray-50');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('bg-gray-50');
      document.body.classList.remove('bg-gray-950');
    }
  }, [settings?.darkMode]);

  const handleLogin = (phone: string) => {
    StorageService.setCurrentUser(phone);
    setUser(phone);
  };

  const handleLogout = () => {
    StorageService.setCurrentUser(null);
    setUser(null);
    setActiveTab('dashboard');
  };

  const handleAddTransaction = (newT: Transaction) => {
    if (!user) return;
    const updatedTransactions = [newT, ...transactions];
    setTransactions(updatedTransactions);
    StorageService.updateActiveData(user, { transactions: updatedTransactions });
    setShowForm(false);
  };

  const handleUpdateSettings = (newSettings: UserSettings) => {
    if (!user) return;
    setSettings(newSettings);
    StorageService.updateActiveData(user, { settings: newSettings });
  };

  const handleUpdateName = (name: string) => {
    if (!user) return;
    const updatedName = name.trim();
    setProfile(prev => prev ? { ...prev, name: updatedName } : null);
    StorageService.updateActiveData(user, { name: updatedName });
  };

  // UI Tweak: Function to populate demo data for clean screenshots
  const handleLoadDemoData = () => {
    if (!user) return;
    const demoTransactions: Transaction[] = [
      { id: '1', type: 'income', amount: 85000, category: 'Salary', date: new Date().toISOString().split('T')[0], note: 'Monthly Salary' },
      { id: '2', type: 'expense', amount: 12500, category: 'Rent', date: new Date().toISOString().split('T')[0], note: 'Apartment Rent' },
      { id: '3', type: 'expense', amount: 4500, category: 'Food', date: new Date().toISOString().split('T')[0], note: 'Grocery Shopping' },
      { id: '4', type: 'expense', amount: 1200, category: 'Transport', date: new Date().toISOString().split('T')[0], note: 'Fuel' },
      { id: '5', type: 'expense', amount: 3500, category: 'Shopping', date: new Date().toISOString().split('T')[0], note: 'New Shoes' },
      { id: '6', type: 'expense', amount: 850, category: 'Utilities', date: new Date().toISOString().split('T')[0], note: 'Electricity Bill' },
    ];
    setTransactions(demoTransactions);
    setProfile(prev => prev ? { ...prev, name: 'John Doe' } : null);
    StorageService.updateActiveData(user, { 
      transactions: demoTransactions, 
      name: 'John Doe',
      settings: { ...settings!, budgetLimit: 25000 }
    });
    setSettings(prev => prev ? { ...prev, budgetLimit: 25000 } : null);
  };

  if (!user || !settings) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard transactions={transactions} settings={settings} userName={profile?.name} />;
      case 'stats':
        return <Stats transactions={transactions} settings={settings} />;
      case 'settings':
        return (
          <Settings 
            settings={settings} 
            userName={profile?.name}
            transactions={transactions} 
            onUpdate={handleUpdateSettings} 
            onUpdateName={handleUpdateName}
            onLoadDemoData={handleLoadDemoData}
            onReset={() => {
              const resetSettings = { ...settings, budgetLimit: 50000 };
              setTransactions([]);
              setSettings(resetSettings);
              StorageService.updateActiveData(user, { transactions: [], settings: resetSettings });
            }}
            onExport={() => StorageService.exportToCSV(transactions)}
            onLogout={handleLogout}
          />
        );
      case 'history':
        return (
          <div className="space-y-4 pb-24 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold dark:text-white px-1">History</h2>
            <div className="space-y-3">
              {transactions.map(t => (
                <Card key={t.id} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg text-white ${t.type === 'income' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                      {t.type === 'income' ? <Plus className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-semibold text-sm dark:text-white">{t.note || t.category}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{t.category} • {new Date(t.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className={`font-bold ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {t.type === 'income' ? '+' : '-'}{settings.currency}{t.amount.toLocaleString()}
                  </div>
                </Card>
              ))}
              {transactions.length === 0 && (
                <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-gray-800">
                  <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">No activity yet.</p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return <Dashboard transactions={transactions} settings={settings} />;
    }
  };

  return (
    <div className="min-h-screen max-w-lg mx-auto bg-gray-50 dark:bg-gray-950 transition-colors duration-200 overflow-x-hidden">
      <main className="p-4 pt-6">
        {renderContent()}
      </main>

      <div className="fixed bottom-24 right-6 sm:bottom-28">
        <button 
          onClick={() => setShowForm(true)}
          className="w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/30 flex items-center justify-center transition-transform hover:scale-110 active:scale-90 z-50"
        >
          <Plus className="w-8 h-8" />
        </button>
      </div>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 flex items-center justify-around py-3 pb-8 px-4 z-40">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <LayoutGrid className="w-6 h-6" />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button 
          onClick={() => setActiveTab('stats')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'stats' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <PieChart className="w-6 h-6" />
          <span className="text-[10px] font-bold">Stats</span>
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'history' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <History className="w-6 h-6" />
          <span className="text-[10px] font-bold">History</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'settings' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <SettingsIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold">Settings</span>
        </button>
      </nav>

      {showForm && (
        <TransactionForm 
          onClose={() => setShowForm(false)} 
          onAdd={handleAddTransaction} 
          currency={settings.currency}
        />
      )}
    </div>
  );
};

export default App;
