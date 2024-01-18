<template>
  <div class="box-component" />
</template>

<script lang=ts setup>
  import { SheetComponent } from '@/common/sheetComponentDefinitions';
  import { Properties } from '@/common/sheetComponentProperties/Box';
  import { computed } from 'vue';

  type Props = {
    component: SheetComponent<Properties>
  }

  const props = defineProps<Props>()

  const borderWidth = computed(() => props.component.properties.border.value.width.value + "pt")
  const borderStyle = computed(() => props.component.properties.border.value.style.value)
  const height = computed(() => (props.component.properties.size.value.height.value ?? 100) + 'px')
  const width = computed(() => (props.component.properties.size.value.width.value ?? 100) + 'px')
</script>


<style scoped>
  .box-component {
    width: fit-content;
    min-width: max-content;
    height: fit-content;
    border-width: v-bind(borderWidth);
    border-style: v-bind(borderStyle);
    height: v-bind(height);
    width: v-bind(width);
    /* border-radius: ; */
  }
</style>
