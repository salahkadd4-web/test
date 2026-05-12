const nextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },

  // ── Résolution du schéma "node:" non géré par Webpack ──────────────────
  // bcryptjs et certaines dépendances importent via "node:crypto", "node:stream", etc.
  // On redirige vers les modules natifs sans préfixe.
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'node:crypto': 'crypto',
        'node:stream': 'stream',
        'node:buffer': 'buffer',
        'node:util':   'util',
        'node:events': 'events',
      }
    }
    return config
  },
}

module.exports = nextConfig