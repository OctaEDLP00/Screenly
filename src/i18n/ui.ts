import type { KeyLang, KeyTranslation, UI } from './types.d.ts'

export const languages = {
  es: 'Español',
  en: 'English',
}

export const defaultLang: KeyLang = 'es'

export const ui: UI<KeyLang, KeyTranslation> = {
  en: {
    record: 'Record',
    stop: 'Stop',
    ready: 'Ready',
    recording: 'Recording...',
    preview: 'Preview',
  },
  es: {
    record: 'Grabar',
    stop: 'Detener',
    ready: 'Listo',
    recording: 'Grabando...',
    preview: 'Previsualización',
  }
}
