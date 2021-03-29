const state = {
    audio: [],
    video: []
}

const mutations = {
    setVideo (state, data) {
        state.video = data
    },
    setAudio (state, data) {
        state.audio = data
    }
}

const actions = {
    async loadDevices ({ commit }) {
        const devices = (await navigator.mediaDevices.enumerateDevices()).map(device => ({
            kind: device.kind,
            label: device.label,
            id: device.deviceId
        }))
        commit('setVideo', devices.filter(device => device.kind === 'videoinput'))
        commit('setAudio', devices.filter(device => device.kind === 'audioinput'))
    }
}

export default {
    state,
    mutations,
    actions
}
  