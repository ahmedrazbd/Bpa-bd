import React from 'react';
import {
  X,
  Gift,
  Crown,
  Download,
  Users,
  Headphones,
  Gamepad2,
  Trophy,
  Dices,
  Flame,
  Globe,
  LogIn,
  LogOut,
  Wallet,
} from 'lucide-react';
import { Language, UserSession } from '../types';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onToggleLanguage: () => void;
  userSession: UserSession;
  onToggleLogin: () => void;
  onSelectCategory: (id: any) => void;
  onOpenPromoCode: () => void;
  onOpenLiveChat: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  language,
  onToggleLanguage,
  userSession,
  onToggleLogin,
  onSelectCategory,
  onOpenPromoCode,
  onOpenLiveChat,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Dark overlay backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="relative w-4/5 max-w-xs h-full bg-[#002f12] text-white flex flex-col shadow-2xl border-r border-[#005e22] z-10 animate-slideRight">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 bg-[#00471b] border-b border-[#006524]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ffe863] to-[#73c002] p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#00471b] rounded-full flex items-center justify-center">
                <span className="text-xs font-black text-[#d8fe49]">BK</span>
              </div>
            </div>
            <div>
              <div className="font-extrabold text-base leading-tight">
                Bk<span className="text-[#d8fe49]">99</span>
              </div>
              <div className="text-[9px] text-emerald-300 uppercase tracking-widest font-semibold">
                Official Gaming
              </div>
            </div>
          </div>

          <button
            id="close-sidebar-btn"
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#003614] text-emerald-200 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Status Card */}
        <div className="p-3 bg-[#003816] border-b border-[#005e22]">
          {userSession.isLoggedIn ? (
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
                    {userSession.username.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{userSession.username}</div>
                    <div className="text-[10px] text-emerald-300">{userSession.userId}</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {userSession.vipTier}
                </span>
              </div>

              <div className="mt-3 p-2 bg-[#00260e] rounded-lg flex items-center justify-between text-xs">
                <span className="text-emerald-300">{language === 'bn' ? 'ব্যালেন্স' : 'Balance'}:</span>
                <span className="font-extrabold text-[#d8fe49]">
                  {userSession.currency} {userSession.balance.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                onClick={onToggleLogin}
                className="w-full mt-2 py-1.5 text-xs text-red-300 hover:text-red-200 flex items-center justify-center gap-1 bg-red-950/30 rounded-lg border border-red-900/40"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'লগআউট' : 'Logout'}</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-emerald-200 text-center">
                {language === 'bn' ? 'লগইন করে বিশেষ বোনাস নিন' : 'Login to unlock VIP bonuses'}
              </p>
              <button
                id="drawer-login-btn"
                type="button"
                onClick={() => {
                  onClose();
                  onToggleLogin();
                }}
                className="w-full py-2 text-xs font-bold rounded-lg text-[#00471b] bg-gradient-to-r from-[#ffe863] to-[#d8fe49] shadow-sm flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>{language === 'bn' ? 'লগইন / নিবন্ধন' : 'Login / Register'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 text-xs">
          <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 px-2 py-1">
            {language === 'bn' ? 'মূল মেনু' : 'Main Menu'}
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectCategory('all');
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#003816] hover:bg-[#004e1f] text-emerald-100 font-medium"
          >
            <Gift className="w-4 h-4 text-[#d8fe49]" />
            <span>{language === 'bn' ? 'প্রমোশন ও কার্যকলাপ' : 'Promotions & Activity'}</span>
            <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full bg-red-500 text-white font-bold">
              HOT
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenPromoCode();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#003816] hover:bg-[#004e1f] text-emerald-100 font-medium"
          >
            <Wallet className="w-4 h-4 text-amber-400" />
            <span>{language === 'bn' ? 'প্রমো কোড রিডিম' : 'Redeem Promo Code'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectCategory('vip');
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#003816] hover:bg-[#004e1f] text-emerald-100 font-medium"
          >
            <Crown className="w-4 h-4 text-amber-300" />
            <span>{language === 'bn' ? 'ভিআইপি লাউঞ্জ' : 'VIP Lounge'}</span>
          </button>

          <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 px-2 pt-3 pb-1">
            {language === 'bn' ? 'গেম বিভাগ' : 'Game Categories'}
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectCategory('sports');
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#003816] text-emerald-200"
          >
            <Trophy className="w-4 h-4 text-blue-400" />
            <span>{language === 'bn' ? 'স্পোর্টসবুক ও ক্রিকেট' : 'Sportsbook & Cricket'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectCategory('live');
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#003816] text-emerald-200"
          >
            <Flame className="w-4 h-4 text-rose-400" />
            <span>{language === 'bn' ? 'লাইভ ক্যাসিনো' : 'Live Casino'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectCategory('slots');
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#003816] text-emerald-200"
          >
            <Gamepad2 className="w-4 h-4 text-emerald-400" />
            <span>{language === 'bn' ? 'স্লট ও ক্র্যাশ গেমস' : 'Slots & Crash Games'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectCategory('cards');
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#003816] text-emerald-200"
          >
            <Dices className="w-4 h-4 text-yellow-400" />
            <span>{language === 'bn' ? 'কার্ড ও তিন পাত্তি' : 'Card & Teen Patti'}</span>
          </button>

          <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 px-2 pt-3 pb-1">
            {language === 'bn' ? 'সহায়তা ও প্রোগ্রাম' : 'Support & More'}
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenLiveChat();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#003816] text-emerald-200"
          >
            <Headphones className="w-4 h-4 text-[#d8fe49]" />
            <span>{language === 'bn' ? '২৪/৭ লাইভ কাস্টমার সাপোর্ট' : '24/7 Live Support'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectCategory('special');
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#003816] text-emerald-200"
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span>{language === 'bn' ? 'এজেন্ট ও এফিলিয়েট' : 'Affiliate Program'}</span>
          </button>

          <a
            href="/bk99-logo.svg"
            download="bk99-logo.svg"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#00260e] hover:bg-[#003816] border border-[#005e22] text-[#d8fe49] text-xs font-semibold"
          >
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-[#d8fe49]" />
              <span>{language === 'bn' ? 'Bk99 লোগো ডাউনলোড করুন' : 'Download Bk99 Logo'}</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00471b] text-emerald-300 font-mono">SVG</span>
          </a>
        </div>

        {/* Footer info & Language Toggle */}
        <div className="p-3 bg-[#00260e] border-t border-[#005e22] flex items-center justify-between">
          <button
            type="button"
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00471b] text-emerald-200 text-xs font-semibold"
          >
            <Globe className="w-3.5 h-3.5 text-[#d8fe49]" />
            <span>{language === 'bn' ? 'বাংলা (BD)' : 'English (EN)'}</span>
          </button>

          <span className="text-[10px] text-emerald-500 font-mono">v3.2.0 • Curacao</span>
        </div>
      </div>
    </div>
  );
};
