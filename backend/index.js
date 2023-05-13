const connectToMongo = require('./db');
connectToMongo;
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
// available routes 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('this is index file')
})

app.listen(port, () => {
  console.log(`iNoteBook app backend listening on port ${port}`)
})