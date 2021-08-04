const { peer } = require("./peerControl")
peer.on("add-stream", (stream) => {
    play(stream)
})
var video = document.getElementById("screenVideo")

function play(stream) {
    video.srcObject = stream
    video.onloadedmetadata = function () {
        video.play()
    }
}
// 捕获视频上的键盘操作
window.onkeydown = function (e) {
    console.log(e)
    let data = {}
    data = {
        keyCode: e.keyCode,
        shift: e.shiftKey,
        meta: e.meta,
        control: e.control,
        alt: e.altKey
    }
    peer.emit("robot", "key", data)
}
// 捕获视频上的鼠标操作
window.onmouseup = (e) => {
    let data = {}
    data.clientX = e.clientX
    data.clientY = e.clientY
    data.video = {
        width: video.getBoundingClientRect().width,
        height: video.getBoundingClientRect().height
    }
    peer.emit("robot", "mouse", data)
}