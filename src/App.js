import './App.css';
import './index.css';
import { useCallback,useState,useEffect } from 'react';

// dados
import {wordsList} from "./data/words"

//componentes
import TelaInicial from './components/TelaInicial';
import Jogo from './components/Jogo';
import FimJogo from './components/FimJogo';



const status = [
  {id:1, nome:"iniciar"},
  {id:2, nome:"jogar"},
  {id:3, nome:"finalizar"},
]

const tentativasQtd=3


function App() {

  const [jogoStatus, setjogoStatus] = useState(status[0].nome);
  const [words] = useState(wordsList);
  const [escolha, setescolha] = useState("");
  const [categorias, setcategorias] = useState("");
  const [letras, setletras] = useState([]);
  const [letrasCertas, setletrasCertas] = useState([]);
  const [letrasErradas, setletrasErradas] = useState([]);
  const [tentativas, setTentativas] = useState(tentativasQtd);
  const [pontos, setPontos] = useState(50);



  // iniciando o jogo
  const iniciarJogo = () =>{
     limparLetras();




    const {word,categoria} = palavraCategoria();

   // Criar um array de letras
   let letra = word.split("")
   // Deixar tudo minúsculo
   letra = letra.map((l) => l.toLowerCase()) 


    console.log(word,categoria);
    console.log (letra);

    // setar estados

    setescolha(escolha);
    setcategorias(categoria);
    setletras(letra);

    setjogoStatus(status[1].nome)
  }

  // processando o que o usuário digitar
  const digitar = (letra) =>{
    const letraNormal = letra.toLowerCase();

    // se as letras ja foram utiizadas

    if(letrasCertas.includes(letraNormal) || letrasErradas.includes(letraNormal)){
      return;
    }
     
    if(letras.includes(letraNormal)) {
       setletrasCertas((letrasAtuaisCertas) =>[
        ...letrasAtuaisCertas,
        letraNormal
       ])
    }else {
      setletrasErradas((letrasAtuaisErradas) =>[
        ...letrasAtuaisErradas,
        letraNormal
       ])
       setTentativas((tentativasAtual) => tentativasAtual - 1)     

    }
  };

     const limparLetras = () => {
      setletrasCertas([])
      setletrasErradas([])
     }


  // useEffect monitora dados
  useEffect(() =>{
    if (tentativas <=0){
     limparLetras();

      setjogoStatus(status[2].nome)
    }
  },[tentativas])


   // condição de vitória
   useEffect(() =>{
     const letrasUnicas = [...new Set(letras)]
     if(letrasCertas.length === letrasUnicas.length){
       
         // adicionando pontos
   setPontos ((pontosAtuais) => (pontosAtuais +=100));

   // reiniciando o jogo
   iniciarJogo();


     }


  },[letrasCertas,letras,iniciarJogo])
 

  // iniciando o jogo novamente
  const reiniciar = () =>{
    setPontos(0);
    setTentativas(tentativasQtd);


    setjogoStatus(status[0].nome)
  }

  // palavras e categorias aleatorias
  const palavraCategoria = () =>{
    const categorias = Object.keys(words);
    const categoria =
     categorias[Math.floor(Math.random() * Object.keys(categorias).length)];
     console.log(categoria)
     const word= words[categoria][Math.floor(Math.random() * words[categoria].length)];
     console.log(word)
     return {word,categoria};
  }
  
  console.log(words);

  return (
    <div className="App">
      {jogoStatus === 'iniciar' && <TelaInicial iniciarJogo={iniciarJogo}/>}
      {jogoStatus === 'jogar' && <Jogo 
      digitar={digitar}
      escolha={escolha}
      categoria={categorias}
      letras={letras}
      letrasCertas={letrasCertas}
      letrasErradas={letrasErradas}
      tentativas={tentativas}
      pontos={pontos}
      />}
      {jogoStatus === 'finalizar' && <FimJogo reiniciar={reiniciar}
       pontos={pontos}/>}
    </div>
  );
}

export default App;