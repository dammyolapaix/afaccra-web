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

/**
 * Compares two objects and returns a partial object containing fields from `obj2`
 * that have different values compared to `obj1`.
 * That is, it returns only the modified (edited) field.
 * Useful when editing a field
 *
 * @template T - The type of objects being compared.
 * @param {T} obj1 - The first object to compare.
 * @param {T} obj2 - The second object to compare.
 * @returns {Partial<T>} - A partial object containing fields from `obj2` with differing values.
 */
export const getDifferingFields = <T extends object>(
  obj1: T,
  obj2: T
): Partial<T> => {
  const differingFields: Partial<T> = {}

  Object.keys(obj2).forEach((key) => {
    if (obj1[key as keyof T] !== obj2[key as keyof T]) {
      differingFields[key as keyof T] = obj2[key as keyof T]
    }
  })

  return differingFields
}
