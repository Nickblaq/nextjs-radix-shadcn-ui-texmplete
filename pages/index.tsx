import { Layout } from "@/components/layout";
import Head from "next/head";


export default function Index ()  {
     
    return (
        <>
        <Layout>
            <Head>
                <title>UI </title>
                <meta
                    name="description"
                    content='Welcome page'
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-32">
        <h1 className="font-neo text-3xl leading-tight md:text-[80px] text-center font-semibold">NExtjs 13.1(src -dir), Radix UI, Shadnc Ui boilerplate</h1>        </div>
        </Layout>
        </>
    )
}

