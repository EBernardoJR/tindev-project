const { Schema, model } = require('mongoose')

const devSchema = new Schema({
    name: {
        type: String,
        required: true,
    }, 
    user: {
        type: String,
    },
    bio: String,
    avatar: {
        type: String, //vai armazenar o endereço da imagem
        required: true,
    }, 
    //colocando os likes / o [] quer dizer que é um vetor e vai referenciar vários usuarios
    likes: [{
        type: Schema.Types.ObjectId, //vai referenciar pelo id
        ref: 'Dev' //qual model está se referenciando a tabela de dev
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }]
},
{
        timestamps: true,
})

module.exports = model('Dev', devSchema)


