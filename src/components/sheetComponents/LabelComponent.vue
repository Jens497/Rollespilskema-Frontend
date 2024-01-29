<template>
  <p
    class="label-component"
    :class="{
      'font-weight-bold': props.component.properties.internal.font.value.bold.value,
      'font-italic': props.component.properties.internal.font.value.italic.value
    }"
  >
    {{ component.properties.internal.text.value }}
  </p>
</template>

<script lang=ts setup>
  import { type Properties } from "@/common/sheetComponentProperties/Label"
  import { computed } from 'vue';
  import { SheetComponentProps } from './SheetComponentWrapper.vue';

  interface Props extends SheetComponentProps<Properties> {
  }

  const props = defineProps<Props>()
  const fontSize = computed(() => props.component.properties.internal.font.value.size.value + 'pt')
</script>


<style scoped>
  .label-component {
    font-size: v-bind('fontSize');
    min-width: min-content;
    min-height: min-content;
  }
</style>
