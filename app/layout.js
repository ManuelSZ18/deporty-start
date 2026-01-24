import { Quantico } from 'next/font/google';
import './styles/globals.css';

const quantico = Quantico({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quantico',
});

export const metadata = {
  title: 'Deporty - Plataforma Integral de Gestión Deportiva',
  description: 'Conectamos a toda la comunidad deportiva: atletas, entrenadores, organizadores, clubes, ligas, jueces y árbitros en un solo lugar.',
  keywords: 'deportes, torneos, competencias, gestión deportiva, eventos deportivos',
  authors: [{ name: 'Deporty' }],
  openGraph: {
    title: 'Deporty - Plataforma de Gestión Deportiva',
    description: 'La plataforma integral para organizar y participar en eventos deportivos',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={quantico.variable}>
      <body className={quantico.className}>{children}</body>
    </html>
  );
}
