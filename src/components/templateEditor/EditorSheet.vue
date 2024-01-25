<template>
  <VSheet class="sheet-container">
    <Draggable
      v-for="(component, componentId) in editorTemplate.state.value.template"
      :key="componentId"
      :component="component"
      :component-id="componentId"
      :is-selected="componentId == editorTemplate.state.value.selectedComponentId"
      class="draggable"
    >
      <SheetComponentWrapper :component="component" />
    </Draggable>
  </VSheet>
</template>

<script lang=ts setup>
import { useEditorTemplate } from '@/composables/useEditorTemplate';
  import SheetComponentWrapper from '@/components/sheetComponents/SheetComponentWrapper.vue';
  import Draggable from '@/components/templateEditor/Draggable.vue';

  const editorTemplate = useEditorTemplate()
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
