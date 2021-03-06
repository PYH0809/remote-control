const EventEmitter = require("events")
const peer = new EventEmitter()
const { ipcRenderer } = require("electron")

peer.on("robot", (type, data) => {
    if (type == "key") {
        ipcRenderer.send("robot", type, data)
    }
    if (type == "mouse") {
        data.screen = {
            width: window.screen.width,
            height: window.screen.height
        }
        ipcRenderer.send("robot", type, data)
    }
})

const pc = new window.RTCPeerConnection({})
async function createOffer() {
    const offer = await pc.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: true
    })
    await pc.setLocalDescription(offer)
    console.log(JSON.stringify(pc.localDescription))
    return pc.localDescription
}
createOffer()

async function setRemote(answer) {
    await pc.setRemoteDescription(answer)
}

window.setRemote = setRemote
pc.onaddstream = function (e) {
    peer.emit("add-stream", e.stream)
}
module.exports = { peer }