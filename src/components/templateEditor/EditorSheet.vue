<template>
  <VSheet class="sheet-container">
    <EditorSheetComponent v-for="(component, index) in templateEditorStore.template"
      :key="index"
      :component="component"
      :isSelected="component == templateEditorStore.selectedComponent"
      class="sheet-component"
      @click="templateEditorStore.selectedComponent != component ? templateEditorStore.selectComponentByIdentity(component) : templateEditorStore.unselectComponent()"
    />
  </VSheet>
</template>

<script lang=ts setup>
  import EditorSheetComponent from '@/components/templateEditor/sheet-components/EditorSheetComponent.vue'
  import { useTemplateEditorStore } from '@/store/templateEditor';

  const templateEditorStore = useTemplateEditorStore()
</script>

<style>
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
