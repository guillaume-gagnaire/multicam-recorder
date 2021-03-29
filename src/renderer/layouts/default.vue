<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  components: { },
  mounted() {
    this.$store.dispatch('devices/loadDevices')
  }
}
</script>

<style>
body {
  margin: 0 !important;
}
</style>
