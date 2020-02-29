const path = require('path')
import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  Menu,
  Tray
} from 'electron'

if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, subWindow, tray

const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 750,
    width: 450,
    frame: false,
    // alwaysOnTop: true,
    skipTaskbar: true,
    maximizable: false,
    fullscreenable: false,
    transparent: true,
    useContentSize: true
  })
  mainWindow.setThumbarButtons([
    {
      tooltip: 'button1',
      // icon: path.join(__dirname, '../../build/icons/icon.png'),
      click() {
        console.log('button1 clicked')
      }
    }
  ])
  // createTray()
  mainWindow.loadURL(winURL)
  const ret = globalShortcut.register('CommandOrControl+Shift+V', () => {
    mainWindow.webContents.send('activeTab', '最近的剪切板')
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
  const ret2 = globalShortcut.register('CommandOrControl+Shift+F', () => {
    mainWindow.webContents.send('activeTab', '收藏的剪切板')
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
  if (!ret) {
    console.log('registration failed')
  }
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createTray() {
  tray = new Tray(path.join(__dirname, '../../build/icons/icon.ico'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示窗口',
      type: 'normal',
      click: () => {
        mainWindow.webContents.send('activeTab', '最近的剪切板')
        mainWindow.show()
      }
    },
    {
      label: '隐藏窗口',
      type: 'normal',
      click: () => {
        mainWindow.hide()
      }
    },
    { type: 'separator' },
    { type: 'separator' },
    { label: '退出', role: 'quit', type: 'normal' }
  ])
  tray.setToolTip('clipboard is running...')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('hideWindow', () => {
  if (mainWindow) {
    mainWindow.hide()
  }
})
