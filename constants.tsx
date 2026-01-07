
import React from 'react';
import { 
  Utensils, 
  Home, 
  Car, 
  ShoppingBag, 
  Gamepad2, 
  Zap, 
  Wallet,
  Tag
} from 'lucide-react';

export const CATEGORIES = [
  { name: 'Food', icon: <Utensils className="w-5 h-5" />, color: '#F87171' },
  { name: 'Rent', icon: <Home className="w-5 h-5" />, color: '#60A5FA' },
  { name: 'Transport', icon: <Car className="w-5 h-5" />, color: '#FBBF24' },
  { name: 'Shopping', icon: <ShoppingBag className="w-5 h-5" />, color: '#A78BFA' },
  { name: 'Entertainment', icon: <Gamepad2 className="w-5 h-5" />, color: '#F472B6' },
  { name: 'Utilities', icon: <Zap className="w-5 h-5" />, color: '#34D399' },
  { name: 'Other', icon: <Tag className="w-5 h-5" />, color: '#94A3B8' },
];

export interface CurrencyItem {
  symbol: string;
  code: string;
  name: string;
  flag: string;
}

/**
 * Comprehensive ISO 4217 Currency List
 */
export const CURRENCIES: CurrencyItem[] = [
  { symbol: '$', code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { symbol: '₹', code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  { symbol: '€', code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { symbol: '£', code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { symbol: '¥', code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { symbol: '$', code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { symbol: '$', code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { symbol: 'Fr', code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { symbol: '元', code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { symbol: 'kr', code: 'SEK', name: 'Swedish Krona', flag: '🇸🇪' },
  { symbol: '$', code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' },
  { symbol: '₩', code: 'KRW', name: 'South Korean Won', flag: '🇰🇷' },
  { symbol: '$', code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
  { symbol: 'R$', code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷' },
  { symbol: '₽', code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺' },
  { symbol: 'R', code: 'ZAR', name: 'South African Rand', flag: '🇿🇦' },
  { symbol: '$', code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽' },
  // Fix: Replaced invalid variable reference 'HKD Name' with string literal 'Hong Kong Dollar'
  { symbol: '$', code: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰' },
  { symbol: '₪', code: 'ILS', name: 'Israeli Shekel', flag: '🇮🇱' },
  { symbol: 'kr', code: 'NOK', name: 'Norwegian Krone', flag: '🇳🇴' },
  { symbol: '₺', code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷' },
  { symbol: '₫', code: 'VND', name: 'Vietnamese Dong', flag: '🇻🇳' },
  { symbol: '฿', code: 'THB', name: 'Thai Baht', flag: '🇹🇭' },
  { symbol: '₱', code: 'PHP', name: 'Philippine Peso', flag: '🇵🇭' },
  { symbol: 'RM', code: 'MYR', name: 'Malaysian Ringgit', flag: '🇲🇾' },
  { symbol: 'Rp', code: 'IDR', name: 'Indonesian Rupiah', flag: '🇮🇩' },
  { symbol: 'د.إ', code: 'AED', name: 'UAE Dirham', flag: '🇦🇪' },
  { symbol: '﷼', code: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦' },
  { symbol: 'zł', code: 'PLN', name: 'Polish Zloty', flag: '🇵🇱' },
  { symbol: 'Kč', code: 'CZK', name: 'Czech Koruna', flag: '🇨🇿' },
  { symbol: 'Ft', code: 'HUF', name: 'Hungarian Forint', flag: '🇭🇺' },
  { symbol: 'kr', code: 'DKK', name: 'Danish Krone', flag: '🇩🇰' },
  { symbol: 'S$', code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
  { symbol: 'NZ$', code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' },
].sort((a, b) => a.name.localeCompare(b.name));

export const APP_THEME = {
  primary: '#2563eb',
  income: '#10b981',
  expense: '#ef4444',
};
