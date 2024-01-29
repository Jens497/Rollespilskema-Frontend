<template>
  <div class="box-component" />
</template>

<script lang=ts setup>
  import { px } from '@/util/CssUnits'
  import { Properties } from '@/common/sheetComponentProperties/Box';
  import { computed } from 'vue';
  import { SheetComponentProps } from './SheetComponentWrapper.vue';

  interface Props extends SheetComponentProps<Properties> {
  }

  const props = defineProps<Props>()

  const borderWidth = computed(() => props.component.properties.internal.border.value.width.value)
  const borderStyle = computed(() => props.component.properties.internal.border.value.style.value)
</script>


<style scoped>
  .box-component {
    box-sizing: border-box;
    border-width: v-bind(px(borderWidth));
    border-style: v-bind(borderStyle);
    height: 100%;
    width: 100%;
  }
</style>
