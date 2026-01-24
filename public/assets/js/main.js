/**
 * main.js - Script optimizado para Vercel
 * - Minimal bundle size
 * - Service Worker registration
 * - API endpoint configuration
 * - Performance monitoring
 */

// Configurar endpoints de API dinámicamente
const API_BASE_URL = window.location.origin + '/api/v1';

// Configuración global
window.DEPORTY = {
    API: {
        BASE_URL: API_BASE_URL,
        AUTH_REGISTRO: `${API_BASE_URL}/auth/registro`,
        AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
        STATUS: `${API_BASE_URL}/estado`
    },
    CONFIG: {
        CACHE_BUST: Date.now(),
        DEBUG: process.env.NODE_ENV !== 'production'
    }
};

/**
 * Registrar Service Worker para PWA
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => {
                console.log('✅ Service Worker registrado');
            })
            .catch(err => {
                console.log('⚠️ Service Worker error:', err);
            });
    });
}

/**
 * Helper: Realizar requests a la API
 */
async function apiCall(endpoint, options = {}) {
    const defaultOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        ...options
    };

    try {
        const response = await fetch(endpoint, defaultOptions);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Error en la API');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * Verificar estado de la API al cargar
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const status = await apiCall(window.DEPORTY.API.STATUS);
        console.log('🦊 API Status:', status);
    } catch (error) {
        console.warn('API no disponible:', error);
    }
});

// Exportar para uso en otros scripts
window.apiCall = apiCall;
