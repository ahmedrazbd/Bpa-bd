import React, { useRef, useEffect } from 'react';
import { PromoCategory, PromoCategoryId, Language } from '../types';

interface PromoMenuTabsProps {
  categories: PromoCategory[];
  activeCategoryId: PromoCategoryId;
  onSelectCategory: (id: PromoCategoryId) => void;
  language: Language;
  countsByCategory: Record<string, number>;
}

export const PromoMenuTabs: React.FC<PromoMenuTabsProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  language,
  countsByCategory,
}) => {
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeTabRef.current && tabsContainerRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeCategoryId]);

  return (
    <div id="promo-categories-bar" className="w-full bg-[#032312] py-2.5 px-3 sticky top-14 z-30 border-b border-[#005e22]">
      <div
        ref={tabsContainerRef}
        className="promo_menu flex items-center gap-2 overflow-x-auto hide-scrollbar scroll-smooth"
        role="tablist"
        aria-label="Promotion categories"
      >
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          const count = countsByCategory[cat.id] || 0;

          return (
            <button
              key={cat.id}
              ref={isActive ? activeTabRef : null}
              id={`promo-tab-${cat.id}`}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`relative flex items-center justify-center shrink-0 h-9 px-3.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-200 ${
                isActive
                  ? 'text-white bg-gradient-to-b from-[#48c774] to-[#1e7e34] shadow-md border-0 scale-105 font-bold'
                  : 'text-emerald-200 bg-[#004218] border border-[#006a28] hover:bg-[#00521e] hover:text-white'
              }`}
            >
              <span>{language === 'bn' ? cat.titleBn : cat.titleEn}</span>
              {count > 0 && (
                <span
                  className={`ml-1.5 px-1.5 py-0.2 text-[10px] rounded-full font-bold leading-none ${
                    isActive ? 'bg-[#ffe863] text-[#00471b]' : 'bg-[#002b10] text-emerald-300'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
