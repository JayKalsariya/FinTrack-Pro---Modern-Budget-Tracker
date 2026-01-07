
import React, { useState, useEffect } from 'react';
import { Transaction, Category, TransactionType } from '../types';
import { CATEGORIES } from '../constants';
import { X, Calendar, Edit3, AlertCircle } from 'lucide-react';

interface TransactionFormProps {
  onClose: () => void;
  onAdd: (transaction: Transaction) => void;
  currency: string;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onClose, onAdd, currency }) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>(CATEGORIES[0].name);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isOther = category === 'Other' && type === 'expense';
  const isSubmitDisabled = !amount || parseFloat(amount) <= 0 || (isOther && !note.trim());

  useEffect(() => {
    if (isOther && !note.trim()) {
      setError("Please provide a description for 'Other' expenses.");
    } else {
      setError(null);
    }
  }, [category, note, type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    onAdd({
      id: Math.random().toString(36).substr(2, 9),
      type,
      amount: parseFloat(amount),
      category: type === 'income' ? 'Income' : category,
      date,
      note: note.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 overflow-y-auto max-h-[90vh] hide-scrollbar border-t sm:border border-gray-100 dark:border-gray-800 transition-colors">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">New Transaction</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl transition-colors">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${type === 'expense' ? 'bg-white dark:bg-gray-700 shadow-sm text-rose-600 dark:text-rose-400' : 'text-gray-500'}`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${type === 'income' ? 'bg-white dark:bg-gray-700 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-gray-500'}`}
            >
              Income
            </button>
          </div>

          {/* Amount Input */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-400 dark:text-gray-600 transition-colors">{currency}</div>
            <input
              autoFocus
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 rounded-2xl py-8 pl-14 pr-6 text-5xl font-black text-gray-900 dark:text-white transition-all outline-none"
              required
            />
          </div>

          {/* Category Selector */}
          {type === 'expense' && (
            <div className="animate-in slide-in-from-top-2">
              <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 mb-3 px-1 uppercase tracking-[0.2em]">Select Category</label>
              <div className="grid grid-cols-4 gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setCategory(cat.name)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all border-2 ${category === cat.name ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-transparent bg-gray-50 dark:bg-gray-800/50'}`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl transition-colors" style={{ color: cat.color }}>
                      {cat.icon}
                    </div>
                    <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 text-center truncate w-full">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-600" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl py-3.5 pl-10 pr-3 text-sm text-gray-900 dark:text-white border-none outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                  Note {isOther && <span className="text-rose-500">*</span>}
                </label>
                <div className="relative">
                  <Edit3 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-600" />
                  <input
                    type="text"
                    placeholder={isOther ? "Required..." : "Optional..."}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className={`w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl py-3.5 pl-10 pr-3 text-sm text-gray-900 dark:text-white border-none outline-none transition-all ${isOther && !note.trim() ? 'ring-2 ring-rose-300 dark:ring-rose-800' : 'focus:ring-2 focus:ring-blue-500'}`}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs bg-rose-50 dark:bg-rose-900/20 p-3 rounded-xl animate-in zoom-in-95 duration-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="font-semibold">{error}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`w-full font-black text-sm uppercase tracking-widest py-5 rounded-2xl shadow-xl transition-all active:scale-[0.98] mt-2 ${isSubmitDisabled ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed shadow-none' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 dark:shadow-none'}`}
          >
            Confirm Transaction
          </button>
        </form>
      </div>
    </div>
  );
};
