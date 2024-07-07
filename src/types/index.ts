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
  pages: {
    dashboard: {
      home: {}
      courses: {
        actions: {
          add_course: string
          view_course: string
          edit_course: string
          update_course: string
        }
        page: {
          home: {
            table: {
              title: string
              description: string
              table_heading: {
                title: string
                language: string
                delivery_mode: string
                audience: string
                status: string
                actions: string
              }
            }
          }
        }
      }
      marketing: {}
    }
  }
  utils: {
    english: string
    french: string
    adults: string
    kids: string
    draft: string
    published: string
    light: string
    dark: string
    system: string
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
  roles: {
    role: {
      id: string
      name: 'admin' | 'staff' | 'instructor' | 'student'
      description: string | null
    }
  }[]
}
