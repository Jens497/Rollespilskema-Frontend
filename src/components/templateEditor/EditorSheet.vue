<template>
  <VSheet class="sheet-container">
    <Draggable
      v-for="(component, componentId) in templateEditorStore.template"
      :key="componentId"
      :component="component"
      :component-id="componentId"
      :is-selected="componentId == templateEditorStore.selectedComponentId"
      class="draggable"
    >
      <SheetComponentWrapper :component="component" />
    </Draggable>
  </VSheet>
</template>

<script lang=ts setup>
  import { useTemplateEditorStore } from '@/store/templateEditor';
  import SheetComponentWrapper from '@/components/sheetComponents/SheetComponentWrapper.vue';
  import Draggable from '@/components/templateEditor/Draggable.vue';

  const templateEditorStore = useTemplateEditorStore()
</script>

<style scoped>
  .sheet-container {
    position: relative;
    overflow: auto;
    height: 100%;
    width: 100%;
  }

  .draggable {
    position: absolute;
  }
</style>
