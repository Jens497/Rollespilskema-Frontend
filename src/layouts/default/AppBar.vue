<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon
      v-if="canNavigateBack"
      icon="mdi-arrow-left"
      @click="$router.back()"
    />
    <v-app-bar-title>
      {{ $t(props.title) }}
    </v-app-bar-title>

    <template v-if="appStore.isLoggedIn" #append>
      <v-app-bar-nav-icon @click="model = !(model ?? true)" />
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
  import { LocalizationKey } from '@/plugins/vue-i18n';
  import { useAppStore } from '@/store/app';
  import { useModel } from 'vue';
  type Props = {
    title: LocalizationKey,
    canNavigateBack: boolean,
    modelValue?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    canNavigateBack: true,
  })
  const model = useModel(props, "modelValue");
  const appStore = useAppStore();
</script>
