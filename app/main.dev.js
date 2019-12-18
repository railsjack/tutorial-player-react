// require('update-electron-app')({
//   logger: require('electron-log')
// })

const path = require('path')
const glob = require('glob')
const {app, BrowserWindow, Menu} = require('electron')
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

const debug = /--debug/.test(process.argv[2])
console.log('process.env.NODE_ENV', process.argv);

if (process.mas) app.setName('Tutorial Player')
export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null

function initialize () {
  makeSingleInstance()

  loadProcesses()

  function createWindow () {
    const windowOptions = {
      width: 1080,
      minWidth: 680,
      height: 840,
      title: app.name,
      webPreferences: {
        nodeIntegration: true,
        devTools: true
      }
    }

    if (process.platform === 'linux') {
      windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
    }

    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.loadURL(path.join('file://', __dirname, '/app.html'))

    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
      mainWindow.webContents.openDevTools()
      mainWindow.maximize()
      require('devtron').install()
    }

    mainWindow.on('closed', () => {
      mainWindow = null
    })

    Menu.setApplicationMenu(null)

  }

  app.on('ready', () => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  });

  new AppUpdater();
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
  if (process.mas) return

  app.requestSingleInstanceLock()

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

// Require each JS file in the main-process dir
function loadProcesses () {
  const files = glob.sync(path.join(__dirname, '/main-process/**/*.js'))
  files.forEach((file) => { require(file) })
}

initialize()
