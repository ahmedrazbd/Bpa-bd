import React, { useState } from 'react';
import { X, Gift, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { Language } from '../types';

interface PromoCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onApplyCode: (code: string) => { success: boolean; messageBn: string; messageEn: string };
}

export const PromoCodeModal: React.FC<PromoCodeModalProps> = ({
  isOpen,
  onClose,
  language,
  onApplyCode,
}) => {
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState<{ success: boolean; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const res = onApplyCode(code.trim().toUpperCase());
    setFeedback({
      success: res.success,
      text: language === 'bn' ? res.messageBn : res.messageEn,
    });

    if (res.success) {
      setCode('');
    }
  };

  const sampleCodes = ['BK99VIP', 'WELCOME300', 'CRICKET1000', 'LUCKY99'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#003816] border border-[#006024] p-5 text-white shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#00260e] text-emerald-300 flex items-center justify-center hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ffe863] to-[#73c002] p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#00471b] rounded-[10px] flex items-center justify-center">
              <Gift className="w-5 h-5 text-[#d8fe49]" />
            </div>
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white">
              {language === 'bn' ? 'প্রমোশন কোড রিডিম' : 'Redeem Promo Code'}
            </h3>
            <p className="text-[11px] text-emerald-300">
              {language === 'bn' ? 'তাত্ক্ষণিক ক্যাশ বা ফ্রি স্পিন দাবি করুন' : 'Claim instant cash or free spins'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-emerald-200 mb-1">
              {language === 'bn' ? 'আপনার বোনাস কোড লিখুন' : 'Enter Voucher Code'}
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                if (feedback) setFeedback(null);
              }}
              placeholder="e.g. BK99VIP"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#00260e] border border-[#005e22] text-white font-mono text-sm uppercase placeholder-emerald-600 focus:outline-none focus:border-[#d8fe49]"
            />
          </div>

          {/* Feedback message */}
          {feedback && (
            <div
              className={`p-2.5 rounded-lg flex items-center gap-2 text-xs font-medium ${
                feedback.success
                  ? 'bg-emerald-900/60 border border-emerald-500 text-emerald-200'
                  : 'bg-red-950/60 border border-red-500 text-red-200'
              }`}
            >
              {feedback.success ? (
                <CheckCircle2 className="w-4 h-4 text-[#d8fe49] shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span>{feedback.text}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!code.trim()}
            className="w-full py-2.5 rounded-xl text-[#00471b] font-black text-sm uppercase tracking-wider bg-gradient-to-r from-[#ffe863] via-[#d8fe49] to-[#73c002] shadow-md hover:brightness-110 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {language === 'bn' ? 'রিডিম করুন' : 'Redeem Now'}
          </button>
        </form>

        {/* Quick sample codes */}
        <div className="mt-4 pt-3 border-t border-[#004f1e]">
          <span className="text-[11px] text-emerald-400 block mb-1.5 font-medium">
            {language === 'bn' ? 'উপলব্ধ বোনাস কোডস:' : 'Available Trial Codes:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleCodes.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCode(c)}
                className="px-2 py-1 text-[11px] font-mono font-bold rounded-md bg-[#00260e] text-[#d8fe49] border border-[#005e22] hover:bg-[#00471b]"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
