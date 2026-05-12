import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { readFile, access } from 'fs/promises'
import { constants } from 'fs'
import path from 'path'

const DOCS_DIR = path.join(process.cwd(), 'private', 'documents')

const MIME_MAP: Record<string, string> = {
  jpg:  'image/jpeg',
  jpeg: 'image/jpeg',
  png:  'image/png',
  webp: 'image/webp',
  pdf:  'application/pdf',
}

// GET /api/admin/documents/[filename]
// Sert un document privé uniquement aux admins connectés
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }

  const { filename } = await params

  // ── Sécurité : interdire les path traversal (ex: ../../etc/passwd) ──
  if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return NextResponse.json({ error: 'Nom de fichier invalide' }, { status: 400 })
  }

  // Seuls les fichiers au format attendu sont acceptés : id_uuid.ext
  const validFilename = /^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp|pdf)$/i.test(filename)
  if (!validFilename) {
    return NextResponse.json({ error: 'Nom de fichier invalide' }, { status: 400 })
  }

  const filepath = path.join(DOCS_DIR, filename)

  // Vérifier que le fichier existe
  try {
    await access(filepath, constants.R_OK)
  } catch {
    return NextResponse.json({ error: 'Fichier introuvable' }, { status: 404 })
  }

  const buffer = await readFile(filepath)
  const ext    = filename.split('.').pop()?.toLowerCase() ?? ''
  const mime   = MIME_MAP[ext] ?? 'application/octet-stream'

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type':        mime,
      'Content-Disposition': `inline; filename="${filename}"`,
      // Empêcher la mise en cache par les proxies
      'Cache-Control':       'no-store, no-cache, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}