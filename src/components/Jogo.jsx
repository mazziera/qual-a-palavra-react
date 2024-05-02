import "./Jogo.css";

const Jogo = ({ verificarLetra, categoriaEscolhida, palavraEscolhida, letraEscolhida, letrasAdvinhadas, letrasErradas, tentativas, pontuacao }) => {
  // prop desestruturada, contendo a função que executa a mudança de estado do componente, criada no app.jsx

  return (
    <div className="jogo_container">
      <p className="pontos">
        <span>Pontuação: {pontuacao}</span>
      </p>

      <h1>Advinhe a palavra</h1>

      <h3 className="dica">
        A palavra é: <span>{categoriaEscolhida}</span>
      </h3>

      <p>Tentativas restantes: {tentativas}</p>

      <div className="palavra_container">
        {/* itera cada letra escolhida pelo usuario e valida se a letra advinhada for a correta, ela é impressa, caso nao, é impresso novamente o quadrado branco */}
        {letraEscolhida.map((letra, indice) => (
          
          letrasAdvinhadas.includes(letra) ? (<span key={indice} className="letra"></span>) : (<span key={indice} className="quadrado_branco"></span>)
        ))}
      </div>

      <div className="letra_container">
        <p>Digite uma letra da palavra</p>

        <form className="form_envio_da_letra">
          <input type="text" name="letra" maxLength="1" required />
          <button onSubmit={}>Jogar</button>
        </form>
      </div>

      <div className="letras_erradas_container">
        <p>letras já utilizadas:</p>
        {/* itera e imprime as letras que o usuario errou */}
        {letrasErradas.map((letra, indice) => (

          (<span key={indice}>{letra}</span>)
        ))}
      </div>
    </div>
  );
};

export default Jogo;
