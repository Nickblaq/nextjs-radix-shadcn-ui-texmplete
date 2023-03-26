import Link from "next/link"
export default function Footer() {
    return (
        <>
       <footer className="bg-gray-50 mt-10">
	<div className="container text-center ">
		<ul className=" py-6 sm:flex sm:gap-10 sm:justify-center">
			<Link href='/getstarted'>
			<li className="text-lg pb-4 font-semibold text-slate-800 hover:text-slate-900  sm:text-sm active:opacity-80">Get Started</li>
			</Link>
			<Link href='/prices'>
			<li className="text-lg pb-4 font-semibold text-slate-800 hover:text-slate-900  sm:text-sm active:opacity-80">Prices</li>
			</Link>
			<Link href='/saving'>
			<li className="text-lg pb-4 font-semibold text-slate-800 hover:text-slate-900  sm:text-sm active:opacity-80">Savings</li>
			</Link>
			<Link href='/investment'>
			<li className="text-lg pb-4 font-semibold text-slate-800 hover:text-slate-900  sm:text-sm active:opacity-80">Investment</li>
			</Link>
			<li></li>
			<Link href='/about'>
			<li className="text-lg pb-4 font-semibold text-slate-800 hover:text-slate-900  sm:text-sm active:opacity-80">About</li>
			</Link>
		</ul>
		
        <div className="flex items-center justify-center py-6 text-sm">
		<span className="">Footer component.</span>
	</div>

	</div>
</footer>
        </>
    )
}