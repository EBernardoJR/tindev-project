const Dev = require('../models/devs')


module.exports = {
    async store(req, res) {
        //pegando o id pelo parametro
        //console.log(req.params.devId)//quem recebeu o like

        //console.log(req.headers.user)//quem deu o like

        const { devId } = req.params
        const { user } = req.headers

        //os dois models salvos no bd
        const loggedDev = await Dev.findById(user) //o usuário que ta logado
        const targetDev = await Dev.findById(devId) //o usuário alvo, quem vai receber o like

        //se quiser acessar todos os atributos dos usuários pode: loggeddev.avatar para acessar o avatar

        if (!targetDev){ //se ele tentar da like em um usuário que não existe 
            return res.status(400).json({ error: 'user not exists'})
        }
                  
        
        //vai verificar se o usuário que ta recendo o like ja deu like no que ta dando
        if (targetDev.likes.includes(loggedDev._id)){
            console.log('Deu match')
        }

        loggedDev.likes.push(targetDev._id) //como é um array pode aplicar o metodo push para adicionar algo

        await loggedDev.save() //toda vez que modificar uma informação do usuario tem que esperar para salvar

        return res.json(loggedDev)
    }
}