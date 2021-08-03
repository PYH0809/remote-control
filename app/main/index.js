const { app } = require("electron")
const ipcHandle = require('./ipc.js');
const { create: createWin } = require("./windows/main.js")

app.on("ready", () => {
    //加入才能使用robotjs
    app.allowRendererProcessReuse = false
    require("./robot.js")()

    createWin()
    ipcHandle()
})