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
    <header className="sticky top-0 z-40 w-full bg-[#032412] border-b border-[#0c4a25] shadow-lg">
      <div className="flex items-center justify-between h-14 px-3 max-w-lg mx-auto">
        {/* Left: Hamburger & Logo */}
        <div className="flex items-center gap-2.5">
          <button
            id="mobile-menu-btn"
            type="button"
            onClick={onToggleMenu}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#073319] text-amber-200/90 hover:text-white border border-[#135930] active:scale-95 transition-transform shadow-inner"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Official Brand Logo */}
          <div
            id="header-brand-logo"
            className="flex items-center cursor-pointer select-none py-1"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/bk99-logo.svg"
              alt="Bpa-Bd Raz Agency"
              className="h-9 w-auto object-contain drop-shadow-md"
            />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <button
            id="language-switcher-btn"
            type="button"
            onClick={onToggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-[#073319] text-amber-100 border border-[#135930] hover:border-amber-400/60 active:scale-95 transition-all"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">{language === 'bn' ? 'বাংলা' : 'EN'}</span>
          </button>

          {userSession.isLoggedIn ? (
            // Logged-in view
            <div className="flex items-center gap-1.5">
              <button
                id="header-deposit-btn"
                type="button"
                onClick={onOpenDeposit}
                className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full text-[#381f00] bg-gradient-to-r from-[#FFF0A0] via-[#F5B838] to-[#D4830F] shadow-sm hover:brightness-110 active:scale-95 transition-transform"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ডিপোজিট' : 'Deposit'}</span>
              </button>

              <button
                id="header-notification-btn"
                type="button"
                onClick={onOpenNotifications}
                className="relative p-2 rounded-full bg-[#073319] text-amber-200/90 hover:text-white border border-[#135930]"
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
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-[#F5B838] p-0.5 shadow-sm"
                title={`Logged in as ${userSession.username}`}
              >
                <div className="w-full h-full rounded-full bg-[#041D0F] flex items-center justify-center text-xs font-bold text-amber-200">
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
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-[#073319] text-white border border-[#135930] hover:bg-[#0c4a25] active:scale-95 transition-all"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-300" />
                <span>{language === 'bn' ? 'লগইন' : 'Login'}</span>
              </button>

              <button
                id="header-register-btn"
                type="button"
                onClick={onToggleLogin}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg text-[#3A1F00] bg-gradient-to-b from-[#FFF0A0] via-[#F5B838] to-[#D4830F] shadow-sm hover:brightness-110 active:scale-95 transition-transform"
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
        <div className="bg-[#021A0D] px-4 py-1.5 flex items-center justify-between text-xs text-amber-100/90 border-t border-[#0c4a25]">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-400 font-medium">
              {language === 'bn' ? 'ব্যালেন্স:' : 'Balance:'}
            </span>
            <span className="text-white font-bold tracking-wide">
              {userSession.currency} {userSession.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-300 bg-amber-950/70 px-2 py-0.5 rounded-full border border-amber-500/40">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="font-semibold">{userSession.vipTier}</span>
          </div>
        </div>
      )}
    </header>
  );
};
