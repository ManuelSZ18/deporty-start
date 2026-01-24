import './styles/globals.css';

export const metadata = {
    title: 'Deporty',
    description: 'App de eventos deportivos',
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    );
}
