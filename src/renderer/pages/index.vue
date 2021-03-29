<template>
  <div class="e-nuxt-container">
    {{ $store.state.devices.audio }}
    {{ $store.state.devices.video }}
  </div>
</template>

<script>

export default {
  components: {
    
  },
  data () {
    return {
    }
  },
}
</script>