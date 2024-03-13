import { useState} from 'react'

function Dado({lados = 6}) {
    const [valor, setValor]=useState();
    const [contador,setContador]=useState(Array(lados).fill(0));
    const [cantidadDeTiradas, setCantidadDeTiradas] = useState(0);
    const [historial, setHistorial]=useState([]);

    //143625

    const tirarDado= ()=>{
        const nuevoValor=Math.floor(Math.random()*lados+1);
        setValor(nuevoValor);
        setCantidadDeTiradas(cantidadDeTiradas+1);
        historial.push(nuevoValor);

        if (cantidadDeTiradas<10){
            setHistorial([...historial]); 
            const nuevoContador = [...contador];//si no pongo los ... no se actualiza el valor
            nuevoContador[nuevoValor-1] = nuevoContador[nuevoValor-1]+1;
            setContador(nuevoContador);
            console.log(nuevoContador)
            console.log(historial)
        }
        else{
            const nuevoValor=Math.floor(Math.random()*lados+1);
            setValor(nuevoValor);
            const firstValue=historial[0]
            historial.shift();
            setHistorial([...historial]);
            const nuevoContador = [...contador];//si no pongo los ... no se actualiza el valor
            nuevoContador[firstValue-1] = nuevoContador[firstValue-1]-1;
            nuevoContador[nuevoValor-1] = nuevoContador[nuevoValor-1]+1;
            console.log(nuevoContador)
            console.log(historial)
            setContador(nuevoContador);

        }

    }
  return (
    <div>
        <button onClick={tirarDado}>Tirar dado</button>
        <h1>Te salio el numero {valor} eso nos da el siguiente contador:{contador}</h1>
        <h1>Cantidad de Tiradas: {cantidadDeTiradas} y tu historial:{historial}</h1>
    </div>
  )
}

export default Dado