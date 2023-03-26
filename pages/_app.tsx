import type { AppProps } from "next/app"
import { Inter as FontSans } from "@next/font/google"
import { ThemeProvider } from "next-themes"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import "@/styles/globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
})




export default function App({ Component, pageProps }: AppProps) {

//  Block code used for showing loading icon as user routes to another page


  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      NProgress.start()
    }

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', () => NProgress.done())
    router.events.on('routeChangeError', () => NProgress.done())

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', () => NProgress.done())
      router.events.off('routeChangeError', () => NProgress.done())
    }
  }, [router])





  return (
    <>
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>
      {/* <ThemeProvider attribute="class"> */}
        <Component {...pageProps} />
      {/* </ThemeProvider> */}
    </>
  )
}
