import React, { useEffect, useState } from "react";

import * as S from './Style.jsx';
import { useNavigate  } from "react-router-dom";

function Game(){
    const [nome, setNome] = useState('');
    const [jogoIniciado, setJogoIniciado] = useState(false); 
    const [letras, setLetras] = useState([]);
    const letrasSorteadas = [];
    const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const [teclasCorretas, setTeclasCorretas] = useState([])
    
    //estados para as mensagem e elementos de tela
    const [mostrarMensagem, setMostrarMensagem] = useState(true); // mostrar a mensagem com o nome do jogador
    const [mostrarBtnIniciar, setMostrarBtnIniciar] = useState(true);
    const [mostrarBtnTentarNovamente, setMostrarBtnTentarNovamente] = useState(false);
    const [mostrarBtnSair, setBtnSair] = useState(false);

    // const [mostrarTimer, setMostrarTimer] = useState(false);
    const [tempoRestante, setTempoRestante] = useState(5);
    const [btnResultado, setBtnResultado] = useState(false);


    const handleNomeSubmit = (event) => { // funcão para receber o  nome do jogador
        event.preventDefault();
        setJogoIniciado(false);

        setTimeout(() =>{
            setMostrarMensagem(false);
            sortearLetras();
            iniciarTemporizador();
        }, 3000 );

        
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
        } else if(letras.length > 0){
            return(
                <>
                                <article>
                                    <p>Tempo restante: {tempoRestante} segundos</p>
                                </article>
                                <div style={{ display: 'flex' }}>
                                    {letras.map((letra, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                backgroundColor: teclasCorretas[index] ? '#4caf50' : '#11111d',
                                                color: teclasCorretas[index] ? '#fff' : '#ffeb3b',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                margin: '5px',
                                                borderRadius: '5px'
                                            }}
                                        >
                                            {letra}
                                        </div>
                                    ))}
                                </div>
                                </>
            )
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

            let novasTeclasCorretas = [...teclasCorretas];
            novasTeclasCorretas[indiceAtual] = true;
            setTeclasCorretas(novasTeclasCorretas);
        }

        function teclaIncorreta () {
            console.log("Tecla incorreta. Você perdeu!");
            setMostrarBtnTentarNovamente(true);
            setBtnSair(true);
            setLetras([]);

        }

        function sequenciaCompleta() {
            console.log("Sequência completa! Parabéns!");
        
            indiceAtual = 0; 

            setMostrarBtnTentarNovamente(true)
            setBtnResultado(true)
            // ver a pontuação, jogar novamente

        }

       

        if (teclaPressionada === letrasSorteadas[indiceAtual].toLocaleLowerCase()) {
            teclaCorreta();
            indiceAtual++;
            if (indiceAtual === letrasSorteadas.length) {
                sequenciaCompleta();
            }
        } else {
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
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            verificarTecla(event.key.toLowerCase());
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [letras, indiceAtual]);

    
    const iniciarTemporizador = () => {
        setTempoRestante(5);
        const timer = setInterval(() => {
          setTempoRestante((prevTempo) => prevTempo - 1);
        }, 1000);
    
        setTimeout(() => {
          clearInterval(timer);
          if (!mostrarBtnTentarNovamente) {
            setMostrarBtnTentarNovamente(true);
            setBtnSair(true);
          }
        }, 5000);
      };
     


    return(
        <S.SessaoGame>

            

            <S.DivGame>
                <h2>MINI-GAME</h2>

                {renderizacaoConteudo()}
                {mostrarBtnIniciar && (
                    <button id="botaoIniciar" onClick={() => {setJogoIniciado(true); setMostrarBtnIniciar(false) }}>Iniciar</button>
                    
                )}
                

                {mostrarBtnTentarNovamente && mostrarBtnSair &&
                    <>
                    <p>Você errou</p>
                    <button onClick={handleTentarNovamenteClick}>Tentar novamente</button>
                    <button onClick={handleSairClick}>Sair</button>
                    </>
                }

                {btnResultado &&
                <>
                    <p>Parabéns Vocé Acertou a sequência</p>
                     <button>Ver Resultado</button>
                </>
                   
                }

                     

            </S.DivGame>

        </S.SessaoGame>
    )
}

export default Game;