#!/usr/bin/env node
/**
 * migrate-emoji-to-svg.mjs  —  CabaStore
 * ---------------------------------------------------------------------------
 * Remplace automatiquement tous les emojis par des composants Lucide React.
 *
 * USAGE (depuis la racine du projet CabaStore) :
 *   node migrate-emoji-to-svg.mjs           ← dry-run, affiche le rapport
 *   node migrate-emoji-to-svg.mjs --write   ← modifie les fichiers en place
 *
 * PRÉ-REQUIS :
 *   npm install lucide-react   (ou pnpm / yarn)
 * ---------------------------------------------------------------------------
 */

import fs   from 'fs'
import path from 'path'

const DRY_RUN = !process.argv.includes('--write')

// ── 1. Mapping emoji → Lucide icon + taille par défaut ────────────────────
const EMOJI_MAP = {
  // ── Statuts / feedback ────
  '✅': { icon: 'CheckCircle2',   size: 'auto'   },   // big: w-16 h-16, inline: w-4 h-4
  '❌': { icon: 'XCircle',        size: 'auto'   },
  '⚠':  { icon: 'AlertTriangle',  size: 'auto'   },
  '✓':  { icon: 'Check',          size: 'w-4 h-4' },
  '✕':  { icon: 'X',              size: 'w-4 h-4' },
  '✗':  { icon: 'X',              size: 'w-4 h-4' },
  '🚫': { icon: 'Ban',            size: 'auto'   },

  // ── Commerce ──────────────
  '📦': { icon: 'Package',        size: 'auto'   },
  '🛒': { icon: 'ShoppingCart',   size: 'auto'   },
  '🛍': { icon: 'ShoppingBag',    size: 'auto'   },
  '🏷': { icon: 'Tag',            size: 'w-4 h-4' },
  '🏪': { icon: 'Store',          size: 'auto'   },
  '💰': { icon: 'Banknote',       size: 'auto'   },
  '💳': { icon: 'CreditCard',     size: 'auto'   },
  '💎': { icon: 'Gem',            size: 'auto'   },

  // ── Actions ───────────────
  '✏':  { icon: 'Pencil',         size: 'w-4 h-4' },
  '🗑': { icon: 'Trash2',         size: 'w-4 h-4' },
  '🔄': { icon: 'RefreshCw',      size: 'w-4 h-4' },
  '🔍': { icon: 'Search',         size: 'w-4 h-4' },
  '👁': { icon: 'Eye',            size: 'w-4 h-4' },
  '🔑': { icon: 'KeyRound',       size: 'auto'   },
  '🔒': { icon: 'Lock',           size: 'auto'   },
  '🔧': { icon: 'Wrench',         size: 'auto'   },
  '📋': { icon: 'ClipboardList',  size: 'auto'   },
  '📎': { icon: 'Paperclip',      size: 'w-4 h-4' },
  '📁': { icon: 'FolderOpen',     size: 'w-6 h-6' },
  '📤': { icon: 'Upload',         size: 'w-5 h-5' },
  '▶':  { icon: 'Play',           size: 'w-4 h-4' },
  '⏸': { icon: 'Pause',          size: 'w-4 h-4' },

  // ── Logistique ────────────
  '🚚': { icon: 'Truck',          size: 'auto'   },
  '📍': { icon: 'MapPin',         size: 'auto'   },
  '📌': { icon: 'Pin',            size: 'w-4 h-4' },

  // ── Personnes ─────────────
  '👤': { icon: 'User',           size: 'auto'   },
  '👥': { icon: 'Users',          size: 'auto'   },
  '📞': { icon: 'Phone',          size: 'auto'   },
  '📧': { icon: 'Mail',           size: 'auto'   },

  // ── Interface ─────────────
  '☰':  { icon: 'Menu',           size: 'w-5 h-5' },
  '🚪': { icon: 'LogOut',         size: 'w-4 h-4' },
  '⏳': { icon: 'Loader2',        size: 'w-4 h-4', extraClass: 'animate-spin' },
  '📷': { icon: 'Camera',         size: 'auto'   },
  '📸': { icon: 'Camera',         size: 'w-5 h-5' },
  '📱': { icon: 'Smartphone',     size: 'auto'   },
  '🎨': { icon: 'Palette',        size: 'auto'   },

  // ── Favoris ───────────────
  '❤':  { icon: 'Heart',          size: 'w-4 h-4', extraClass: 'fill-red-500 text-red-500' },
  '♥':  { icon: 'Heart',          size: 'w-4 h-4', extraClass: 'fill-red-500 text-red-500' },
  '🤍': { icon: 'Heart',          size: 'w-4 h-4' },

  // ── Stats / tableau de bord
  '📊': { icon: 'BarChart2',      size: 'auto'   },
  '📈': { icon: 'TrendingUp',     size: 'auto'   },
  '📉': { icon: 'TrendingDown',   size: 'auto'   },
  '⚙':  { icon: 'Settings',       size: 'auto'   },
  '🏆': { icon: 'Trophy',         size: 'auto'   },
  '⭐': { icon: 'Star',           size: 'auto'   },
  '🎉': { icon: 'PartyPopper',    size: 'auto'   },
  '🚀': { icon: 'Zap',            size: 'auto'   },
  '🤝': { icon: 'Handshake',      size: 'auto'   },

  // ── Divers ────────────────
  '😴': { icon: 'Moon',           size: 'auto'   },
  '💤': { icon: 'Moon',           size: 'auto'   },
  '🌸': { icon: 'Flower2',        size: 'auto'   },
  '📅': { icon: 'Calendar',       size: 'auto'   },
}

