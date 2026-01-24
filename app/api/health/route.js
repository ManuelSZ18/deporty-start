import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Verificar conexión a la base de datos
    await prisma.$connect()
    
    // Hacer una query simple para verificar que funciona
    const userCount = await prisma.usuario.count()
    
    await prisma.$disconnect()
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        userCount,
        host: process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || 'hidden'
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasDirectUrl: !!process.env.DIRECT_URL,
        hasDatabaseUrl: !!process.env.DATABASE_URL
      },
      region: process.env.VERCEL_REGION || 'local',
      deployment: {
        vercel: !!process.env.VERCEL,
        url: process.env.VERCEL_URL || 'localhost'
      }
    }, { status: 200 })
    
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: {
        message: error.message,
        code: error.code,
        type: error.constructor.name
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasDirectUrl: !!process.env.DIRECT_URL,
        hasDatabaseUrl: !!process.env.DATABASE_URL
      },
      hints: [
        !process.env.DATABASE_URL && 'DATABASE_URL no está configurada',
        process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('pooler') && 'DATABASE_URL no usa connection pooler',
        error.code === 'P1001' && 'No se puede alcanzar el servidor de base de datos',
        error.code === 'P1017' && 'Servidor cerró la conexión'
      ].filter(Boolean)
    }, { status: 500 })
  }
}
