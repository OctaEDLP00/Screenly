/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the  "renderer" context in
 * Electron, visit:
 *
 * [Process Model](https://electronjs.org/docs/tutorial/process-model)
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * [Security](https://electronjs.org/docs/tutorial/security)
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 * // create the browser window
 * mainWindow = new BrowserWindow({
 *   width: 800,
 *   height: 600,
 *   webPreferences: {
 *     nodeIntegration: true
 *   }
 * })
 * ```
 */

import '~/styles/global.css'
import '~/components/Screenly'
import '~/components/ThemeSelector'

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = window.themeAPI.getTheme()

  document.documentElement.setAttribute('data-theme',
    savedTheme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : savedTheme
  )

  const screenly = document.createElement('screen-ly')
  screenly.setAttribute('language', 'en')
  document.querySelector('main').append(screenly)

})

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (window.themeAPI.getTheme === 'system') {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
  }
})

console.log('👋🏼 This message is being logged by renderer.ts, included via Vite')