// taille choisie selon la classe CSS du parent (text-5xl / text-4xl / text-3xl)
function resolveSize(sizeSpec, parentClass = '') {
  if (sizeSpec !== 'auto') return sizeSpec
  if (/text-5xl|text-4xl/.test(parentClass)) return 'w-14 h-14'
  if (/text-3xl/.test(parentClass)) return 'w-10 h-10'
  if (/text-2xl|text-xl/.test(parentClass)) return 'w-8 h-8'
  return 'w-5 h-5'
}

// ── 2. Collecter tous les fichiers .tsx ───────────────────────────────────
function walkTsx(dir, files = []) {
  const skip = new Set(['node_modules', '.next', 'generated', 'android', 'ios', 'dist'])
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!skip.has(entry.name)) walkTsx(path.join(dir, entry.name), files)
    } else if (entry.name.endsWith('.tsx')) {
      files.push(path.join(dir, entry.name))
    }
  }
  return files
}

// ── 3. Analyse d'un fichier ───────────────────────────────────────────────
function analyzeFile(src) {
  const lines     = src.split('\n')
  const hits      = []
  const iconNames = new Set()

  const emojiRe = new RegExp(
    Object.keys(EMOJI_MAP).map(e => e.replace(/[\p{Emoji}]/gu, m => `(?:${[...m].map(c => `\\u{${c.codePointAt(0).toString(16)}}`).join('')})`)).join('|'),
    'gu'
  )

  lines.forEach((line, i) => {
    const matches = [...line.matchAll(emojiRe)]
    for (const m of matches) {
      const emoji = m[0]
      const conf  = EMOJI_MAP[emoji]
      if (!conf) continue
      iconNames.add(conf.icon)
      hits.push({ line: i + 1, col: m.index, emoji, icon: conf.icon, size: conf.size, extra: conf.extraClass, lineText: line.trim() })
    }
  })

  return { hits, iconNames }
}

// ── 4. Transformations regex ──────────────────────────────────────────────

/**
 * Retourne la chaîne className du composant Lucide à insérer.
 */
function iconJsx(icon, size, extra = '') {
  const cls = [size, extra].filter(Boolean).join(' ')
  return cls ? `<${icon} className="${cls}" />` : `<${icon} />`
}

