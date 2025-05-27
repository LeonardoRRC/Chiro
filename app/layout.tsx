import { Open_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import Script from 'next/script';
import './globals.css';

const open_sans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Plotcenter Cotizador',
  description: 'Sistema de cotización de impresiones digitales',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${open_sans.variable} font-sans antialiased bg-white text-black`}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <div id="portal" className="z-[1000]"></div>
        </CartProvider>
        <Script
          src="https://sdk.mercadopago.com/js/v2"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
