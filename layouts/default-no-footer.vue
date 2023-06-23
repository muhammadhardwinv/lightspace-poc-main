<template>
  <div>
    <client-only>
    <main-navbar :color-on-scroll="450"></main-navbar>
    <nuxt />
  </client-only>
  </div>
</template>
<script>
  import MainNavbar from "@/components/layout/MainNavbar.vue";
  export default {
    name: 'nofooter',
    components: {
      MainNavbar
    }
  }
</script>
<style>
</style>
