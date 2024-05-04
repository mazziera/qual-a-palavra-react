

import './FimDeJogo.css';

const FimDeJogo = ({reiniciar, pontuacao}) => {
    // prop desestruturada, contendo a função que executa a mudança de estado do componente, criada no app.jsx

    return(
        <>
        <div>
            <h1>Fim do Jogo!</h1>

            <h2>A sua pontuação foi: <span>{pontuacao}</span></h2>

            <button onClick={reiniciar}>Reiniciar Jogo</button>
        </div>
        </>
    )
};

export default FimDeJogo