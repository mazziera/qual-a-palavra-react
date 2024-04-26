import './TelaInicial.css'


const TelaInicial = ({iniciarJogo}) => {
    // prop desestruturada, contendo a função que executa a mudança de estado do componente, criada no app.jsx

    return(
        <>
        <div className='container_tela_incial'>
            <h1>Qual a Palavra?</h1>

            <p>Clique no botão abaixo para iniciar!</p>

            <button onClick={iniciarJogo}>Começar Jogo</button>
        </div>
        </>
    )
};

export default TelaInicial