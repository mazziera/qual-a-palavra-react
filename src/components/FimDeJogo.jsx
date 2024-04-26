import './FimDeJogo.css';

const FimDeJogo = ({reiniciar}) => {
    // prop desestruturada, contendo a função que executa a mudança de estado do componente, criada no app.jsx

    return(
        <>
        <div>
            <h1>Fim do Jogo</h1>

            <button onClick={reiniciar}>Reiniciar Jogo</button>
        </div>
        </>
    )
};

export default FimDeJogo