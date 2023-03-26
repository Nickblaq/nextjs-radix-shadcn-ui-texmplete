import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    login: string
    signup: string
  }
}

export const siteConfig: SiteConfig = {
  name: "NRS-UI",
  description:
    "Demo showing how to use Nextjs 13.1(src -dir), Radix UI and Shadcn Ui",
  mainNav: [
    {
      title: "",
      href: "/",
    },
    {
      title: "Prices",
      href: "/prices",
    },
    {
      title: "",
      href: "/",
      subMenu: [
        {
          title: "",
          href: "/",
        },
        {
          title: "",
          href: "/",
        },
        {
          title: "",
          href: "/",
        },
      ]
    },
    {
      title: "",
      href: "/",
      subMenu: [
        {
          title: "",
          href: "/",
          description: "",
        },
        {
          title: "",
          href: "/",
          description: "",
        },
        {
          title: "",
          href: "/",
          description: "",
        }
      ]
    },
  ],
  links: {
    login: "/",
    signup: "/",
  },
}
