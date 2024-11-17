import type { GlobalThemeOverrides } from 'naive-ui'

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#22c55e',
    primaryColorHover: '#4ade80',
    primaryColorPressed: '#16a34a',
    baseColor: '#f8fafc',
  },
  Card: {
    color: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  },
  Menu: {
    borderRadius: '12px',
    color: '#ffffff',
  },
}

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#22c55e',
    primaryColorHover: '#4ade80',
    primaryColorPressed: '#16a34a',
    baseColor: '#0f172a',
  },
  Card: {
    color: '#1e293b',
    borderRadius: '12px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
  },
  Menu: {
    borderRadius: '12px',
    color: '#1e293b',
  },
}
