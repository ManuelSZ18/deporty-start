/**
 * vercel.json - Configuración completa de Vercel
 * Incluye:
 * - Funciones serverless optimizadas
 * - Headers de seguridad
 * - Caching estratégico
 * - Redirects y rewrites
 * - Monitoreo
 */

{
  "version": 2,
  
  // Build command
  "buildCommand": "npm run build",
  
  // Framework detectado
  "framework": "vanilla",
  
  // Carpeta pública
  "public": "public",
  
  // Variables de entorno disponibles
  "env": [
    "CORS_ORIGIN",
    "DATABASE_URL",
    "JWT_SECRET",
    "NODE_ENV"
  ],
  
  // Configuración de Functions
  "functions": {
    "api/**/*.js": {
      "memory": 512,
      "maxDuration": 10,
      "runtime": "nodejs18.x"
    }
  },

  // Rewrites - No cambia la URL del cliente
  "rewrites": [
    {
      "source": "/api/v1/:path*",
      "destination": "/api/v1/:path*"
    }
  ],

  // Redirects
  "redirects": [
    {
      "source": "/index",
      "destination": "/",
      "permanent": true
    }
  ],

  // Headers HTTP personalizados
  "headers": [
    // Headers de seguridad para todo
    {
      "source": "/.*",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    },
    
    // API: No cachear, siempre fresh
    {
      "source": "/api/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        },
        {
          "key": "Pragma",
          "value": "no-cache"
        },
        {
          "key": "Expires",
          "value": "0"
        }
      ]
    },
    
    // Assets estáticos: Cachear indefinidamente
    {
      "source": "/assets/(?:css|js|images)/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    
    // Fuentes: Cachear mucho tiempo
    {
      "source": "/.*\\.(woff|woff2|eot|ttf|otf)$",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    
    // Imágenes: Cachear 1 año
    {
      "source": "/.*\\.(png|jpg|jpeg|gif|webp|svg)$",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    
    // HTML: Cachear pero validar
    {
      "source": "/.*\\.html?$",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, must-revalidate"
        }
      ]
    }
  ],

  // Monitoreo (opcional, requiere Vercel Pro)
  "analytics": {
    "enabled": true
  },

  // Web Vitals
  "webVitals": {
    "hideSourceMaps": true
  }
}
