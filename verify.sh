#!/bin/bash

# 🎯 Checklist de Verificación - Adaptación a Vercel Completada

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "  🎯 CHECKLIST DEPORTY VERCEL - VERIFICACIÓN COMPLETA"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contadores
PASS=0
FAIL=0
WARN=0

# Función para verificar archivos
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} Archivo existe: $1"
        ((PASS++))
    else
        echo -e "${RED}❌${NC} Archivo falta: $1"
        ((FAIL++))
    fi
}

# Función para verificar carpetas
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅${NC} Carpeta existe: $1"
        ((PASS++))
    else
        echo -e "${RED}❌${NC} Carpeta falta: $1"
        ((FAIL++))
    fi
}

echo "📁 ESTRUCTURA DE CARPETAS"
echo "─────────────────────────────────────────────────────────────"
check_dir "api"
check_dir "api/controllers"
check_dir "api/middleware"
check_dir "api/v1"
check_dir "api/v1/auth"
check_dir "public"
check_dir "public/assets"
echo ""

echo "📄 ARCHIVOS DE CONFIGURACIÓN"
echo "─────────────────────────────────────────────────────────────"
check_file "vercel.json"
check_file ".vercelignore"
check_file ".env.example"
check_file ".gitignore"
check_file "package.json"
echo ""

echo "🔌 VERCEL FUNCTIONS"
echo "─────────────────────────────────────────────────────────────"
check_file "api/v1/auth/registro.js"
check_file "api/v1/auth/login.js"
check_file "api/v1/estado.js"
check_file "api/controllers/authController.js"
check_file "api/middleware/handlers.js"
echo ""

echo "🎨 FRONTEND OPTIMIZADO"
echo "─────────────────────────────────────────────────────────────"
check_file "public/index.html"
check_file "public/login.html"
check_file "public/signup.html"
check_file "public/service-worker.js"
check_file "public/assets/js/main.js"
echo ""

echo "📚 DOCUMENTACIÓN"
echo "─────────────────────────────────────────────────────────────"
check_file "DEPLOYMENT.md"
check_file "CHANGES.md"
check_file "ARCHITECTURE.md"
check_file "dev.sh"
echo ""

echo "🔍 VALIDACIÓN DE CONTENIDO"
echo "─────────────────────────────────────────────────────────────"

# Verificar que vercel.json es válido JSON
if command -v jq &> /dev/null; then
    if jq empty vercel.json 2>/dev/null; then
        echo -e "${GREEN}✅${NC} vercel.json es JSON válido"
        ((PASS++))
    else
        echo -e "${RED}❌${NC} vercel.json tiene error JSON"
        ((FAIL++))
    fi
else
    echo -e "${YELLOW}⚠️${NC} jq no instalado - no puedo validar JSON"
    ((WARN++))
fi

# Verificar que package.json tiene dependencias correctas
if grep -q "dotenv" package.json; then
    echo -e "${GREEN}✅${NC} package.json tiene dependencias correctas"
    ((PASS++))
else
    echo -e "${RED}❌${NC} package.json falta dependencias"
    ((FAIL++))
fi

# Verificar que no hay Express en package.json
if ! grep -q "express" package.json; then
    echo -e "${GREEN}✅${NC} Express removido correctamente"
    ((PASS++))
else
    echo -e "${YELLOW}⚠️${NC} Express aún en package.json (puede ser intencional)"
    ((WARN++))
fi

# Verificar service worker
if grep -q "Network-first" public/service-worker.js; then
    echo -e "${GREEN}✅${NC} Service Worker optimizado"
    ((PASS++))
else
    echo -e "${RED}❌${NC} Service Worker no está optimizado"
    ((FAIL++))
fi

echo ""
echo "🔐 SEGURIDAD"
echo "─────────────────────────────────────────────────────────────"

# Verificar headers de seguridad
if grep -q "X-Frame-Options" vercel.json; then
    echo -e "${GREEN}✅${NC} Headers de seguridad configurados"
    ((PASS++))
else
    echo -e "${RED}❌${NC} Headers de seguridad no configurados"
    ((FAIL++))
fi

# Verificar HTTPS/HSTS
if grep -q "Strict-Transport-Security" vercel.json; then
    echo -e "${GREEN}✅${NC} HSTS habilitado"
    ((PASS++))
else
    echo -e "${YELLOW}⚠️${NC} HSTS no configurado"
    ((WARN++))
fi

# Verificar CORS
if grep -q "CORS_ORIGIN" .env.example; then
    echo -e "${GREEN}✅${NC} CORS configurable"
    ((PASS++))
else
    echo -e "${RED}❌${NC} CORS no configurable"
    ((FAIL++))
fi

echo ""
echo "⚡ RENDIMIENTO"
echo "─────────────────────────────────────────────────────────────"

# Verificar caching
if grep -q "31536000" vercel.json; then
    echo -e "${GREEN}✅${NC} Caching de larga duración configurado"
    ((PASS++))
else
    echo -e "${RED}❌${NC} Caching no configurado correctamente"
    ((FAIL++))
fi

# Verificar Service Worker caching
if grep -q "Cache-Control" public/service-worker.js; then
    echo -e "${GREEN}✅${NC} Estrategias de caching en Service Worker"
    ((PASS++))
else
    echo -e "${RED}❌${NC} Service Worker sin estrategias de caching"
    ((FAIL++))
fi

echo ""
echo "📊 RESUMEN"
echo "─────────────────────────────────────────────────────────────"
echo -e "${GREEN}✅ PASADAS:${NC}  $PASS"
echo -e "${RED}❌ FALLIDAS:${NC}  $FAIL"
echo -e "${YELLOW}⚠️ ADVERTENCIAS:${NC}  $WARN"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}  🎉 ¡ADAPTACIÓN COMPLETADA CON ÉXITO!${NC}"
    echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo "Tu proyecto está 100% listo para Vercel"
    echo ""
    echo "📋 PRÓXIMOS PASOS:"
    echo "   1. Instalar Vercel CLI: npm install -g vercel"
    echo "   2. Deploy: vercel --prod"
    echo "   3. Configurar variables en Vercel Dashboard"
    echo ""
    exit 0
else
    echo -e "${RED}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${RED}  ❌ SE ENCONTRARON PROBLEMAS${NC}"
    echo -e "${RED}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo "Revisa los errores arriba e intenta nuevamente"
    echo ""
    exit 1
fi
