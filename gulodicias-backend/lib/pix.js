
console.log(process.env.GN_ENV)

const https = require('https')
const axios = require('axios')
const fs = require('fs')

const apiProduction = 'https://api-pix.gerencianet.com.br'
const apiStaging = 'https://api-pix-h.gerencianet.com.br'

const baseURL = process.env.GN_ENV === 'production' ? apiProduction : apiStaging


const getToken = async () => {
    const certified = fs.readFileSync('../' + process.env.GN_CERTIFIED)
    const credentials = {
        client_id: process.env.GN_CLIENT_ID,
        client_secret: process.env.GN_CLIENT_SECRET
    }

    const data = JSON.stringify({ grant_type: 'client_credentials' })
    const data_credentials = credentials.client_id + ':' + credentials.client_secret
    const auth = Buffer.from(data_credentials).toString('base64')

    const agent = new https.Agent({
        pfx: certified,
        passphrase: ''
    })

    const config = {
        method: 'POST',
        url: baseURL + '/oauth/token',
        headers: {
            Authorization: 'Basic ' + auth,
            'Content-type': 'application/json'
        },
        httpsAgent: agent,
        data: data
    }
    //  try {
    const result = await axios(config)
    return result.data

    // } catch (error) {
    //     console.log('ERRO: ', error)
    // }
}

const createCharge = async (accessToken, chargeData) => {
    try {
        const certified = fs.readFileSync('../' + process.env.GN_CERTIFIED)
        const data = JSON.stringify(chargeData)

        const agent = new https.Agent({
            pfx: certified,
            passphrase: ''
        })

        const config = {
            method: 'POST',
            url: baseURL + '/v2/cob',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-type': 'application/json'
            },
            httpsAgent: agent,
            data: data,
        }

        const result = await axios(config)
        return result.data

    } catch (error) {
        console.log('Error ', error)
    }
}

const getLoc = async (accessToken, locId) => {
    try {
        const certified = fs.readFileSync('../' + process.env.GN_CERTIFIED)

        const agent = new https.Agent({
            pfx: certified,
            passphrase: ''
        })

        const config = {
            method: 'GET',
            url: baseURL + '/v2/loc/' + locId + '/qrcode',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-type': 'application/json'
            },
            httpsAgent: agent,
        }

        const result = await axios(config)
        return result.data

    } catch (error) {
        console.log('Error ', error)
    }
}

const createPixCharge = async () => {
    const keyPix = process.env.KEY_PIX
    const token = await getToken()
    const accessToken = token.access_token

    const billingData = {
        calendario: {
            expiracao: 3600,
        },
        devedor: {
            cpf: '12345678909',
            nome: 'Robson Luiz'
        },
        valor: {
            original: '0.15',
        },
        chave: keyPix,
        solicitacaoPagador: 'Cobrança das docuras',
    }

    const billing = await createCharge(accessToken, billingData)

    const qrcode = await getLoc(accessToken, billing.loc.id)

    return { qrcode, billing }
}


const createWebhook = async () => {
    const keyPix = process.env.KEY_PIX
    const token = await getToken()
    const accessToken = token.access_token

    const certified = fs.readFileSync('../' + process.env.GN_CERTIFIED)
    const data = JSON.stringify({
        webhookUrl: 'https://api-gulodicias.liberty.app.br/webhook/pix'
    })

    const agent = new https.Agent({
        pfx: certified,
        passphrase: ''
    })

    const config = {
        method: 'PUT',
        url: baseURL + '/v2/webhook/' + keyPix,
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-type': 'application/json'
        },
        httpsAgent: agent,
        data: data,
    }

    const result = await axios(config)
    return result.data

}


module.exports = {
    createPixCharge,
    createWebhook
}




