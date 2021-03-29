<template>
    <div class="camera">
        <el-input v-model="val.name" placeholder="Camera name" />
        <el-select v-model="val.deviceId" placeholder="Video device">
            <el-option v-for="device in $store.state.devices.video" :key="device.id" :value="device.id" :label="device.label"></el-option>
        </el-select>
        <div class="video">
            <video ref="video" autoplay></video>
        </div>
        <el-button size="mini" type="danger" @click="$emit('delete')">
            Delete camera
        </el-button>
    </div>
</template>

<script>
export default {
    props: ['value'],
    data() {
        return {
            val: this.value
        }
    },
    watch: {
        value: {
            handler(newVal) {
                this.val = newVal
            },
            deep: true,
            immediate: true
        },
        val: {
            handler(newVal) {
                this.handleVideo()
                this.$emit('change', newVal)
            },
            deep: true
        }
    },
    methods: {
        async handleVideo() {
            if (this.val.deviceId === '') {
                return
            }

            const constraints = {
                audio: false,
                video: {
                    optional: [{
                        sourceId: this.val.deviceId
                    }]
                },
                deviceId: {
                    exact: this.val.deviceId
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints)
            if (!stream) {
                return
            }

            try {
                this.$refs.video.srcObject = stream
            } catch (error) {
                this.$refs.video.src = window.URL.createObjectURL(stream)
            }
        }
    },
    mounted() {
        this.handleVideo()
    }
}
</script>

<style lang="scss">
.camera {
    float: left;
    width: 50%;

    > .el-input {
        margin: 0 10px;
        width: calc(100% - 20px);
    }

    > .el-select {
        margin: 10px 10px 0 10px;
        width: calc(100% - 20px);
    }

    .video {
        overflow:hidden; 
        padding-bottom:56.25%; 
        position:relative; 
        height:0;
        margin: 10px;
        background: black;

        video {
            left:0; 
            top:0; 
            height:100%;
            width:100%;
            position:absolute;
        }
    }

    .el-button {
        width: calc(100% - 20px);
        margin: 0 10px 10px 10px;
    }
}
</style>