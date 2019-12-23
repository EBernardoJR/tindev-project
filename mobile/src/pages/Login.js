import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform,Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import logo from "../assets/logo.png"
import api from '../services/api'


export default function Login({ navigation }){
    const [user, setUser] = useState('');
        
    useEffect(()=>{
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', { user })
            }
        })
    }, [])//se o segundo parametro estiver com um array vazio a função só irá funcionar uma unica vez, quando o componente for exibido em tela

    async function handleLogin(){
        const response = await api.post('/devs', { username: user})

        const { _id } = response.data

        //save user on phone memory
        await AsyncStorage.setItem('user', _id)//it's only save string or number. If it's an oject or array then to transform it to JSON

        navigation.navigate('Main', { user: _id })
    }

    
    return(
        <KeyboardAvoidingView //it only works on IOS
        behavior="padding"
        enabled={Platform.OS == 'ios'}
        style={styles.container}>
            <Image source={logo}/>
            <TextInput style={styles.input} 
            placeholder="Digite seu usuário do github" 
            autoCapitalize="none"
            autoCorrect={false}
            value={user}
            onChangeText={setUser}//when the input text changes
            />
            <TouchableOpacity 
            onPress={handleLogin}
            style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //ocupou toda a tela
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        padding: 30
    },
    input: {
        height: 46,
        alignSelf: 'stretch',//vai ocupar toda largura possivel
        backgroundColor: "#FFF",
        borderWidth: 2,//largura da borda
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },
    button:{
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: "#df4723",
        borderRadius: 4,
        marginTop: 10,

        alignItems: "center",
        justifyContent: "center",

    },
    buttonText:{
        color: "#FFF",
        fontSize: 17,
        fontWeight: "bold"
    }
})