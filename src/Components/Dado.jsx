import { useState} from 'react'
import "./Dado.css"

"https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty"

function Dado({ lados = 6 }) {
    const [valor, setValor] = useState();
    const [contador, setContador] = useState(Array(lados).fill(0));
    const [cantidadDeTiradas, setCantidadDeTiradas] = useState(0);
    const [historial, setHistorial] = useState([]);
    const [tirando, setTirando] = useState(false);
  
    const tirarDado = () => {
      if (!tirando) {
        setTirando(true);
        setTimeout(() => {
          const nuevoValor = Math.floor(Math.random() * lados + 1);
          setValor(nuevoValor);
          setCantidadDeTiradas(cantidadDeTiradas + 1);
  
          if (cantidadDeTiradas < 10) {
            setHistorial([...historial, nuevoValor]);
            const nuevoContador = [...contador]; // si no pongo los ... no se actualiza el valor
            nuevoContador[nuevoValor - 1] = nuevoContador[nuevoValor - 1] + 1;
            setContador(nuevoContador);
          } else {
            historial.shift();
            setHistorial([...historial, nuevoValor]);
            const nuevoContador = [...contador];
            nuevoContador[nuevoValor - 1] = nuevoContador[nuevoValor - 1] + 1;
            setContador(nuevoContador);
          }
  
          setTirando(false);
        }, 1000); // Cambia este valor para ajustar la duración del "lanzamiento"
      }
    };

    const stylesheet = document.styleSheets[0];
    const boxParaRule = [...stylesheet.cssRules]
console.log(boxParaRule)
    // const overrideCSSVariable = (key, val) => {
    //     let root = document.documentElement;
    //     root.style.setProperty(key, val);
    //   };
  return (
    <div>
        <div className="espacio3D">                
                <div className={`cubo3D ${tirando ? 'tirando' : ''}`}>
                    <div className={`cara cara1`}>1</div>
                    <div className={`cara cara2`}>2</div>
                    <div className={`cara cara3`}>3</div>
                    <div className={`cara cara4`}>4</div>
                    <div className={`cara cara5`}>5</div>
                    <div className={`cara cara6`}>6</div>
                </div>
        </div>

        <button onClick={tirarDado} disabled={tirando}>{tirando ? 'Lanzando...' : 'Tirar dado'}</button>
        <h1>Te salio el numero {valor} eso nos da el siguiente contador:{contador}</h1>
        <h1>Cantidad de Tiradas: {cantidadDeTiradas} y tu historial:{historial}</h1>
        <ul> {contador.map((count, index)=>(<li key={index+1}>Cantidad de{index+1} tirados: {count}</li>))}</ul>
       
    </div>
  )
}

export default Dado