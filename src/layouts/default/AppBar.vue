<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon
      v-if="canNavigateBack"
      icon="mdi-arrow-left"
      @click="$router.back()"
    />

    <v-container style="max-width: none;">
      <v-row :align="'center'" :justify="'space-between'">
        <v-col>
          <v-app-bar-title>
            {{ $t(props.title) }}
          </v-app-bar-title>
        </v-col>
        <v-col>
          <slot />
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>

    <template v-if="appStore._isLoggedIn" #append>
      <v-app-bar-nav-icon @click="model = !(model ?? true)" />
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
  import { LocalizationKey } from '@/plugins/vue-i18n';
  import { useAppStore } from '@/store/app';
  import { computedAsync } from '@vueuse/core';
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
