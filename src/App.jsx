//styles
import "./App.css";

//hooks
import { useCallback, useEffect, useState } from "react";

// importando o array de palavras
import { wordsArray } from "./data/palavras.jsx";

//components
import TelaInicial from "./components/TelaInicial.jsx";
import Jogo from "./components/Jogo.jsx";
import FimDeJogo from "./components/FimDeJogo.jsx";

//estagios do jogo
const estagios = [
  { id: 0, name: "inicio" },
  { id: 1, name: "jogo" },
  { id: 2, name: "fim" },
];

function App() {
  //controlando o progresso e estagio do jogo
  const [estagioJogo, setEstagioJogo] = useState(estagios[0].name); //iniciando com o primeiro objeto do array, o inicio.

  // armazenando o array de objetos das palavras que serão advinhadas, num state
  const [palavras] = useState(wordsArray);

  //states dos componentes
  const [categoriaEscolhida, setCategoriaEscolhida] = useState(" ");
  const [palavraEscolhida, setPalavraEscolhida] = useState(" ");
  const [letraEscolhida, setLetraEscolhida] = useState([]); // um array de letras da palavra escolhida

  const [letrasAdvinhadas, setLetrasAdvinhadas] = useState([]); // um array de letras advinhadas pelo usuario
  const [letrasErradas, setLetrasErradas] = useState([]); // um array de letras advinhadas erradas
  const [tentativas, setTentativas] = useState(3);
  const [pontuacao, setPontuacao] = useState(0);

  //escolher a palavra e categoria
  const handleEscolherPalavraECategoria = useCallback(() => {
    //obtendo as chaves do array de palavras do arquivo palavras.jsx
    const categorias = Object.keys(palavras);

    //obtendo uma categoria aleatoriamente
    const categoria =
      categorias[Math.floor(Math.random() * Object.keys(categorias).length)];

    //obtendo uma palavra aleatoriamente de acordo com a categoria obtida
    const palavra =
      palavras[categoria][Math.floor(Math.random() * palavras[categoria].length)];

    return { categoria, palavra };
  }, [palavras]);

  //iniciar jogo
  const handleIniciarJogo = useCallback(() => {
    //função que obtém uma categoria e palavra aleatoriamente
    const { categoria, palavra } = handleEscolherPalavraECategoria();

    //obter cada letra da palavra obtida
    let letras = palavra.split(""); //separando as letras da palavra
    letras = letras.map((letra) => letra.toLowerCase()); // iterando cada letra para transformar todas em minuscula

    //atualiza os states do componente
    setCategoriaEscolhida(categoria);
    setPalavraEscolhida(palavra);
    setLetraEscolhida(letras);

    limparEstados() //limpa os campos de letras advinhadas e as letras erradas

    //avança de estagio do jogo(vai para a tela de jogar)
    setEstagioJogo(estagios[1].name);
  }, [handleEscolherPalavraECategoria]);

  //verificar a letra que o usuario escolher
  const handleVerificarLetra = (letra) => {
    const padronizarLetra = letra.toLowerCase() //transformar todas as letras em minúsculas

    //verificar se a letra ja foi utilizada
    if(letrasAdvinhadas.includes(padronizarLetra) || letrasErradas.includes(padronizarLetra)){
      return
    }

    // adicionar a letra advinhada na tela
    if(letraEscolhida.includes(padronizarLetra)){
      //se a letra escolhida for a certa, preenche o quadrado branco
      setLetrasAdvinhadas((atualLetrasAdvinhadas) => [
        ...atualLetrasAdvinhadas, padronizarLetra,
      ])

    } else {
      //se a letra escolhida for a errada, vai para o campo de letras erradas
      setLetrasErradas((atualLetrasErradas) => [
        ...atualLetrasErradas, padronizarLetra,
      ])

      //Diminuindo as tentativas do jogador
      setTentativas((atualTentativas) => atualTentativas - 1)
    }
  };

    //limpa os campos de letras advinhadas e as letras erradas
    const limparEstados = () => {
      setLetrasAdvinhadas([])
      setLetrasErradas([])
    };

  //monitora as tentativas e quando elas zerarem, ir para a tela de fim de jogo
  useEffect( () => {
    if(tentativas <= 0){
      setEstagioJogo(estagios[2].name)

      //resetar todos os estados
      limparEstados()
    }

  }, [tentativas] /*dado dinamico que será monitorado pelo hook */);


  // monitora a condição de vitória
  useEffect( () => {

    /*letrasUnicas conterá apenas elementos únicos da array letraEscolhida. É útil em situações onde é necessário garantir que não haja duplicatas em um array. */
    const letrasUnicas = [...new Set(letraEscolhida)]

    //verifica a condição de vitória
    if(letrasAdvinhadas.length === letrasUnicas.length && estagioJogo === estagios[1].name){
      //aumenta a pontuação
      setPontuacao( (atualPontuacao) => atualPontuacao += 100)

      //reinicia o jogo com uma nova palavra
      handleIniciarJogo()
    }

  }, [letrasAdvinhadas, letraEscolhida, handleIniciarJogo, estagioJogo])

  //
  //reiniciar jogo
  const handleReiniciar = () => {

    setPontuacao(0)
    setTentativas(3)


    setEstagioJogo(estagios[0].name);
  };

  return (
    <>
      <div className="main-component">
        {/* exibindo componentes */}
        {estagioJogo === "inicio" && (
          <TelaInicial iniciarJogo={handleIniciarJogo} />
        )}
        {estagioJogo === "jogo" && (
          <Jogo
            verificarLetra={handleVerificarLetra}
            categoriaEscolhida={categoriaEscolhida}
            palavraEscolhida={palavraEscolhida}
            letraEscolhida={letraEscolhida}
            letrasAdvinhadas={letrasAdvinhadas}
            letrasErradas={letrasErradas}
            tentativas={tentativas}
            pontuacao={pontuacao}
          />
        )}
        {estagioJogo === "fim" && <FimDeJogo reiniciar={handleReiniciar} pontuacao={pontuacao} />}
      </div>
    </>
  );
}

export default App;
