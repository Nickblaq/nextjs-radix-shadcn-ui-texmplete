import { SiteHeader } from "@/components/site-header"
import Footer from "@/components/footer"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
    <div className="transition-all duration-600 ease-in-out">
      <SiteHeader />
      <main>{children}</main>
      <Footer />
    </div>
    </>
  )
}
