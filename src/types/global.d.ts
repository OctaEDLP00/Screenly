type Theme = 'dark' | 'light' | 'system'

interface ThemeAPI {
  getTheme: () => Theme
  setTheme: (theme: Theme) => void
  onThemeChange: (callback: (theme: Theme) => void) => void
}

interface Window {
  themeAPI: ThemeAPI
}


declare module '../i18n/it.json' {
  const value: i18n
  export default value
}

declare module '../i18n/es.json' {
  const value: i18n
  export default value
}

declare module '../i18n/en.json' {
  const value: i18n
  export default value
}

declare module '../i18n/fr.json' {
  const value: i18n
  export default value
}
