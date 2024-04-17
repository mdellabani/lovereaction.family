import Footer from '@components/footer';
import Header from '@components/header';
import { Inter } from "next/font/google";
import './globals.css'
import {Providers} from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>
        <Providers>
          <div className='flex flex-col mx-96 gap-12'>
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
