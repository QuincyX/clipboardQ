const path = require('path')
const fs = require('fs')
const { ipcRenderer, remote, clipboard } = require('electron')
import store from '../store'

let watchInstance, lastClip, lastHtmlClip, lastTextClip, lastImageClip

export default {
  init() {
    store.dispatch('initClipList')
    store.dispatch('initFaviClipList')
  },
  startWatch() {
    watchInstance = setInterval(() => {
      let newTextClip = clipboard.readText().trim()
      if (newTextClip && newTextClip !== lastTextClip) {
        lastTextClip = newTextClip
        store.dispatch('addClip', {
          type: 'text',
          text: newTextClip
        })
      }
    }, 1000)
  },
  stopWatch() {
    clearInterval(watchInstance)
  },
  clear(val) {
    store.dispatch('clearClipList', val)
  },
  isRunning() {
    return !!watchInstance
  },
  async handleGet() {
    let newClipImg = clipboard.readImage()
    if (newClipImg) {
      lastItem.image = await saveImage(newClipImg.toPNG())
    }
    lastItem.text = clipboard.readText()
  }
}

async function saveImage(buffer) {
  const name = path.join(
    remote.app.getPath('appData'),
    remote.app.getName(),
    'img',
    Date.now().toString() + '.png'
  )
  await fs.writeFileSync(name, buffer)
  return name
}
