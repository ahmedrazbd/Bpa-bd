import React, { useState } from 'react';
import { X, CheckCircle2, Wallet, Sparkles, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onConfirmDeposit: (amount: number, method: string) => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
  language,
  onConfirmDeposit,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'bkash' | 'nagad' | 'rocket' | 'upay'>('bkash');
  const [amount, setAmount] = useState<number>(1000);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  const methods = [
    { id: 'bkash', name: 'bKash (বিকাশ)', color: 'from-pink-600 to-rose-700', bonus: '+5%' },
    { id: 'nagad', name: 'Nagad (নগদ)', color: 'from-orange-500 to-amber-600', bonus: '+5%' },
    { id: 'rocket', name: 'Rocket (রকেট)', color: 'from-purple-600 to-indigo-700', bonus: '+3%' },
    { id: 'upay', name: 'Upay (উপায়)', color: 'from-blue-600 to-cyan-700', bonus: '+3%' },
  ];

  const handleDeposit = () => {
    onConfirmDeposit(amount, selectedMethod);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#003816] border border-[#006024] p-5 text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#00260e] text-emerald-300 flex items-center justify-center hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ffe863] to-[#73c002] p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#00471b] rounded-[10px] flex items-center justify-center">
              <Wallet className="w-5 h-5 text-[#d8fe49]" />
            </div>
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white">
              {language === 'bn' ? 'তাত্ক্ষণিক ডিপোজিট' : 'Instant Cashier Deposit'}
            </h3>
            <span className="text-[11px] text-emerald-300">
              {language === 'bn' ? 'অটোমেটেড গেটওয়ে • ০% চার্জ' : 'Automated Gateways • 0% Fee'}
            </span>
          </div>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-600 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8 text-[#d8fe49]" />
            </div>
            <h4 className="text-base font-bold text-white">
              {language === 'bn' ? 'ডিপোজিট সফল হয়েছে!' : 'Deposit Successful!'}
            </h4>
            <p className="text-xs text-emerald-300">
              ৳ {amount.toLocaleString()} {language === 'bn' ? 'আপনার ব্যালেন্সে জমা করা হয়েছে।' : 'has been credited to your wallet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-emerald-200 mb-2">
                {language === 'bn' ? 'পেমেন্ট চ্যানেল বেছে নিন' : 'Select Payment Channel'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {methods.map((m) => {
                  const isSelected = selectedMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMethod(m.id as any)}
                      className={`relative p-2.5 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'border-[#d8fe49] bg-[#004e1f] shadow-md ring-1 ring-[#d8fe49]'
                          : 'border-[#005e22] bg-[#00260e] hover:bg-[#003816]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{m.name}</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/30 text-[#d8fe49]">
                          {m.bonus}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Amounts */}
            <div>
              <label className="block text-xs font-semibold text-emerald-200 mb-2">
                {language === 'bn' ? 'ডিপোজিট পরিমাণ (BDT)' : 'Deposit Amount (BDT)'}
              </label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      amount === amt
                        ? 'border-[#d8fe49] bg-[#d8fe49] text-[#00471b]'
                        : 'border-[#005e22] bg-[#00260e] text-white hover:border-emerald-400'
                    }`}
                  >
                    ৳ {amt.toLocaleString()}
                  </button>
                ))}
              </div>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min={200}
                max={50000}
                className="w-full px-3 py-2 rounded-xl bg-[#00260e] border border-[#005e22] text-white font-mono text-sm focus:outline-none focus:border-[#d8fe49]"
              />
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d8fe49]" />
              <span>{language === 'bn' ? '১০০% নিরাপদ ও সুরক্ষিত ট্রানজেকশন' : '100% Encrypted & Safe Transaction'}</span>
            </div>

            <button
              type="button"
              onClick={handleDeposit}
              className="w-full py-2.5 rounded-xl text-[#00471b] font-black text-sm uppercase tracking-wider bg-gradient-to-r from-[#ffe863] via-[#d8fe49] to-[#73c002] shadow-md hover:brightness-110 active:scale-98 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#00471b]" />
              <span>{language === 'bn' ? 'নিশ্চিত করুন' : 'Confirm Deposit'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
