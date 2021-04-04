import Prismic from 'prismic-javascript'
import { useCart } from '../components/CartContext'

import Head from 'next/head'

import Header from '../components/Header'
import Product from '../components/Product'

const Index = ({ products }) => {
    const cart = useCart()

    return (
        <div>
            <Head>
                <title>Gulodícias & Gostosuras</title>
            </Head>
            <Header />
            <div className='container mx-auto'>
                <main className="grid grid-flow-col justify-items-auto grid-cols-3 gap-4 bg-green-400 my-4 py-12 ">
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