import './styles/globals.css';

export const metadata = {
  title: 'Deporty App',
  description: 'Gestión deportiva',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
