import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join } from 'path'

const PUBLIC_DIR = './public'
const IMAGES = [
  'ilustra_about.webp',
  'ilustra_contato.webp',
  'ilustra_trampos.webp',
  'ilustra_trampos_2.webp',
  'FINAL_CARTA GLAUCO.webp'
]

async function optimizeImage(filename: string) {
  const inputPath = join(PUBLIC_DIR, filename)
  const outputPath = join(PUBLIC_DIR, filename.replace('.webp', '.optimized.webp'))
  
  const stats = await stat(inputPath)
  const originalSize = stats.size
  
  await sharp(inputPath)
    .webp({ 
      quality: 75,
      effort: 6
    })
    .toFile(outputPath)
  
  const newStats = await stat(outputPath)
  const newSize = newStats.size
  const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1)
  
  console.log(`✓ ${filename}: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (${savings}% economia)`)
}

async function main() {
  console.log('Otimizando imagens...\n')
  
  for (const img of IMAGES) {
    try {
      await optimizeImage(img)
    } catch (err) {
      console.error(`✗ ${img}:`, err.message)
    }
  }
  
  console.log('\n✅ Concluído! Substitua os arquivos originais pelos .optimized.webp')
}

main()
