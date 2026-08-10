// Otimiza as imagens do site: redimensiona e converte PNG -> WebP.
// O canal alpha (transparencia) e preservado automaticamente pelo sharp.
//
// Uso:
//   npm i -D sharp
//   node scripts/optimize-images.mjs
//
// Os PNGs originais NAO sao apagados -- os .webp sao criados ao lado deles.

import { existsSync, statSync } from 'node:fs'
import sharp from 'sharp'

// true  = WebP lossless (pixel perfeito, reducao moderada de tamanho)
// false = WebP lossy q85 (perda imperceptivel, reducao de ~95%)
const LOSSLESS = false

const IMAGES = [
  { src: 'public/ilustra_contato.png', maxWidth: 1400 },
  { src: 'public/ilustra_about.png', maxWidth: 1400 },
  { src: 'public/FINAL_CARTA GLAUCO.png', maxWidth: 1600 },
  { src: 'public/ilustra_trampos.png', maxWidth: 1000 },
  { src: 'public/ilustra_trampos_2.png', maxWidth: 1000 },
]

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`

for (const { src, maxWidth } of IMAGES) {
  if (!existsSync(src)) {
    console.log(`[skip] nao encontrado: ${src}`)
    continue
  }

  const out = src.replace(/\.png$/i, '.webp')

  await sharp(src)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp(LOSSLESS ? { lossless: true } : { quality: 85, alphaQuality: 90 })
    .toFile(out)

  const before = statSync(src).size
  const after = statSync(out).size
  const pct = ((1 - after / before) * 100).toFixed(1)
  console.log(`[ok] ${out}  ${kb(before)} -> ${kb(after)}  (-${pct}%)`)
}
