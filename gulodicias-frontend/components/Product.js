import { useCart } from "./CartContext"

const Product = ({ product }) => {
    const cart = useCart()

    const add = product => () => {
        cart.addToCart(product)
    }

    return (
        <section className="flex justify-items-stretch flex-col  md:flex-row mx-auto   bg-red-100 py-10 px-5 bg-white rounded-md shadow-lg w-11/12 md:max-w-2xl">
            <div className="text-indigo-500 flex flex-col justify-between">
                <img src={product.data.image.url} alt="" />
            </div>
            <div className="text-indigo-500">
                <small className="uppercase">Uma gulodícia </small>
                <h3 className="uppercase text-black text-2xl font-medium">{product.data.name}</h3>
                <h3 className="text-2xl font-semibold mb-7">R$ {product.data.price}</h3>
                <small className="text-black">Uma delícia de doce.</small>
                <div className="flex gap-0.5 mt-4">
                    <button
                        onClick={add(product)}
                        id="addToCartButton"
                        className="bg-indigo-600 hover:bg-indigo-500 focus:outline-none rounded-md transition text-white uppercase px-8 py-3"
                    >Quero 😋
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Product