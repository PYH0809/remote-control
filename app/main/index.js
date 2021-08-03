const {app}=require("electron")
const ipcHandle = require('./ipc.js');
const {create:createWin}=require("./windows/main.js")

app.on("ready",()=>{
    createWin()
    ipcHandle()
})