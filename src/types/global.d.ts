interface Window {
  themeAPI: {
    getTheme: () => Theme;
    setTheme: (theme) => void
    onThemeChange: (callback: (theme: string) => void) => void
  }
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
