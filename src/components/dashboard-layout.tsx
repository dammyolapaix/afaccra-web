'use client'

import Link from 'next/link'
import {
  CircleUser,
  GraduationCap,
  Home,
  Menu,
  Package2,
  School,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { LocaleType, UserType } from '@/types'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { ModeToggle } from './mode-toggle'
import { LanguageToggle } from './language-toggle'

type PageType = {
  href: string
  name: string
  icon: JSX.Element
  iconLg: JSX.Element
  active: boolean
}

const LargeScreenMenu = ({ pages }: { pages: PageType[] }) => {
  return (
    <>
      {pages.map(({ active, href, icon, name }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${
            active ? 'bg-muted text-primary' : 'text-muted-foreground'
          }`}
        >
          {icon}
          {name}
        </Link>
      ))}
    </>
  )
}

const SmallScreenMenu = ({ pages }: { pages: PageType[] }) => {
  return (
    <>
      {pages.map(({ active, href, iconLg, name }) => (
        <Link
          key={href}
          href={href}
          className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
            active ? 'bg-muted text-foreground' : 'text-muted-foreground'
          }`}
        >
          {iconLg}
          {name}
        </Link>
      ))}
    </>
  )
}

export default function DashboardLayout({
  children,
  locale,
  authUser,
}: Readonly<{
  children: React.ReactNode
  locale: LocaleType
  authUser: UserType
}>) {
  const pathname = usePathname()

  const isAdmin =
    authUser.roles.filter(({ role }) => role.name === 'admin').length > 0

  const adminPages = [
    {
      href: locale.dashboardMenus.dashboard_href,
      name: locale.dashboardMenus.dashboard,
      icon: <Home className="h-4 w-4" />,
      iconLg: <Home className="h-5 w-5" />,
      active: pathname === locale.dashboardMenus.dashboard_href,
    },
    {
      href: locale.dashboardMenus.courses_href,
      name: locale.dashboardMenus.courses,
      icon: <GraduationCap className="h-4 w-4" />,
      iconLg: <GraduationCap className="h-5 w-5" />,
      active:
        pathname === locale.dashboardMenus.courses_href ||
        pathname.includes(locale.dashboardMenus.courses_href),
    },
    {
      href: locale.dashboardMenus.classes_href,
      name: locale.dashboardMenus.classes,
      icon: <School className="h-4 w-4" />,
      iconLg: <School className="h-5 w-5" />,
      active:
        pathname === locale.dashboardMenus.classes_href ||
        pathname.includes(locale.dashboardMenus.classes_href),
    },
    {
      href: locale.dashboardMenus.classes_href,
      name: 'Admin',
      icon: <School className="h-4 w-4" />,
      iconLg: <School className="h-5 w-5" />,
      active:
        pathname === locale.dashboardMenus.classes_href ||
        pathname.includes(locale.dashboardMenus.classes_href),
    },
  ]

  const studentPages = [
    {
      href: locale.dashboardMenus.dashboard_href,
      name: locale.dashboardMenus.dashboard,
      icon: <Home className="h-4 w-4" />,
      iconLg: <Home className="h-5 w-5" />,
      active: pathname === locale.dashboardMenus.dashboard_href,
    },
    {
      href: locale.dashboardMenus.courses_href,
      name: locale.dashboardMenus.courses,
      icon: <GraduationCap className="h-4 w-4" />,
      iconLg: <GraduationCap className="h-5 w-5" />,
      active:
        pathname === locale.dashboardMenus.courses_href ||
        pathname.includes(locale.dashboardMenus.courses_href),
    },
    {
      href: locale.dashboardMenus.classes_href,
      name: locale.dashboardMenus.classes,
      icon: <School className="h-4 w-4" />,
      iconLg: <School className="h-5 w-5" />,
      active:
        pathname === locale.dashboardMenus.classes_href ||
        pathname.includes(locale.dashboardMenus.classes_href),
    },
  ]

  useEffect(() => {}, [pathname])

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">AF Accra</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {isAdmin && <LargeScreenMenu pages={adminPages} />}
              {!isAdmin && <LargeScreenMenu pages={studentPages} />}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>

                {isAdmin && <SmallScreenMenu pages={adminPages} />}
                {!isAdmin && <SmallScreenMenu pages={studentPages} />}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <LanguageToggle locale={locale} />
          <ModeToggle locale={locale} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
