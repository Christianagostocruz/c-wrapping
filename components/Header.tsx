import Image from 'next/image'
import Link from 'next/link'
import logo6 from '../assets/logo6.png'
import Instagram from '../assets/Instagram.png'
import whatapp from '../assets/whatapp.jpg'
import { FC } from 'react'

interface HeaderProps {

}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="mx-auto flex max-w-7xl justify-between border-b p-5">
      <div className="flex items-center justify-start space-x-5">
        <Link href="/">
          <a>
            <Image
              src={logo6}
              width="100"
              height="100"
              className="cursor-pointer object-contain"
              alt="CWrapping logo"
            />
          </a>
        </Link>
      </div>
      <div className="flex items-center justify-end space-x-5">
        <Link href="https://wa.me/17874849124/">
          <a target="_blank">
            <Image
              src={whatapp}
              width="35"
              height="35"
              className="cursor-pointer object-contain"
              alt="Whatapp"
            />
          </a>
        </Link>

        <Link href="https://www.instagram.com/cwrapping_pr/">
          <a target="_blank">
            <Image
              src={Instagram}
              width="50"
              height="50"
              className="cursor-pointer object-contain"
              alt="Instagram"
            />
          </a>
        </Link>
      </div>
    </header>
  )
}

export default Header
