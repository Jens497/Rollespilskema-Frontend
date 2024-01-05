<template>
  <v-app>
    <default-bar
      :title="$route.meta.appBar.title"
      :can-navigate-back="$route.meta.appBar.canNavigateBack"
    />

    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
</script>
