import "./TelaInicial.css";


const TelaInicial = ({iniciarJogo}) => {
    return (
        <div  className="start">
            <h1>Mundo Secreto</h1>
            <p>Clique aqui para começar a jogar</p>
            <button onClick={iniciarJogo}>Começar o jogo</button>
        </div>
    )
}

export default TelaInicial;