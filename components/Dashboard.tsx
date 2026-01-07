
import React from 'react';
import { Transaction, UserSettings } from '../types';
import { Card } from './ui/Card';
import { ArrowUpRight, ArrowDownRight, Wallet, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface DashboardProps {
  transactions: Transaction[];
  settings: UserSettings;
  userName?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ transactions, settings, userName }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;
  const isOverBudget = totalExpense > settings.budgetLimit;

  return (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-center mt-2 px-1">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
            {userName ? `Hi, ${userName}!` : 'FinTrack Pro'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {userName ? 'Here is your financial summary' : 'Overview of your finances'}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center transition-colors">
          <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      {/* Main Balance Card */}
      <Card className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-900 border-none text-white relative overflow-hidden shadow-lg shadow-blue-200 dark:shadow-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <p className="text-blue-100 text-sm font-medium">Total Balance</p>
        <h2 className="text-4xl font-bold mt-1">
          {settings.currency}{balance.toLocaleString()}
        </h2>
        
        <div className="flex gap-4 mt-6 relative z-10">
          <div className="flex-1 bg-white/10 dark:bg-black/20 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1 bg-emerald-400/20 rounded-lg">
                <ArrowUpRight className="w-4 h-4 text-emerald-300" />
              </div>
              <span className="text-[10px] text-blue-100 uppercase tracking-wider font-bold">Income</span>
            </div>
            <p className="font-bold text-lg">{settings.currency}{totalIncome.toLocaleString()}</p>
          </div>
          <div className="flex-1 bg-white/10 dark:bg-black/20 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1 bg-rose-400/20 rounded-lg">
                <ArrowDownRight className="w-4 h-4 text-rose-300" />
              </div>
              <span className="text-[10px] text-blue-100 uppercase tracking-wider font-bold">Expense</span>
            </div>
            <p className="font-bold text-lg">{settings.currency}{totalExpense.toLocaleString()}</p>
          </div>
        </div>
      </Card>

      {/* Budget Warning */}
      {isOverBudget && (
        <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl p-4 flex items-center gap-3 transition-colors animate-in zoom-in-95">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
          <p className="text-sm text-rose-700 dark:text-rose-300">
            <strong>Budget Alert!</strong> You've exceeded your limit of {settings.currency}{settings.budgetLimit}.
          </p>
        </div>
      )}

      {/* Recent Transactions */}
      <div>
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Recent Transactions</h3>
          <button className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline">View All</button>
        </div>
        
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-900/50 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-gray-800">
              <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">No transactions yet.</p>
              <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">Tap the "+" to start tracking.</p>
            </div>
          ) : (
            transactions.slice(0, 5).map((t) => {
              const category = CATEGORIES.find(c => c.name === t.category) || CATEGORIES[CATEGORIES.length - 1];
              return (
                <Card key={t.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: t.type === 'income' ? '#10b981' : category.color }}
                    >
                      {t.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : category.icon}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm truncate max-w-[150px]">
                        {t.note || t.category}
                      </p>
                      <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">
                        {t.category} • {new Date(t.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className={`text-right font-bold text-sm ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {t.type === 'income' ? '+' : '-'}{settings.currency}{t.amount.toLocaleString()}
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
