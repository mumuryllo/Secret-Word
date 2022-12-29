import "./Jogo.css"
import { useState, useRef } from 'react';


const Jogo = ({
    digitar,
    escolha,
    categoria,
    letras,
    letrasCertas,
    letrasErradas,
    tentativas,
    pontos,
}) => {

    const [letra, setletra] = useState("");
    const colocarLetra = useRef(null)

    const enviar = (e) =>{
        e.preventDefault();

        digitar(letra)

        setletra("")

        colocarLetra.current.focus();
    }
 
     return (
        <div className="game">
        <p className="points">
            <span>Pontuação: {pontos}</span>
        </p>
        <h1>Advinhe a palavra:</h1>
        <h3 className="tip">
            Dica da palavra: <span>{categoria}</span>
        </h3>
        <p>Você ainda tem {tentativas} tentativa(s).</p>
        <div className="wordContainer">
            {letras.map((letra, i) => (
                letrasCertas.includes(letra) ? (
                    <span key={i} className="letter">
                        {letra}
                    </span>
                ) : (
                    <span key={i} className="blankSquare"></span>
                )
            ))}
        </div>
        <div className="letterContainer">
            <p>Uma letra da palavra</p>
            <form onSubmit={enviar}>
                <input type={'text'} name="letter" 
                maxLength={1} 
                required
                onChange={(e) => setletra(e.target.value)}
                value={letra}
                ref={colocarLetra} />
                <button>Jogar!</button>
            </form>
        </div>
        <div className="wrongLettersContainer">
            <p>Letras Utilizadas</p>
            {letrasErradas.map((letra, i) =>(
             <span key={i}>{letra},</span>
            ))}
        </div>
    </div>
     ) 
}

export default Jogo;