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
      courses: {
        actions: {
          add_course: string
          add_new_course: string
          add_new_course_description: string
          edit_course_description: string
          view_course: string
          edit_course: string
          update_course: string
          publish_course: string
          unpublish_course: string
        }
        table_title: string
        table_description: string
        table_actions: string
        course_title: string
        course_details: string
        course_price: string
        course_schedule: string
        language: string
        days: string
        delivery_mode: string
        audience: string
        status: string
        title_en: string
        title_fr: string
        objective_en: string
        objective_fr: string
        curriculum_en: string
        curriculum_fr: string
      }
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
    sundays: string
    mondays: string
    tuesdays: string
    wednesdays: string
    thursdays: string
    fridays: string
    saturdays: string
    enter: string
    select: string
    'in-person': string
    online: string
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
