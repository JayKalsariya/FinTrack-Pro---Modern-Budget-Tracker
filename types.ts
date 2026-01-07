
export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'Food' 
  | 'Rent' 
  | 'Transport' 
  | 'Shopping' 
  | 'Entertainment' 
  | 'Utilities' 
  | 'Income' 
  | 'Other' 
  | string;

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string;
  note?: string;
}

export interface UserSettings {
  currency: string;
  currencyCode: string;
  darkMode: boolean;
  budgetLimit: number;
}

export interface UserProfile {
  phoneNumber: string;
  name?: string;
  createdAt: string;
  settings: UserSettings;
  transactions: Transaction[];
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: string | null; // phoneNumber acts as ID
}
