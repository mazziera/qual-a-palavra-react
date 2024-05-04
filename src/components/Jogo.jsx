import { useState } from "react";
import "./Jogo.css";

const Jogo = ({
  verificarLetra, categoriaEscolhida, palavraEscolhida, letraEscolhida, letrasAdvinhadas, letrasErradas,tentativas, pontuacao,}) => {
  // props desestruturadas, contendo a função verificarLetra e states do componente, criadas no app.jsx

  const [letra, setLetra] = useState("");

  const handleSubmitForm = (event) => {
    event.preventDefault()

    verificarLetra(letra)
    setLetra("") // apagar o input assim que o usuario enviar a letra
  };

  console.log(palavraEscolhida);

  return (
    <div className="jogo_container">
      <p className="pontos">
        <span>Pontuação: {pontuacao}</span>
      </p>

      <h1>Advinhe a palavra</h1>

      <h3 className="dica">
        Dica sobre a palavra : <span>{categoriaEscolhida}</span>
      </h3>

      <p>Tentativas restantes: {tentativas}</p>

      <div className="palavra_container">
        {/* itera cada letra escolhida pelo usuario e valida se a letra advinhada for a correta, ela é impressa, caso nao, é impresso novamente o quadrado branco */}
        {letraEscolhida.map((letra, indice) =>
          letrasAdvinhadas.includes(letra) ?
            (<span key={indice} className="letra">{letra}</span>)
            : 
            (<span key={indice} className="quadrado_branco"></span>)
        )}
      </div>

      <div className="letra_container">
        <p>Digite uma letra da palavra</p>

        <form className="form_envio_da_letra" onSubmit={handleSubmitForm}>
          <input
            type="text"
            name="letra"
            maxLength="1"
            required
            onChange={(event) => setLetra(event.target.value)} //função que capturará o valor que o usuario digitar no input
            value={letra}
          />
          <button>Jogar</button>
        </form>
      </div>

      <div className="letras_erradas_container">
        <p>letras já utilizadas:</p>
        {/* itera e imprime as letras que o usuario errou */}
        {letrasErradas.map((letra, indice) => (
          <span key={indice}>{letra}, </span>
        ))}
      </div>
    </div>
  );
};

export default Jogo;
