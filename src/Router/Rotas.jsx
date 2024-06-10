import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../pages/Home.jsx/Home.jsx';
import Game from "../pages/Game.jsx/Game.jsx";

const Rotas = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/game" element={<Game/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;

