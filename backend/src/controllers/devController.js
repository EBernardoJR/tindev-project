const axios = require('axios')
//importando no bd
const Dev = require('../models/devs')



module.exports = {
    //listagem de usuario
    async index(req, res){
        const { user } = req.headers //pegar o (id)usuario logado

        const loggedUser = await Dev.findById(user)//pegar os dados do usuário logado

        //serão listados os usuarios que o usuario logado não deu like ou dislikes, e que mão seja ele msm
        const users = await Dev.find({
            //a condição tem que passar nos 3 filtros
            $and: [        //$ne significar NOT EQUAL, não seja igual o id passado no user 
                { _id: { $ne: user }},//que o id não seja o id do usuario logado

                { _id: { $nin: loggedUser.likes }},//todos os os usuarios que ele deu like; o $nin significa NOT IN

                { _id: { $nin: loggedUser.dislikes }},
            ],
        })

        return res.json(users) //vai retornar todos usuários
    },




    async store(req, res) { //criar os usuarios
        const { username } = req.body
       
        //verificando se o usuário existe no banco de dados
        const userExists = await Dev.findOne({ user: username })
        
        if (userExists) {
            console.log(`usuário ${username} ja existe, entrando no perfil...`)
            return (
                res.json(userExists))
        }

        //acessando a api do github
        const response = await axios.get(`https://api.github.com/users/${username}`)
        //o await vai dizer que o node precisa esperar a linha executar pra dps sair e executar a linha abaixo, so funciona em função assicrona, colocando o async no começo dela

        
        //desestruturando o response para obter: name, bio, avatar

        const { name, bio, avatar_url: avatar } = response.data
        //colocando as informações    /o avatar_url passou a se chamar avatar

        const devUser = await Dev.create({
            name, 
            user: username,
            bio, 
            avatar
        })

        console.log(`usuário "${devUser.name}" cadastrado`)
        return res.json(devUser)
        
    }
}