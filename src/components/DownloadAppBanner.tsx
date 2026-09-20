import React from 'react';
import { Download, X, Star } from 'lucide-react';
import { Language } from '../types';

interface DownloadAppBannerProps {
  language: Language;
  onDownload: () => void;
  onClose: () => void;
  isVisible: boolean;
}

export const DownloadAppBanner: React.FC<DownloadAppBannerProps> = ({
  language,
  onDownload,
  onClose,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div
      id="app-download-bar"
      className="relative w-full bg-gradient-to-r from-[#032412] via-[#08381c] to-[#032412] text-white px-3 py-2 border-b border-[#0c4a25] shadow-md transition-all"
    >
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {/* App Icon & Text */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-10 h-10 rounded-xl shadow-md shrink-0">
            <img
              src="/bk99-icon.svg"
              alt="Bpa-Bd App"
              className="w-full h-full rounded-xl object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            />
            <div className="absolute -bottom-1 -right-1 bg-amber-400 text-[#021A0D] rounded-full p-0.5 text-[8px] font-bold shadow-xs">
              ✓
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-white">Bpa-Bd App</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-gradient-to-r from-amber-300 to-amber-400 text-amber-950 rounded-sm shadow-xs">
                v3.2
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-amber-100/80">
                {language === 'bn' ? 'ফাস্ট ও নিরাপদ' : 'Fast & Secure'}
              </span>
            </div>
          </div>
        </div>

        {/* Action button & Dismiss */}
        <div className="flex items-center gap-2">
          <button
            id="download-app-btn"
            type="button"
            onClick={onDownload}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-full text-[#381F00] bg-gradient-to-r from-[#FFF0A0] via-[#F5B838] to-[#D4830F] shadow-sm hover:brightness-110 active:scale-95 transition-transform uppercase tracking-wider"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'ডাউনলোড' : 'Download'}</span>
          </button>

          <button
            id="close-download-bar-btn"
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center text-amber-200/80 hover:text-white rounded-full bg-black/25"
            aria-label="Close download bar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
