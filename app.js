const express = require('express')

const pabloRouter = require('./routers/pablo')

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/pablos', pabloRouter)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
