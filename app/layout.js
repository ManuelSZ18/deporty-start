import './globals.css';

export const metadata = {
    title: 'Deporty - Gestión de Actividades Deportivas',
    description: 'Gestiona actividades deportivas, eventos y usuarios de forma sencilla. Plataforma para clubes y deportistas.',
    keywords: 'deporty, actividades deportivas, eventos, clubes',
    authors: [{ name: 'Deporty Team' }],
    viewport: 'width=device-width, initial-scale=1.0',
    themeColor: '#00BDFF',
    openGraph: {
        type: 'website',
        title: 'Deporty — Gestión de Actividades Deportivas',
        description: 'Gestiona actividades deportivas, eventos y usuarios de forma sencilla.',
        siteName: 'Deporty'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Deporty — Gestión de Actividades Deportivas',
        description: 'Gestiona actividades deportivas, eventos y usuarios de forma sencilla.'
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <head>
                <link rel="icon" href="/assets/images/icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-title" content="Deporty" />
                <meta name="color-scheme" content="light dark" />
            </head>
            <body>
                {children}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if ('serviceWorker' in navigator) {
                                navigator.serviceWorker.register('/service-worker.js')
                                    .then(() => console.log('✅ Service Worker registrado'))
                                    .catch(err => console.log('⚠️ Service Worker error:', err));
                            }
                        `
                    }}
                />
            </body>
        </html>
    );
}
