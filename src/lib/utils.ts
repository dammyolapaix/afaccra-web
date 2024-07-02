import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatToMoney = (amount: string | number): string =>
  `GHS ${(Number(amount) / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
