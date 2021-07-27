const { ipcMain } = require("electron")
const { send: send2Main } = require("./windows/main.js")
const { create: createContolWin } = require("./windows/control.js")

module.exports = () => {
    ipcMain.handle("login", async () => {
        // 先mock返回一个六位数控制码
        let code = Math.floor(Math.random() * (999999 - 100000)) + 10000
        return code
    })
    ipcMain.on("control", async (e, remoteCode) => {
        // 与服务器交互，返回状态信息，此处先mock
        send2Main("controlStateChange", 1, "成功控制")
        createContolWin()
    })
}