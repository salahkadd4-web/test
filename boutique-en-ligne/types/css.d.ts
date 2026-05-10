// Déclaration de type pour les imports CSS (side-effect imports)
declare module '*.css' {
  const content: Record<string, string>
  export default content
}
