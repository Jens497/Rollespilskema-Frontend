<template>
  <VSheet class="sheet-container">
    <div
      v-for="(component, componentId) in sheet.components"
      :key="componentId"
      class="sheet-component"
      :style="{
        top: px(component.properties.common.pos.value.y.value),
        left: px(component.properties.common.pos.value.x.value),
      }"
    >
      <SheetComponentWrapper :component="component" :patch-properties="(updates) => patchSheet({ [componentId]: { properties: updates } })" />
    </div>
  </VSheet>
</template>

<script lang=ts setup>
  import SheetComponentWrapper from '@/components/sheetComponents/SheetComponentWrapper.vue';
  import { type Sheet } from "@/store/sheet"
  import { px } from "@/util/CssUnits"
  import { type _DeepPartial } from 'pinia';

  interface Props {
    sheet: Sheet,
    patchSheet: (updates: _DeepPartial<Sheet>) => void
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
