const { BrowserWindow } = require("electron")
const isDev = require('electron-is-dev');
const path = require('path');

let win
create = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, '../../preload.js')
        }
    })
    if (isDev) {
        win.loadURL("http://localhost:8080")

    } else {
        win.loadFile(path.resolve(__dirname, "../renderer/pages/main/index.html"))
    }
}
send = (channel, ...args) => {
    win.webContents.send(channel, ...args)
}
module.exports = { create, send }