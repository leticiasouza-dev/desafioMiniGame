import styled from "styled-components";

export const SessaoContainer = styled.section`
    text-transform: uppercase;

    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
`

export const DivConteudo = styled.div`
    text-align: justify;

    width: 50%;

    display: flex;
    flex-direction: column;
    align-items: center;

    .titulo, .paragrafo{
        padding-bottom: 1rem;
        color: white;
    }

    #botaoIniciar{
        cursor: pointer;
        padding: 1rem;
        width:100%;
        border-radius: 50px;
        color: #ffeb3b;
    }


`