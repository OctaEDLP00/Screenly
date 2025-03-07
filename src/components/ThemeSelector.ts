import type { Theme } from '@/type/i18n.d'

class ThemeSelector extends HTMLElement {
  selectElement: HTMLSelectElement

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.selectElement = this.querySelector('select')
  }

  private initializeOptions() {
    const options: Array<{ value: string; label: string }> = [
      { value: 'system', label: '💻 System' },
      { value: 'light', label: '☀ Light' },
      { value: 'dark', label: '🌙 Dark' }
    ]

    options.map(({ value, label }) => {
      const opt = this.createElement('option')
      option.value = value
      option.textContent = label
      this.selectElement.appendChild(opt)
    })
  }

  private loadCurrentTheme() {
    const currentTheme = window.themeAPI.getTheme()
    this.selectElement.value = currentTheme
  }

  private setupEventListeners() {
    this.selectElement.addEventListener('change' function () {
      window.themeAPI.setTheme(this.selectElement.value as Theme)
    })
  }

  private setupThemeObserver() {
    window.themeAPI.onThemeChange((theme) => {
      this.selectElement.value = theme === 'system'
        ? 'system'
        : theme
    })
  }

  static get styles() {
    return /* css */`
      select {
        padding: 0.5rem;
        border-radius: 4px;
        background: var(--control-bg);
        color: var(--control-text);
        border: 1px solid var(--control-border);
        cursor: pointer;
      }
    `
  }

  connectedCallback() {
    this.render()
    this.loadCurrentTheme()
    this.setupEventListeners()
    this.setupThemeObserver()
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
      <style>${ ThemeSelector.styles }</style>
      <select>
        ${this.initializeOptions()}
      </select>
    `
  }
}

customElements.define('theme-selector', ThemeSelector)
