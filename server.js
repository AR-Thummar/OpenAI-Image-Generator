const express = require('express')
const cors = require('cors');

require('dotenv').config()

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/openai/image', require('./routes/image'))

const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`Server is running on ${PORT}...`))