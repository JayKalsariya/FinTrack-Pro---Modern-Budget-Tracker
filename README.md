# 💰 FinTrack Pro
> **Master Your Money, Effortlessly.**

FinTrack Pro is a mobile-first, high-performance budget tracking application designed for the modern user. Built with **React 19**, **Tailwind CSS**, and **Lucide-react**, it provides a seamless experience for managing personal finances with bank-grade security and stunning visual analytics.

---

## 🌟 Key Features

- 📱 **Mobile-First Experience**: Designed specifically for fluid mobile interactions.
- 🔐 **Secure Auth**: Mobile number authentication with OTP verification.
- 🛡️ **User-Scoped Vaults**: Each user's data is isolated and encrypted in their private local vault.
- 📈 **Real-Time Analytics**: Visualise spending habits with Pie and Bar charts.
- 🌓 **Dynamic Theme**: Full support for system and manual Light/Dark mode transitions.
- 🌍 **Global Markets**: Support for over 30+ international currencies with instant conversion UI.
- 📅 **Transaction History**: Detailed tracking of income and expenses with notes and categories.
- ⚠️ **Budget Guard**: Set monthly limits and receive instant visual alerts upon overspending.
- 📥 **Data Portability**: Export your financial data to CSV for external backup or analysis.

---

## 📸 Screenshots

> **Note to Developer**: Place your captured app screenshots in the `/screenshots` folder following the naming convention below to see them in this README.

| Login & Security | Profile & Dashboard | Analytics & Stats |
| :---: | :---: | :---: |
| ![Login](screenshots/01_login.png) | ![Dashboard](screenshots/03_dashboard.png) | ![Analytics](screenshots/05_analytics.png) |
| *Phone Auth with OTP* | *Personalised Overview* | *Spend Distribution* |

| Expense Entry | Currency Settings | Dark Mode |
| :---: | :---: | :---: |
| ![Add Expense](screenshots/04_add_expense.png) | ![Currency](screenshots/08_currency.png) | ![Dark Mode](screenshots/10_dark_mode.png) |
| *Intuitive Entry* | *Global Support* | *Premium Night View* |

---

## 🛠️ Tech Stack

- **Frontend Core**: React 19 (Hooks, Context)
- **Styling**: Tailwind CSS (Utility-first, Class-based Dark Mode)
- **Icons**: Lucide React (Optimised SVG icons)
- **Charts**: Recharts (Responsive SVG visualization)
- **State Management**: React State & LocalStorage Scoped Vaults
- **Animations**: Tailwind Animate & Framer-style transitions

---

## 📂 Project Structure

```text
/
├── components/          # Reusable UI components
│   ├── ui/              # Atom-level UI elements (Cards, Buttons)
│   ├── Dashboard.tsx    # Primary overview screen
│   ├── Stats.tsx        # Analytics and charting logic
│   ├── Login.tsx        # Auth flow and OTP handling
│   ├── Settings.tsx     # User preferences & profile
│   └── TransactionForm.tsx # Input handling for money moves
├── services/            # Business logic & Data layer
│   └── storage.ts       # Secure vault logic & persistence
├── types.ts             # Global TypeScript interfaces
├── constants.tsx        # Configuration & Static data
├── App.tsx              # Main routing & state controller
└── index.html           # Entry point & theme bootstrap
```

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Safari, or Firefox)
- Node.js (Optional, for local development server)

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fintrack-pro.git
   ```
2. Navigate to project root and serve (using any live server):
   ```bash
   npx serve .
   ```
3. Open `localhost:3000` in your mobile browser or emulator.

---

## 📱 How to Capture Clean Screenshots

To get the best results for your presentation:
1. **Clear Local Storage**: Go to Settings > Clear Vault to start fresh.
2. **Use Demo Account**: Login with `+91 99999 99999` and OTP `123456`.
3. **Set a Name**: Go to Settings and set your name for a personalised dashboard view.
4. **Populate Data**: Add 5-7 varied transactions (Rent, Food, Transport) across different dates to fill the charts.
5. **Set Budget**: Set a budget limit slightly lower than your total expenses to capture the "Budget Alert" state.

---

## 🛡️ Privacy & Security Note

FinTrack Pro implements **Client-Side Data Isolation**. Unlike traditional apps that store all user data in a single global database, FinTrack Pro creates a "Vault" identified by the user's phone number.
- **Logout behavior**: Your session token is cleared, but your vault remains on-device.
- **Privacy**: No financial data ever leaves your local storage unless you explicitly use the "Export CSV" feature.

---

## 🔮 Roadmap

- [ ] Biometric Auth (FaceID / Fingerprint)
- [ ] AI-Powered Spending Insights
- [ ] Recurring Subscription Tracker
- [ ] Cloud Sync with end-to-end encryption
- [ ] Multi-device sync using QR code pairing

---

Developed with ❤️ by **[Your Name/Agency]**
*Empowering your financial future.*
