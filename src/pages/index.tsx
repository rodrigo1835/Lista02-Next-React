import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

type Category = {
  id: number,
  name: string
}

export const getServerSideProps = (async (context) => {
  const res = await fetch('https://raw.githubusercontent.com/EdPPF/dados-listaNext/main/categorias.json')
  const categoria = await res.json()
  return { props: { categoria } }
}) satisfies GetServerSideProps< {categoria: Category} >

export default function Home({categoria}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Cardapio</title>
      </Head>

      <main>
        <div className={styles.card}>
          {categoria.map((categoria:Category) => (
              <div className={styles.cardbox}>
                <a href={`/categorias/${categoria.id}`}><h2>{categoria.name}</h2></a>
              </div>    
          ))}
        </div>
      </main>
    </>
  )
}
