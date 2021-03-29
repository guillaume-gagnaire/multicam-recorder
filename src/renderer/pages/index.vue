<template>
  <div class="main-page">
     <el-tabs type="card" v-model="tab">
      <el-tab-pane label="Video" name="video">
        <camera v-for="(camera, idx) in cameras" :key="idx" v-model="cameras[idx]" @delete="cameras.splice(idx, 1)"></camera>
        <el-button @click="addCamera" class="add-camera"><i class="fa fa-plus" /> Add camera</el-button>
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
    </el-tabs>
  </div>
</template>

<script>
const Store = require('electron-store')
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
      tab: 'video'
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
    }
  },
  methods: {
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
  }
}
</script>

<style lang="scss">
.main-page {
  .add-camera {
    float: left;
    width: calc(50% - 20px);
    margin: 0 10px;
  }
}
</style>