<template>
  <VSheet class="sheet-container">
    <SheetComponentWrapper
      v-for="(component, componentId) in sheetStore.sheet"
      :key="componentId"
      class="sheet-component"
      :component="component"
      :test="false"
    />
  </VSheet>
</template>

<script lang=ts setup>
  import SheetComponentWrapper from '@/components/sheetComponents/SheetComponentWrapper.vue';
  import { useSheetStore } from '@/store/sheet';

  const sheetStore = useSheetStore()
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
