import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthProvider from '../components/AuthProvider';
import ReduxProvider from '../app/GlobalRedux/redux-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Paws and Hearts',
  description:
    'A animal shielter aims to match street dogs and cats with suitable keeper.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <AuthProvider>
        <html lang="en" className={inter.className}>
          <body>
            <Navbar />
            <main className="relative overflow-hidden mx-auto">{children}</main>
            <Footer />
          </body>
        </html>
      </AuthProvider>
    </ReduxProvider>
  );
}
