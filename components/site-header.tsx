import Link from "next/link"
import { siteConfig } from "@/config/site"

// import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
// import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.login}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-slate-900 ",
                })}
              >
                <span className="">signin</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.signup}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-slate-900",
                })}
              >
                <span className="">Signup</span>
              </div>
            </Link>
            {/* <ThemeToggle /> */}
          </nav>
        </div>
      </div>
    </header>
  )
}
