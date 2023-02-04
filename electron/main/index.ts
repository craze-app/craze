import { app, BrowserWindow, dialog, ipcMain, IpcMainEvent, Menu, shell } from 'electron'

import * as fs from 'fs'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { release } from 'node:os'
import { join } from 'node:path'
import FileFilter = Electron.FileFilter
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '../')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    transparent: process.platform === 'darwin',
    frame: process.platform !== 'darwin',
    vibrancy: 'ultra-dark',
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
    width: 1000,
    height: 600,
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    //win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  app.on('browser-window-focus', () => {
    win.webContents.send('focused')
  })

  app.on('browser-window-blur', () => {
    win.webContents.send('blurred')
  })

  ipcMain.on('toggle-maximize', () => {
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  })

  ipcMain.on('toggle-always-on-top', () => {
    if (win.isAlwaysOnTop()) {
      win.setAlwaysOnTop(false)
    } else {
      win.setAlwaysOnTop(true)
    }
  })

  ipcMain.on(
    'save-file-dialog',
    (event, args: { content: string | NodeJS.ArrayBufferView; filters: FileFilter[] }) => {
      dialog
        .showSaveDialog({
          title: 'Select the File Path to save',
          defaultPath: app.getPath('downloads'),
          buttonLabel: 'Save',
          properties: [],
          filters: args.filters,
        })
        .then((file) => {
          if (!file.canceled) {
            fs.writeFile(file.filePath.toString(), args.content, function (err) {
              if (err) throw err
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  )

  const menuTemplate: Array<MenuItemConstructorOptions> = [
    { role: 'appMenu' },
    { role: 'fileMenu' },
    { role: 'editMenu' },
    { role: 'viewMenu' },
    { role: 'windowMenu' },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            await shell.openExternal('https://github.com/craze-app/craze')
          },
        },
      ],
    },
  ]

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

  win.on('always-on-top-changed', (event, status) => {
    win.webContents.send('on-update-always-on-top', status)
  })

  type WriteToTextFile = {
    featureId: string
    text: string
  }

  ipcMain.handle('write-text-to-file', (event: IpcMainEvent, ...args: WriteToTextFile[]) => {
    const arg = args[0]

    if (arg.featureId !== undefined && arg.featureId === 'html-preview') {
      try {
        const tempFolder = join(app.getPath('temp'), 'craze-app')
        if (!existsSync(tempFolder)) {
          mkdirSync(tempFolder)
        }

        const file = join(tempFolder, `${arg.featureId}.html`)

        writeFileSync(file, arg.text)

        return process.platform === 'darwin' ? `file:///private/${file}` : file
      } catch (e: unknown) {
        return null
      }
    }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})
