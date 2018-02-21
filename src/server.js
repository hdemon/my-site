const fs = require('fs')
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send(fs.readFileSync('dist/index.html').toString()))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
