import React, { useState } from 'react';
import { ArrowLeft, Share2, Calendar, ShieldCheck, CheckCircle2, Gift, Sparkles, Copy, Check } from 'lucide-react';
import { PromoItem, Language } from '../types';

interface PromoDetailModalProps {
  promo: PromoItem | null;
  language: Language;
  onClose: () => void;
  onClaimBonus: (promo: PromoItem) => void;
  isClaimed: boolean;
}

export const PromoDetailModal: React.FC<PromoDetailModalProps> = ({
  promo,
  language,
  onClose,
  onClaimBonus,
  isClaimed,
}) => {
  const [copied, setCopied] = useState(false);

  if (!promo) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#032312] text-white overflow-hidden animate-fadeIn">
      {/* Top App Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between h-14 px-3 bg-[#00471b] border-b border-[#006524] shadow-md">
        <button
          id="detail-back-btn"
          type="button"
          onClick={onClose}
          className="flex items-center gap-1.5 py-1 px-2 text-emerald-200 hover:text-white rounded-lg active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-[#d8fe49]" />
          <span className="text-sm font-semibold">
            {language === 'bn' ? 'ফিরে যান' : 'Back'}
          </span>
        </button>

        <h1 className="text-sm font-bold tracking-tight text-white max-w-[200px] truncate text-center">
          {language === 'bn' ? 'কার্যকলাপের বিশদ' : 'Activity Details'}
        </h1>

        <button
          id="detail-share-btn"
          type="button"
          onClick={handleCopyLink}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#003614] text-emerald-300 hover:text-white border border-[#005e22] active:scale-95"
          title="Share promotion link"
        >
          {copied ? <Check className="w-4 h-4 text-[#d8fe49]" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Falling Gifts Animation Effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-gift-fall text-lg opacity-40"
            style={{
              left: `${10 + i * 12}%`,
              animationDuration: `${3.5 + (i % 3) * 1.5}s`,
              animationDelay: `${(i % 4) * 0.7}s`,
            }}
          >
            {i % 2 === 0 ? '🎁' : '🪙'}
          </div>
        ))}
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto pb-24 relative z-20">
        {/* Big Banner Graphic */}
        <div className="relative w-full h-48 sm:h-60 overflow-hidden bg-[#00260e]">
          <img
            src={promo.bannerImage}
            alt={language === 'bn' ? promo.titleBn : promo.titleEn}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#032312] via-transparent to-black/30" />

          {/* Status Chip */}
          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-emerald-600/90 text-white shadow-md backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#d8fe49] animate-pulse" />
              {language === 'bn' ? 'সক্রিয় প্রচার' : 'Active Promotion'}
            </span>
          </div>

          {/* Bonus Amount Pill */}
          <div className="absolute bottom-3 right-3">
            <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold text-[#00471b] bg-gradient-to-b from-[#ffe863] to-[#d8fe49] shadow-lg rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#00471b]" />
              <span>{language === 'bn' ? promo.bonusAmountBn : promo.bonusAmountEn}</span>
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto p-4 space-y-4">
          {/* Main Title & Subtitle */}
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
              {language === 'bn' ? promo.titleBn : promo.titleEn}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-300 mt-1 font-medium">
              {language === 'bn' ? promo.subtitleBn : promo.subtitleEn}
            </p>
          </div>

          {/* Core Specifications Table */}
          <div className="bg-[#003816] rounded-xl border border-[#006024] p-3.5 shadow-md">
            <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#d8fe49]" />
              <span>{language === 'bn' ? 'অফারের মূল তথ্যাদি' : 'Key Specifications'}</span>
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#00260e] p-2.5 rounded-lg border border-[#00471b]">
                <span className="text-emerald-400 block text-[11px]">
                  {language === 'bn' ? 'টার্নওভার প্রয়োজনীয়তা' : 'Rollover Requirement'}
                </span>
                <span className="text-white font-bold mt-0.5 block text-sm text-[#d8fe49]">
                  {promo.turnoverRequirement}
                </span>
              </div>

              <div className="bg-[#00260e] p-2.5 rounded-lg border border-[#00471b]">
                <span className="text-emerald-400 block text-[11px]">
                  {language === 'bn' ? 'ন্যূনতম জমা' : 'Min Deposit'}
                </span>
                <span className="text-white font-bold mt-0.5 block text-sm">
                  {promo.minDeposit || (language === 'bn' ? 'প্রযোজ্য নয়' : 'N/A')}
                </span>
              </div>

              <div className="bg-[#00260e] p-2.5 rounded-lg border border-[#00471b]">
                <span className="text-emerald-400 block text-[11px]">
                  {language === 'bn' ? 'মেয়াদকাল' : 'Validity Period'}
                </span>
                <span className="text-white font-medium mt-0.5 block text-[11px]">
                  {promo.isLongTerm
                    ? (language === 'bn' ? 'দীর্ঘমেয়াদী কার্যকলাপ' : 'Long-term activity')
                    : `${promo.startDate} - ${promo.endDate}`}
                </span>
              </div>

              <div className="bg-[#00260e] p-2.5 rounded-lg border border-[#00471b]">
                <span className="text-emerald-400 block text-[11px]">
                  {language === 'bn' ? 'সর্বোচ্চ বোনাস' : 'Max Bonus'}
                </span>
                <span className="text-white font-bold mt-0.5 block text-sm">
                  {promo.maxBonus || (language === 'bn' ? 'সীমাহীন' : 'Unlimited')}
                </span>
              </div>
            </div>
          </div>

          {/* Description Content */}
          <div className="bg-[#003816] rounded-xl border border-[#006024] p-3.5 shadow-md">
            <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-[#d8fe49]" />
              <span>{language === 'bn' ? 'কার্যকলাপের বিবরণ' : 'Activity Overview'}</span>
            </h3>
            <ul className="space-y-2 text-xs text-emerald-100 leading-relaxed">
              {(language === 'bn' ? promo.contentBn : promo.contentEn).map((paragraph, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#d8fe49] font-bold mt-0.5">•</span>
                  <span>{paragraph}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-[#003816] rounded-xl border border-[#006024] p-3.5 shadow-md">
            <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>{language === 'bn' ? 'শর্তাবলী ও নিয়মাবলী' : 'Rules & Terms'}</span>
            </h3>
            <ol className="space-y-2 text-xs text-emerald-200/80 leading-relaxed list-decimal list-inside">
              {(language === 'bn' ? promo.rulesBn : promo.rulesEn).map((rule, idx) => (
                <li key={idx} className="pl-1">
                  <span>{rule}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#002f12] border-t border-[#005e22] p-3 shadow-2xl">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          {/* Share Button */}
          <button
            id="share-link-copy-btn"
            type="button"
            onClick={handleCopyLink}
            className="flex flex-col items-center justify-center w-14 h-11 rounded-xl bg-[#00471b] border border-[#006a28] text-emerald-200 active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-[#d8fe49]" /> : <Copy className="w-4 h-4" />}
            <span className="text-[9px] mt-0.5">{copied ? 'Copied' : 'Share'}</span>
          </button>

          {/* Claim / Participate Button */}
          {isClaimed ? (
            <div className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-[#004e1f] border border-emerald-500/50 text-emerald-200 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-[#d8fe49]" />
              <span>
                {language === 'bn' ? 'বোনাস দাবি করা হয়েছে!' : 'Bonus Already Claimed!'}
              </span>
            </div>
          ) : (
            <button
              id="detail-claim-action-btn"
              type="button"
              onClick={() => onClaimBonus(promo)}
              className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl text-[#00471b] font-black text-sm uppercase tracking-wider bg-gradient-to-r from-[#ffe863] via-[#d8fe49] to-[#73c002] shadow-lg hover:brightness-110 active:scale-98 transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#00471b]" />
              <span>{language === 'bn' ? promo.buttonTextBn : promo.buttonTextEn}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
