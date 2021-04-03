require('dotenv').config({ path: '../.env.homolog' })

const { GoogleSpreadsheet } = require('google-spreadsheet')


const doc = new GoogleSpreadsheet('1vUoZ-r02XjHZZXu-KoCCkJp0TYq39VBF9Z9_Fz2PAaw')

const credenciais = require('./credentials.json')

const run = async () => {

    await doc.useServiceAccountAuth({
        client_email: process.env.EMAIL_GOOGLE_API,
        private_key: credenciais.private_key
    })
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[1]
    await sheet.addRows([
        {
            'Pedido': 12345,
            'Cliente': 'Dafne Petry',
            'Telefone': '48 98520303',
            'Produto': 'Bolo de Banana',
            'Quantidade': 1,
            'Subtotal': 45,
            'Total do Pedido': 45,
            'Status': 'Aguardando Pagamento'
        }
    ])

}
run()