import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './pages/Login'
import Main from './pages/main'

export default function Routes(){
    return (
        <BrowserRouter>
        <Route path="/" exact component={Login}/>
        <Route path="/dev/:id" component={Main}/> 
        </BrowserRouter>
    )
}
//quando a rota for '/' o componente será...