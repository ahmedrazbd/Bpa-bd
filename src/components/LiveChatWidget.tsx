import React, { useState } from 'react';
import { Headphones, X, Send, Bot, User, Gift } from 'lucide-react';
import { Language } from '../types';

interface LiveChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  language: Language;
  onOpenPromoCode: () => void;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  isOpen,
  onClose,
  onOpen,
  language,
  onOpenPromoCode,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'cs' | 'user'; text: string; time: string }>>([
    {
      sender: 'cs',
      text:
        language === 'bn'
          ? 'স্বাগতম Bpa-Bd (Raz Agency) কাস্টমার সাপোর্টে! আজকের প্রমোশন বা বোনাস সম্পর্কে আপনার কোনো প্রশ্ন থাকলে আমাদের জানান।'
          : 'Welcome to Bpa-Bd (Raz Agency) 24/7 Live Support! How can we assist you with promotions, bonuses, or deposits today?',
      time: '12:00',
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg.trim();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [...prev, { sender: 'user', text: userText, time: timeNow }]);
    setInputMsg('');

    // Instant realistic CS response
    setTimeout(() => {
      let reply = '';
      if (language === 'bn') {
        if (userText.toLowerCase().includes('বোনাস') || userText.toLowerCase().includes('bonus')) {
          reply =
            'আপনার অ্যাকাউন্টে নতুন ১০০% ওয়েলকাম বোনাস ও রেফারেল ৳৩০০ বোনাস উপলব্ধ রয়েছে! যেকোনো প্রমোশন কার্ডের "দাবি করুন" বাটনে চাপুন।';
        } else if (userText.toLowerCase().includes('ডিপোজিট') || userText.toLowerCase().includes('deposit')) {
          reply = 'বিকাশ, নগদ ও রকেট দিয়ে সর্বনিম্ন ৳২০০ ইনস্ট্যান্ট ডিপোজিট করতে পারবেন। কোনো ফি কাটা হয় না!';
        } else {
          reply =
            'ধন্যবাদ! আমাদের কাস্টমার সার্ভিস অফিসার আপনার অনুসন্ধান পর্যবেক্ষণ করছেন। Bpa-Bd-এর সাথে থাকার জন্য ধন্যবাদ!';
        }
      } else {
        if (userText.toLowerCase().includes('bonus') || userText.toLowerCase().includes('promo')) {
          reply =
            'You have active 100% welcome match and ৳300 referral bonuses ready! Click "CLAIM" on any promo card.';
        } else if (userText.toLowerCase().includes('deposit')) {
          reply = 'Instant deposits are available via bKash, Nagad, and Rocket from minimum ৳200.';
        } else {
          reply = 'Thank you! A dedicated agent is reviewing your query. Happy gaming on Bpa-Bd!';
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'cs',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating Action Buttons on the bottom right */}
      <div className="fixed right-3 bottom-20 z-30 flex flex-col gap-2.5 items-end">
        {/* Floating Voucher button */}
        <button
          id="floating-voucher-btn"
          type="button"
          onClick={onOpenPromoCode}
          className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-[#ffe863] via-[#d8fe49] to-[#73c002] shadow-[0_4px_16px_rgba(216,254,73,0.5)] border-2 border-[#cbfc02] active:scale-95 transition-transform"
          title="Promo Voucher Code"
        >
          <Gift className="w-5 h-5 text-[#00471b] group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -left-1 px-1 py-0.2 bg-red-600 text-white font-extrabold text-[9px] rounded-full">
            VIP
          </span>
        </button>

        {/* Floating Live Chat button */}
        <button
          id="floating-live-chat-btn"
          type="button"
          onClick={onOpen}
          className="relative flex items-center justify-center w-11 h-11 rounded-full bg-emerald-700 text-white shadow-lg border border-emerald-400/50 hover:bg-emerald-600 active:scale-95 transition-transform"
          title="24/7 Live Support"
        >
          <Headphones className="w-5 h-5 text-[#d8fe49]" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#003816] rounded-full animate-pulse" />
        </button>
      </div>

      {/* Live Chat Dialog Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-sm h-[520px] rounded-2xl bg-[#002f12] border border-[#006524] text-white flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-3.5 bg-[#00471b] border-b border-[#005e22]">
              <div className="flex items-center gap-2">
                <div className="relative w-9 h-9 rounded-full bg-[#003614] border border-[#d8fe49] flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-[#d8fe49]" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-[#00471b]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Bpa-Bd Live CS</h4>
                  <p className="text-[10px] text-emerald-300">
                    {language === 'bn' ? 'অনলাইন সাপোর্ট • সাধারণত ১ মিনিটে উত্তর' : 'Online • Replies within 1 min'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#003614] text-emerald-300 flex items-center justify-center hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat message list */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex items-end gap-1.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'cs' && (
                    <div className="w-6 h-6 rounded-full bg-emerald-700 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-[#d8fe49]" />
                    </div>
                  )}

                  <div
                    className={`max-w-[78%] p-2.5 rounded-2xl ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-[#1e7e34] to-[#28a745] text-white rounded-br-none'
                        : 'bg-[#00471b] border border-[#005e22] text-emerald-100 rounded-bl-none'
                    }`}
                  >
                    <p className="leading-relaxed">{m.text}</p>
                    <span className="block text-[9px] text-emerald-400/80 text-right mt-1">
                      {m.time}
                    </span>
                  </div>

                  {m.sender === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-amber-500/30 flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5 text-amber-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-2.5 bg-[#003816] border-t border-[#005e22] flex items-center gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder={language === 'bn' ? 'বার্তা লিখুন...' : 'Type a message...'}
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#00260e] border border-[#005e22] text-white placeholder-emerald-600 focus:outline-none focus:border-[#d8fe49]"
              />
              <button
                type="submit"
                disabled={!inputMsg.trim()}
                className="w-9 h-9 rounded-xl bg-[#d8fe49] text-[#00471b] flex items-center justify-center hover:bg-[#ffe863] active:scale-95 disabled:opacity-40 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
