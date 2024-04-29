import "./Jogo.css";

const Jogo = ({ verificarLetra }) => {
  // prop desestruturada, contendo a função que executa a mudança de estado do componente, criada no app.jsx

  return (
    <div className="jogo_container">
      <p className="pontos">
        <span>Pontuação: 000</span>
      </p>

      <h1>Advinhe a palavra</h1>

      <h3 className="dica">
        A palavra é: <span>dica...</span>
      </h3>

      <div className="palavra_container">
        <span className="letra">A</span>
        <span className="quadrado_branco"></span>
      </div>

      <div className="letra_container">
        <p>Lorem ipsum dolor</p>

        <form className="form_envio_da_letra">
          <input type="text" name="letra" maxLength="1" required />
          <button>Jogar</button>
        </form>
      </div>

      <div className="letras_erradas_container">
        <p>letras já utilizadas</p>
        <span> a,</span>
        <span>b, </span>
      </div>
    </div>
  );
};

export default Jogo;
