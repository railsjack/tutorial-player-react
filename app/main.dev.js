const path = require('path');
// const glob = require('glob')
const { app, BrowserWindow, Menu } = require('electron');

require('./api/tutorial/electron/drop_dir');

if (process.mas) app.setName('Tutorial Player');

let mainWindow = null;

function initialize() {
  makeSingleInstance();

  // loadProcesses()

  function createWindow() {
    const windowOptions = {
      width: 1080,
      minWidth: 680,
      height: 840,
      title: app.name,
      webPreferences: {
        nodeIntegration: true,
        devTools: true
      }
    };

    if (process.platform === 'linux') {
      windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png');
    }

    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.loadURL(path.join('file://', __dirname, '/app.html'));

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    // Menu.setApplicationMenu(null);
  }

  app.on('ready', () => {
    createWindow();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
}

function makeSingleInstance() {
  if (process.mas) return;

  app.requestSingleInstanceLock();

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

// function loadProcesses () {
//   const files = glob.sync(path.join(__dirname, '/main-process/**/*.js'))
//   files.forEach((file) => { require(file) })
// }

initialize();
