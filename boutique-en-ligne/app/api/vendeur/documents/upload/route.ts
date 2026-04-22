import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg':       'jpg',
  'image/png':        'png',
  'image/webp':       'webp',
  'application/pdf':  'pdf',
}

// Dossier hors de public/ → jamais servi directement par Next.js
const DOCS_DIR = path.join(process.cwd(), 'private', 'documents')

// POST /api/vendeur/documents/upload
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'VENDEUR') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    // ── Taille ────────────────────────────────────────────
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Fichier trop volumineux (max 10 MB)' },
        { status: 400 }
      )
    }

    // ── Type MIME ─────────────────────────────────────────
    const ext = ALLOWED_TYPES[file.type]
    if (!ext) {
      return NextResponse.json(
        { error: 'Type non autorisé. Formats acceptés : JPG, PNG, WebP, PDF.' },
        { status: 400 }
      )
    }

    // ── Magic bytes ───────────────────────────────────────
    const buffer = Buffer.from(await file.arrayBuffer())
    const b = buffer

    const isJpeg = b[0] === 0xFF && b[1] === 0xD8
    const isPng  = b[0] === 0x89 && b[1] === 0x50
    const isWebp = b[8] === 0x57 && b[9] === 0x45
    const isPdf  = b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46 // %PDF

    if (!isJpeg && !isPng && !isWebp && !isPdf) {
      return NextResponse.json(
        { error: 'Contenu du fichier invalide.' },
        { status: 400 }
      )
    }

    // ── Création du dossier si nécessaire ─────────────────
    if (!existsSync(DOCS_DIR)) {
      await mkdir(DOCS_DIR, { recursive: true })
    }

    // ── Nom de fichier unique (non devinable) ─────────────
    // Format : vendeurId_uuid.ext  (pour retrouver les fichiers d'un vendeur)
    const vendeurId = session.user.id
    const filename  = `${vendeurId}_${randomUUID()}.${ext}`
    const filepath  = path.join(DOCS_DIR, filename)

    await writeFile(filepath, buffer)

    return NextResponse.json({ filename })

  } catch (error) {
    console.error('Erreur upload document:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}