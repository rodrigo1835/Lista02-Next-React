import style from "@/styles/Categorias.module.css"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useState } from "react"

type Info = {
    name: string,
    descricao: string,
    ingredientes: [],
    preco: number
}

export const getServerSideProps = (async (context) => {
    const {id} = context.query
    const res = await fetch(`https://raw.githubusercontent.com/EdPPF/dados-listaNext/main/produtos/${id}.json`)
    const pratos = await res.json()
    return {props: {pratos} }
}) satisfies GetServerSideProps< {pratos: Info} >

export default function Details ({pratos}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    let [count, setCount] = useState(0)
    
    return (
        <>
            
            <div className={style.tabeladiv}>
                {pratos.length > 0 &&
                <table className={style.table} border="1px">
                <tbody>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Ingredientes</th>
                        <th>Preço</th>
                        <th>Carrinho</th>
                    </tr>
                {pratos?.map((pratos:Info) => {

                    let preco = Number(pratos.preco)

                    return (
                    <tr>
                        <td>{pratos.name}</td>
                        <td>{pratos.descricao}</td>
                        <td>{pratos.ingredientes.join(", ")}</td>
                        <td>{pratos.preco}</td>
                        <td><button onClick={() => setCount(count + preco)}>+</button>
                        <button onClick={() => setCount(count - preco)}>-</button></td>
                    </tr>
                    )
                })}
                </tbody>
                </table>
                }   

            </div>


            <div className={style.carrinho}>
                <h2>Carrinho:</h2>
                <span>R${count}</span>
            </div>
            
            <div className={style.botao}>
                <a href="/" className={style.sair}>SAIR</a>
            </div>
            
        </>

    )
}