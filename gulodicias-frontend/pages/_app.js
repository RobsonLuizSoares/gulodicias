import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import { CartProvider } from '../components/CartContext'
function MyApp({ Component, pageProps }) {
    return (
        <CartProvider>
            <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet"></link>
            </Head>
            <Component {...pageProps} />
        </CartProvider>
    )
}

export default MyApp