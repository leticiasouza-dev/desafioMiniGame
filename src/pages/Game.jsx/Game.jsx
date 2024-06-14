import React, { useState } from "react";

import * as S from './Style.jsx';
import { useNavigate  } from "react-router-dom";

function Game(){
    const [nome, setNome] = useState('');
    const [jogoIniciado, setJogoIniciado] = useState(false); 
    const [letras, setLetras] = useState([]);
    const letrasSorteadas = [];
    const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    //estados para as mensagem e elementos de tela
    const [mostrarMensagem, setMostrarMensagem] = useState(true); // mostrar a mensagem com o nome do jogador
    const [mostrarBtnIniciar, setMostrarBtnIniciar] = useState(true);
    const [mostrarBtnTentarNovamente, setMostrarBtnTentarNovamente] = useState(false);
    const [mostrarBtnSair, setBtnSair] = useState(false);
    const [mensagemInformacao, setMensagemInformacao] = useState('')


    const handleNomeSubmit = (event) => { // funcão para receber o  nome do jogador
        event.preventDefault();
        setJogoIniciado(false);

        setTimeout(() =>{
            setMostrarMensagem(false);
            sortearLetras();
        }, 3000)

        
    }

    const sortearLetras = () =>{
        for(let i = 0; i < 5; i++){
            const indice = Math.floor(Math.random() * alfabeto.length); 
            letrasSorteadas.push(alfabeto[indice]);
        }

        setLetras(letrasSorteadas);
        return letrasSorteadas;
    }


    const renderizacaoConteudo = () => {
        if(jogoIniciado){
            return (
                <form onSubmit={handleNomeSubmit} className="formularioNome">
                        <label>Digite seu nome Jogador(a)</label>
                        <input 
                            type="text" 
                            value={nome} 
                            onChange={(e) => setNome(e.target.value)}>
                        </input>
                        <button type="submit" id="btnEnvioNome">enviar</button>
                    </form>
            ); 
        } else if (nome && mostrarMensagem){
            return <p>Bem - vindo ao jogo {nome}</p>
        } 
    }


    document.addEventListener('keydown', function(event) { // verificando qual tecla foi precionada

        let teclaPressionada = event.key.toLocaleLowerCase();
        verificarTecla(teclaPressionada);
    
    });

    

    let indiceAtual = 0;
    function verificarTecla(teclaPressionada) {
    
        function teclaCorreta() {
            console.log("Tecla correta");
        }

        function teclaIncorreta () {
            console.log("Tecla incorreta. Você perdeu!");
            setMostrarBtnTentarNovamente(true);
            setBtnSair(true);
        }

        function sequenciaCompleta() {
            console.log("Sequência completa! Parabéns!");
        
            indiceAtual = 0; 

            // ver a pontuação, jogar novamente
        }

       

        if (teclaPressionada === letrasSorteadas[indiceAtual].toLocaleLowerCase()) {
            teclaCorreta();
            setMensagemInformacao('Tecla Correta');
            indiceAtual++;
            if (indiceAtual === letrasSorteadas.length) {
                sequenciaCompleta();
                setMensagemInformacao('Sequencia incorreta')
            }
        } else {
            setMensagemInformacao('teclaIncorreta')
            teclaIncorreta();
            indiceAtual = 0;
        } 
}

    const navigate = useNavigate();
    const handleSairClick = () => {
        navigate('/');
    }

    const handleTentarNovamenteClick = () => {
        const novasLetras = sortearLetras();
        setLetras(novasLetras);
        setMostrarBtnTentarNovamente(false);
        setBtnSair(false);
        setJogoIniciado(false);
        setMensagemInformacao('');
    };


    return(
        <S.SessaoGame>

            <S.DivGame>
                <h2>MINI-GAME</h2>

                {renderizacaoConteudo()}
                {mostrarBtnIniciar && (
                    <button id="botaoIniciar" onClick={() => {setJogoIniciado(true); setMostrarBtnIniciar(false) }}>Iniciar</button>
                    
                )}
                
                {letras.length > 0 && (
                    <>
                        <p>Precione as teclas na ordem correta</p>
                        {letras.map((letras, index) =>(
                            <span key={index}>{letras}</span>
                        ))}
                    </>
                )}

                {mostrarBtnTentarNovamente && mostrarBtnSair &&
                    <>
                    <p>Você errou {mensagemInformacao}</p>
                    <button onClick={handleTentarNovamenteClick}>Tentar novamente</button>
                    <button onClick={handleSairClick}>Sair</button>
                    </>
                }

            </S.DivGame>

            

        </S.SessaoGame>
    )
}

export default Game;