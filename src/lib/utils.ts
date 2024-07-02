import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatToMoney = (amount: string | number): string =>
  `GHS ${(Number(amount) / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

export const convertTimeToAMPM = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const convertedHours = hours % 12 || 12 // Convert hours from 24-hour to 12-hour format

  return `${convertedHours}:${minutes.toString().padStart(2, '0')} ${period}`
}
