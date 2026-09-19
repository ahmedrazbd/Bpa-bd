import React from 'react';
import { Home, Users, Gift, Headphones, User } from 'lucide-react';
import { Language } from '../types';

interface BottomNavBarProps {
  language: Language;
  activeNavTab: 'home' | 'invite' | 'activity' | 'service' | 'member';
  onSelectNavTab: (tab: 'home' | 'invite' | 'activity' | 'service' | 'member') => void;
  onOpenLiveChat: () => void;
  onOpenInvite: () => void;
  onOpenMember: () => void;
  onGoHome: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  language,
  activeNavTab,
  onSelectNavTab,
  onOpenLiveChat,
  onOpenInvite,
  onOpenMember,
  onGoHome,
}) => {
  return (
    <nav
      id="mobile-bottom-nav"
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 w-full bg-[#00471b] border-t border-[#006524] shadow-[0_-4px_20px_rgba(0,0,0,0.5)]"
    >
      <div className="relative grid grid-cols-5 h-16 max-w-lg mx-auto items-center px-1">
        {/* 1. Home */}
        <button
          id="nav-tab-home"
          type="button"
          onClick={() => {
            onSelectNavTab('home');
            onGoHome();
          }}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeNavTab === 'home' ? 'text-[#d8fe49]' : 'text-emerald-200/80 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[11px] font-semibold leading-none tracking-tight">
            {language === 'bn' ? 'হোম' : 'Home'}
          </span>
        </button>

        {/* 2. Invite / Referral */}
        <button
          id="nav-tab-invite"
          type="button"
          onClick={() => {
            onSelectNavTab('invite');
            onOpenInvite();
          }}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeNavTab === 'invite' ? 'text-[#d8fe49]' : 'text-emerald-200/80 hover:text-white'
          }`}
        >
          <Users className="w-5 h-5 mb-1" />
          <span className="text-[11px] font-semibold leading-none tracking-tight">
            {language === 'bn' ? 'রেফার' : 'Invite'}
          </span>
        </button>

        {/* 3. Promotion Center (Raised glowing button in the center) */}
        <button
          id="nav-tab-activity"
          type="button"
          onClick={() => {
            onSelectNavTab('activity');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="relative flex flex-col items-center justify-center h-full -top-3 group"
        >
          {/* Raised glowing circle */}
          <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#ffe863] via-[#d8fe49] to-[#73c002] p-0.5 shadow-[0_4px_16px_rgba(216,254,73,0.5)] group-active:scale-95 transition-transform flex items-center justify-center border-2 border-[#cbfc02]">
            <div className="w-full h-full rounded-full bg-[#00471b] flex flex-col items-center justify-center">
              <Gift className="w-5 h-5 text-[#d8fe49] animate-bounce" />
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-[#d8fe49] mt-0.5 tracking-wider uppercase">
            {language === 'bn' ? 'প্রমোশন' : 'Promo'}
          </span>
        </button>

        {/* 4. Customer Service */}
        <button
          id="nav-tab-service"
          type="button"
          onClick={() => {
            onSelectNavTab('service');
            onOpenLiveChat();
          }}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeNavTab === 'service' ? 'text-[#d8fe49]' : 'text-emerald-200/80 hover:text-white'
          }`}
        >
          <Headphones className="w-5 h-5 mb-1" />
          <span className="text-[11px] font-semibold leading-none tracking-tight">
            {language === 'bn' ? 'পরিষেবা' : 'Support'}
          </span>
        </button>

        {/* 5. Member Center */}
        <button
          id="nav-tab-member"
          type="button"
          onClick={() => {
            onSelectNavTab('member');
            onOpenMember();
          }}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            activeNavTab === 'member' ? 'text-[#d8fe49]' : 'text-emerald-200/80 hover:text-white'
          }`}
        >
          <User className="w-5 h-5 mb-1" />
          <span className="text-[11px] font-semibold leading-none tracking-tight">
            {language === 'bn' ? 'সদস্য' : 'Mine'}
          </span>
        </button>
      </div>
    </nav>
  );
};
