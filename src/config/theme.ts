import type { GlobalThemeOverrides } from 'naive-ui'

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#70b147',
    primaryColorHover: '#85c45c',
    primaryColorPressed: '#5c9339',
    baseColor: '#f5f6fa',
  },
  Card: {
    color: '#ffffff',
    borderRadius: '8px',
  },
  Menu: {
    borderRadius: '8px',
  },
}

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#70b147',
    primaryColorHover: '#85c45c',
    primaryColorPressed: '#5c9339',
    baseColor: '#18181c',
  },
  Card: {
    color: '#1e1e24',
    borderRadius: '8px',
  },
  Menu: {
    borderRadius: '8px',
    color: '#1e1e24',
  },
}
