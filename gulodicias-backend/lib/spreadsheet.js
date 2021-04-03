require('dotenv').config({ path: '../.env.homolog' })

const { GoogleSpreadsheet } = require('google-spreadsheet')


const doc = new GoogleSpreadsheet('1vUoZ-r02XjHZZXu-KoCCkJp0TYq39VBF9Z9_Fz2PAaw')

const credenciais = require('../credentials.json')

const saveOrder = async (order) => {

    await doc.useServiceAccountAuth({
        client_email: process.env.EMAIL_GOOGLE_API,
        private_key: credenciais.private_key
    })
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[1]
    console.log(order)
    const orderId = order.id

    const total = order.items.reduce((prev, curr) => {
        return prev + curr.price * curr.quantity
    }, 0)
    const rows = order.items.map(item => {
        const row = {
            'Pedido': orderId,
            'Cliente': order.name,
            'Telefone': order.phone,
            'Produto': item.name,
            'Quantidade': item.quantity,
            'Preço Unitário': item.price,
            'Subtotal': item.price * item.quantity,
            'Total do Pedido': total,
            'Status': 'Aguardando Pagamento',
            'cpf': order.cpf
        }
        return row
    })

    await sheet.addRows(rows)

}
module.exports = {
    saveOrder
}