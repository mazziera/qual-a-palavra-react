//styles
import './App.css';

//hooks
import { useCallback, useEffect, useState } from 'react';

//data
import {wordsArray} from './data/palavras.jsx';

//components
import TelaInicial from './components/TelaInicial.jsx';
import Jogo from './components/Jogo.jsx';
import FimDeJogo from './components/FimDeJogo.jsx';

//estagios do jogo
const estagios = [
  {id: 0, name: "inicio"},
  {id: 1, name: "jogo"},
  {id: 2, name: "fim"},
];

function App() {
  //controlando o progresso e estagio do jogo
  const [estagioJogo, setEstagioJogo] = useState(estagios[0].name) //iniciando com o primeiro objeto do array, o inicio.

  // armazenando o array de objetos das palavras que serão advinhadas, numa variavel 
  const [palavras] = useState(wordsArray); 

  //states
  const [categoriaEscolhida, setCategoriaEscolhida] = useState(" ");
  const [palavraEscolhida, setPalavraEscolhida] = useState(" ");
  const [letraEscolhida, setLetraEscolhida]= useState([]); //sera um array de letras

  //escolher a palavra e categoria
  const handleEscolherPalavraECategoria = () => {

    //obtendo as chaves do array de palavras do arquivo palavras.jsx
    const categorias = Object.keys(palavras) 

    //obtendo uma categoria aleatoriamente
    const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)]

    //obtendo uma palavra aleatoriamente de acordo com a categoria obtida
    const palavra = palavras[categoria][Math.floor(Math.random() * palavras[categoria].length)]

    return{categoria, palavra}
  };

  //iniciar jogo
  const handleIniciarJogo = () => {
    //função que obtém uma categoria e palavra aleatoriamente
    const {categoria, palavra} = handleEscolherPalavraECategoria()

    //obter cada letra da palavra obtida
    let letras = palavra.split("") //separando as letras da palavra
    letras = letras.map( (letra) => letra.toLowerCase()) // iterando cada letra para transformar todas em minuscula

    //atualiza o estado do componente
    setCategoriaEscolhida(categoria);
    setPalavraEscolhida(palavra);
    setLetraEscolhida(letras);

    //avança de estagio do jogo(vai para a tela de jogar)
    setEstagioJogo(estagios[1].name)
  };

  //verificar a letra que o usuario escolher
  const handleVerificarLetra = () => {
    setEstagioJogo(estagios[2].name)
  };

  //reiniciar jogo
  const handleReiniciar = () => {
    setEstagioJogo(estagios[0].name)
  };

  return (
    <>
      <div className="main-component">
        {/* exibindo componentes */}
        {estagioJogo === "inicio" && <TelaInicial iniciarJogo={handleIniciarJogo}/>}
        {estagioJogo === "jogo" && <Jogo verificarLetra={handleVerificarLetra}/>}
        {estagioJogo === "fim" && <FimDeJogo reiniciar={handleReiniciar}/>}

      </div>
    </>
  )
}

export default App
