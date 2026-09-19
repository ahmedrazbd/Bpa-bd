import React from 'react';
import { Menu, Globe, Bell, Wallet, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { Language, UserSession } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  onToggleMenu: () => void;
  userSession: UserSession;
  onToggleLogin: () => void;
  onOpenDeposit: () => void;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  onToggleMenu,
  userSession,
  onToggleLogin,
  onOpenDeposit,
  onOpenNotifications,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#00471b] border-b border-[#006524] shadow-md">
      <div className="flex items-center justify-between h-14 px-3 max-w-lg mx-auto">
        {/* Left: Hamburger & Logo */}
        <div className="flex items-center gap-2.5">
          <button
            id="mobile-menu-btn"
            type="button"
            onClick={onToggleMenu}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#003614] text-emerald-300 hover:text-white border border-[#005e22] active:scale-95 transition-transform"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Official BK99 Brand Logo */}
          <div
            id="header-brand-logo"
            className="flex items-center gap-1.5 cursor-pointer select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#ffe863] via-[#d8fe49] to-[#009625] shadow-sm p-0.5">
              <div className="w-full h-full rounded-full bg-[#00471b] flex items-center justify-center">
                <span className="text-xs font-black tracking-tighter text-[#d8fe49]">BK</span>
              </div>
              <span className="absolute -top-1 -right-0.5 text-[9px]">👑</span>
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-baseline">
                <span className="text-xl font-extrabold tracking-tight text-white">Bk</span>
                <span className="text-xl font-black tracking-tight text-[#d8fe49]">99</span>
              </div>
              <span className="text-[8px] font-bold text-emerald-300 uppercase tracking-widest">
                Bangladesh
              </span>
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <button
            id="language-switcher-btn"
            type="button"
            onClick={onToggleLanguage}
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-[#003614] text-emerald-200 border border-[#005e22] hover:border-emerald-400 active:scale-95 transition-all"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#d8fe49]" />
            <span className="font-semibold">{language === 'bn' ? 'বাংলা' : 'EN'}</span>
          </button>

          {userSession.isLoggedIn ? (
            // Logged-in view
            <div className="flex items-center gap-1.5">
              <button
                id="header-deposit-btn"
                type="button"
                onClick={onOpenDeposit}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full text-[#004d13] bg-gradient-to-b from-[#f8e64f] to-[#cfea29] shadow-sm hover:brightness-105 active:scale-95 transition-transform"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ডিপোজিট' : 'Deposit'}</span>
              </button>

              <button
                id="header-notification-btn"
                type="button"
                onClick={onOpenNotifications}
                className="relative p-2 rounded-full bg-[#003614] text-emerald-300 hover:text-white border border-[#005e22]"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              </button>

              <button
                id="header-user-avatar-btn"
                type="button"
                onClick={onToggleLogin}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-[#d8fe49] p-0.5"
                title={`Logged in as ${userSession.username}`}
              >
                <div className="w-full h-full rounded-full bg-[#00471b] flex items-center justify-center text-xs font-bold text-white">
                  {userSession.username.slice(0, 2).toUpperCase()}
                </div>
              </button>
            </div>
          ) : (
            // Non-logged-in view
            <div className="flex items-center gap-1.5">
              <button
                id="header-login-btn"
                type="button"
                onClick={onToggleLogin}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-[#003614] text-white border border-[#006524] hover:bg-[#00290f] active:scale-95 transition-all"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-300" />
                <span>{language === 'bn' ? 'লগইন' : 'Login'}</span>
              </button>

              <button
                id="header-register-btn"
                type="button"
                onClick={onToggleLogin}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg text-[#004d13] bg-gradient-to-b from-[#ffe863] to-[#d8fe49] shadow-sm hover:brightness-105 active:scale-95 transition-transform"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'নিবন্ধন' : 'Register'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* User balance mini ribbon when logged in */}
      {userSession.isLoggedIn && (
        <div className="bg-[#003614] px-4 py-1 flex items-center justify-between text-xs text-emerald-200 border-t border-[#005e22]">
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-medium">
              {language === 'bn' ? 'ব্যালেন্স:' : 'Balance:'}
            </span>
            <span className="text-white font-bold tracking-wide">
              {userSession.currency} {userSession.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-600/40">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{userSession.vipTier}</span>
          </div>
        </div>
      )}
    </header>
  );
};
