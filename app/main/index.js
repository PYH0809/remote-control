const {app}=require("electron")
const ipcHandle = require('./ipc.js');
const {create:createWin}=require("./windows/main.js")

app.on("ready",()=>{
    app.allowRendererProcessReuse = false
    createWin()
    ipcHandle()
    require("./robot.js")()
})