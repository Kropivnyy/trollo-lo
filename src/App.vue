<template>
  <div id="app">
    <h1 class="visually-hidden">
      Trollo-lo application for notes
    </h1>
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import 'assets/scss/styles';
</style>
