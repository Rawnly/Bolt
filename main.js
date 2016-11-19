// Open the DevTools.
// mainWindow.webContents.openDevTools()

const electron = require('electron')
// Module to control application life.
const app = electron.app
// Create Menu Bar
const Menu = electron.Menu
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let instructions
let mainWindow


function createWelcome() {
  // Create the browser window.
  instructions = new BrowserWindow({
    width: 500,
    height: 450,
    resizable: false,
    titleBarStyle: 'hidden-inset'
  }) //, frame: false

  // and load the index.html of the app.
  instructions.loadURL(url.format({
    pathname: path.join( __dirname + '/app/instructions.html' ),
    protocol: 'file:',
    slashes: true
  }))

  // Emitted when the window is closed.
  instructions.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    main()
    instructions = null
  })
}

function CreateInstr() {
  // Create the browser window.
  instr = new BrowserWindow({
    width: 800,
    height: 1000,
    resizable: false,
    titleBarStyle: 'hidden-inset'
  })
  // and load the index.html of the app.
  instr.loadURL(url.format({
    pathname: path.join( __dirname + '/app/instructions.html' ),
    protocol: 'file:',
    slashes: true
  }))

  // Emitted when the window is closed.
  instr.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    instr = null
  })
}


function main () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    titleBarStyle: 'hidden-inset'
  }) //, frame: false

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join( __dirname + '/app/index.html' ),
    protocol: 'file:',
    slashes: true
  }))

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  createWelcome()
} )


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }

  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = true
})

app.on('browser-window-created', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    main()
  }
})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// require('./core/functions.js')



// MENU
let template = [{
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        // on reload, start fresh and close any old
        // open secondary windows
        if (focusedWindow.id === 1) {
          BrowserWindow.getAllWindows().forEach(function (win) {
            if (win.id > 1) {
              win.close()
            }
          })
        }
        focusedWindow.reload()
      }
    }
  }]
}, {
  label: 'Window',
  submenu: [{
    label: 'Instructions',
    accelerator: 'CmdOrCtrl+I',
    click: function () {
      CreateInstr()
    }
  },{
    label: 'Minimize',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: 'Close',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }]
}, {
  label: 'Developer',
  submenu: [{
    label: 'DevTools',
    accelerator: 'CmdOrCtrl+D',
    click: function () {
      let focusedWindow = BrowserWindow.getFocusedWindow()
      focusedWindow.webContents.openDevTools()
    }
  }, {
    label: 'Source',
    click: function () {
      electron.shell.openExternal('http://www.github.com/Rawnly/Bolt/')
    }
  }, {
    label: 'Issues',
    click: function () {
      electron.shell.openExternal('http://www.github.com/Rawnly/Bolt#Issue')
    }
  }]
}, {
  label: 'Help',
  role: 'help',
  submenu: []
}]

function addUpdateMenuItems (items, position) {
  if (process.mas) return

  const version = electron.app.getVersion()
  let updateItems = [{
    type: 'separator'
  },
  {
    label: `Version ${version}`,
    enabled: true
  }, {
    label: 'Check for Update',
    enabled: true,
    key: 'checkForUpdate',
    click: function () {
      require('electron').autoUpdater.checkForUpdates()
    }
  }, {
    label: 'Restart and Install Update',
    enabled: true,
    visible: false,
    key: 'restartToUpdate',
    click: function () {
      require('electron').autoUpdater.quitAndInstall()
    }
  }]

  items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem () {
  const menu = Menu.getApplicationMenu()
  if (!menu) return

  let reopenMenuItem
  menu.items.forEach(function (item) {
    if (item.submenu) {
      item.submenu.items.forEach(function (item) {
        if (item.key === 'reopenMenuItem') {
          reopenMenuItem = item
        }
      })
    }
  })
  return reopenMenuItem
}

if (process.platform === 'darwin') {
  const name = electron.app.getName()
  template.unshift({
    label: name,
    submenu: [{
      label: `About ${name}`,
      // role: 'about'
      click: function () {
        let win = new BrowserWindow({
          width: 500,
          height: 300,
          title: 'About',
          backgroundcolor: '#161A21',
          titleBarStyle: 'hidden-inset'
        })
        win.on('close', function () {
          win = null
        })

        win.loadURL(url.format({
          pathname: path.join( __dirname + '/app/about.html' ),
          protocol: 'file:',
          slashes: true
        }))

        win.once('ready-to-show', () => {
          win.show()
        })
      }
    }, {
      label: 'Author',
      click: function () {
        let win = new BrowserWindow({
          width: 1200,
          height: 800,
          title: 'Author',
          backgroundcolor: '#161A21',
          titleBarStyle: 'hidden-inset'
        })

        win.on('close', function () {
          win = null
        })

        win.loadURL('http://www.github.com/Rawnly')

        win.once('ready-to-show', () => {
          win.show()
        })
      }
    }, {
      type: 'separator'
    }, {
      label: `Hide ${name}`,
      accelerator: 'Command+H',
      role: 'hide'
    }, {
      label: 'Quit',
      accelerator: 'Command+Q',
      click: function () {
        app.quit()
      }
    }, {
        label: 'Focus on main',
        accelerator: 'CmdOrCtrl+O',
        click: function () {
          mainWindow.focus()
        }
    }]
  })

  addUpdateMenuItems(template[0].submenu, 5)
}

if (process.platform === 'win32') {
  const helpMenu = template[template.length - 1].submenu
  addUpdateMenuItems(helpMenu, 0)
}
