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
      className="relative w-full bg-gradient-to-r from-[#005e2b] via-[#00700b] to-[#005e2b] text-white px-3 py-2 border-b border-[#008f1f] shadow-md transition-all"
    >
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {/* App Icon & Text */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffe863] to-[#006519] p-0.5 shadow-sm shrink-0">
            <div className="w-full h-full rounded-[10px] bg-[#00471b] flex flex-col items-center justify-center">
              <span className="text-xs font-black text-[#d8fe49] leading-tight">BK99</span>
              <span className="text-[7px] text-white/90 font-medium">APP</span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-400 text-[#00471b] rounded-full p-0.5 text-[8px] font-bold">
              ✓
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-white">Bk99 App</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-[#d8fe49] text-[#004d13] rounded-sm">
                v3.2
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="flex text-amber-300">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-amber-300" />
                ))}
              </div>
              <span className="text-[10px] text-emerald-200">
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
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-full text-[#004d13] bg-gradient-to-b from-[#f8e64f] to-[#cfea29] shadow-sm hover:scale-105 active:scale-95 transition-transform uppercase tracking-wider"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'ডাউনলোড' : 'Download'}</span>
          </button>

          <button
            id="close-download-bar-btn"
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center text-emerald-200 hover:text-white rounded-full bg-black/20"
            aria-label="Close download bar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
