const express = require('express')
const mongoose = require('mongoose') //sempre antes das rotas
const cors = require('cors')
const routes = require('./routes')
const Servidor = express()

mongoose.connect('mongodb+srv://omnistack_1:omnistack@omnistack-frk0z.mongodb.net/omnistack1?retryWrites=true&w=majority', { useNewUrlParser: true}) //connectando ao bd
                                                                                 
Servidor.use(express.json())//so vai chegar informação em json


Servidor.use(cors())//tem que ta antes das rotas
Servidor.use(routes) //vai usar as rotas

Servidor.listen(3333, () => console.log('servidor do TINDEV rodando na porta: 3333'))  
                         