function transform(src) {
  let out = src
  const usedIcons = new Set()

  for (const [emoji, conf] of Object.entries(EMOJI_MAP)) {
    if (!out.includes(emoji)) continue
    const { icon, size, extraClass } = conf

    const eRe = escapeRe(emoji)

    // ── 4a. Emoji seul dans un tag texte avec className ────────────────────
    //    <p className="text-5xl mb-4">✅</p>  →  <CheckCircle2 className="w-14 h-14 ..." />
    out = out.replace(
      new RegExp(`(<(?:p|div|span|h[1-6]|button|td|th)[^>]*className="([^"]*)"[^>]*>)\\s*(${eRe})\\s*(<\\/(?:p|div|span|h[1-6]|button|td|th)>)`, 'gu'),
      (_, open, cls, _e, close) => {
        const sz = resolveSize(size, cls)
        const component = iconJsx(icon, sz, extraClass)
        usedIcons.add(icon)
        if (/text-(?:5|4)xl/.test(cls)) return component
        return `${open}${component}${close}`
      }
    )

    // ── 4b. Emoji seul sans className : <span>EMOJI</span> ────────────────
    out = out.replace(
      new RegExp(`(<(?:span|div|td|th|p|button|li)>)\\s*(${eRe})\\uFE0F?\\s*(<\\/(?:span|div|td|th|p|button|li)>)`, 'gu'),
      (_, open, _e, close) => {
        const sz = resolveSize(size, '')
        usedIcons.add(icon)
        return `${open}${iconJsx(icon, sz, extraClass)}${close}`
      }
    )

    // ── 4c. Champ emoji dans un objet config : emoji: 'X' ou icon="X" ──────
    //    → icon: IconName   (prop JSX ou champ objet)
    out = out.replace(
      new RegExp(`(?:emoji|icon):\\s*['"]?(${eRe})\\uFE0F?['"]?`, 'gu'),
      () => {
        usedIcons.add(icon)
        return `icon: ${icon}`
      }
    )
    // icon="EMOJI" (attribut JSX string) → icon={IconName}
    out = out.replace(
      new RegExp(`icon="(${eRe})\\uFE0F?"`, 'gu'),
      () => {
        usedIcons.add(icon)
        return `icon={${icon}}`
      }
    )

    // ── 4d. Emoji en début de string JSX : '⏳ Texte...' ──────────────────
    //    {submitting ? '⏳ Envoi...' : '...'}
    //    → {submitting ? <><Loader2 className="..." />Envoi...</> : '...'}
    out = out.replace(
      new RegExp(`'(${eRe})([^']*)'`, 'gu'),
      (_, _e, rest) => {
        const sz = resolveSize(size, '')
        usedIcons.add(icon)
        const restTrimmed = rest.trimStart()
        return restTrimmed
          ? `<>${iconJsx(icon, sz, extraClass)}{' '}${restTrimmed}</>`
          : iconJsx(icon, sz, extraClass)
      }
    )

    // ── 4e. Emoji suivi de texte/expression dans un tag JSX ──────────────
    //    <p className="text-xs">⚠️ Aucune clé</p>           → texte pur
    //    <p className="text-xs">📦 {count} produits</p>     → avec {expr}
    out = out.replace(
      new RegExp(`(>)\\s*(${eRe})\\uFE0F?[ \\t]+([^<]*)(</)`, 'gu'),
      (_, open, _e, rest, close) => {
        // Skip if inside a string attribute (e.g. title="...EMOJI...") — the `>` guard handles it
        const sz = resolveSize(size, '')
        const inline = sz.includes('w-4') ? sz : 'w-4 h-4'
        usedIcons.add(icon)
        return `${open}<${icon} className="${inline} inline mr-1" />{' '}${rest}${close}`
      }
    )

    // ── 4f. Template literals : `📦 ${expr}` → `${<Package/>} ${expr}` ───
    //    Remplace uniquement l'emoji au début du template, garde le reste
    out = out.replace(
      new RegExp('`(${eRe})\\uFE0F?(\\s+\\$\\{[^`]+\\}[^`]*)`'.replace('${eRe}', eRe), 'gu'),
      (_, _e, rest) => {
        usedIcons.add(icon)
        // Convert to JSX fragment — template literal needs to become JSX
        return `<>${iconJsx(icon, 'w-4 h-4 inline mr-1', extraClass)}{' '}{\`${rest.trimStart()}\`}</>`
      }
    )

    // ── 4g. Tag avec attributs (onClick etc.) contenant seulement l'emoji ──
    //    <button onClick={fn}>✕</button>  →  <button onClick={fn}><X .../></button>
    out = out.replace(
      new RegExp(`(<(?:button|span|div|td|th|p|li|h[1-6])[^>]*>)\\s*(${eRe})\\uFE0F?\\s*(<\\/(?:button|span|div|td|th|p|li|h[1-6])>)`, 'gu'),
      (_, open, _e, close) => {
        const sz = resolveSize(size, open)
        usedIcons.add(icon)
        return `${open}${iconJsx(icon, sz, extraClass)}${close}`
      }
    )

    // ── 4h. Emoji en FIN de string : 'Confirmer ✅' ────────────────────────
    out = out.replace(
      new RegExp(`'([^']+?\\s+)(${eRe})\\uFE0F?'`, 'gu'),
      (_, text, _e) => {
        const sz = resolveSize(size, '')
        usedIcons.add(icon)
        return `<>${text.trimEnd()}{' '}${iconJsx(icon, sz, extraClass)}</>`
      }
    )

    // ── 4i. Catch-all : >EMOJI</tag> (opening tag sur ligne précédente) ────
    //    >✕</button>  →  ><X className="w-4 h-4" /></button>
    out = out.replace(
      new RegExp(`>\\s*(${eRe})\\uFE0F?\\s*(<\\/(?:button|span|div|p|li|td|th|h[1-6])>)`, 'gu'),
      (_, _e, close) => {
        const sz = resolveSize(size, '')
        usedIcons.add(icon)
        return `>${iconJsx(icon, sz, extraClass)}${close}`
      }
    )

    // ── 4j. Bare JSX text emoji seul sur une ligne : juste l'emoji ─────────
    //    {isAttente ? '⏳' : '🚫'}  déjà géré par 4d/4h
    //    Cas restant : emoji seul dans {expr}  ou texte JSX nu — skip (manuel)
  }

  return { code: out, usedIcons }
}

