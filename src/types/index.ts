export type LocaleType = {
  navbar: {
    home: string
    home_href: string
    courses: string
    courses_href: string
    login: string
    login_href: string
    register: string
    register_href: string
  }
  dashboardMenus: {
    dashboard: string
    dashboard_href: string
    courses: string
    courses_href: string
    classes: string
    classes_href: string
  }
}

export type ErrorResType = {
  success: false
  errors: { message: string }[]
}

export type UserType = {
  id: string
  email: string
  provider: 'email' | 'google' | 'facebook'
  providerId: string | null
  role: {
    role: {
      id: string
      name: 'admin' | 'staff' | 'instructor' | 'student'
      description: string | null
    }
  }[]
}
