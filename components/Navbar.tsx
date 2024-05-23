"use client"

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"
import { CATEGORY_LINKS } from "../constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import AvatarIcon from "../assets/images/avatar.png";
import { useAppDispatch, useAppSelector } from "../app/GlobalRedux/store";
import { setShowDropdown, setUserEmail } from "../app/GlobalRedux/Feautures/navbar-slice";


export default function Navbar () {
    const dispatch = useAppDispatch();
    const { data: session } = useSession();
    const showDropdown = useAppSelector((state) => state.showDropdown.showDropdown);
    const userEmail = useAppSelector(
      (state) => state.userEmail.userEmail
    );

    useEffect(() => {
        if (session?.user?.email) {
          dispatch(setUserEmail(session.user.email));
        }
      }, [session, dispatch]);


    const toggleDropdown = () => {
        dispatch(setShowDropdown(!showDropdown));
    }


  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-150 flexBetween padding-container z-30 py-4">
        <div className="flex flex-row h-full justify-start gap-12 lg:flex items-center">
            <div>
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={60} height={19} />
                </Link>
            </div>
            {CATEGORY_LINKS.map((link) => (
            <div className="relative group ml-3 hidden lg:flex" key={link.key}>
                <Link href={link.href} className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
                    {link.label}
                </Link>
            </div>
        ))}
      </div>

    {/* Desktop navigation */}
    <div className="flex justify-between">
        <Link href="/donate">
            <Button 
            type="button"
            title={"Donate Now"}
            variant="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white font-bold py-2 px-4 h-12"
            />
        </Link>
        <div className="ml-4">
        {session ? (
                <div className="lg:flexCenter hidden">
                    <div className="flex items-center space-x-2 ">
                        <Button 
                        type="button"
                        title={userEmail!}
                        icon= {AvatarIcon.src}
                        variant="btn_white"
                        />
                    </div>
                    <div className="lg:flexCenter pl-1 items-center">
                        <Link href="/api/auth/signout">
                            <Button type="button" title="Sign Out" icon="" variant="btn_white"/>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="lg:flexCenter hidden">
                    <Link href="/api/auth/signin">
                        <Button 
                        type="button"
                        title="Login"
                        variant="btn_white"
                        />
                    </Link>
                </div>
            )}
        </div>
        </div>

        {/* Mobile navigation */}
         <div className="lg:hidden flex items-center">
                <button onClick={toggleDropdown}>
                    <FontAwesomeIcon icon={faBars} className="h-6 w-6 text-gray-500 cursor-pointer" />
                </button>
            </div>

            {/* Dropdown list */}
            {showDropdown && (
                <div className="lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex justify-center items-center z-40">
                    <div className="bg-white border w-screen h-full border-gray-200 rounded-md shadow-md">
                        <div className="flex flex-col items-end p-5">
                            <button className="lg:hidden" onClick={toggleDropdown}>
                                <FontAwesomeIcon icon={faTimes} className="h-6 w-6 text-gray-500 cursor-pointer" />
                            </button>
                        </div>
                        <div className="flex justify-center items-center h-screen">
                            <div className="gap-0.5">
                                {CATEGORY_LINKS.map((link) => (
                                    <div key={link.key}>
                                        <Link href={link.href} passHref>
                                            <div className="block py-2 px-4 hover:bg-gray-100 transition duration-200 text-center text-lg" onClick={toggleDropdown}>{link.label}</div>
                                        </Link>
                                    </div>
                                ))}
                                <hr className="border-gray-200 m-5" />
                                {session ? (
                                    <div className="flex justify-center items-center">
                                        <a href="/api/auth/signout" className="text-gray-700 block px-4 py-2 text-lg">
                                            <Button 
                                            type="button"
                                            title="Sign Out"
                                            variant="btn_white"
                                            />
                                        </a>
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center">
                                        <a href="/api/auth/signin"className="text-gray-700 block px-4 py-2 text-lg items-center justify-center">
                                            <Button 
                                            type="button"
                                            title="Log In"
                                            variant="btn_white"
                                            />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
    </nav>
  )
}
