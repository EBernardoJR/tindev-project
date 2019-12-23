import React, { useEffect, useState }from 'react'; //useeffect é uma função e o usestate é para acessar os dados, smpre usar
import logo from '../assets/logo.svg'
//importando like e dislike
import dislike from '../assets/dislike.svg'
import like from '../assets/like.svg'
import './main.css'
import api from '../services/Api'
import { Link } from 'react-router-dom'




                            //dentro de match é passado todos os parametros da rota
export default function Main({ match }) {

    const [ users, setUsers ] = useState([])//o [] vai armazenar vários usuarios

    
    //vai buscar os dados dos usuáriose vai armazena-los para poder ser mostrado em tela
    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs', { //rota do server do backend
                headers:{ 
                    user: match.params.id, //assim como foi visto no backend, o user que ta logado
                }
            })
            
            setUsers(response.data) //vai preencher o estado com os dados obtidos, e quando muda o seu valor ele faz uma nova redenrização do zero pra identifciar as alterações
            
        }
        
        
        loadUsers()//vai ser executada
        
        
        
    }, [match.params.id])//o primeiro parametro é qual função executar e o segundo é quando executar
    //toda vez que o id for alterado essa função será executada
    
    
 
    async function handleLike(id){
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id } //usuário que deu like
        })

        console.log(`${match.params.id} deu like em  ${id}`)

        //removendo o usuário que levou like
        setUsers(users.filter(user => user._id !== id))

    }                       //id de quem recebeu o dislike
    async function handledislike(id){      //corpo da requisição(porque é metodo post)
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id } //usuário que dei dislike
        })

        console.log(`${match.params.id} deu dislike em  ${id}`)

        //removendo o usuário que levou dislike
        setUsers(users.filter(user => user._id !== id))
    }


    return(
       <div className="main-container">
          <Link to="/">
          <img src={logo} alt="logo"/>
          </Link> 
            {/* (  se a o numero de usuario for maior que 0 */}
           { users.length > 0 ? (             
               <ul>
                   {/*percorrendo os dados do users */}
               {users.map(usuario => (
                    <li key={usuario._id}>
                    <img src={usuario.avatar} alt="icone"/>
                    <footer>
                        <strong>{usuario.name}</strong>
                        <p>{usuario.bio}</p>
                    </footer>
                    <div className="buttons">      {/*pra funcionar a funcao tem que usar arrow antes */}
                        <button type="button" onClick={() => handledislike(usuario._id)}><img src={dislike} alt="dislike"/></button>
                        <button type="button" onClick={() => handleLike(usuario._id)}><img src={like} alt="like"/></button>
                    </div>
                </li>

               ))}
               
           </ul>
           ) : <div className="without">Sem novos usuários no momento :(</div>}
       </div>
    )

}
  
