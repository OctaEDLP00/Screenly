// import type { Theme } from '~/types/i18n.d'
import rawStyles from './ThemeSelector.css?raw'

class ThemeSelector extends HTMLElement {
  selectElement: HTMLSelectElement | null = null

  constructor() {
    super()
    if (this.shadowRoot == null) return
    this.attachShadow({ mode: 'open' })
  }

  private initializeOptions() {
    const options: Array<{ value: string; label: string }> = [
      { value: 'system', label: '💻 System' },
      { value: 'light', label: '☀ Light' },
      { value: 'dark', label: '🌙 Dark' },
    ]

    options.map(({ value, label }) => {
      const opt = document.createElement('option')
      opt.value = value
      opt.textContent = label
      if (this.selectElement == null) return
      this.selectElement.appendChild(opt)
    })
  }

  private loadCurrentTheme() {
    const currentTheme = window.themeAPI.getTheme()
    if (this.selectElement == null) return
    this.selectElement.value = currentTheme
  }

  private setupEventListeners() {
    if (this.selectElement == null) return

    this.selectElement.addEventListener('change', function () {})
  }

  private setupThemeObserver() {
    window.themeAPI.onThemeChange(theme => {
      if (this.selectElement == null) return
      this.selectElement.value = theme === 'system' ? 'system' : theme
    })
  }

  static get styles() {
    return rawStyles
  }

  connectedCallback() {
    this.selectElement = this.querySelector('select')
    this.render()
    this.loadCurrentTheme()
    this.setupEventListeners()
    this.setupThemeObserver()
  }

  render() {
    if (this.shadowRoot == null) return
    this.shadowRoot.innerHTML = /* html */ `
      <style>${ThemeSelector.styles}</style>
      <select>
        ${this.initializeOptions()}
      </select>
    `
  }
}

customElements.define('theme-selector', ThemeSelector)
