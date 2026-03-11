import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Tipografía Display Premium
const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Tipografía Body Moderna
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Barbería Premium - Reservas Online",
  description: "Reserva tu cita en nuestra barbería premium. Servicios profesionales de calidad con barberos certificados.",
  keywords: "barbería, corte de cabello, afeitado, barbería premium, reserva cita",
  authors: [{ name: "Barbería Premium" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Barbería Premium - Reservas Online",
    description: "Reserva tu cita en nuestra barbería premium. Servicios profesionales de calidad.",
    url: "https://barberiapremiun.com",
    siteName: "Barbería Premium",
    images: [
      {
        url: "https://barberiapremiun.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Barbería Premium - Reservas Online",
    description: "Reserva tu cita en nuestra barbería premium.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#d4af37" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${playfairDisplay.variable} ${inter.variable}`}>
        <Navbar />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}