import styled from "styled-components";

export const SessaoGame = styled.section`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const DivGame = styled.div`
    border: 1px solid black;

    padding: 2rem;
    width: 30%;

    display: flex;
    flex-direction: column;
    align-items: center;

    #botaoIniciar{
        width: 5rem;
        color: #ffeb3b;;
    }

    .formularioNome{
        padding: 1rem;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .formularioNome > label, input{
        margin-bottom: 1rem;
    }

    #btnEnvioNome{
        padding: 0.5rem;
        width: 50%;
        border-radius: 50rem;
        color: #ffeb3b;;
    }

`