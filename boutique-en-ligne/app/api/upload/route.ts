import { NextRequest, NextResponse } from 'next/server'
import { getAuthToken } from '@/lib/getAuthToken'
import cloudinary from '@/lib/cloudinary'

export async function POST(req: NextRequest) {
  try {
    const token = await getAuthToken(req)
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 })
    }

    // Convertir en buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload vers Cloudinary
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'boutique', resource_type: 'image' },
        (error, result) => {
          if (error) reject(error)
          else resolve(result as { secure_url: string })
        }
      ).end(buffer)
    })

    return NextResponse.json({ url: result.secure_url })
  } catch (error) {
    console.error('Erreur upload:', error)
    return NextResponse.json({ error: 'Erreur upload' }, { status: 500 })
  }
}