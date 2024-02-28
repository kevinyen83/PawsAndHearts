import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AuthProvider from '../components/AuthProvider'




const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Paws and Hearts',
  description: 'A animal shielter aims to match street dogs and cats with suitable keeper.',
}

export default function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html lang='en' className={inter.className}>
      <body>
      <AuthProvider>
        <Navbar/>
            <main className='relative overflow-hidden mx-auto'>
                {children}
            </main>
        <Footer/>
        </AuthProvider>
        </body>
    </html>
  )
}
