export type MassageCategory = 'relaxing' | 'deepTissue';

export type MassagePriceItem = {
  minutes: 30 | 45 | 60 | 90;
  price: number;
  isSignature?: boolean;
};

type PriceTable = Record<MassageCategory, Record<MassagePriceItem['minutes'], MassagePriceItem>>;

export const MASSAGE_PRICING: PriceTable = {
  relaxing: {
    30: { minutes: 30, price: 60 },
    45: { minutes: 45, price: 70 },
    60: { minutes: 60, price: 80 },
    90: { minutes: 90, price: 130, isSignature: true },
  },
  deepTissue: {
    30: { minutes: 30, price: 70 },
    45: { minutes: 45, price: 80 },
    60: { minutes: 60, price: 90 },
    90: { minutes: 90, price: 140, isSignature: true },
  },
};

export const MASSAGE_MINUTES: MassagePriceItem['minutes'][] = [30, 45, 60, 90];

export function formatAud(price: number): string {
  return `$${price}`;
}

export function pricingLineEn(item: MassagePriceItem): string {
  const label = item.minutes === 90 ? '90 Mins Signature' : `${item.minutes} Mins`;
  return `  - ${label}: ${formatAud(item.price)}`;
}

export function pricingLineTh(item: MassagePriceItem): string {
  const label = item.minutes === 90 ? '90 นาที —' : `${item.minutes} นาที —`;
  return `• ${label} ${formatAud(item.price)}`;
}

