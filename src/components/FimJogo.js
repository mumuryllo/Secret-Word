import "./FimJogo.css"

const FimJogo = ({reiniciar, pontos}) =>{
    return(
        <div>
         <h1>Fim de Jogo!</h1>  
         <h2>
            A sua pontuação foi: <span>{pontos}</span>
            </h2> 
        <button onClick={reiniciar}>Reiniciar o jogo</button>
    </div>
    ) 
}

export default FimJogo;