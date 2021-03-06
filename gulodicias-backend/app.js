const express = require('express')
const cors = require('cors')

const { saveOrder, updateOrder, getOrder } = require('./lib/spreadsheet')
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

app.get('/order/:txid', async (req, res) => {
    const status = await getOrder(req.params.txid)
    res.send({ ok: req.params.txid, status })
})

app.post('/webhook/pix*', async (req, res) => {
    console.log('webhook received')

    const { pix } = req.body
    if (!req.client.authorized) {
        return res.status(401).send('Invalid client certificate')
    }
    if (pix) {
        for await (let order of pix) {
            await updateOrder(order.txid, 'Pago com PIX')
        }
    }
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