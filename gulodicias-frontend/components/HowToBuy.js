const HowToBuy = () => {
    return (
        <div className='w-full font-body font-normal'>
            <div className='w-full md:mt-4 lg:my-12 shadow shadow-sm rounded-md border border-gray-200'>
                <h1 className='text-center sm:text-xs text-3xl lg:text-3xl md:py-4' style={{ color: '#536162' }}>Veja como é simples e seguro saborear suas gulodícias e gostosuras preferidas</h1>
                <h3 className='text-center text-2xl md:py-6' style={{ color: '#536162' }}>Sem dedo em teclado, sem pegar em dinheiro</h3>
                <h3 className='text-center text-2xl md:py-2' style={{ color: '#536162' }}>A sua gulodícia favorita em apenas um Pix</h3>
            </div>
            <div className='flex'>
                <div className='flex w-1/3 py-4 rounded-lg mt-1 mx-1 shadow shadow-sm' style={{ backgroundColor: '#b4aeb8' }}>
                    <div className='w-full'>
                        <div className=''>
                            <h3 className='text-center font-normal pb-3 text-2xl' style={{ color: '#252525' }}>Escolha suas gulodícias preferidas</h3>
                        </div>
                        <div className='bg-white h-full'>
                            <p className='text-center text-xl pt-6'>Olhe nosso delicioso menu e escolha sua gostosura.</p>
                            <p className='text-center text-xl pt-4'>Não passe vontade.</p>
                            <p className='text-center text-xl pt-4'>Quer? Clica em <strong>Quero</strong>, quantas vezes sua fome mandar</p>
                        </div>
                    </div>
                </div>
                <div className='flex w-1/3 py-4 rounded-lg mt-1 mx-1 shadow shadow-sm' style={{ backgroundColor: '#b4aeb8' }}>
                    <div className='w-full'>
                        <div>
                            <h3 className='text-center font-normal pb-3 text-2xl' style={{ color: '#252525' }}>Preencha seus dados</h3>
                        </div>
                        <div className='bg-white h-full'>
                            <p className='text-center text-xl pt-6'>Todo mundo gosta de gulodícias. Mas ninguém gosta de formulários.</p>
                            <p className='text-center text-xl pt-4'>Precisamos apenas o suficiente para identificarmos seu pedido e gerar seu Pix.</p>
                        </div>
                    </div>
                </div>
                <div className='flex w-1/3 py-4 rounded-lg mt-1 mx-1 shadow shadow-sm' style={{ backgroundColor: '#b4aeb8' }}>
                    <div className='w-full'>
                        <div>
                            <h3 className='text-center text-white font-normal pb-3 text-2xl' style={{ color: '#252525' }}>Pagamento</h3>
                        </div>
                        <div className='bg-white h-full'>
                            <p className='text-center text-xl pt-6'> Pagamento seguro com Pix!</p>
                            <p className='text-center text-xl pt-4'>Em alguns segundos, sem pegar em dinheiro nem apertar botão de maquininha, seu pagamento será aprovado e já estaremos trabalhando para entregar suas gostosuras </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HowToBuy