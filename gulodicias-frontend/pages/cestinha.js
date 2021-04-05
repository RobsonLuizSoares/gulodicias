import Prismic from 'prismic-javascript'
import { useCart } from '../components/CartContext'

import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'
import Header from '../components/Header'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
const Cart = () => {
    const [orderStatus, setOrderStatus] = useState('pre-order')// ordering, order-received
    const [txid, setTxid] = useState(null)
    const { data } = useSWR(txid ? process.env.NEXT_PUBLIC_API_URL + 'order/' + txid : null, { refreshInterval: 10 })
    const [qrCode, setQRCode] = useState('')
    const cart = useCart()
    const router = useRouter()
    useEffect(() => {
        if (data && data.status === 'Pago com PIX') {
            //limpar carrinho. FEITO
            cart.clean()
            setTimeout(() => {
                router.push('/')
            }, 2500)
        }
    }, [data])
    const form = useFormik({
        initialValues: {
            cpf: '',
            name: '',
            phone: ''
        },
        onSubmit: async (values) => {
            const order = { ...values }
            const items = Object.keys(cart.cart).map((curr) => {
                const item = {
                    quantity: cart.cart[curr].quantity,
                    price: cart.cart[curr].product.data.price,
                    name: cart.cart[curr].product.data.name
                }
                return item
            })
            order.items = items
            setOrderStatus('ordering')
            //const formData = await axios.post('https://api-gulodicias.liberty.app.br/create-order', order)
            const formData = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'create-order', order)
            setQRCode(formData.data.qrcode.imagemQrcode)
            setTxid(formData.data.billing.txid)
            setOrderStatus('order-received')
        }
    })

    const remove = id => () => {
        cart.removeFromCart(id)
    }

    const changeQuantity = id => evt => {
        cart.changeQuantity(id, Number(evt.target.value))

    }

    const itemsCount = Object.keys(cart.cart).reduce((prev, curr) => {
        return prev + cart.cart[curr].quantity
    }, 0)

    const total = Object.keys(cart.cart).reduce((prev, curr) => {
        return prev + cart.cart[curr].quantity * cart.cart[curr].product.data.price
    }, 0)


    return (
        <div>
            <Head>
                <title>Cestinha de Gulodícias</title>
            </Head>
            <Header />
            {data && data.status === 'Pago com PIX' && <p>Obrigado por efetuar seu pedidoCOLOCAR COMPONENTE DE AGRADECIMENTO</p>}
            {(!data || data.status !== 'Pago com PIX') && (
                <div className='container mx-auto'>
                    <div className="flex justify-center my-6">
                        <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
                            <div className="flex-1">
                                <table className="w-full text-sm lg:text-base" cellSpacing="0">
                                    <thead>
                                        <tr className="h-12 uppercase">
                                            <th className="hidden md:table-cell"></th>
                                            <th className="text-left">Gulodícia</th>
                                            <th className="lg:text-right text-left pl-5 lg:pl-0">
                                                <span className="lg:hidden" title="Quantity">Qtd</span>
                                                <span className="hidden lg:inline">Quantidade</span>
                                            </th>
                                            <th className="hidden text-right md:table-cell">Preço Unitário</th>
                                            <th className="text-right">Preço Total </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(cart.cart).map(key => {
                                            const { product, quantity } = cart.cart[key]
                                            return (
                                                <tr key={key}>
                                                    <td className="hidden pb-4 md:table-cell">
                                                        <a href="#">
                                                            <img src={product.data.image.url} className="w-20 rounded" alt="Thumbnail" />
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <p className="mb-2 md:ml-4">{product.data.name}</p>
                                                        <button type="submit"
                                                            onClick={remove(key)}
                                                            className="text-gray-700 md:ml-4">
                                                            <small>(Remover item)</small>
                                                        </button>
                                                    </td>
                                                    <td className="justify-center md:justify-end md:flex mt-6">
                                                        <div className="w-20 h-10">
                                                            <div className="relative flex flex-row w-full h-8">
                                                                <input type="number" defaultValue={quantity} onBlur={changeQuantity(key)}
                                                                    className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="hidden text-right md:table-cell">
                                                        <span className="text-sm lg:text-base font-medium">
                                                            R$ {Number(product.data.price).toFixed(2).replace('.', ',')}
                                                        </span>
                                                    </td>
                                                    <td className="text-right">
                                                        <span className="text-sm lg:text-base font-medium">
                                                            R$ {Number(product.data.price * quantity).toFixed(2).replace('.', ',')}
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <hr className="pb-6 mt-6" />
                                <div className="my-4 mt-6 -mx-2 lg:flex">
                                    <div className="lg:px-2 lg:w-1/2">
                                        <div className="p-4 bg-gray-100 rounded-full">
                                            {orderStatus === 'pre-order' && (<h1 className="ml-2 font-bold uppercase text-center">Seus dados 😃</h1>)}
                                            {orderStatus === 'ordering' && (<h1 className="ml-2 font-bold uppercase text-center">Quase lá 😋</h1>)}
                                            {orderStatus === 'order-received' && (<h1 className="ml-2 font-bold uppercase text-center">Prontinho 🎉 🥳 </h1>)}
                                        </div>
                                        <div className="p-4">
                                            <div className="justify-center md:flex md:flex-col ">
                                                {orderStatus === 'pre-order' && (<form onSubmit={form.handleSubmit}>
                                                    <p className="mb-4 italic">Por favor, informe seus dados abaixo para concluir</p>
                                                    <div className="flex flex-col items-center w-full h-13 mb-12 pl-3 ">
                                                        <div className='my-1 w-full flex flex-row'>
                                                            <label className='w-1/5 flex items-center'>nome</label>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                id="name"
                                                                placeholder="Digite aqui seu nome"
                                                                onChange={form.handleChange}
                                                                value={form.values.name}
                                                                className="w-full bg-gray-100 my-1 rounded-md py-4 outline-none px-4 focus:outline-none focus:ring focus:border-yellow-100" />
                                                        </div>
                                                        <div className='my-1 w-full flex flex-row'>
                                                            <label className='w-1/5 flex items-center'> cpf</label>
                                                            <input
                                                                type="text"
                                                                name="cpf"
                                                                id="cpf"
                                                                placeholder="Digite seu cpf"
                                                                onChange={form.handleChange}
                                                                value={form.values.cpf}
                                                                className="w-full bg-gray-100 my-1 rounded-md py-4 outline-none px-4 focus:outline-none focus:ring focus:border-yellow-100" />
                                                        </div>
                                                        <div className='my-1 w-full flex flex-row'>
                                                            <label className='w-1/5 flex items-center'>whatsApp</label>
                                                            <input
                                                                type="text"
                                                                name="phone"
                                                                id="phone"
                                                                placeholder="Seu whats (xx) 9 xxxx-xxxx"
                                                                onChange={form.handleChange}
                                                                value={form.values.phone}
                                                                className="w-full bg-gray-100 my-1 rounded-md py-4 outline-none px-4 focus:outline-none focus:ring focus:border-yellow-100" />
                                                        </div>
                                                    </div>
                                                    <button className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                                                        <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z" /></svg>
                                                        <span className="ml-2 mt-5px"> Concluir Pedido</span>
                                                    </button>
                                                </form>
                                                )}
                                                {orderStatus === 'ordering' && <p>Pedido sendo realizado. Aguarde...</p>}
                                                {orderStatus === 'order-received' && (
                                                    <div className='text-center flex w-full'>
                                                        <div className='w-1/2'>
                                                            <img src={qrCode} alt='qrcode' />
                                                        </div>
                                                        <div className='text-center pt-6 mx-auto w-1/2'>
                                                            <span className='font-semibold'>Aqui está seu QRCode </span>
                                                            <p className='mt-4'>Enquanto você efetua o pagamento, já estamos separando suas gulodícias</p>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className='text-center pt-4'>
                                                    {data && data.status && <p>{data.status}</p>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="lg:px-2 lg:w-1/2">
                                        <div className="p-4 bg-gray-100 rounded-full">
                                            <h1 className="ml-2 font-bold uppercase text-center">Seu Pedido</h1>
                                        </div>
                                        <div className="p-4">
                                            <p className="mb-6 italic">Confira o que já está prontinho, só te esperando para saborear</p>
                                            <div className="flex justify-between border-b">
                                                <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                                    Quantidade de gulodícias
                                        </div>
                                                <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                                    {itemsCount}
                                                </div>
                                            </div>


                                            <div className="flex justify-between pt-4 border-b">
                                                <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                                    Total
                            </div>
                                                <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                                    R$ {Number(total).toFixed(2).replace('.', ',')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
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
export default Cart