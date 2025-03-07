import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron'
import started from 'electron-squirrel-startup'
import { join } from 'node:path'

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string
declare const MAIN_WINDOW_VITE_NAME: string

if (started) app.quit()

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.ts')
    }
  })

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }

  mainWindow.webContents.openDevTools()
  return mainWindow
}

app.on('ready', () => {
  const mainWindow = createWindow()
  nativeTheme.on('updated', () => {
    if (store.get('theme') === 'system') {
      mainWindow.webContents.send('theme-changed',
        nativeTheme.shouldUseDarkColors ? 'dark': 'light'
      )
    }
  })
})


ipcMain.handle('get-system-language', () => {
  return app.getLocale()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
