import axios from "axios"
import { useEffect, useState } from "react"


const ListaDeHospedesLoader = (setter) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    console.log(baseUrl)
    axios.get("http://localhost:8080/clientes/listarClientes")
    .then((response) => {
        console.log(response.data)
        setter(response.data)
    })
    .catch((error) => {
        console.log(error) 
        if(error.response.status !== 404){ 
            throw new Error(error)}
    })
}

const ListaDeHospedes = () => {
    const [lista, setLista] = useState([])
    useEffect(()=>{
        ListaDeHospedesLoader(setLista)
    },[])
    return(
        <h1>aa</h1>
    )
}

export default ListaDeHospedes