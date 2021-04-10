import { useCart } from "./CartContext"
import Link from 'next/link'

const BasketFloat = () => {
    const cart = useCart()

    return (
        <div className='bg-green-100 relative '>
            { Object.keys(cart.cart).length > 0 && (<Link href='/cestinha'>
                <a>
                    <div className='absolute right-0 px-8 mt-6 bg-red-400 rounded-md font-body' style={{ backgroundColor: '#6f9eaf' }}>
                        <p className='text-center mb-2'>Meus produtos</p>
                        {Object.keys(cart.cart).map(key => {
                            const { product, quantity } = cart.cart[key]
                            return (
                                <>
                                    {(quantity >= 1) ? (
                                        <ul>
                                            <li>{quantity} {product.data.name} </li>
                                        </ul>
                                    ) : null}
                                </>)
                        })}
                    </div>
                </a>
            </Link>)}
        </div>
    )
}

export default BasketFloat