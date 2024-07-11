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

export const getQueryStr = <T extends object>(query: T): string => {
  const queryStringParts: string[] = []

  // Check if query is null or undefined
  if (query === null || query === undefined) {
    return ''
  }

  const serialize = (obj: any, prefix = ''): void => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key]

        // Skip null or undefined values
        if (value === null || value === undefined) {
          continue
        }

        const encodedKey = encodeURIComponent(prefix ? `${prefix}.${key}` : key)

      // Handle array values
        if (Array.isArray(value)) {
          value.forEach((val) => {
            queryStringParts.push(
              `${encodedKey}=${encodeURIComponent(val.toString())}`
            )
          })
        } else if (typeof value === 'object') {
          // Recursively serialize nested objects
          serialize(value, encodedKey)
        } else {
          queryStringParts.push(
            `${encodedKey}=${encodeURIComponent(value.toString())}`
          )
        }
      }
    }
      } else {
        let encodedValue = encodeURIComponent(value.toString()) // Encode value component
        queryStringParts.push(`${encodedKey}=${encodedValue}`)
      }
    }
  }

  // Join all parts with '&' to form the final query string
  return queryStringParts.length > 0 ? `?${queryStringParts.join('&')}` : ''
}

export const timeToDate = (time: string): Date => {
  // Assuming today's date as the reference
  const today = new Date()

  // Split the time string into hours, minutes, and seconds
  const [hours, minutes, seconds] = time.split(':').map(Number)

  // Set the time on today's date
  today.setHours(hours)
  today.setMinutes(minutes)
  today.setSeconds(seconds)

  return today
}
