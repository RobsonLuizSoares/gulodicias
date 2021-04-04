const express = require('express')
const cors = require('cors')

const { saveOrder, updateOrder } = require('./lib/spreadsheet')
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

app.post('/webhook/pix*', async (req, res) => {
    console.log('webhook received')

    const { pix } = req.body
    if (!req.client.authorized) {
        return res.status(401).send('Invalid client certificate')
    }

    await updateOrder(pix[0].txid, 'Pago com PIX')
    res.send({ Ok: 1 })
})


/* 
{
  pix: [
    {
      endToEndId: 'E18236120202104042133s1225391O6Z',
      txid: '110f9bed2fe348908393ebb193542ed4',
      chave: 'robsonptrainer@gmail.com',
      valor: '0.12',
      horario: '2021-04-04T21:33:25.000Z'
    }
  ]
}

*/

module.exports = app