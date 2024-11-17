import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'
import type { IconifyJSON } from '@iconify/types'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { IconClasses } from './src/config/icons'

export default defineConfig({
  safelist: IconClasses,
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      collections: {
        'carbon': () => import('@iconify-json/carbon/icons.json').then(i => i.default as IconifyJSON),
        'devicon': () => import('@iconify-json/devicon/icons.json').then(i => i.default as IconifyJSON),
        'file-icons': () => import('@iconify-json/file-icons/icons.json').then(i => i.default as IconifyJSON),
        'logos': () => import('@iconify-json/logos/icons.json').then(i => i.default as IconifyJSON),
        'simple-icons': () => import('@iconify-json/simple-icons/icons.json').then(i => i.default as IconifyJSON),
        'custom': FileSystemIconLoader(
          './src/assets/icons',
          svg => svg.replace(/#fff/, 'currentColor'),
        ),
        lucide: () => import('@iconify-json/lucide/icons.json').then(i => i.default),
      },
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  theme: {
    dark: {
      bg: {
        dark: '#1a1a1a',
      },
    },
  },
})
