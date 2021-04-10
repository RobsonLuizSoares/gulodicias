import Link from 'next/link'

import Menu from "./Menu"
import BasketFloat from '../components/BasketFloat'
const Header = () => {

    return (
        <div className='flex w-full fixed top-0' style={{ backgroundColor: '#6a4798' }}>
            <Link href='/'>
                <a>
                    <div className='w-3/4 px-20 py-4'>
                        <img src='../novologo.png' alt='Gulodícias' />
                    </div>
                </a>
            </Link>
            <div className='flex w-1/2 md:ml-32'>
                <div className=' my-4 mx-auto '>
                    <Menu />
                </div>
                <div className='w-1/2'>
                    <BasketFloat />
                </div>
            </div>
        </div>
    )
}

export default Header