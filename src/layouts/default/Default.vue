<template>
  <v-app>
    <default-bar
      v-model="isDrawerOpen"
      :title="$route.meta.appBar.title"
      :can-navigate-back="$route.meta.appBar.canNavigateBack"
    />
    <v-navigation-drawer v-model="isDrawerOpen" location="end">
      <v-list-item :to="{ name: 'editUser' }" title="Account" prepend-icon="mdi-account" />
      <v-list-item
        v-if="isAdmin"
        :to="{ name: 'createUser' }"
        title="Add User"
        prepend-icon="mdi-plus"
      />
    </v-navigation-drawer>
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import { useAppStore } from '@/store/app';
  import { computedAsync } from '@vueuse/core';

  const isDrawerOpen = ref(false)
  const appStore = useAppStore()

  const isAdmin = computedAsync(async () => (await appStore.getUserAsync)?.roles.includes('Admin'))
</script>