function escapeRe(str) {
  // Support optional variation selector \uFE0F after each emoji code point
  return [...str].map(c => `\\u{${c.codePointAt(0).toString(16)}}\\uFE0F?`).join('')
}

// ── 5. Gestion des imports lucide-react ──────────────────────────────────
function updateImports(src, usedIcons) {
  if (usedIcons.size === 0) return src

  // Extraire les icônes déjà importées depuis lucide-react
  const existingRe = /import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/g
  const alreadyImported = new Set()
  let existingMatch

  while ((existingMatch = existingRe.exec(src)) !== null) {
    existingMatch[1].split(',').forEach(s => alreadyImported.add(s.trim()))
  }

  const toAdd = [...usedIcons].filter(i => !alreadyImported.has(i))
  if (toAdd.length === 0) return src

  const allIcons = [...new Set([...alreadyImported, ...toAdd])].sort()
  const newImport = `import { ${allIcons.join(', ')} } from 'lucide-react'`

  // Remplacer l'import existant ou insérer après le dernier import
  if (src.includes("from 'lucide-react'") || src.includes('from "lucide-react"')) {
    return src.replace(/import\s*\{[^}]+\}\s*from\s*['"]lucide-react['"]/, newImport)
  }

  // Insérer après le dernier import
  const lastImportIdx = [...src.matchAll(/^import\s.+$/gm)].at(-1)
  if (lastImportIdx) {
    const pos = lastImportIdx.index + lastImportIdx[0].length
    return src.slice(0, pos) + '\n' + newImport + src.slice(pos)
  }

  return newImport + '\n' + src
}

// ── 6. MAIN ───────────────────────────────────────────────────────────────
const root  = process.cwd()
const files = walkTsx(root)

console.log(`\n🔍  Scan de ${files.length} fichiers .tsx…\n`)

const report   = { modified: [], unchanged: [], manual: [] }
let   totalHits = 0

for (const file of files) {
  const src    = fs.readFileSync(file, 'utf8')
  const { hits, iconNames } = analyzeFile(src)

  if (hits.length === 0) { report.unchanged.push(file); continue }

  totalHits += hits.length
  const { code, usedIcons } = transform(src)
  const final = updateImports(code, usedIcons)

  const rel = path.relative(root, file)

  // Vérifier si des emojis restent (cas non couverts → manuel)
  const remaining = analyzeFile(final).hits
  const status = remaining.length > 0 ? 'partial' : 'ok'

  if (DRY_RUN) {
    console.log(`  [${status === 'ok' ? '✔' : '⚠'}]  ${rel}`)
    for (const h of hits) {
      console.log(`       L${h.line}: ${h.emoji} → <${EMOJI_MAP[h.emoji]?.icon || '?'} /> — ${h.lineText.slice(0, 70)}`)
    }
    if (remaining.length > 0) {
      console.log(`       ⚠ ${remaining.length} cas restants → révision manuelle`)
      remaining.forEach(r => console.log(`         L${r.line}: ${r.emoji} — ${r.lineText.slice(0, 60)}`))
    }
    console.log('')
  } else {
    fs.writeFileSync(file, final, 'utf8')
    console.log(`  ✔  ${rel}  (${hits.length} emoji→SVG, ${remaining.length} manuel)`)
  }

  report.modified.push({ file: rel, hits: hits.length, remaining: remaining.length })
  if (remaining.length > 0) report.manual.push({ file: rel, cases: remaining })
}

// ── Résumé ────────────────────────────────────────────────────────────────
console.log('\n' + '─'.repeat(60))
console.log(`  Fichiers modifiés : ${report.modified.length}`)
console.log(`  Remplacements     : ${totalHits - report.manual.reduce((a, m) => a + m.cases.length, 0)}`)
console.log(`  Cas manuels       : ${report.manual.reduce((a, m) => a + m.cases.length, 0)}`)

if (report.manual.length > 0) {
  console.log('\n⚠  Cas nécessitant une révision manuelle :')
  console.log('   (Emojis dans des template literals complexes ou logique dynamique)\n')
  for (const { file, cases } of report.manual) {
    console.log(`  ${file}`)
    for (const c of cases) {
      console.log(`    L${c.line}: ${c.emoji}  ${c.lineText.slice(0, 70)}`)
    }
  }
}

if (DRY_RUN) {
  console.log('\n  ▶ Lance  node migrate-emoji-to-svg.mjs --write  pour appliquer.\n')
} else {
  console.log('\n  ✅ Migration terminée. Lance  npm run build  pour vérifier.\n')
  console.log('  💡 Si des erreurs TypeScript apparaissent pour les champs `icon:`,')
  console.log('     change le type du champ de `string` en `React.ElementType`.\n')
}
