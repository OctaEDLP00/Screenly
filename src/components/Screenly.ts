import { I18nService } from '@/services/i18n'
import { Language } from '@/types/i18n';

class Screenly extends HTMLElement {
  private i18n = I18nService.getInstance();
  private shadow: ShadowRoot;
  private mutationObserver: MutationObserver;

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' });
    this.initializeComponent();
  }

  private async initializeComponent() {
    await this.i18n.loadLanguage(this.getAttribute('language') as Language || 'en')
    this.render()
    this.setupObservers();
  }

  private setupObservers(): void {
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'language') {
          this.i18n.loadLanguage(this.getAttribute('language') as Language || 'en').then(() => this.updateTexts())
        }
      })
    })

    this.mutationObserver.observe(this, {
      attributes: true,
      attributeFilter: ['language']
    })
  }

  private updateTexts() {
    Array.from(this.shadow.querySelectorAll('[data-i18n]')).map((el) => {
      const key = el.getAttribute('data-i18n')
      const count = el.getAttribute('data-i18n-count')

      if (!count) el.textContent = this.i18n.translate(key)
      el.textContent = this.i18n.pluralize(key, parseInt(count))
    })

    Array.from(this.shadow.querySelectorAll('[data-i18n-date]')).map((el) => {
      const timestamp = el.getAttribute('data-i18n-date')
      const options = JSON.parse(el.getAttribute('data-i18n-options') || '{}')
      el.textContent = this.i18n.formatDate(new Date(timestamp), options)
    })
  }

  private getText(key: keyof TranslationKeys): string {
    return this.i18n.
  }

  private renderTexts() {
    Array.from(this.shadow.querySelectorAll<HTMLElement>('[data-i18n]')).map((el) => {
      const i18n = el.dataset.i18n
      el.textContent = this.getText(i18n)
    })
  }

  private setupEventListeners() {
    this.shadow.querySelector('.record-btn')?.addEventListener('click', function () {
      this.dispatchEvent(new CustomEvent('record-start'))
    })
    this.shadow.querySelector('.stop-btn')?.addEventListener('click', function () {
      this.dispatchEvent(new CustomEvent('record-stop'))
    })
  }

  static get observedAttributes(): Array<string> {
    return ['language', 'theme', 'recording-state']
  }

  private setupEventListeners() {
    this.shadow.querySelector('.record-btn')?.addEventListener('click', function () {
      this.dispatchEvent(new CustomEvent('record-start'))
    })
    this.shadow.querySelector('.stop-btn')?.addEventListener('click', function () {
      this.dispatchEvent(new CustomEvent('record-stop'))
    })
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    if (name === 'language' && oldVal !== newVal) {
      this.handleLanguageChange(newVal)
    }
  }

  connectedCallback() {
    this.initializeTheme();
    this.setupResizeObserver()
  }

  disconnectedCallback() {
    this.cleanupObservers();
  }

  initializeTheme() { }

  setupResizeObserver() {

  }

  private cleanupObservers() {
    this.mutationObserver.disconnect()
  }

  handleLanguageChange() { }

  private async loadResources() {
    await Promise.all([
      this.i18n.loadLanguage(this.getAttribute('lang') as Language || 'en'),
      this.loadThemeConfig()
    ])
  }

  loadThemeConfig() { }

  private getTranslates() {

  }

  static get styles() {
    return /* css */`
      :host {
        display: block;
        font-family: system-ui, -apple-system, sans-serif;
        --control-bg: var(--color-surface);
        --control-tetx: var(--color-text);
        --accent-color-tetx: var(--color-primary);
      }

      .container {
        padding: 1.5rem;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
      }

      .preview-container {
        width: 100%;
        height: 400px;
        border: 2px dashed #dddddd;
        border-radius: 4px;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f8f9fa;
      }

      .controls {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
      }

      button {
        padding: 0.5rem 1rem;
        border: none;
        cursor: pointer;
        transition: all .2s;
      }

      .record-btn {
        bacground-color: var(--primary-color);
        color: white;
      }

      .stop-btn {
        bacground-color: var(--danger-color);
        color: white;
      }

      .status-indicator {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #666666;
      }

      .recording-dot {
        width: 10px;
        height: 10px;
        background-color: var(--danger-color);
        border-radius: 50%;
        animation: pulse 1.5s infinite;
      }

      @keyframes pulse {
        0% { opacity: 1 }
        50% { opacity: 0.5 }
        100% { opacity: 1 }
      }
    `
  }

  private render() {
    this.shadow.innerHTML = /* html */`
      <style>${Screenly.styles}</style>
      <div class="container">
        <div class="preview-container">
          <span data-i18n="selectSource">${t.selectSource}</span>
        </div>
        <div class="controls">
          <button class="record-btn" data-i18n="record">${t.record}</button>
          <button class="stop-btn" data-i18n="stop">${t.stop}</button>
          <div class="status-indicator">
            <div class="recording-dot"></div>
            <span data-i18n="recording">${t.recording}</span>
          </div>
        </div>
      </div>
    `
    this.setupEventListeners()
  }
}

customElements.define('screen-ly', Screenly)
