import { auth } from '@/auth'
import { redirect } from 'next/navigation'

/**
 * Point d'entrée pour l'app mobile Capacitor.
 * MainActivity charge cette URL à chaque lancement.
 * La vérification de session est 100 % serveur → zéro flash.
 */
export default async function AppEntryPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/connexion')
  }

  if (session.user.role === 'ADMIN')   redirect('/admin')
  if (session.user.role === 'VENDEUR') redirect('/vendeur')

  redirect('/')
}