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
    const maxRows = sheet.rowCount
    await sheet.loadCells('A1:A' + maxRows)
    await sheet.loadCells('H1:H' + maxRows)
    const validIndex = [...Array(maxRows - 1).keys()]

    const orderId = 12345

    const status = 'Pago com Pix'

    for await (let i of validIndex) {
        const cell = sheet.getCell(1 + i, 0)
        if (cell.value) {
            if (cell.value === orderId) {
                console.log(1 + i, cell.value)
                const statusCell = await sheet.getCell(1 + i, 7)
                statusCell.value = status
            }
        } else {
            break
        }
    }
    await sheet.saveUpdatedCells()

}
run()