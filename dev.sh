#!/bin/bash

# 🚀 Deporty Development Server
# Este script inicia el servidor de desarrollo simulando Vercel localmente

echo "🚀 Iniciando servidor de desarrollo Deporty..."
echo ""
echo "Asegúrate de tener Vercel CLI instalado:"
echo "  npm install -g vercel"
echo ""

# Verificar si Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI no está instalado"
    echo "Instálalo con: npm install -g vercel"
    exit 1
fi

# Iniciar servidor de desarrollo
echo "📡 Iniciando servidor en http://localhost:3000"
echo "API disponible en http://localhost:3000/api/v1"
echo ""
echo "Presiona CTRL+C para detener"
echo ""

vercel dev
