import React from "react";

import * as S from './Style.jsx';

function Home(){
    return(
        <S.SessaoContainer>
            <S.DivConteudo>
                <h1 className="titulo">Bem Vindo ao mini-game</h1>
                <p className="paragrafo">Bem-vindo ao Minigame de Sequência de Teclas! Teste seus reflexos e memória seguindo uma sequência aleatória
                de letras exibida na tela. Pressione as teclas na ordem correta dentro do tempo limite para vencer. Se errar ou o tempo acabar,
                o jogo termina. Boa sorte!
                </p>

                <button id="botaoIniciar">Inicial Jogo</button>
            </S.DivConteudo>
            
        </S.SessaoContainer>
    )
}

export default Home