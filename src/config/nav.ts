import type { MenuOption } from 'naive-ui'
import { h } from 'vue'

function renderLabel(label: string, href?: string, target?: string) {
  if (!href) {
    return label
  }
  return () => h(
    'a',
    {
      href,
      target,
      rel: target === '_blank' ? 'noopener noreferrer' : undefined,
      class: 'text-sm font-medium no-hover-line',
    },
    { default: () => label },
  )
}

export const navItems: MenuOption[] = [
  {
    label: renderLabel('镜像列表', '/'),
    key: 'mirrors',
  },
  {
    label: renderLabel('系统状态', '/status'),
    key: 'status',
  },
  {
    label: renderLabel('帮助文档', '/help'),
    key: 'help',
  },
  {
    label: '相关链接',
    key: 'links',
    children: [
      {
        label: renderLabel('前端', 'https://github.com/CQUPTMirror/newredlens', '_blank'),
        key: 'github',
      },
      {
        label: renderLabel('镜像管理器 kubesync', 'https://github.com/CQUPTMirror/kubesync', '_blank'),
        key: 'api',
      },
    ],
  },
]
