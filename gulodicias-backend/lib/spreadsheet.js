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
            'cpf': 'order.cpf'
        }
        return row
    })

    await sheet.addRows(rows)

}

const updateOrder = async (orderId, status) => {
    await doc.useServiceAccountAuth({
        client_email: process.env.EMAIL_GOOGLE_API,
        private_key: credenciais.private_key
    })
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[1]
    const maxRows = sheet.rowCount
    await sheet.loadCells('A1:A' + maxRows)
    await sheet.loadCells('H1:I' + maxRows)
    const validIndex = [...Array(maxRows - 1).keys()]

    for await (let i of validIndex) {
        const cell = sheet.getCell(1 + i, 0)
        if (cell.value) {
            if (cell.value === orderId) {
                console.log(1 + i, cell.value)
                const statusCell = await sheet.getCell(1 + i, 8)
                statusCell.value = status
            }
        } else {
            break
        }
    }
    await sheet.saveUpdatedCells()
}


module.exports = {
    saveOrder,
    updateOrder
}