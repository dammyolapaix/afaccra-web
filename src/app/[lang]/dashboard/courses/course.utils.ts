import { LocaleType } from '@/types'
import { CourseType } from './course.types'

export const getCourseLocaleDays = ({
  days,
  locale: { utils: locale_utils },
}: {
  days: CourseType['days']
  locale: LocaleType
}) => {
  let locale_days: string[] = []

  days.map((day) => {
    switch (day) {
      case 'sundays':
        locale_days = [...locale_days, locale_utils.sundays]
        break
      case 'mondays':
        locale_days = [...locale_days, locale_utils.mondays]
        break
      case 'tuesdays':
        locale_days = [...locale_days, locale_utils.tuesdays]
        break
      case 'wednesdays':
        locale_days = [...locale_days, locale_utils.wednesdays]
        break
      case 'thursdays':
        locale_days = [...locale_days, locale_utils.thursdays]
        break
      case 'fridays':
        locale_days = [...locale_days, locale_utils.fridays]
        break
      case 'saturdays':
        locale_days = [...locale_days, locale_utils.saturdays]
        break
      default:
        break
    }
  })

  return locale_days
}

export const getCourseLocaleDay = ({
  day,
  locale: { utils: locale_utils },
}: {
  day:
    | 'sundays'
    | 'mondays'
    | 'tuesdays'
    | 'wednesdays'
    | 'thursdays'
    | 'fridays'
    | 'saturdays'
  locale: LocaleType
}) => {
  let locale_day: string = ''

  switch (day) {
    case 'sundays':
      locale_day = locale_utils.sundays
      break
    case 'mondays':
      locale_day = locale_utils.mondays
      break
    case 'tuesdays':
      locale_day = locale_utils.tuesdays
      break
    case 'wednesdays':
      locale_day = locale_utils.wednesdays
      break
    case 'thursdays':
      locale_day = locale_utils.thursdays
      break
    case 'fridays':
      locale_day = locale_utils.fridays
      break
    case 'saturdays':
      locale_day = locale_utils.saturdays
      break
    default:
      break
  }

  return locale_day
}

export const getCourseLocaleDeliveryMode = ({
  mode,
  locale: { utils: locale_utils },
}: {
  mode: 'in-person' | 'online'
  locale: LocaleType
}) => {
  let locale_mode: string = ''

  switch (mode) {
    case 'in-person':
      locale_mode = locale_utils['in-person']
      break
    case 'online':
      locale_mode = locale_utils.online
      break
    default:
      break
  }

  return locale_mode
}

export const getCourseLocaleAudience = ({
  audience,
  locale: { utils: locale_utils },
}: {
  audience: 'adults' | 'kids'
  locale: LocaleType
}) => {
  let locale_audience: string = ''

  switch (audience) {
    case 'adults':
      locale_audience = locale_utils.adults
      break
    case 'kids':
      locale_audience = locale_utils.kids
      break
    default:
      break
  }

  return locale_audience
}
