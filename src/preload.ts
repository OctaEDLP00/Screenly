import { contextBridge, ipcRenderer } from 'electron'
import Store from 'electron-store'
import type { Theme } from '@/types/i18n.d'

const store = new Store()
contextBridge.exposeInMainWorld('themeAPI', {
  getTheme: () => store.get('theme') || 'system',
  setTheme: (theme: Theme) => {
    store.set('theme', theme)
    ipcRenderer.send('theme-changed', theme)
  },
  onThemeChange: (callback: (theme: Theme) => void) => {
    ipcRenderer.on('theme-changed', (_, theme: Theme) => callback(theme))
  }
})
