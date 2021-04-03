require('dotenv').config({ path: '../.env.production' })


const https = require('https')
const fs = require('fs')
const app = require('./app')
const options = {
    //tls
    key: fs.readFileSync('/etc/letsencrypt/live/api-gulodicias.liberty.app.br/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/api-gulodicias.liberty.app.br/fullchain.pem'),
    //mtls
    ca: fs.readFileSync('./ca-gerencianet.crt'), // gerencianet
    minVersion: 'TLSv1.2',
    requestCert: true,
    rejectUnauthorized: false,

}


const server = https.createServer(options, app)
server.listen(443)


