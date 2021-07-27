const {peer} = require("./peerControl")
peer.on("add-stream", (stream) => {
    play(stream)
})
function play(stream) {
    let video = document.getElementById("screenVideo")
    video.srcObject = stream
    video.onloadedmetadata = function () {
        video.play()
    }
}