import React from 'react';
import { Calendar, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';
import { PromoItem, Language } from '../types';

interface PromoCardProps {
  promo: PromoItem;
  language: Language;
  onSelectPromo: (promo: PromoItem) => void;
  onQuickClaim: (promo: PromoItem, e: React.MouseEvent) => void;
  isClaimed: boolean;
}

export const PromoCard: React.FC<PromoCardProps> = ({
  promo,
  language,
  onSelectPromo,
  onQuickClaim,
  isClaimed,
}) => {
  return (
    <div
      id={`promo-card-${promo.id}`}
      onClick={() => onSelectPromo(promo)}
      className="group relative w-full mb-3.5 rounded-2xl overflow-hidden bg-[#003816] border border-[#006024] shadow-lg cursor-pointer hover:border-[#48c774] transition-all duration-200"
    >
      {/* Corner Ribbon / Tag */}
      <div className="absolute top-2.5 left-0 z-20">
        <div
          className={`flex items-center gap-1 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white bg-gradient-to-r ${promo.badge.bgClass} shadow-md rounded-r-full`}
        >
          <span>{language === 'bn' ? promo.badge.textBn : promo.badge.textEn}</span>
        </div>
      </div>

      {/* Bonus Value Badge at Top Right */}
      <div className="absolute top-2.5 right-2.5 z-20">
        <div className="flex items-center gap-1 px-2.5 py-0.8 text-[11px] font-bold text-[#00471b] bg-gradient-to-b from-[#ffe863] to-[#d8fe49] shadow-md rounded-full">
          <Sparkles className="w-3 h-3 text-[#00471b]" />
          <span>{language === 'bn' ? promo.bonusAmountBn : promo.bonusAmountEn}</span>
        </div>
      </div>

      {/* Banner Image Container */}
      <div className="relative w-full h-40 sm:h-48 overflow-hidden bg-[#00260e]">
        <img
          src={promo.bannerImage}
          alt={language === 'bn' ? promo.titleBn : promo.titleEn}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Subtle dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#003816] via-transparent to-black/30" />
      </div>

      {/* Title & Action Container */}
      <div className="p-3.5 bg-[#003816]">
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug group-hover:text-[#d8fe49] transition-colors">
              {language === 'bn' ? promo.titleBn : promo.titleEn}
            </h3>

            {/* Subtitle / Key offer */}
            <p className="text-xs text-emerald-200/90 mt-1 line-clamp-1 font-medium">
              {language === 'bn' ? promo.subtitleBn : promo.subtitleEn}
            </p>

            {/* Validity info & Turnover */}
            <div className="flex items-center gap-2 mt-2 text-[11px] text-emerald-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-emerald-300" />
                <span>
                  {promo.isLongTerm
                    ? (language === 'bn' ? 'দীর্ঘমেয়াদী কার্যকলাপ' : 'Long-term activity')
                    : `${promo.startDate} - ${promo.endDate}`}
                </span>
              </span>
              <span>•</span>
              <span className="text-[#d8fe49] font-semibold">{promo.turnoverRequirement}</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="shrink-0 flex flex-col items-end justify-center self-center pl-1">
            {isClaimed ? (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-300 bg-[#004e1f] border border-emerald-500/50">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d8fe49]" />
                <span>{language === 'bn' ? 'দাবি করা হয়েছে' : 'Claimed'}</span>
              </div>
            ) : (
              <button
                id={`claim-btn-${promo.id}`}
                type="button"
                onClick={(e) => onQuickClaim(promo, e)}
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-b from-[#9e4fff] to-[#5235ff] hover:brightness-110 active:scale-95 shadow-md transition-all uppercase tracking-wider"
              >
                <span>{language === 'bn' ? promo.buttonTextBn : promo.buttonTextEn}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
