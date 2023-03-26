'use client'
import * as React from "react"
import Link from "next/link"
import axios from "axios";
import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
   DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useRouter } from "next/router";


interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <img src="/favicon.svg" alt="" className="h-5 w-5" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        <Header />
      </nav>


       {/* wrapped code probably works better */}



      {/* {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-lg font-semibold text-slate-800 hover:text-slate-900  sm:text-sm",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null} */}



      {/* my alternative for comment wrapped code. FYI: Above code is better  */}


      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="-ml-4 text-base hover:bg-transparent focus:ring-0 md:hidden"
          >
            <img src="/spiral.svg" alt="" className="h-4 w-4" />
            <span className="font-bold ml-1">Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={24}
          className="w-[200px] overflow-scroll"
        >
          <DropdownMenuLabel>
            <Link href="/" className="flex items-center">
               Home
            </Link>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
          <Link href='/getstarted'>Get Started</Link>
          </DropdownMenuItem>
            <DropdownMenuItem >
              <Link href='/prices'>Prices</Link>
            </DropdownMenuItem>
                   <DropdownMenuSub>
                   <DropdownMenuSubTrigger>
                     <span>Products & Services</span>
                   </DropdownMenuSubTrigger>
                   <DropdownMenuPortal>
                     <DropdownMenuSubContent>
                       <DropdownMenuItem>
                       <Link href='/saving'>Savings</Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem>
                       <Link href='/investment'>Investment</Link>
                       </DropdownMenuItem>
                     </DropdownMenuSubContent>
                   </DropdownMenuPortal>
                 </DropdownMenuSub>
                   <DropdownMenuSub>
                   <DropdownMenuSubTrigger>
                     <span>About Us</span>
                   </DropdownMenuSubTrigger>
                   <DropdownMenuPortal>
                     <DropdownMenuSubContent>
                       <DropdownMenuItem>
                       <Link href='/about'>Learn more</Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem>
                       <Link href='/transperacy'>Transperacy</Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem>
                       <Link href='/security'>Security</Link>
                       </DropdownMenuItem>
                     </DropdownMenuSubContent>
                   </DropdownMenuPortal>
                 </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const productsMenuItems: NavItem[] = [ { title: "savings", href: "/saving", description:`Save money ` , 
subMenu:[{title:'Savings Account', href:"/saving", description:''}] }, { title: "vc", href: "/investment", description:'VC Invest',  subMenu:[{title:'venture capital investment services', href:"/", description:''}] }]


const aboutMenuItems: NavItem[] = [ { title: "about us", description: 'read about us', href: "/about", subMenu:[{title:'Learn', href:"/about", description:''}] }, 
{ title: "security", description: 'about our scurity', href: "/security", subMenu:[{title:'Our security', href:"/security", description:'our security'}] },
 { title: "Transperacy", description: 'See why Uphold is diffferent about transperacy', href: "/transperacy", subMenu:[{title:'Transperacy', href:"/transperacy", description:'See why we are diffferent about transperacy'}] } ]



export default function Header() {

  const router = useRouter();
  const [allassets, setAllasets] = React.useState([]);

  const gettopcoins = async () => {
        await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&sparkline=false`)
            .then(res => {
                setAllasets(res.data);
            }
            )
    }

    React.useEffect(() => {
      gettopcoins();
    }, []);

    const texttouppercase = (text: any) => {
      return text.toUpperCase();
  } 

  const roundupto2decimal = (num: number) => {
    return Math.round((num + Number.EPSILON) * 100) / 100
  }

  const ListAsset = ({children }) =>  {
  return (
    <li>
      <NavigationMenuLink asChild>
        <div
          className={cn(
            "block text-left select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100",
          )}
        >
          {children}
        </div>
      </NavigationMenuLink>
    </li>
  ) }

ListAsset.displayName = "ListAsset"


  return (
    <>
    <NavigationMenu>
    <NavigationMenuList>
    <NavigationMenuItem>
          <Link href="/getstarted" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Get Started
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      <NavigationMenuItem>
      <NavigationMenuTrigger disabled={router.pathname === '/prices'}>
       Prices
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        {allassets && router.pathname !== '/prices' && (
        <div className="bg-[rgba(73_,204_,104_,0.06)]">
        <Link href="/prices" legacyBehavior passHref>
        <div className="text-[#00B87C] flex items-center gap-1 py-8 px-11 cursor-pointer">
          <h2>View Prices</h2>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
</svg>
          </div>
          </Link>
        <ul className='grid grid-cols-5 w-[1200px] h-[600px] gap-3 p-4'>
          { 
            allassets.map((asset, index) => (
            <ListAsset key={index}>
              <div className="flex items-center gap-10 w-full">
              <div className="flex items-center">
          <img src={asset.image} alt={asset.name} className='w-7 h-7 ml-4' />
          <div className="flex flex-col gap-1">
            <p className={`px-2 text-sm font-light`}>{texttouppercase(asset.name)}</p>
            <p className={`px-2 text-xs font-light`}>{texttouppercase(asset.symbol)}</p>
            </div>
            </div>
            <div className="flex flex-col items-center">
            <p className={`px-2 text-sm font-light`}>${roundupto2decimal(asset.current_price)}</p>
            <p className={`px-2 text-xs font-light ${asset.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>{asset.price_change_percentage_24h > 0 ? '+' : '-'}{asset.price_change_percentage_24h}%</p>
            </div>
        </div>
            </ListAsset>
          ))}
        </ul>
        </div>
        )}
      </NavigationMenuContent>
      </NavigationMenuItem>


      <NavigationMenuItem>
      <NavigationMenuTrigger>
       Products and Services
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
          { productsMenuItems.map((item, index) => (
            <ListItem key={index} title={item.title} href={item.href}>
              {item.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
      </NavigationMenuItem>


      <NavigationMenuItem>
      <NavigationMenuTrigger>
       About
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
          { aboutMenuItems.map((item, index) => (
            <ListItem key={index} title={item.title} href={item.href}>
              {item.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
      </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
    </>
  )
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none pb-2">{title}</div>
          {children}
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"