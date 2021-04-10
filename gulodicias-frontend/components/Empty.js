import Link from 'next/link'

const Empty = () => {
    return (
        <div className='flex flex-col mt-4  pt-60'>
            <div className='w-full md:mt-4 lg:my-12 shadow shadow-sm rounded-md border border-gray-200'>
                <h1 className='text-center sm:text-xs text-3xl lg:text-4xl md:py-4' style={{ color: '#536162' }}>Sua cestinha de gulodícias e gostosuras está vazia 😭</h1>
                <h3 className='text-center text-2xl md:py-6' style={{ color: '#536162' }}>Sem problemas, clique no botão para ir direto para o nosso delicioso menu 😋</h3>
            </div>
            <div className='flex mx-auto'>
                <button className='py-2 px-4 bg-blue-300 shadow shadow-md rounded-md text-2xl border border-gray-200 hover:bg-blue-200 hover:bg-blue-500 hover:text-white'>
                    <Link href='/'>
                        <a>Ver o Menu</a>
                    </Link>
                </button>
            </div>
        </div>
    )

}

export default Empty