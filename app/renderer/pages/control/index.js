const { ipcRenderer } = require("electron")
const { peer } = require("./peerControl")
peer.on("add-stream", (stream) => {
    play(stream)
})
let video = document.getElementById("screenVideo")

function play(stream) {
    video.srcObject = stream
    video.onloadedmetadata = function () {
        video.play()
    }
}
window.onkeydown = (e) => {
    let data = {
        keyCode: e.keyCode,
        shift: e.shiftKey,
        meta: e.metaKey,
        control: e.ctrlKey,
        alt: e.altKey
    }
    // ipcRenderer.send("robot","key",data)
    peer.emit("robot", "key", data)
}
window.onmouseup = (e) => {
    let data = {
        clientX: e.x,
        clientY: e.clientY,
        video: {
            width: video.getBoundingClientRect().width,
            height: video.getBoundingClientRect().height
        }
    }
    // ipcRenderer.send("robot", "mouse", data)
    peer.emit("robot", "mouse", data)

}