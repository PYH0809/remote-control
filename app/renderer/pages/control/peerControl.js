const EventEmitter = require("events")
const peer = new EventEmitter()
const { desktopCapturer, ipcRenderer } = require("electron")
const { off } = require("process")


peer.on("robot", (type, data) => {
    if (type == "mouse") {
        data.screen = {
            width: window.screen.width,
            height: window.screen.height
        }
    }
    // ipcRenderer.send("robot",type,data)
})

const pc = new window.RTCPeerConnection({})
async function createOffer() {
    const offer = await pc.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: true
    })
    await pc.setLocalDescription(offer)
    console.log(JSON.stringify(offer))
    return pc.localDescription
}
async function setRemote(answer) {
    await pc.setRemoteDescription(answer)
}
window.setRemote = setRemote
pc.onaddstream = function (e) {
    console.log(e)
    peer.emit("add-straem", e.stream)
}
createOffer()
module.exports = { peer }