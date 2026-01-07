
import React, { useMemo } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';
import { Transaction, UserSettings } from '../types';
import { CATEGORIES } from '../constants';
import { Card } from './ui/Card';

interface StatsProps {
  transactions: Transaction[];
  settings: UserSettings;
}

export const Stats: React.FC<StatsProps> = ({ transactions, settings }) => {
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const isDark = settings.darkMode;

  const pieData = useMemo(() => {
    const data: Record<string, number> = {};
    expenseTransactions.forEach(t => {
      data[t.category] = (data[t.category] || 0) + t.amount;
    });
    return Object.keys(data).map(key => ({
      name: key,
      value: data[key],
      color: CATEGORIES.find(c => c.name === key)?.color || '#94A3B8'
    }));
  }, [expenseTransactions]);

  const barData = useMemo(() => {
    const data: Record<string, { income: number, expense: number }> = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    transactions.forEach(t => {
      const date = new Date(t.date);
      const month = months[date.getMonth()];
      if (!data[month]) data[month] = { income: 0, expense: 0 };
      if (t.type === 'income') data[month].income += t.amount;
      else data[month].expense += t.amount;
    });

    return Object.keys(data).map(key => ({
      name: key,
      income: data[key].income,
      expense: data[key].expense
    })).slice(-6);
  }, [transactions]);

  return (
    <div className="space-y-6 pb-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white px-1">Analytics</h2>

      <Card>
        <h3 className="font-bold mb-4 text-gray-800 dark:text-gray-200">Expense Distribution</h3>
        <div className="h-[250px] w-full">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${settings.currency}${value.toLocaleString()}`, 'Total']}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    color: isDark ? '#F3F4F6' : '#111827'
                  }}
                  itemStyle={{ color: isDark ? '#F3F4F6' : '#111827' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-600 italic text-sm">
              No expense data to visualize
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 px-2">
          {pieData.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
              <span className="text-gray-500 dark:text-gray-400 truncate">{item.name}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-bold mb-4 text-gray-800 dark:text-gray-200">Growth Trends</h3>
        <div className="h-[250px] w-full">
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#374151' : '#E5E7EB'} />
                <XAxis 
                  dataKey="name" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: isDark ? '#9CA3AF' : '#6B7280' }}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    color: isDark ? '#F3F4F6' : '#111827'
                  }}
                />
                <Legend 
                  iconType="circle" 
                  wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} 
                />
                <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} barSize={12} name="Income" />
                <Bar dataKey="expense" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={12} name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
             <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-600 italic text-sm">
              Insufficient data for monthly comparison
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
