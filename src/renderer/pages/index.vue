<template>
  <div class="main-page">
     <el-tabs type="card" v-model="tab">
      <el-tab-pane label="General" name="video">
        <camera v-for="(camera, idx) in cameras" :bus="emitter" :key="idx" v-model="cameras[idx]" @delete="cameras.splice(idx, 1)"></camera>
        <el-button @click="addCamera" class="add-camera"><i class="fa fa-plus" /> Add camera</el-button>
        <el-button v-if="!recording" type="danger" class="record" @click="record">Record</el-button>
        <el-button v-if="recording" type="info" class="record" @click="stop">Stop</el-button>
      </el-tab-pane>
      <el-tab-pane label="Audio" name="audio">
        <el-form style="margin: 10px">
          <el-form-item label="Audio device">
            <el-select v-model="audioDevice" placeholder="Audio device">
              <el-option v-for="device in $store.state.devices.audio" :key="device.id" :value="device.id" :label="device.label"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Settings" name="settings">
        <el-form style="margin: 10px">
          <el-form-item label="Folder name">
            <label class="folder" @click="updateFolder">
              {{ folder }}
            </label>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const Store = require('electron-store')
const remote = require('electron').remote
const dialog = remote.dialog
import mitt from 'mitt'
import Camera from '../components/Camera'

export default {
  components: {
    Camera
  },
  data () {
    return {
      store: null,
      cameras: [],
      audioDevice: '',
      folder: '',
      tab: 'video',
      recording: false,
      emitter: null
    }
  },
  watch: {
    cameras: {
      handler() {
        this.store.set('cameras', this.cameras)
      },
      deep: true
    },
    audioDevice() {
      this.store.set('audioDevice', this.audioDevice)
    },
    folder() {
      this.store.set('folder', this.folder)
    }
  },
  methods: {
    record() {
      this.emitter.emit('record')
      this.recording = true
    },
    stop() {
      this.emitter.emit('stop')
      this.recording = false
    },
    async updateFolder() {
      const res = await dialog.showOpenDialog({
        properties: ['openDirectory']
      })
      if (res) {
        this.folder = res.filePaths[0]
      }
    },
    getCameraBaseConfig() {
      return {
        name: '',
        deviceId: ''
      }
    },
    addCamera() {
      this.cameras.push(this.getCameraBaseConfig())
    }
  },
  mounted() {
    this.store = new Store()
    this.cameras = this.store.get('cameras', [this.getCameraBaseConfig()])
    this.audioDevice = this.store.get('audioDevice', '')
    this.folder = this.store.get('folder', '')
    this.emitter = mitt()
  }
}
</script>

<style lang="scss">
.main-page {
  .add-camera {
    float: left;
    width: calc(50% - 20px);
    margin: 0 10px 20px 10px;
  }

  .folder {
    width: calc(100% - 120px);
    display: inline-block;
    padding: 0 10px;
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    color: #606266;
    cursor: pointer;
  }

  .record {
    clear: both;
    width: calc(100% - 20px);
    margin: 40px 10px 10px 10px;
    padding: 40px 20px;
    display: block;
  }
}
</style>