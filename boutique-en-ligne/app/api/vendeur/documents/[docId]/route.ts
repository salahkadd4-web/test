import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// PATCH /api/vendeur/documents/[docId] — Soumettre le fichier pour un document demandé
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ docId: string }> }
) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'VENDEUR') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }

  const { docId } = await params
  const body = await req.json()
  const { filename } = body  // nom du fichier local (plus d'URL Cloudinary)

  if (!filename) {
    return NextResponse.json({ error: 'Nom de fichier requis' }, { status: 400 })
  }

  // Validation basique du nom de fichier
  const validFilename = /^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp|pdf)$/i.test(filename)
  if (!validFilename) {
    return NextResponse.json({ error: 'Nom de fichier invalide' }, { status: 400 })
  }

  // Vérifier que ce document appartient bien à ce vendeur
  const vendeur = await prisma.vendeurProfile.findUnique({
    where: { userId: session.user.id },
  })
  if (!vendeur) {
    return NextResponse.json({ error: 'Profil vendeur introuvable' }, { status: 404 })
  }

  const doc = await prisma.vendeurDocument.findFirst({
    where: { id: docId, vendeurId: vendeur.id },
  })
  if (!doc) {
    return NextResponse.json({ error: 'Document introuvable' }, { status: 404 })
  }

  // Mettre à jour → statut revient à EN_ATTENTE pour re-validation
  await prisma.vendeurDocument.update({
    where: { id: docId },
    data: {
      fichier:   filename,  // stocke le nom local, pas une URL
      statut:    'EN_ATTENTE',
      adminNote: null,
    },
  })

  // Vérifier s'il reste encore des docs sans fichier
  const docsManquants = await prisma.vendeurDocument.count({
    where: { vendeurId: vendeur.id, fichier: null },
  })

  return NextResponse.json({
    message: 'Document soumis avec succès',
    docsManquants,
  })
}