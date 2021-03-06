import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../interfaces/sanity'
import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import Footer from "../../components/Footer";

interface IFormInput {
  _id: string
  name: string
  phone: string
  email: string
  comment: string
}

interface HomeProps {
  post: Post
}

const Post = ({ post }: HomeProps) => {
  const [formSubmited, setFormSubmited] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch('/api/formInputs', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setFormSubmited(true)
      })
      .catch((err) => {
        console.log(err)
        setFormSubmited(false)
      })
  }

  return (
    <main>
      <Header />
      <img
        src={urlFor(post.mainImage).url()!}
        className="h-40 w-full object-cover"
        alt="Main image"
      />
      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500 ">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          {/* <img className='h-28 w-28 rounded-full' src={urlFor(post.author.image).url()!}/> */}
          <p className="border-b text-sm font-extralight">{post.author.name}</p>
        </div>
        <div className="mt-10 text-center">
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="my-5 text-2xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="my-5 text-xl font-bold" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
      <hr className="my-5 mx-auto max-w-lg border border-red-500" />
      {formSubmited ? (
        <div className="my-10 mx-auto flex max-w-2xl flex-col bg-red-500 py-10 text-white">
          <h3 className="ml-2 text-3xl font-bold">
            Gracias ! su formulario enviado, se le enviara la cotizaci??n pronto.{' '}
          </h3>
          <p className="ml-2 mt-4 font-serif text-sm">CWRAPPING.</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mb-10 flex  max-w-2xl flex-col p-5"
        >
          <h3 className="text-sm text-red-500">{post.title}</h3>
          <h4 className="text-3xl font-bold">Pide tu cotizaci??n gratis</h4>
          <hr className="mt-2 py-3" />
          <input
            {...register('_id')}
            type="hidden"
            name="_id"
            value={post._id}
          />
          <label className="mb-5 block ">
            <span className="mb-10 text-gray-700 ">Nombre</span>
            <input
              {...register('name', { required: true })}
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-red-500 focus:ring"
              type="text"
              placeholder="Nombre"
            />
          </label>
          <label className="mb-5 block ">
            <span className="mb-10 text-gray-700 ">Tel??fono</span>
            <input
              {...register('phone', { required: true })}
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-red-500 focus:ring"
              type="tel"
              placeholder="(555)555-5555"
            />
          </label>

          <label className="mb-5 block ">
            <span className="mb-10 text-gray-700 ">Correo electr??nico</span>
            <input
              {...register('email', { required: true })}
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-red-500 focus:ring"
              type="email"
              placeholder="John@email.com"
            />
          </label>

          <label className="mb-5 block ">
            <span className="mb-10 text-gray-700 ">
              Descripci??n del trabajo que desea para su veh??culo
            </span>
            <textarea
              {...register('comment', { required: true })}
              className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-red-500 focus:ring"
              placeholder="Marca, Modelo, A??o, Color que desea, Piezas o pieza que desea rotular."
              rows={8}
            />
          </label>
          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500">
                Favor ingresar su nombre en el formulario
              </span>
            )}
            {errors.phone && (
              <span className="text-red-500">
                Favor ingresar su tel??fono en el formulario
              </span>
            )}
            {errors.email && (
              <span className="text-red-500">
                Favor ingresar su Correo electr??nico en el formulario
              </span>
            )}
            {errors.comment && (
              <span className="text-red-500">
                Favor ingresar detalles de la cotizaci??n en el formulario
              </span>
            )}
          </div>
          <input
            type="submit"
            value="Enviar"
            className="focus:shadow-outline cursor-pointer rounded bg-red-500 py-2 px-4 font-bold text-white shadow hover:bg-red-400 focus:outline-none"
          />
        </form>
      )}
      <Footer/>
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
      slug {
        current
      }
      }`
  const posts = await sanityClient.fetch(query)
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug ][0] {
    _id,
    _createdAt,
    title,
    author-> {
    name,
    image
  },
    description,
    mainImage,
slug,
body
}`
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })
  if (!post) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
