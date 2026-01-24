# 🏗️ Arquitectura Deporty en Vercel

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                     VERCEL CDN (Global)                         │
│                   ✨ 280+ Edge Locations                        │
└──────────────────┬──────────────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
   ┌────▼────┐          ┌────▼─────┐
   │ Frontend │          │  API     │
   │ Static   │          │ Functions│
   │ (Public) │          │  (/api)  │
   └────┬────┘          └────┬─────┘
        │                    │
   ┌────▼──────────────┐    │
   │  /public/         │    │
   │  ├─ index.html    │    │
   │  ├─ login.html    │    │
   │  ├─ signup.html   │    │
   │  └─ /assets/      │    │
   │     ├─ css/       │    │
   │     ├─ js/        │    │
   │     └─ images/    │    │
   └──────────────────┘    │
                           │
                   ┌───────▼──────────┐
                   │  Vercel Functions│
                   │  Node.js Runtime │
                   │  Memory: 512MB   │
                   │  Timeout: 10s    │
                   └───────┬──────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐       ┌────▼────┐      ┌─────▼──┐
   │Auth API │       │Users API │      │DB API  │
   │/api/v1/ │       │/api/v2/  │      │        │
   │auth/    │       │users/    │      │        │
   └─────────┘       └──────────┘      └────────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
   ┌────▼──────────┐              ┌──────────▼──┐
   │  Base de Datos│              │  Services   │
   │  (MongoDB,    │              │  Externos   │
   │   PostgreSQL) │              │  (JWT, etc) │
   └───────────────┘              └─────────────┘


## Flujo de Datos

1️⃣ USUARIO ACCEDE A LA APP
   Browser → CDN (Vercel Edge Network)
   ↓
   Sirve /public/index.html desde el servidor más cercano
   Cache-Control: 3600 segundos

2️⃣ SE CARGA FRONTEND
   HTML descarga:
   - /assets/css/main.css (cache 1 año)
   - /assets/js/main.js (cache 1 año)
   - Service Worker registrado

3️⃣ USUARIO INTERACTÚA (Login/Registro)
   Browser → POST /api/v1/auth/registro
   ↓
   Vercel Function se ejecuta en edge más cercano
   Function conecta a Base de Datos
   Respuesta sin cache (must-revalidate)

4️⃣ SERVICE WORKER CACHEA DATOS
   Network-first para APIs
   Cache-first para assets
   Offline support con datos cacheados


## Caching Strategy

┌──────────────────────────────────────────────────┐
│               CACHE HIERARCHY                     │
├──────────────────────────────────────────────────┤
│                                                  │
│  🔴 API Requests                                │
│     Cache-Control: no-cache, no-store            │
│     Strategy: Network-first                      │
│     Razón: Siempre datos frescos                │
│                                                  │
│  🟡 HTML Pages                                  │
│     Cache-Control: max-age=3600                  │
│     Strategy: Network-first                      │
│     Razón: Validar cambios cada hora             │
│                                                  │
│  🟢 CSS/JS/Images/Fonts                         │
│     Cache-Control: max-age=31536000, immutable   │
│     Strategy: Cache-first                       │
│     Razón: Assets versionados no cambian         │
│                                                  │
└──────────────────────────────────────────────────┘


## Performance Timeline

Browser Request Timeline:

0ms    ├─ DNS Lookup (resuelto via Vercel DNS)
       │
10ms   ├─ TCP Connection (conecta a Vercel Edge)
       │
25ms   ├─ TLS Handshake (HTTPS automático)
       │
40ms   ├─ First Byte (TTFB)
       ├─ HTML descargado
       │
200ms  ├─ CSS/JS descargados
       │
400ms  ├─ Content Painted
       │
1000ms ├─ Fully Interactive

Target: < 1 segundo First Contentful Paint (FCP)


## Security Layers

```
                     ┌─────────────────┐
                     │   Vercel Infra  │
                     │   DDoS Protection│
                     │   Auto-Scale    │
                     └────────┬────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
          ┌───▼──┐       ┌───▼──┐       ┌───▼──┐
          │HSTS  │       │X-Frame│     │CSP   │
          │      │       │Options│     │      │
          └──────┘       └───────┘     └──────┘
              │               │           │
              └───────────────┼───────────┘
                              │
              ┌───────────────▼───────────────┐
              │   Application Layer Security   │
              │   - Input Validation          │
              │   - JWT Authentication        │
              │   - Rate Limiting             │
              └───────────────────────────────┘


## Escalabilidad

Vercel automáticamente:

✅ Escala horizontalmente (serverless)
✅ No hay "cold starts" significativos en Vercel
✅ Distribuye en +280 regiones
✅ Auto-failover en caso de problema
✅ Uptime SLA 99.95%

Requests/segundo: UNLIMITED (auto-scale)
Concurrencia: UNLIMITED (serverless)
Regiones: 280+ (global)


## Costo Estimado (Ejemplo)

┌─────────────────────────────────────────┐
│  Vercel Free Plan (suficiente para MVP) │
├─────────────────────────────────────────┤
│  Build minutes: 100/mes (renovables)    │
│  Bandwidth: 100GB/mes                   │
│  Functions: Ilimitadas                  │
│  Edge Middleware: Ilimitado             │
│  Deployments: Ilimitados                │
│  Previews: Ilimitados                   │
│  Costo: $0                              │
└─────────────────────────────────────────┘

Pro Plan: $20/mes
- Build minutes: 500/mes
- Bandwidth: 1TB/mes
- Priority support
```

---

**Conclusión:** 
Tu proyecto usa lo último en serverless infrastructure con
máximo rendimiento y escalabilidad automática. 🚀
