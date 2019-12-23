import React, { useEffect, useState } from 'react'
import { SafeAreaView, View,Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'
import logo from "../assets/logo.png"
import like from "../assets/like.png"
import dislike from "../assets/dislike.png"


export default function Main({ navigation }){
    const id = navigation.getParam('user')
    //busca dos usuários (código do frontend)
    const [ users, setUsers ] = useState([])//o [] vai armazenar vários usuarios

    
    //vai buscar os dados dos usuáriose vai armazena-los para poder ser mostrado em tela
    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs', { //rota do server do backend
                headers:{ 
                    user: id, //assim como foi visto no backend, o user que ta logado
                }
            })
            
            setUsers(response.data) //vai preencher o estado com os dados obtidos, e quando muda o seu valor ele faz uma nova redenrização do zero pra identifciar as alterações
            
        }
        
        
        loadUsers()//vai ser executada
        
        
        
    }, [id])//o primeiro parametro é qual função executar e o segundo é quando executar
    //toda vez que o id for alterado essa função será executada
    
    
 
    async function handleLike(){
        //pegando o primeiro usuário do array
        const [user, ... rest] = users//ta pegando o primeiro usuário e armazenando o resto na variavel rest!!! user = users[0]
        //para tirar so o id do usuário [{ _id }] => desestruturação

        await api.post(`/devs/${user._id}/likes`, null, {
            headers: { user: id } //usuário que deu like
        })

    
        //removendo o usuário que recebeu like
        //setUsers(users.filter(user => user._id !== id))//vai preencher com aqueles que o id seja diferente do passado como parametro
        //como o resto dos usuários foram para variavel rest, então não precisa filtrar, é so preencher o users com o REST

        setUsers(rest)
    }                       //id de quem recebeu o dislike
    async function handledislike(){      //corpo da requisição(porque é metodo post)
        const [user, ... rest] = users
        
        await api.post(`/devs/${user._id}/dislikes`, null, {
            headers: { user: id } //usuário que deu dislike
        })

        

        //removendo o usuário que levou dislike
        //setUsers(users.filter(user => user._id !== id))
        setUsers(rest)
    }


    async function Logout(){
        //limpando o usuário da memoria
        await AsyncStorage.clear()

        //voltar para home
        navigation.navigate('Login')
    }

    return(
        <SafeAreaView style={styles.container}>

            <TouchableOpacity onPress={Logout}>
             <Image source={logo}/>
             </TouchableOpacity>

            <View style={styles.cardsContainer}>
                
                { users.length === 0 ? 
            <Text style={styles.empty}>Sem novos usuarios no momento</Text> :
            
           ( users.map((user, index) => (
            <View key={user._id}style={[styles.card, { zIndex: users.length - index }]}>
                <Image style={styles.avatar}  source={{ uri: user.avatar }} />
                <View style={styles.footer}>
                    <Text style={styles.username}>{user.name}</Text>
                <Text style={styles.bio} numberOfLines={2}>{user.bio}</Text>
                </View>
            
            </View>
            ))   
           )}
                
            </View>
            {users.length > 0 && <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handleLike} style={styles.buttons}><Image source={like} /></TouchableOpacity>
                <TouchableOpacity onPress={handledislike}style={styles.buttons}><Image source={dislike} /></TouchableOpacity>
            </View>}
        </SafeAreaView>
    )
}

//o users.length > 0 && ... significa que so irá renderizar se o numero de usuário for maior que 0

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between', //vai adicionar um espaço entre os elementos(o do meio sempre vai ficar centralizado)
        padding: 20
    },

    empty:{
        alignSelf: "center",
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold',
    },
    cardsContainer:{
        flex: 1,//vai ocupar todo o espaçi do centro
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,

    },
    card:{
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',// o primeiro card vai sobrepor od demais
        //ocupar o todo espaço possivel do cardscontainer
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    avatar:{
        flex: 1,
        height: 300,
    },
    footer:{
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,

    },
    username:{
      fontSize: 16,
      fontWeight: 'bold',
      color: "#333"
    },
    bio:{
        fontSize: 14,
        color: "#999",
        marginTop: 5,
        lineHeight: 18


    },
    buttonsContainer:{
        flexDirection: 'row',
        marginBottom: 30,
    },
    buttons:{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#FFF",
        justifyContent: 'center',
        alignItems: "center",
        marginHorizontal: 20,
        //sombra/ shadow
        
        //android:
        elevation: 2,

        //ios
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,

        shadowOffset:{
            width: 0,
            height: 2
        }
    }
})