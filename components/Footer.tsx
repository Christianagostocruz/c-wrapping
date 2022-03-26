import Link from 'next/link';

const Footer = () => {
  const copyrightsDate = new Date().getFullYear();

  return (
    <div className="mt-4 bg-red-500 space-y-2">
      <Link href="/AboutUs">
        <a className="flex justify-center text-white pt-2 underline hover:text-gray-200">About us</a>
      </Link>
      <p className="flex justify-center text-xs text-white pb-2 pr-2">Copyrights {copyrightsDate}</p>
    </div>
  )
}

export default Footer;
