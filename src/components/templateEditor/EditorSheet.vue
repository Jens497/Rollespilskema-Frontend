<template>
  <VSheet class="sheet-container">
    <Draggable
      v-for="(component, componentId) in templateEditorStore.template"
      :key="componentId"
      :component="component"
      :component-id="componentId"
      :is-selected="componentId == templateEditorStore.selectedComponentId"
      class="drag-component"
    >
      <EditorSheetComponent
        :component="component"
      />
    </Draggable>
  </VSheet>
</template>

<script lang=ts setup>
  import { useTemplateEditorStore } from '@/store/templateEditor';
  import EditorSheetComponent from './sheet-components/EditorSheetComponent.vue';
  import Draggable from './Draggable.vue';

  const templateEditorStore = useTemplateEditorStore()
</script>

<style scoped>
  .sheet-container {
    position: relative;
    overflow: auto;
    height: 100%;
    width: 100%;
  }

  .drag-component {
    position: absolute;
  }
</style>
