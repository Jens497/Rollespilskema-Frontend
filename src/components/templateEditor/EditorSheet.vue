<template>
  <VSheet class="sheet-container">
    <Draggable
      v-for="(component, index) in templateEditorStore.template"
      :key="index"
      :component="component"
      :is-selected="component == templateEditorStore.selectedComponent"
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

<style>
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
