import React, { useState, useMemo } from 'react';
import { PromoCategoryId, PromoItem, Language, UserSession } from '../types';
import { PROMO_CATEGORIES, PROMOTIONS_DATA, INITIAL_USER_SESSION } from '../data/promotions';
import { Header } from './Header';
import { DownloadAppBanner } from './DownloadAppBanner';
import { PromoMenuTabs } from './PromoMenuTabs';
import { PromoCard } from './PromoCard';
import { PromoDetailModal } from './PromoDetailModal';
import { ClaimBonusModal } from './ClaimBonusModal';
import { PromoCodeModal } from './PromoCodeModal';
import { BottomNavBar } from './BottomNavBar';
import { SideDrawer } from './SideDrawer';
import { LiveChatWidget } from './LiveChatWidget';
import { DepositModal } from './DepositModal';
import { Volume2, Sparkles, Trophy, Gift, Search } from 'lucide-react';

export const ActivityPage: React.FC = () => {
  const [language, setLanguage] = useState<Language>('bn');
  const [activeCategoryId, setActiveCategoryId] = useState<PromoCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDownloadBar, setShowDownloadBar] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isPromoCodeOpen, setIsPromoCodeOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);

  // Selected promo for detail modal
  const [selectedPromo, setSelectedPromo] = useState<PromoItem | null>(null);

  // Currently claimed promo for celebration modal
  const [celebratedPromo, setCelebratedPromo] = useState<PromoItem | null>(null);

  // Active navigation tab
  const [activeNavTab, setActiveNavTab] = useState<'home' | 'invite' | 'activity' | 'service' | 'member'>('activity');

  // User session state with local persistence
  const [userSession, setUserSession] = useState<UserSession>(INITIAL_USER_SESSION);

  // Category counts
  const countsByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    PROMO_CATEGORIES.forEach((cat) => {
      if (cat.id === 'all') {
        counts[cat.id] = PROMOTIONS_DATA.length;
      } else {
        counts[cat.id] = PROMOTIONS_DATA.filter((p) => p.categoryIds.includes(cat.id)).length;
      }
    });
    return counts;
  }, []);

  // Filtered promotions
  const filteredPromos = useMemo(() => {
    return PROMOTIONS_DATA.filter((promo) => {
      const matchesCategory =
        activeCategoryId === 'all' || promo.categoryIds.includes(activeCategoryId);
      const matchesSearch =
        !searchQuery.trim() ||
        promo.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        promo.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        promo.subtitleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        promo.subtitleEn.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategoryId, searchQuery]);

  // Handle claiming a promotion
  const handleClaimBonus = (promo: PromoItem) => {
    setUserSession((prev) => {
      if (prev.claimedPromoIds.includes(promo.id)) return prev;

      // Extract numeric bonus reward approximation for wallet increment
      let addedBalance = 300;
      if (promo.bonusAmountEn.includes('100%') || promo.bonusAmountEn.includes('10,000')) {
        addedBalance = 1000;
      } else if (promo.bonusAmountEn.includes('188')) {
        addedBalance = 188;
      } else if (promo.bonusAmountEn.includes('1,000')) {
        addedBalance = 1000;
      }

      return {
        ...prev,
        isLoggedIn: true,
        balance: prev.balance + addedBalance,
        claimedPromoIds: [...prev.claimedPromoIds, promo.id],
      };
    });

    setCelebratedPromo(promo);
  };

  // Quick claim from card button
  const handleQuickClaim = (promo: PromoItem, e: React.MouseEvent) => {
    e.stopPropagation();
    handleClaimBonus(promo);
  };

  // Promo code voucher redemption
  const handleApplyPromoCode = (code: string) => {
    if (code === 'BK99VIP' || code === 'WELCOME300' || code === 'CRICKET1000' || code === 'LUCKY99') {
      const reward = code === 'CRICKET1000' ? 1000 : code === 'BK99VIP' ? 888 : 300;
      setUserSession((prev) => ({
        ...prev,
        isLoggedIn: true,
        balance: prev.balance + reward,
      }));
      return {
        success: true,
        messageBn: `অভিনন্দন! কোড ${code} সফল হয়েছে এবং ৳${reward} আপনার ব্যালেন্সে যুক্ত করা হয়েছে!`,
        messageEn: `Success! Voucher ${code} redeemed. ৳${reward} credited to your wallet!`,
      };
    }
    return {
      success: false,
      messageBn: 'অবৈধ প্রমো কোড অথবা মেয়াদ শেষ হয়ে গেছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
      messageEn: 'Invalid voucher code or code has expired. Please verify and retry.',
    };
  };

  // Deposit confirmation
  const handleConfirmDeposit = (amount: number) => {
    setUserSession((prev) => ({
      ...prev,
      isLoggedIn: true,
      balance: prev.balance + amount,
    }));
  };

  return (
    <div className="min-h-screen bg-[#032312] text-white flex flex-col items-center justify-start pb-20 select-none">
      {/* Container simulating mobile screen with responsive desktop wrapper */}
      <div className="w-full max-w-lg min-h-screen bg-[#032312] shadow-2xl relative flex flex-col">
        {/* Top Header */}
        <Header
          language={language}
          onToggleLanguage={() => setLanguage((l) => (l === 'bn' ? 'en' : 'bn'))}
          onToggleMenu={() => setIsDrawerOpen(true)}
          userSession={userSession}
          onToggleLogin={() => setUserSession((prev) => ({ ...prev, isLoggedIn: !prev.isLoggedIn }))}
          onOpenDeposit={() => setIsDepositOpen(true)}
          onOpenNotifications={() => setIsPromoCodeOpen(true)}
        />

        {/* Download App Banner */}
        <DownloadAppBanner
          language={language}
          isVisible={showDownloadBar}
          onDownload={() => {
            const promo = PROMOTIONS_DATA.find((p) => p.slug === 'app-download-bonus-188');
            if (promo) setSelectedPromo(promo);
          }}
          onClose={() => setShowDownloadBar(false)}
        />

        {/* Announcement Marquee Ticker */}
        <div className="bg-[#002f12] px-3 py-1.5 flex items-center gap-2 text-xs text-emerald-200 border-b border-[#005e22]">
          <Volume2 className="w-3.5 h-3.5 text-[#d8fe49] shrink-0" />
          <div className="overflow-hidden whitespace-nowrap flex-1">
            <div className="inline-block animate-marquee text-[11px] text-emerald-100 font-medium">
              {language === 'bn'
                ? '📢 স্বাগতম Bk99 অফিসিয়াল প্রমোশন সেন্টারে! প্রতি রেফারেলের জন্য পান নিশ্চিত ৳৩০০ বোনাস ও প্রথম জমার ওপর ১০০% পর্যন্ত ওয়েলকাম ক্যাশ!'
                : '📢 Welcome to Bk99 Official Activity Center! Claim ৳300 instant bonus per referral & 100% welcome match on your first deposit!'}
            </div>
          </div>
        </div>

        {/* Page Hero Title / Summary Banner */}
        <div className="px-3 pt-3 pb-1">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#00471b] via-[#005e24] to-[#00471b] p-3.5 border border-[#00702a] shadow-md">
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#d8fe49] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'কার্যকলাপ ও বিশেষ প্রচার' : 'Activities & Promotions'}</span>
                </div>
                <h1 className="text-base sm:text-lg font-black text-white mt-0.5 leading-tight">
                  {language === 'bn'
                    ? 'প্রতি রেফারেলের জন্য ৳৩০০ বোনাস'
                    : '৳300 Bonus For Every Referral'}
                </h1>
                <p className="text-[11px] text-emerald-200 mt-0.5">
                  {language === 'bn'
                    ? 'সর্বোচ্চ জয়ের সুযোগ সহ প্রতিদিন নতুন বোনাস অফার'
                    : 'Exclusive daily reload, cashback & tournaments'}
                </p>
              </div>

              {/* Quick Redeem Code Pill */}
              <button
                type="button"
                onClick={() => setIsPromoCodeOpen(true)}
                className="shrink-0 flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-[#ffe863] to-[#d8fe49] text-[#00471b] shadow-md hover:scale-105 active:scale-95 transition-transform"
              >
                <Gift className="w-5 h-5" />
                <span className="text-[9px] font-black uppercase mt-0.5 tracking-tighter">
                  {language === 'bn' ? 'কোড রিডিম' : 'Voucher'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Search / Filter Bar */}
        <div className="px-3 pt-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'bn' ? 'প্রমোশন বা বোনাস খুঁজুন...' : 'Search promotions or bonuses...'
              }
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#002f12] border border-[#005e22] text-white placeholder-emerald-500/70 focus:outline-none focus:border-[#d8fe49]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs text-emerald-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Horizontal Category Navigation Ribbon */}
        <PromoMenuTabs
          categories={PROMO_CATEGORIES}
          activeCategoryId={activeCategoryId}
          onSelectCategory={setActiveCategoryId}
          language={language}
          countsByCategory={countsByCategory}
        />

        {/* Promotion Cards Content Box */}
        <main id="activity-content-box" className="flex-1 px-3 py-2">
          {filteredPromos.length > 0 ? (
            <div className="space-y-3">
              {filteredPromos.map((promo) => (
                <PromoCard
                  key={promo.id}
                  promo={promo}
                  language={language}
                  onSelectPromo={setSelectedPromo}
                  onQuickClaim={handleQuickClaim}
                  isClaimed={userSession.claimedPromoIds.includes(promo.id)}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-emerald-300 space-y-3">
              <Trophy className="w-12 h-12 mx-auto text-emerald-600" />
              <p className="text-sm font-semibold">
                {language === 'bn'
                  ? 'এই বিভাগে বর্তমানে কোনো সক্রিয় প্রমোশন পাওয়া যায়নি'
                  : 'No active promotions found in this category'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategoryId('all');
                  setSearchQuery('');
                }}
                className="px-4 py-1.5 text-xs font-bold rounded-full bg-[#00471b] text-[#d8fe49] border border-[#006a28]"
              >
                {language === 'bn' ? 'সকল প্রমোশন দেখুন' : 'View All Promos'}
              </button>
            </div>
          )}

          {/* Bottom Security / Brand Trust Footer */}
          <div className="mt-8 mb-4 pt-4 border-t border-[#00471b] text-center text-[10px] text-emerald-400/70 space-y-1.5">
            <div className="flex items-center justify-center gap-4 text-emerald-300/80 font-medium">
              <span>🔒 256-bit SSL</span>
              <span>⚡ Fast Payout</span>
              <span>📱 24/7 Support</span>
            </div>
            <p>© 2026 Bk99 Gaming Entertainment. Licensed &amp; Regulated.</p>
            <p className="text-[9px] text-emerald-500">
              Responsible Gaming 18+ • Curacao Gaming License #365/JAZ
            </p>
          </div>
        </main>

        {/* Promotion Detail Modal */}
        <PromoDetailModal
          promo={selectedPromo}
          language={language}
          onClose={() => setSelectedPromo(null)}
          onClaimBonus={(promo) => {
            handleClaimBonus(promo);
            setSelectedPromo(null);
          }}
          isClaimed={selectedPromo ? userSession.claimedPromoIds.includes(selectedPromo.id) : false}
        />

        {/* Claim Success Celebration Modal */}
        <ClaimBonusModal
          promo={celebratedPromo}
          isOpen={celebratedPromo !== null}
          onClose={() => setCelebratedPromo(null)}
          language={language}
          onGoToGames={() => {
            setCelebratedPromo(null);
            setIsDepositOpen(true);
          }}
        />

        {/* Promo Voucher Code Modal */}
        <PromoCodeModal
          isOpen={isPromoCodeOpen}
          onClose={() => setIsPromoCodeOpen(false)}
          language={language}
          onApplyCode={handleApplyPromoCode}
        />

        {/* Instant Deposit Cashier Modal */}
        <DepositModal
          isOpen={isDepositOpen}
          onClose={() => setIsDepositOpen(false)}
          language={language}
          onConfirmDeposit={handleConfirmDeposit}
        />

        {/* Slide-out Sidebar Drawer */}
        <SideDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          language={language}
          onToggleLanguage={() => setLanguage((l) => (l === 'bn' ? 'en' : 'bn'))}
          userSession={userSession}
          onToggleLogin={() => setUserSession((prev) => ({ ...prev, isLoggedIn: !prev.isLoggedIn }))}
          onSelectCategory={(catId) => {
            setActiveCategoryId(catId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenPromoCode={() => setIsPromoCodeOpen(true)}
          onOpenLiveChat={() => setIsLiveChatOpen(true)}
        />

        {/* Floating 24/7 Live Support & Voucher Quick Access */}
        <LiveChatWidget
          isOpen={isLiveChatOpen}
          onClose={() => setIsLiveChatOpen(false)}
          onOpen={() => setIsLiveChatOpen(true)}
          language={language}
          onOpenPromoCode={() => setIsPromoCodeOpen(true)}
        />

        {/* Bottom Navigation Bar */}
        <BottomNavBar
          language={language}
          activeNavTab={activeNavTab}
          onSelectNavTab={setActiveNavTab}
          onOpenLiveChat={() => setIsLiveChatOpen(true)}
          onOpenInvite={() => {
            const referPromo = PROMOTIONS_DATA.find((p) => p.slug === 'refer-friend-300');
            if (referPromo) setSelectedPromo(referPromo);
          }}
          onOpenMember={() => setIsDrawerOpen(true)}
          onGoHome={() => {
            setActiveCategoryId('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    </div>
  );
};
