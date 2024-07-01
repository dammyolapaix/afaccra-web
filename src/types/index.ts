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
