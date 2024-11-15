import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/',
      warn: true,
    }),
    presetWebFonts(),
  ],
  theme: {
    dark: 'class',
    colors: {
      primary: 'var(--primary-color)',
    },
  },
  shortcuts: {
    'bg-$bgColor': 'bg-[#ffffff] dark:bg-[#101014]',
    'text-$textColor': 'text-[#333639] dark:text-[#ffffffd1]',
    'border-$borderColor': 'text-[#eee] dark:text-[#ffffff1f]',
    'bg-$hoverColor': 'bg-[#f6f6f6] dark:bg-[#ffffff14]',
    'prose-base': 'max-w-none',
  },
})
