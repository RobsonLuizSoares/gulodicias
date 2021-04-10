import Link from 'next/link'

import { useCart } from './CartContext'

import BagIcon from './icons/BagIcon'

const Menu = () => {

    const cart = useCart()

    const itemsCount = Object.keys(cart.cart).reduce((prev, curr) => {
        return prev + cart.cart[curr].quantity
    }, 0)
    return (
        <div>
            <div className='flex w-full pt-12 '>
                <div className='px-3 py-1 transition duration-150 hover:bg-indigo-300 hover:text-gray-800 font-semibold hover:border-gray-800 text-white mx-2 border border-white rounded-md '><Link href='/'><a >Início</a></Link></div>
                <div className='px-3 py-1 transition duration-150 hover:bg-indigo-300 hover:text-gray-800 font-semibold hover:border-gray-800 text-white mx-2 border border-white rounded-md '><Link href='/contato'><a >Contato</a></Link></div>
                <div className='flex w-32'>
                    <Link href='/cestinha'>
                        <div className='px-3 py-1 transition duration-150 hover:bg-indigo-300 hover:text-gray-800 font-semibold hover:border-gray-800 text-white mx-2 border border-white rounded-md flex cursor-pointer'>
                            <>
                                <a className='mr-2'>Cestinha</a>
                                <BagIcon />
                                {itemsCount > 0 && <span>({itemsCount})</span>}
                            </>
                        </div>
                    </Link>
                    <div>
                    </div>
                </div>
            </div>
            <p className='text-white mt-4 italic'>Por uma vida mais doce, macia e fofinha </p>
        </div>
    )
}

export default Menu