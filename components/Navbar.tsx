'use client'

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import Button from './Button'
import { CATEGORY_LINKS } from '../constants'
import AvatarIcon from '../assets/images/avatar.png';


export default function Navbar () {
    const { data: session } = useSession();
    const [userEmail, setUserEmail] = useState<string | null>(null);


    useEffect(() => {
        if (session) {
            setUserEmail(session.user?.email || null);
        } else {
            setUserEmail(null);
        }
    }, [session]);


  return (
    <nav className='fixed top-0 left-0 right-0 bg-white border-gray-500 flexBetween padding-container z-30 py-4'>
        <ul className='flex flex-row h-full justify-start gap-12 lg:flex items-center'>
            <div className=''>
                <Link href='/'>
                    <Image src='/logo.png' alt='logo' width={80} height={29} />
                </Link>
            </div>
            {CATEGORY_LINKS.map((link) => (
            <div className='relative group ml-3' key={link.key}>
                <Link href={link.href} className='regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold'>
                    {link.label}
                </Link>
            </div>
        ))}
      </ul>

        {session ? (
            <div className='flex justify-between'>
                <div className='lg:flexCenter hidden'>
                    <div className='flex items-center space-x-2'>
                        <Button 
                        type='button'
                        title={userEmail!}
                        icon= {AvatarIcon.src}
                        variant='btn_white'
                        />
                    </div>
                    <div className='lg:flexCenter pl-1'>
                        <Link href='/api/auth/signout'>
                            <Button type='button' title='Sign Out' icon='' variant='btn_white'/>
                        </Link>
                    </div>
                </div>
            </div>
            ) : (
                <div className='lg:flexCenter hidden'>
                    <Link href='/api/auth/signin'>
                        <Button 
                        type='button'
                        title='Login'
                        variant='btn_white'
                        />
                    </Link>
                </div>
            )}
    </nav>
  )
}
