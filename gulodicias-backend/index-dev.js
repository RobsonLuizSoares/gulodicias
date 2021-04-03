require('dotenv').config({ path: '../.env.production' })

const Port = process.env.PORT || 3001
const app = require('./app')

app.listen(Port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server running on port ${Port}`)
    }
})