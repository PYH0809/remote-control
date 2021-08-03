const {BrowserWindow}=require("electron")
const path=require("path")

let win
create=()=>{
    win=new BrowserWindow({
        width:1080, 
        height:720,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false,
            // enableRemoteModule: true
            // preload: path.join(__dirname, '../../preload.js')
        },
    })
    win.loadFile(path.resolve(__dirname,"../../renderer/pages/control/index.html"))
}
send=(channel,...args)=>{
    win.webContents.send(channel,...args)
}
module.exports={create,send}