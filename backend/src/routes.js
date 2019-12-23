const express = require('express')
const Routes = express.Router()
const devController = require('./controllers/devController')
const likeController = require('./controllers/likeController')
const dislikesController = require('./controllers/dislikesController')

//criando o usuario
Routes.post('/devs', devController.store)
//listando os usuários que ainda não deu like
Routes.get('/devs', devController.index) //o index é usando para listagem

//colocando os likes e deslikes
Routes.post('/devs/:devId/likes', likeController.store)
Routes.post('/devs/:devId/dislikes', dislikesController.store)


module.exports = Routes