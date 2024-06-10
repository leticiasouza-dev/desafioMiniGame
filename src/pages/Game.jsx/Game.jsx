import React, { useState } from "react";

import * as S from './Style.jsx'

function Game(){
    const [nome, setNome] = useState('');
    const [jogoIniciado, setJogoIniciado] = useState(false);

    const handleNomeSubmit = (event) => { // funcão para receber o  nome do jogador
        event.preventDefault();
        setJogoIniciado(false);

        console.log(nome)
    }


    return(
        <S.SessaoGame>

            <S.DivGame>
                <h2>MINI-GAME</h2>
                <button id="botaoIniciar" onClick={() => setJogoIniciado(true)}>Iniciar</button>

                {jogoIniciado && (
                    <form onSubmit={handleNomeSubmit}>
                        <label>Digite seu nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                        <button type="submit">enviar</button>
                    </form>
                )}
            </S.DivGame>


        </S.SessaoGame>
    )
}

export default Game;