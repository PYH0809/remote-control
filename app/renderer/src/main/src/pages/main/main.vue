<template>
  <img alt="Vue logo" src="../../assets/logo.png" />
  <div v-show="show">
    <div>您的控制码：{{ code }}</div>
    <input type="number" placeholder="输入对方控制码" />
    <br />
    <QBtn
      class="qBtn"
      color="white"
      text-color="black"
      label="远程控制"
      size="22px"
      @click="startContron"
    ></QBtn>
  </div>
  <h1 v-show="!show">{{ controlState }}</h1>
</template>
<script>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { QBtn } from 'quasar';
// import { ipcRenderer} from "electron"
// const { ipcRenderer } = window.require("electron");

// import getScreenStream from "../control/peerPuppet.js";
require("../control/peerPuppet.js")
// import "./peerPuppet.js"

const ipcRenderer = window.electron.ipcRenderer;
export default {
  name: 'App',
  components: {
    QBtn
  },
  setup() {
    // createAnswer()
    // console.log(getScreenStream)
    let code = ref(),
      show = ref(true),
      controlState = ref("")
    const handleContronState = (e, type, text) => {
      if (type == 1) {
        controlState.value = text
        show.value = false
      }
    }
    onMounted(async () => {
      code.value = await ipcRenderer.invoke("login")
      ipcRenderer.on("controlStateChange", handleContronState)
    })
    onBeforeUnmount(() => {
      ipcRenderer.removeListener("controlStateChange", handleContronState)
    })

    const startContron = () => {
      ipcRenderer.send("control", code.value)
    }
    return {
      code,
      show,
      startContron,
      controlState
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input {
  height: 25px;
  width: 180px;
  font-size: 15px;
  text-align: center;
  border: none;
  border-radius: 4px;
}
.qBtn {
  margin-top: 10px;
  width: 200px;
  height: 50px;
}
</style>
