//The Logo component that is used in the top corner of the site

import Image from "next/image"
import Link from "next/link"
//The above two are to help create hyperlinks and images within React using Next

import profileImg from "@/public/keyboard-warrior-logo.png"

//Edit the below to adjust the logo as needed
const Logo = () => {
  return (
    <Link href="/" className="flex items-center text-dark dark:text-light">
        <div className=" w-12 md:w-16 rounded-full overflow-hidden border border-solid border-dark dark:border-gray  mr-2 md:mr-4">
            <Image src={profileImg} alt="Keyboard Warrior logo" className="w-full h-auto rounded-full" sizes="20vw" priority />
        </div>
        <span className="font-bold dark:font-semibold text-lg md:text-xl">Keyboard Warrior Fitness</span>
    </Link>
  )
}

export default Logo