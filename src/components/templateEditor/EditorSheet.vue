<template>
  <VSheet class="sheet-container" @click.self="onClickSheet">
    <Draggable
      v-for="(component, componentId) in editorTemplate.state.template.value?.components"
      :key="componentId"
      :component="component"
      :component-id="componentId"
      :is-selected="componentId == editorTemplate.state.selectedComponentId.value"
      class="draggable"
    >
      <SheetComponentWrapper :component="component" :patch-properties="getPatchProperties(componentId)" />
    </Draggable>
  </VSheet>
</template>

<script lang=ts setup>
  import { useEditorTemplate } from '@/composables/useEditorTemplate';
  import SheetComponentWrapper from '@/components/sheetComponents/SheetComponentWrapper.vue';
  import Draggable from '@/components/templateEditor/Draggable.vue';
  import { SheetComponent, SheetComponentPropertyTypeDefinition } from '@/common/sheetComponentDefinitions';
  import { _DeepPartial } from 'pinia';

  const editorTemplate = useEditorTemplate()
  const getPatchProperties = (id: string) =>
    (updates: _DeepPartial<SheetComponent<SheetComponentPropertyTypeDefinition>>["properties"]) => editorTemplate.updateComponentById(id, { properties: updates })

  function onClickSheet() {
    editorTemplate.unselectComponent()
  }
</script>

<style scoped>
  .sheet-container {
    position: absolute;
    overflow: auto;
    height: 100%;
    width: 100%;
  }

  .draggable {
    position: absolute;
  }
</style>
