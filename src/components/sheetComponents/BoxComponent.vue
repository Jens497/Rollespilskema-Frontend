<template>
  <div class="box-component" />
</template>

<script lang=ts setup>
  import { px } from '@/util/CssUnits'
  import { SheetComponent } from '@/common/sheetComponentDefinitions';
  import { Properties } from '@/common/sheetComponentProperties/Box';
  import { computed } from 'vue';
  import { SheetComponentProps } from './SheetComponentWrapper.vue';

  interface Props extends SheetComponentProps {
    component: SheetComponent<Properties>
  }

  const props = defineProps<Props>()

  const borderWidth = computed(() => props.component.properties.internal.border.value.width.value)
  const borderStyle = computed(() => props.component.properties.internal.border.value.style.value)
  const height = computed(() => props.component.properties.common.size.value.height.value)
  const width = computed(() => props.component.properties.common.size.value.width.value)
</script>


<style scoped>
  .box-component {
    width: fit-content;
    min-width: max-content;
    height: fit-content;
    box-sizing: content-box;
    border-width: v-bind(px(borderWidth));
    border-style: v-bind(borderStyle);
    height: v-bind(px(height));
    width: v-bind(px(width));
    /* border-radius: ; */
  }
</style>
