import axios from "axios";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout"
import Head from "next/head";
import { Input } from "@/components/ui/input";

export default function Prices ()  {

    const [allassets, setAllasets] = useState([]);
    const [assettype, setAssettype] = useState("all");
    const [assetsearch, setAssetsearch] = useState("");
    const [timeframe, setTimeframe] = useState("24h");
    const [paginatepage, setPaginatepage] = useState(1);



    // Don't know if it's best practice but i wanted to see if it would work and yeah it did!
    const getallassets = async () => {

       await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${paginatepage}&ids${assetsearch}&price_change_percentage=${timeframe}&sparkline=false`)
            .then(res => {
             `${assettype === 'all' ? `${setAllasets(res.data.slice(0, 10))}` : assettype === 'gainers' ? `${setAllasets(res.data.sort((a:any, b:any):any => b.market_cap_rank - a.market_cap_rank).slice(0, 10))}` : assettype === 'losers' ? `${setAllasets(res.data.sort((a:any, b:any):any => a.market_cap_rank - b.market_cap_rank).slice(0, 10))}` : assettype === 'volume' ? `${setAllasets(res.data.sort((a:any, b:any):any => b.market_cap_rank - a.market_cap_rank).slice(0, 10))}` : ''}`
            }
            )
    }
    
    useEffect(() => {
        getallassets();
    }, [paginatepage, timeframe, assetsearch, assettype]);


    const handleAssetSearch = (e) => {
        setAssetsearch(e.target.value);
    }

    const handleFront = (page: number) => {
        if (paginatepage >= 10) {
            return;
        } else if (paginatepage  >= 1) {
            setPaginatepage(paginatepage + 1)
        } 
    }

    const handleBack = () => {
        if (paginatepage === 1) {
            return;
        } else if (paginatepage >= 1) {
            setPaginatepage(paginatepage - 1);
        }
    }

    const filteredAssets = allassets.filter(asset => {
        return asset.name.toLowerCase().includes(assetsearch.toLowerCase());
    }
    );

    
    const texttouppercase = (text: any) => {
        return text.toUpperCase();
    }   

    const checkvolume = (number: any) => {
        return number > 0 ? 'text-green-900' : 'text-red-900';
    }
    

    const roundupto2decimal = (num: number) => {
        return Math.round((num + Number.EPSILON) * 100) / 100
      }
  

    return (
        <>
        <Layout>
                <Head>
                    <title>Crypto prices</title>
                    <meta
                        name="description"
                        content='Crypto prices'
                    />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
        <div className='max-w-[1200px] mt-10 mx-auto px-4'>
        <h1 className="text-3xl font-bold text-[#164F3D] text-left">
        Asset prices
            </h1>
            <div className='md:flex items-center justify-between mt-10 w-full'>
              
                <div className='w-full md:w-3/5'>
                    <Input className=" w-full" type="text" placeholder="search" onChange={handleAssetSearch} value={assetsearch} name="search" />
                    </div>

                <div className='md:flex  justify-end items-center w-2/5 hidden'>
                    <p className='text-gray-500'>Timeframe:</p>
                    <select className='border border-gray-300 rounded-md ml-2' onChange={ (e) => setTimeframe(e.target.value) }>
                        <option  value='24h'>24h</option>
                        <option value='7d'>7d</option>
                        <option value='30d'>30d</option>
                        <option value='1y'>1y</option>
                    </select>
                    </div>
                    </div>

            <div className="w-full rounded-lg shadow-xs px-2 mx-auto">
            <div className='w-full flex space-x-4 items-center mt-8 mb-8 -ml-4 overflow-x-auto mx-auto'>
              <p onClick={()=> setAssettype('all')}  className={`cursor-pointer px-4 py-1 border rounded-2xl text-sm font-extralight leading-tight ${assettype === 'all' ? 'border-[#164F3D] ' : ''}`}>All Assets</p>
                <p onClick={()=> setAssettype('gainers')}  className={`cursor-pointer  px-4 py-1 border rounded-2xl text-sm font-extralight leading-tight  ${assettype === 'gainers' ? 'border-green-900' : ''}`}>Top Gainers</p>
                <p onClick={()=> setAssettype('losers')}  className={` cursor-pointer  px-4 py-1 border rounded-2xl text-sm font-extralight leading-tight  ${assettype === 'losers' ? 'border-[#164F3D]' : ''}`}>Top Losers</p>
                <p onClick={()=> setAssettype('volume')} className={`cursor-pointer  px-4 py-1 border  rounded-2xl text-sm font-extralight leading-tight  ${assettype === 'volume' ? 'border-[#164F3D]' : ''}`}>Top Volume</p>
             </div>

            <div className="hidden md:block">
            <table className='w-full mt-10 overflow-x-auto '>
                <thead className="">
                    <tr className="text-xs font-semibold text-indigo-800 tracking-wide text-left uppercase border-b w-full ml-4">
                        <th className='md:text-left py-3'>Name</th>
                        <th className='text-right md:text-left py-3 '>Price</th>
                        <th
                         className={`text-left py-3 `}>Change {" "}{timeframe}</th>
                        <th className='text-left p-3'>Market Cap</th>
                        <th className='text-left py-3'>Volume</th>
                    </tr>
                </thead>
                <tbody className="divide-x-10">
                 
                    {assettype  && filteredAssets.map(asset => (
                        <tr key={asset.id} className='overflow-x-auto' >
                            <td className='text-left py-2'>
                                <div className="flex items-center gap-2">
                                    <img src={asset.image} alt={asset.name}
                                     className='w-7 h-7 ml-4' />
                                    <p className={`px-2 text-sm font-light`}>{texttouppercase(asset.name)}</p>
                                    <p className={`px-2 text-sm font-light`}>{texttouppercase(asset.symbol)}</p>
                                </div>
                            </td>
                            <td className='text-right md:text-left py-3'>${" "}{roundupto2decimal(asset.current_price)}</td>
                            <td className={`${asset.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>{asset.price_change_percentage_24h > 0 ? '+' : '-'}{asset.price_change_percentage_24h}%</td>
                            <td className={`text-left `}>${" "}{asset.market_cap}</td>
                            <td className={`text-left`}>{asset.total_volume}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            {/* // for mobile screen */}
            
            <div className="md:hidden block">
            <table className='w-full mt-10 overflow-x-auto '>
                <thead className="">
                    <tr className="text-xs font-semibold text-indigo-800 tracking-wide text-left uppercase border-b w-full ml-4">
                        <th className='md:text-left py-3'>Name</th>
                        <th className='text-right md:text-left py-3 '>Price</th>
                    </tr>
                </thead>
                <tbody className="divide-x-10">
                 
                    {assettype  && filteredAssets.map(asset => (
                        <tr key={asset.id} className='overflow-x-auto' >
                            <td className='text-left py-2'>
                                <div className="flex items-center gap-1">
                                    <img src={asset.image} alt={asset.name}
                                     className='w-7 h-7 ml-4' />
                                     <div className="flex flex-col gap-1">
                                    <p className={`px-2 text-sm font-light`}>{texttouppercase(asset.name)}</p>
                                    <p className={`px-2 text-xs font-light`}>{texttouppercase(asset.symbol)}</p>
                                </div>
                                </div>
                            </td>
                            <td className='text-left py-3'>
                            <div className="flex flex-col items-center">
            <p className={`px-2 text-sm font-light`}>${roundupto2decimal(asset.current_price)}</p>
            <p className={`px-2 text-xs font-light ${asset.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>{asset.price_change_percentage_24h > 0 ? '+' : '-'}{asset.price_change_percentage_24h}%</p>
            </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>



            <div className='mt-10 w-full flex items-center justify-between'>
                <p className='text-gray-500'>Showing {paginatepage === 1 ? 1 : paginatepage} of <span className="text-indigo-500">{filteredAssets.length}</span> results</p>
                <div className='flex items-center justify-end py-6'>
                    <button disabled={paginatepage === 1} onClick={() => handleBack()} className={` ${paginatepage === 1 ? 'text-gray-300' : 'cursor-pointer text-indigo-400'}`}>Previous</button>
                    <button disabled={paginatepage >= 10} onClick={() => handleFront(paginatepage + 1)} className={` ml-2 ${paginatepage === 10 ? 'text-gray-300' : 'cursor-pointer text-indigo-500'}`}>Next</button>
                    </div>
                    </div>
                </div>
        </div>
        </Layout>
        </>
    )


}
