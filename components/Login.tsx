
import React, { useState, useEffect } from 'react';
import { Smartphone, ShieldCheck, Loader2, ArrowRight, RotateCcw } from 'lucide-react';

interface LoginProps {
  onLogin: (phoneNumber: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: number;
    if (timer > 0) {
      interval = window.setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Please enter a valid mobile number');
      return;
    }
    setLoading(true);
    setError(null);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setTimer(30); // Start 30s resend timer
    }, 1500);
  };

  const handleResendOtp = () => {
    if (timer > 0) return;
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
      setTimer(30);
      setOtp('');
      setError('A new OTP has been sent to your device.');
      setTimeout(() => setError(null), 3000);
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }
    setLoading(true);
    setError(null);
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      if (otp === '123456') { // Mock valid OTP
        onLogin(phone);
      } else {
        setError('Invalid OTP. Hint: Use 123456');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-2">
          <div className="inline-flex p-4 rounded-3xl bg-blue-600 shadow-xl shadow-blue-500/20 mb-4">
            <Smartphone className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">FinTrack Pro</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">Secure Personal Finance Manager</p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 transition-colors">
          {step === 'phone' ? (
            <form onSubmit={handleRequestOtp} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Mobile Number</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pr-2 border-r border-gray-200 dark:border-gray-700">
                    <span className="text-sm font-bold dark:text-white">+91</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-2xl py-4 pl-16 pr-4 text-base font-bold text-gray-900 dark:text-white border-2 border-transparent focus:border-blue-500 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              {error && <p className="text-rose-500 text-xs font-bold text-center animate-in shake duration-300">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-800 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Continue <ArrowRight className="w-5 h-5" /></>}
              </button>
              
              <p className="text-[10px] text-center text-gray-400 dark:text-gray-500 leading-relaxed">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-2 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">OTP sent to <span className="font-bold text-gray-900 dark:text-white">+91 {phone}</span></p>
                <div className="flex justify-center gap-2 py-4">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-48 bg-gray-50 dark:bg-gray-800/50 rounded-2xl py-4 px-4 text-2xl font-black text-center tracking-[0.5em] text-gray-900 dark:text-white border-2 border-transparent focus:border-blue-500 transition-all outline-none"
                    autoFocus
                  />
                </div>
              </div>

              {error && <p className="text-emerald-500 text-rose-500 text-xs font-bold text-center animate-in fade-in">{error}</p>}

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-800 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Verify OTP <ShieldCheck className="w-5 h-5" /></>}
                </button>
                
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    disabled={timer > 0 || loading}
                    onClick={handleResendOtp}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 disabled:text-gray-400 transition-colors"
                  >
                    <RotateCcw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                    {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    Change Number
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
