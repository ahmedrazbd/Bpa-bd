export type Language = 'bn' | 'en';

export type PromoCategoryId =
  | 'all'
  | 'newbie'
  | 'sports'
  | 'live'
  | 'slots'
  | 'cards'
  | 'fish'
  | 'special'
  | 'daily'
  | 'vip'
  | 'rebate';

export interface PromoCategory {
  id: PromoCategoryId;
  titleBn: string;
  titleEn: string;
  iconName?: string;
}

export interface PromoItem {
  id: number;
  slug: string;
  categoryIds: PromoCategoryId[];
  badge: {
    textBn: string;
    textEn: string;
    bgClass: string;
  };
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  bannerImage: string;
  startDate: string;
  endDate: string;
  isLongTerm: boolean;
  bonusAmountBn: string;
  bonusAmountEn: string;
  turnoverRequirement: string;
  minDeposit?: string;
  maxBonus?: string;
  claimType: 'INSTANT_CLAIM' | 'DEPOSIT_PROMO' | 'DOWNLOAD_APP' | 'REFERRAL_SHARE' | 'AUTO_REBATE';
  buttonTextBn: string;
  buttonTextEn: string;
  contentBn: string[];
  contentEn: string[];
  rulesBn: string[];
  rulesEn: string[];
}

export interface UserSession {
  isLoggedIn: boolean;
  username: string;
  userId: string;
  balance: number;
  currency: string;
  vipTier: string;
  claimedPromoIds: number[];
}
