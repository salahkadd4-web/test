/**
 * lib/googleAuth.ts
 * Gère la connexion Google selon la plateforme (web vs app native)
 */

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://test-rosy-omega-60.vercel.app'

export async function signInWithGoogle(callbackUrl?: string) {
  const destination = callbackUrl || `${APP_URL}/`

  try {
    const { Capacitor } = await import('@capacitor/core')

    if (Capacitor.isNativePlatform()) {
      // App native Android/iOS — ouvrir dans WebView intégrée
      const { Browser } = await import('@capacitor/browser')

      const googleUrl = `${APP_URL}/api/auth/signin/google?callbackUrl=${encodeURIComponent(destination)}`

      await Browser.open({
        url:               googleUrl,
        windowName:        '_self',       // ← reste dans l'app
        presentationStyle: 'fullscreen',  // ← plein écran
        toolbarColor:      '#000000',
      })

      // Écouter quand le browser se ferme (retour dans l'app)
      Browser.addListener('browserFinished', () => {
        window.location.reload()
      })

    } else {
      // Web — comportement normal NextAuth
      const { signIn } = await import('next-auth/react')
      await signIn('google', { callbackUrl: destination })
    }
  } catch (err) {
    console.error('Erreur Google sign-in:', err)
    // Fallback web
    const { signIn } = await import('next-auth/react')
    await signIn('google', { callbackUrl: destination })
  }
}