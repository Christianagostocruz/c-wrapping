import Head from 'next/head'
import Header from '../components/Header'
import Image from 'next/image'
import hero from '../assets/hero.jpeg'
import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../interfaces/sanity'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

interface HomeServerSideProps {
  posts: Post[]
}

export default function Home({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Car Wrapping</title>
      </Head>

      <Header />
      <div className="relative mb-10 h-[300px] shadow-2xl sm:h-[400px] lg:h-[600px] xl:h-[700px] 2xl:h-[900px]">
        <Image
          src={hero}
          layout="fill"
          objectFit="cover"
          className="relative my-auto brightness-75"
        />
        <div className="absolute top-1 left-1  w-full space-y-60 text-white sm:space-y-80 lg:mt-10 lg:space-y-96 xl:mt-20">
          <p className="font-serif text-xl font-bold underline sm:text-xl md:text-2xl">
            Personaliza y protege tu vehículo.
          </p>
        </div>
      </div>
      <div className="grab-3 grid grid-cols-1 border-b p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group cursor-pointer overflow-hidden rounded-lg border-b border-red-500 py-4">
              <img
                className="h-84 w-full  transition-transform duration-200 ease-out group-hover:scale-105"
                src={urlFor(post.mainImage).url()!}
                alt={`Picture of ${post.title}`}
              />
              <div className="flex justify-between bg-gray-200 p-4">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">{post.description}</p>
                </div>
                <button className="focus:shadow-outline cursor-pointer rounded-full bg-red-500 py-2 px-4 font-bold text-white shadow hover:bg-red-400 focus:outline-none">
                  Detalles
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<
  HomeServerSideProps
> = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    author-> {
    name,
    image
  },
  description,
  mainImage,
  slug
  }`

  const posts = await sanityClient.fetch(query)
  return {
    props: {
      posts,
    },
  }
}
