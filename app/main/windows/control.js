const {BrowserWindow}=require("electron")
const path=require("path")

let win
create=()=>{
    win=new BrowserWindow({
        width:1920, 
        height:1080,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false,
            // enableRemoteModule: true
            // preload: path.join(__dirname, '../../preload.js')
        },
    })
    win.loadFile(path.resolve(__dirname,"../../renderer/src/main/src/pages/control/index.html"))
}
send=(channel,...args)=>{
    win.webContents.send(channel,...args)
}
module.exports={create,send}