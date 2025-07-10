/**
 * 图标配置文件
 * 图标来源：https://icones.js.org/
 * 注意：如果在 icones.js.org 中找不到合适的图标，可以在 src/assets 目录下添加自定义 SVG 图标
 */
const IconMap: Record<string, string> = {
  // Linux 发行版
  'almalinux': 'i-devicon:almalinux',
  'alpine': 'i-simple-icons:alpinelinux',
  'archlinux': 'i-devicon:archlinux',
  'archlinuxarm': 'i-devicon:archlinux',
  'archlinuxcn': 'i-devicon:archlinux',
  'centos': 'i-devicon:centos',
  'centos-altarch': 'i-devicon:centos',
  'centos-stream': 'i-devicon:centos',
  'centos-vault': 'i-devicon:centos',
  'debian': 'i-devicon:debian',
  'deepin-cd': 'i-simple-icons:deepin',
  'debian-cd': 'i-devicon:debian',
  'debian-security': 'i-devicon:debian',
  'debian-nonfree': 'i-devicon:debian',
  'deb-multimedia': 'i-devicon:debian',
  'deepin': 'i-simple-icons:deepin',
  'fedora': 'i-devicon:fedora',
  'fedora-altarch': 'i-devicon:fedora',
  'kali': 'i-devicon:kalilinux',
  'kali-images': 'i-devicon:kalilinux',
  'manjaro': 'i-logos:manjaro',
  //'openbsd': 'i-devicon:unix',
  'openeuler': 'i-devicon:linux',
  'opensuse': 'i-devicon:opensuse',
  'ubuntu': 'i-logos:ubuntu',
  'ubuntu-cdimage': 'i-logos:ubuntu',
  'ubuntu-ports': 'i-logos:ubuntu',
  'ubuntu-releases': 'i-logos:ubuntu',
  'ubuntukylin': 'i-devicon:ubuntu',
  'endeavouros': 'i-simple-icons:endeavouros',
  'proxmox': 'i-simple-icons:proxmox',

  // 开发工具和平台
  'anaconda': 'i-devicon:anaconda',
  'cmake': 'i-devicon:cmake',
  'docker': 'i-devicon:docker',
  'docker-ce': 'i-devicon:docker',
  'gcr': 'i-devicon:docker',
  'nvcr': 'i-devicon:docker',
  'eclipse': 'i-devicon:eclipse',
  'gcc': 'i-devicon:gcc',
  'github': 'i-devicon:github',
  'golang': 'i-devicon:go',
  'maven': 'i-devicon:maven',
  'npm': 'i-devicon:npm',
  'pypi': 'i-devicon:pypi',
  'dotnet': 'i-devicon:dotnet',
  'llvm-apt': 'i-devicon:llvm',
  'termux': 'i-arcticons:termux',

  // 操作系统和内核
  'aosp': 'i-devicon:android',
  'aosp-monthly': 'i-devicon:android',
  'linux': 'i-devicon:linux',
  'unix': 'i-devicon:unix',
  'openwrt': 'i-devicon:linux',
  'postmarketos': 'i-devicon:linux',
  'postmarketos-images': 'i-devicon:linux',

  // 包管理和仓库
  'homebrew': 'i-devicon:homebrew',
  'homebrew-bottles': 'i-devicon:homebrew',
  'nix': 'i-devicon:nixos',
  'nixos-images': 'i-devicon:nixos',
  'nix-channels': 'i-devicon:nixos',
  'nugut': 'i-file-icons:nugut',
  'epel': 'i-simple-icons:fedora',
  'quay': 'i-devicon:docker',
  'goproxy': 'i-devicon:go',
  'ghcr': 'i-simple-icons:github',
  'github-release': 'i-simple-icons:github',
  'fdroid': 'i-simple-icons:fdroid',

  // 软件和服务
  'apache': 'i-devicon:apache',
  'kde': 'i-simple-icons:kde',
  'kde-application': 'i-simple-icons:kde',
  'kubernetes': 'i-devicon:kubernetes',
  'k8s': 'i-devicon:kubernetes',
  'kicad': 'i-file-icons:kicad',
  'wireshark': 'i-simple-icons:wireshark',

  // 硬件和驱动
  'raspberrypi': 'i-devicon:raspberrypi',
  'raspberry-pi-os-images': 'i-devicon:raspberrypi',
  'raspbian': 'i-devicon:raspberrypi',
  'nvidia': 'i-simple-icons:nvidia',

  // 待优化图标
  'ceph': 'i-carbon:cloud-satellite',
  'cygwin': 'i-carbon:cloud-satellite',
  'glibc': 'i-carbon:cloud-satellite',

  // 自定义图标
  'armbian': 'i-custom-armbian',
  'armbian-dl': 'i-custom-armbian',
  'openbsd': 'i-custom-openbsd',

  // 默认图标
  'default': 'i-carbon:cloud-satellite',
}

// 添加图标颜色映射
const IconColorMap: Record<string, string> = {
  'alpine': 'text-[#0D597F]',
  'deepin': 'text-[#E95420]',
  'deepin-cd': 'text-[#E95420]',
}

export function getIconClass(id: string): string {
  const iconName = IconMap[id.toLowerCase()] || IconMap.default
  const colorClass = IconColorMap[id.toLowerCase()] || 'text-gray-700 dark:text-gray-200'
  return `${iconName} ${colorClass}`
}

export const IconClasses = [
  ...Object.values(IconMap),
  ...Object.values(IconColorMap),
]
