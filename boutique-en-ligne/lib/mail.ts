import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Email de réinitialisation mot de passe
export async function sendResetEmail(email: string, code: string) {
  await transporter.sendMail({
    from: `"Boutique en ligne" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Code de réinitialisation de mot de passe',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto;">
        <h2>Réinitialisation du mot de passe</h2>
        <p>Votre code de réinitialisation est :</p>
        <h1 style="color: #2563eb; letter-spacing: 8px;">${code}</h1>
        <p>Ce code expire dans <strong>15 minutes</strong>.</p>
        <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
      </div>
    `,
  })
}

// Email de confirmation d'inscription
export async function sendConfirmationEmail(email: string, code: string, prenom: string) {
  await transporter.sendMail({
    from: `"Boutique en ligne" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Confirmez votre inscription',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto;">
        <h2>Bienvenue ${prenom} !</h2>
        <p>Merci de vous être inscrit sur notre boutique.</p>
        <p>Votre code de confirmation est :</p>
        <h1 style="color: #2563eb; letter-spacing: 8px;">${code}</h1>
        <p>Ce code expire dans <strong>15 minutes</strong>.</p>
        <p>Si vous n'avez pas créé de compte, ignorez cet email.</p>
      </div>
    `,
  })
}