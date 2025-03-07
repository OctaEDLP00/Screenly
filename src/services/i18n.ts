import type { DateTimeFormatOptions, Language, NumberFormatOptions } from '@/types/i18n.d';
import { ipcRenderer } from 'electron';

type TranslationResource = Record<string, Record<string, string>>;
type PluralForms = Record<string, string>;

class I18nService {
  private static instance: I18nService;
  private currentLanguage: Language = 'en';
  private translations: TranslationResource = {};
  private pluralRules = new Map<string, Intl.PluralRules>();

  private constructor() {
    this.detectSystemLanguage()
  }

  public static getInstance(): I18nService {
    if (!I18nService.instance) {
      I18nService.instance = new I18nService()
    }
    return I18nService.instance
  }

  private async detectSystemLanguage() {
    const systemLanguage = await ipcRenderer.invoke('get-system-language');
    this.currentLanguage = this.getSupportedLanguage(systemLanguage)
  }

  public async loadLanguage(lang: Language): Promise<void> {
    this.currentLanguage = this.getSupportedLanguage(lang)

    try {
      const response = await fetch(`src/i18n/${this.currentLanguage}.json`)
      this.translations[this.currentLanguage] = await response.json()

      this.pluralRules.set(
        this.currentLanguage,
        new Intl.PluralRules(this.currentLanguage)
      )
    } catch (error) {
      console.error(`Error loading translations: ${error.stack}`)
    }
  }

  public translate(key: string, params?: Record<string, unknown>): string {
    const translation = this.translations[this.currentLanguage]?.[key] || key
    return this.replaceParams(translation, params)
  }

  public pluralize(key: string, count: number): string {
    const rule = this.pluralRules.get(this.currentLanguage)?.select(count) || 'other';
    return this.translate(`${key}.${rule}`, { count })
  }

  public formatNumber(num: number, options: NumberFormatOptions = {}): string {
    return new Intl.NumberFormat(this.currentLanguage, {
      style: options.style,
      currency: options.currency,
      ...options
    }).format(num)
  }

  public formatDate(date: Date, options: DateTimeFormatOptions = {}): string {
    return new Intl.DateTimeFormat(this.currentLanguage, {
      dateStyle: options.dateStyle,
      timeStyle: options.timeStyle,
      ...options
    }).format(date)
  }

  private replaceParams(text: string, params?: Record<string, unknown>): string {
    return params
      ? Object.entries(params).reduce((acc, [key, value]) => acc.replace(new RegExp(`{{${key}}}`, 'g'), String(value)), text)
      : text
  }

  private getSupportedLanguage(lang: Language): Language {
    const supportedLanguages = ['en', 'es', 'it', 'fr']
    return supportedLanguages.includes(lang) ? lang : this.currentLanguage
  }

}

export { I18nService };
export default I18nService
