<template>
  <VSheet class="sheet-container">
    <div
      v-for="(component, componentId) in sheet"
      :key="componentId"
      class="sheet-component"
      :style="{
        top: px(component.properties.common.pos.value.y.value),
        left: px(component.properties.common.pos.value.x.value),
      }"
    >
      <SheetComponentWrapper :component="component" />
    </div>
  </VSheet>
</template>

<script lang=ts setup>
  import SheetComponentWrapper from '@/components/sheetComponents/SheetComponentWrapper.vue';
  import { type Sheet } from "@/store/sheet"
  import { px } from "@/util/CssUnits"
  interface Props {
    sheet: Sheet
  }

  defineProps<Props>()
</script>

<style scoped>
  .sheet-container {
    position: relative;
    overflow: auto;
    height: 100%;
    width: 100%;
  }

  .sheet-component {
    position: absolute;
  }
</style>
