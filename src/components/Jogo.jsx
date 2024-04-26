import './Jogo.css';

const Jogo = ({verificarLetra}) => {
    // prop desestruturada, contendo a função que executa a mudança de estado do componente, criada no app.jsx


    return(
        <>
        <div >
        <h1>Jogando o jogo</h1>

        <button onClick={verificarLetra}>Finalizar jogo</button>
        </div>
        </>
    )
}

export default Jogo