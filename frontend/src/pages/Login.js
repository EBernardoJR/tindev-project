import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import './Login.css'
//importando API
import api from '../services/Api'


export default function Login({ history }) {
    // acessaor o valor / modificar o valor de username
    const [username, setUsername]= useState('')


    async function handleSubmit(e) {
        e.preventDefault()
        
        const response = await api.post('/devs', {
            username,
        }) //requisitar as rotas do backend

        // pegando o id
        const { _id } = response.data

        

        history.push(`/dev/${_id}`) //assim que acontecer o submit vai para esssa rota
    }   



    return (
        <div className="login-container">
        <form onSubmit={handleSubmit}>
            <img src={logo} alt="tindev" />
            <input 
            type="text" 
            placeholder="Digite seu usuário"
            value={username}//o valor que vai com o submit desse form
            onChange={evento => setUsername(evento.target.value) //como não retornar o valor, tem que fazer isso
            } //disparada toda vez que tiver alteração no input
            required/>
            <button type="submit">Enviar</button>
        </form>
        </div>
    )
}

 