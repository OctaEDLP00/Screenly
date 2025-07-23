import rawStyles from './Screenly.css?raw'

type Translations = {
  [key: string]: {
    record: string
    stop: string
    ready: string
    recording: string
    preview: string
  }
}

const TRANSLATIONS: Translations = {
  es: {
    record: 'Grabar',
    stop: 'Detener',
    ready: 'Listo',
    recording: 'Grabando...',
    preview: 'Previsualización'
  },
  en: {
    record: 'Record',
    stop: 'Stop',
    ready: 'Ready',
    recording: 'Recording...',
    preview: 'Preview'
  }
}

class Screenly extends HTMLElement {
  private shadow: ShadowRoot
  private mediaRecorder: MediaRecorder | null = null
  private chunks: Blob[] = []
  private isRecording: boolean = false
  private language: string = 'es'

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.language = this.getAttribute('language') || 'es'
    this.render()
    this.setupEventListeners()
  }

  static get styles() {
    return rawStyles
  }

  private render() {
    const t = TRANSLATIONS[this.language] || TRANSLATIONS['es']
    this.shadow.innerHTML = `
      <style>${Screenly.styles}</style>
      <div class="container">
        <div class="controls">
          <button class="record-btn">${t.record}</button>
          <button class="stop-btn" disabled>${t.stop}</button>
        </div>
        <div class="status">${this.isRecording ? t.recording : t.ready}</div>
        <video class="preview" controls style="display:none;width:100%;margin-top:1rem;"></video>
      </div>
    `
  }

  private setupEventListeners() {
    const getT = () => TRANSLATIONS[this.language] || TRANSLATIONS['es']
    const recordBtn = this.shadow.querySelector('.record-btn') as HTMLButtonElement
    const stopBtn = this.shadow.querySelector('.stop-btn') as HTMLButtonElement
    const statusDiv = this.shadow.querySelector('.status') as HTMLDivElement
    const video = this.shadow.querySelector('.preview') as HTMLVideoElement

    recordBtn.addEventListener('click', async () => {
      if (this.isRecording) return
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      this.mediaRecorder = new MediaRecorder(stream)
      this.chunks = []
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.chunks.push(e.data)
      }
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: 'video/webm' })
        video.src = URL.createObjectURL(blob)
        video.style.display = 'block'
      }
      this.mediaRecorder.start()
      this.isRecording = true
      statusDiv.textContent = getT().recording
      recordBtn.disabled = true
      stopBtn.disabled = false
    })

    stopBtn.addEventListener('click', () => {
      if (!this.isRecording || !this.mediaRecorder) return
      this.mediaRecorder.stop()
      this.isRecording = false
      statusDiv.textContent = getT().ready
      recordBtn.disabled = false
      stopBtn.disabled = true
    })
  }

  static get observedAttributes() {
    return ['language']
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'language' && oldValue !== newValue) {
      this.language = newValue || 'es'
      this.render()
      this.setupEventListeners()
    }
  }
}

customElements.define('screen-ly', Screenly)
