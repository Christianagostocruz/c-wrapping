import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import AboutUsHero from '../assets/AboutUsHero.webp'
import logo3 from '../assets/logo3.png'
const AboutUs = () => {
  return (
    <div>
      <Header />
      <main className="bg-gray-100">
        <h2 className="my-4 text-center text-2xl font-bold underline decoration-red-500">
          About us
        </h2>
        <Image src={AboutUsHero} alt="About us Hero" layout="responsive" />
        <h2 className="my-4 text-center text-2xl font-bold underline decoration-red-500">
          CWRAPPING
        </h2>
        <p className="mx-2 font-serif leading-loose">
          El Car Wrapping es una forma de cambiar el aspecto de su vehículo sin
          la necesidad de pintura. Se trata de cubrir total o parcialmente su
          vehículo con una capa de vinilo. Se puede usar para cubrir el vehículo
          con un color o diseño diferente, agregar un acabado brillante o mate,
          o simplemente agregar una capa protectora.
        </p>
        <p className="mx-2 mt-4 font-serif leading-loose">
          Puede ser un trabajo complicado que no se verá muy bien si no se hace
          correctamente, por lo que la rotulación del automóvil debe ser
          realizada por un técnico capacitado profesionalmente. Podrán preparar
          adecuadamente la superficie de su automóvil y asegurarse de que la
          capa de plástico se corte para adaptarse a cada panel.
        </p>
        <p className="mx-2 mt-8 font-serif leading-loose font-semibold">
          Trabajamos profesionalmente para usted y su vehículo, protección y estilo. Se puede comunicar y pedir su presupuesto y cambiar el look de tu vehiculo con nosotros.
        </p>
      </main>
      <div className="flex justify-end">
        <Image src={logo3} alt="Cwrapping logo" height={200} width={200} />
      </div>
      <Footer />
    </div>
  )
}

export default AboutUs
