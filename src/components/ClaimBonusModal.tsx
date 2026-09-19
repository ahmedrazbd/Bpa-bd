import React from 'react';
import { X, Sparkles, CheckCircle, Wallet, ArrowRight } from 'lucide-react';
import { PromoItem, Language } from '../types';

interface ClaimBonusModalProps {
  promo: PromoItem | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onGoToGames: () => void;
}

export const ClaimBonusModal: React.FC<ClaimBonusModalProps> = ({
  promo,
  isOpen,
  onClose,
  language,
  onGoToGames,
}) => {
  if (!isOpen || !promo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#003816] border-2 border-[#d8fe49] p-6 text-white text-center shadow-2xl overflow-hidden">
        {/* Confetti particles */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#ffe863]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#00260e] text-emerald-300 flex items-center justify-center hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Trophy / Check Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-[#ffe863] via-[#d8fe49] to-[#73c002] p-1 flex items-center justify-center shadow-lg mb-3 animate-bounce">
          <div className="w-full h-full rounded-full bg-[#00471b] flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-[#d8fe49]" />
          </div>
        </div>

        {/* Congratulations Title */}
        <h3 className="text-lg font-black text-white">
          {language === 'bn' ? 'অভিনন্দন! বোনাস সফলভাবে দাবি করা হয়েছে' : 'Bonus Successfully Claimed!'}
        </h3>

        {/* Promo Title */}
        <p className="text-xs text-emerald-300 mt-1 font-medium">
          {language === 'bn' ? promo.titleBn : promo.titleEn}
        </p>

        {/* Bonus Credited Box */}
        <div className="my-4 p-3.5 bg-[#00260e] rounded-xl border border-[#005e22] text-left">
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-300 flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5 text-[#d8fe49]" />
              {language === 'bn' ? 'পুরস্কারের পরিমাণ' : 'Reward Value'}
            </span>
            <span className="text-sm font-extrabold text-[#ffe863]">
              {language === 'bn' ? promo.bonusAmountBn : promo.bonusAmountEn}
            </span>
          </div>

          <div className="mt-2 pt-2 border-t border-[#00471b] flex items-center justify-between text-[11px]">
            <span className="text-emerald-400">
              {language === 'bn' ? 'টার্নওভার প্রয়োজনীয়তা' : 'Rollover'}
            </span>
            <span className="font-semibold text-emerald-200">{promo.turnoverRequirement}</span>
          </div>
        </div>

        <p className="text-[11px] text-emerald-200/80 mb-4 leading-relaxed">
          {language === 'bn'
            ? 'বোনাসটি আপনার গেমিং ওয়ালেটে জমা হয়েছে। এখনই বাজি ধরা শুরু করুন এবং বড় জয়ের সুযোগ নিন!'
            : 'Bonus credited to your wallet balance. Start playing eligible games now to fulfill rollover requirements!'}
        </p>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={onGoToGames}
            className="w-full py-2.5 rounded-xl text-[#00471b] font-black text-sm uppercase tracking-wider bg-gradient-to-r from-[#ffe863] via-[#d8fe49] to-[#73c002] shadow-md hover:brightness-110 active:scale-98 flex items-center justify-center gap-1.5"
          >
            <span>{language === 'bn' ? 'এখনই গেম খেলুন' : 'Play Games Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 rounded-xl text-xs font-semibold text-emerald-300 hover:text-white bg-[#00260e] border border-[#005e22]"
          >
            {language === 'bn' ? 'কার্যকলাপ তালিকায় ফিরে যান' : 'Back to Promotions'}
          </button>
        </div>
      </div>
    </div>
  );
};
