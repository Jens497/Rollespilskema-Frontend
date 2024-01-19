<template>
  <VSheet v-if="templateEditorStore.selectedComponentId != undefined && templateEditorStore.selectedComponent != undefined" class="settingsSheet">
    <PropertiesSettings
      class="propertySettings"
      property-group="common"
      :component-id="templateEditorStore.selectedComponentId"
      :properties="templateEditorStore.selectedComponent?.properties.common"
      @update-property="onPropertyUpdate"
    />
    <PropertiesSettings
      class="propertySettings"
      property-group="internal"
      :component-id="templateEditorStore.selectedComponentId"
      :properties="templateEditorStore.selectedComponent?.properties.internal"
      @update-property="onPropertyUpdate"
    />
  </VSheet>
</template>

<script setup lang="ts">
  import { SheetComponentPropertyType, WithValue } from '@/common/sheetComponent';
  import { useTemplateEditorStore } from '@/store/templateEditor';
  import PropertiesSettings from './PropertiesSettings.vue';


  const templateEditorStore = useTemplateEditorStore();

  function onPropertyUpdate<T extends WithValue<SheetComponentPropertyType>>(payload: { key: string, value: T, componentId: string }): void {
    const { key, value, componentId: id } = payload;
    console.log("ComponentSettings: onPropertyUpdate: ", key, " = ", value)
    templateEditorStore.updateComponentById(id, { properties: { [key]: value } })
  }
</script>

<style scoped>
  .settingsSheet {
    position: relative;
    height: 100%;
    width: 100%;
    overflow-y: auto;
  }

  .propertySettings {
    position: relative;
    width: 100%;
  }
</style>
