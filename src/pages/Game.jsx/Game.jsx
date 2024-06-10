import React, { useState } from "react";

import * as S from './Style.jsx'

function Game(){
    const [nome, setNome] = useState('');
    const [jogoIniciado, setJogoIniciado] = useState(false);
    const [mostrarMensagem, setMostrarMensagem] = useState(true);

    const handleNomeSubmit = (event) => { // funcão para receber o  nome do jogador
        event.preventDefault();
        setJogoIniciado(false);

        setTimeout(() =>{
            setMostrarMensagem(false);
        }, 3000)
    }

    document.addEventListener('keydown', function(event) { // verificando qual tecla foi precionada
        let teclaPressionada = event.key;
        console.log('Tecla pressionada: ' + teclaPressionada);
    });

    return(
        <S.SessaoGame>

            <S.DivGame>
                <h2>MINI-GAME</h2>

                {jogoIniciado ? (
                    <form onSubmit={handleNomeSubmit}>
                        <label>Digite seu nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                        <button type="submit">enviar</button>
                    </form>
                ) : (
                    nome && mostrarMensagem &&
                    (<p>Bem - vindo ao jogo {nome}</p>)
                )}
                <button id="botaoIniciar" onClick={() => setJogoIniciado(true)}>Iniciar</button>

                
            </S.DivGame>


        </S.SessaoGame>
    )
}

export default Game;