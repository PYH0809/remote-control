const { ipcMain, screen: screens } = require("electron")
const robot = require("robotjs")
const vkey = require("vkey")
const handleMouse = (data) => {
    const { clientX, clientY, screen, video } = data
    let x = clientX * screen.width / video.width,
        y = clientY * screen.height / video.height

    // 获取显示器缩放比例,不加以处理的话，根本无法正确点击
    const scale = screens.getPrimaryDisplay().scaleFactor
    robot.moveMouse(x * scale, y * scale)
    // robot.mouseClick()
}
const handleKey = (data) => {
    let modifiers = []
    data.meta ? modifiers.push("meta") : ""
    data.shift ? modifiers.push("shift") : ""
    data.alt ? modifiers.push("alt") : ""
    data.ctrl ? modifiers.push("ctrl") : ""
    let key = vkey[data.keyCode].toLowerCase()
    // robot.keyTap(key, modifiers)
}
module.exports = () => {
    ipcMain.on("robot", (e, type, data) => {
        console.log(data)
        if (type == "mouse") {
            handleMouse(data)
        } else if (type == "key") {
            handleKey(data)
        }
    })
}