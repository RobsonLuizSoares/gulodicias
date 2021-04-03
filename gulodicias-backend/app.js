const express = require('express')
const cors = require('cors')

const { saveOrder } = require('./lib/spreadsheet')
const { createPixCharge } = require('./lib/pix')

const app = express()


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send({ ok: true })
})

app.post('/create-order', async (req, res) => {
    const pixCharge = await createPixCharge(req.body)
    const { qrcode, billing } = pixCharge
    await saveOrder({ ...req.body, id: billing.txid })
    res.send({ ok: 1, qrcode, billing })
})

module.exports = app