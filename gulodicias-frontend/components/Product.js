import { useCart } from "./CartContext"

const Product = ({ product }) => {
    const cart = useCart()

    const add = product => () => {
        cart.addToCart(product)
    }

    return (
        <section className="flex justify-items-stretch flex-col  md:flex-row mx-auto   bg-gray-100 py-10 px-5 bg-white rounded-md shadow-lg w-11/12 md:max-w-2xl">
            <div className="text-indigo-500 flex flex-col justify-between">
                <img src={product.data.image.url} alt="" />
            </div>
            <div className="text-indigo-500 ml-4">
                <small className="uppercase">Uma gostosura </small>
                <h3 className="text-black text-2xl font-medium font-body">{product.data.name}</h3>
                <h3 className="text-2xl font-semibold mb-7">R$ {Number(product.data.price).toFixed(2).replace('.', ',')}</h3>
                <small className="text-black">Bem relaxante.</small>
                <div className="flex gap-0.5 mt-4">
                    <button
                        onClick={add(product)}
                        id="addToCartButton"
                        className="bg-indigo-500 hover:bg-indigo-500 focus:outline-none rounded-md transition text-white uppercase px-8 py-3"
                    >   Quero &nbsp;&nbsp;  😋
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Product