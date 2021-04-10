import Prismic from 'prismic-javascript'

import Head from 'next/head'

import Header from '../components/Header'
import Product from '../components/Product'
import HowToBuy from '../components/HowToBuy'


const Index = ({ products }) => {
    return (
        <div className='bg-gray-100'>
            <Head>
                <title>Gulodícias & Gostosuras</title>
            </Head>
            <div className='fixed'>
                <Header />

            </div>
            <div className='container mx-auto pt-48'>
                <HowToBuy />
                <div className='w-full md:mt-4 lg:my-12 shadow shadow-sm rounded-md border border-gray-200 bg-white'>
                    <p className='text-center text-3xl py-2 my-2'>Nosso Delicioso Menu</p>
                </div>
                <main className="grid grid-flow-col justify-items-auto grid-cols-3 gap-4 bg-gray-200 my-4 py-12 ">
                    {products.map(product => {
                        return (
                            <Product product={product} />
                        )
                    })
                    }
                </main>
            </div>
        </div>
    )
}

export async function getServerSideProps({ res }) {
    const client = Prismic.client('https://gulodicias.cdn.prismic.io/api/v2')
    const products = await client.query(Prismic.Predicates.at('document.type', 'product'))

    return {
        props: {
            date: Date.now(),
            products: products.results
        }
    }
}
export default Index