<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-6" />
      {{ $t(props.title) }}
    </v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>
  import { LocalizationKey } from '@/plugins/vue-i18n';

  const props = defineProps<{ title: LocalizationKey }>()

</script>
