
import { Transaction, UserSettings, UserProfile } from '../types';

const STORAGE_KEYS = {
  CURRENT_SESSION: 'fintrack_session',
  USER_VAULT_PREFIX: 'fintrack_vault_',
};

export const StorageService = {
  // Scoped data access
  getVault: (phone: string): UserProfile => {
    const data = localStorage.getItem(`${STORAGE_KEYS.USER_VAULT_PREFIX}${phone}`);
    if (data) return JSON.parse(data);
    
    // Create new profile if not found
    const newProfile: UserProfile = {
      phoneNumber: phone,
      createdAt: new Date().toISOString(),
      transactions: [],
      settings: {
        currency: '₹',
        currencyCode: 'INR',
        darkMode: false,
        budgetLimit: 50000,
      }
    };
    StorageService.saveVault(phone, newProfile);
    return newProfile;
  },

  saveVault: (phone: string, profile: UserProfile) => {
    localStorage.setItem(`${STORAGE_KEYS.USER_VAULT_PREFIX}${phone}`, JSON.stringify(profile));
  },

  // Session Management
  setCurrentUser: (phone: string | null) => {
    if (phone) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, phone);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
    }
  },

  getCurrentUser: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
  },

  // Helper to update specific parts of the active vault
  updateActiveData: (phone: string, updates: Partial<UserProfile>) => {
    const vault = StorageService.getVault(phone);
    const updatedVault = { ...vault, ...updates };
    StorageService.saveVault(phone, updatedVault);
  },

  exportToCSV: (transactions: Transaction[]) => {
    const headers = ['ID', 'Type', 'Amount', 'Category', 'Date', 'Note'];
    const rows = transactions.map(t => [
      t.id, t.type, t.amount, t.category, t.date, t.note || ''
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers, ...rows].map(e => e.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fin_track_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
