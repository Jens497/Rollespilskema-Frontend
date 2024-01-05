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
  </v-app-bar>
</template>

<script lang="ts" setup>
  import { LocalizationKey } from '@/plugins/vue-i18n';
  type Props = { title: LocalizationKey, canNavigateBack: boolean }
  const props = withDefaults(defineProps<Props>(), {
    canNavigateBack: true
  })

</script>
