import type { MenuOption } from 'naive-ui'
import { h } from 'vue'

export const navItems: MenuOption[] = [
  {
    label: () => h(
      'a',
      {
        href: '/status.html',
        class: 'text-sm font-medium no-hover-line',
      },
      '系统状态',
    ),
    key: 'status',
  },
  {
    label: () => h(
      'a',
      {
        href: 'https://help.mirrors.cqupt.edu.cn',
        target: '_blank',
        rel: 'noopener noreferrer',
        class: 'text-sm font-medium no-hover-line',
      },
      '帮助文档',
    ),
    key: 'help',
  },
  {
    label: () => h(
      'a',
      {
        href: 'https://github.com/CQUPTMirror/newredlens',
        target: '_blank',
        rel: 'noopener noreferrer',
        class: 'text-sm font-medium no-hover-line',
      },
      '前端仓库',
    ),
    key: 'fe',
  },
  {
    label: () => h(
      'a',
      {
        href: 'https://github.com/CQUPTMirror/kubesync',
        target: '_blank',
        rel: 'noopener noreferrer',
        class: 'text-sm font-medium no-hover-line',
      },
      'kubesync',
    ),
    key: 'api',
  },
]
