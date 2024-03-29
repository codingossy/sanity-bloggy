import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { client } from '../link/client'
import Post from '../components/posts/Post'
import groq from 'groq'
import Hero from '../components/hero/Hero'

const inter = Inter({ subsets: ['latin'] })

export default function Home( { getAllPosts}) {
  // console.log(getAllPosts);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
      <Hero />
        <Post getAllPosts={getAllPosts} />
      </>
   

    </>
  )
}

export const getServerSideProps = async () => {

  const allPosts = await client.fetch(groq`*[_type == "post" && publishedAt < now()] | order(publishedAt desc) {
    _id,
    title,
    "name": author->name,
    "categories": categories[]->{id, title},
    "authorImage": author->image,
    body,
    image,
    slug,
    publishedAt
    }`)

  return{
    props:{
      getAllPosts: allPosts
    }
  }
}