import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'

const icon = (background, accent) => `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="100" fill="${background}"/>
  <path d="M296 48 112 288h128l-24 176L400 208H272l24-160Z" fill="${accent}"/>
</svg>`

const outputs = [
  ['public/logo.png', 512, '#10233f', '#ffffff'],
  ['public/icon.png', 512, '#c92732', '#ffffff'],
  ['public/icon_512.png', 512, '#c92732', '#ffffff'],
  ['public/icon_192.png', 192, '#c92732', '#ffffff'],
  ['public/apple-icon.png', 180, '#c92732', '#ffffff'],
  ['public/favicon-32.png', 32, '#c92732', '#ffffff'],
  ['public/icon_light.png', 512, '#ffffff', '#c92732'],
]

await Promise.all(outputs.map(([path, size, background, accent]) =>
  sharp(Buffer.from(icon(background, accent))).resize(size, size).png().toFile(path),
))

// Wrap the PNG in an ICO directory so the .ico file has a valid icon format.
const png = await sharp(Buffer.from(icon('#c92732', '#ffffff'))).resize(32, 32).png().toBuffer()
const header = Buffer.alloc(22)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(1, 4)
header[6] = 32
header[7] = 32
header.writeUInt16LE(1, 10)
header.writeUInt16LE(32, 12)
header.writeUInt32LE(png.length, 14)
header.writeUInt32LE(22, 18)
await writeFile('public/favicon.ico', Buffer.concat([header, png]))

console.log(`Generated ${outputs.length + 1} US Flash Feed brand assets.`)
