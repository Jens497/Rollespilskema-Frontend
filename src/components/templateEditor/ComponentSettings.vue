<template>
  <VSheet v-if="templateEditorStore.selectedComponentId != undefined && templateEditorStore.selectedComponent != undefined" class="settingsSheet">
    <p>
      <VLabel class="text-h4" :text="templateEditorStore.selectedComponent?.name" />
    </p>
    <p>
      <VLabel class="text-h5" text="position" />
    </p>
    <VTextField
      v-model="templateEditorStore.selectedComponent.pos.x"
      label="X"
      :rules="[(value) => !Number.isNaN(Number.parseFloat(value)) || 'Must be a number']"
      @update:model-value="updatePosX"
    />
    <VTextField label="Y" :model-value="templateEditorStore.selectedComponent?.pos.y" @update:model-value="updatePosY" />
    <PropertiesSettings
      :component-id="templateEditorStore.selectedComponentId"
      :properties="templateEditorStore.selectedComponent?.properties"
      @update-property="onPropertyUpdate"
    />
  </VSheet>
</template>

<script setup lang="ts">
  import { SheetComponentPropertyType, WithValue } from '@/common/sheetComponent';
  import { useTemplateEditorStore } from '@/store/templateEditor';
  import PropertiesSettings from './PropertiesSettings.vue';


  const templateEditorStore = useTemplateEditorStore();


  function updatePosX(newValue: number | string) {
    let value = typeof newValue == "number" ? newValue : Number.parseFloat(newValue);
    const id = templateEditorStore.selectedComponentId
    if (id == undefined || Number.isNaN(value)) return;
    templateEditorStore.updateComponentById(id, { pos: { x: value } })
  }
  function updatePosY(newValue: number | string) {
    let value = typeof newValue == "number" ? newValue : Number.parseFloat(newValue);
    const id = templateEditorStore.selectedComponentId
    if (id == undefined || Number.isNaN(value)) return;
    templateEditorStore.updateComponentById(id, { pos: { y: value } })
  }

  function onPropertyUpdate<T extends WithValue<SheetComponentPropertyType>>(payload: { key: string, value: T, componentId: string }): void {
    const { key, value, componentId: id } = payload;
    console.log("ComponentSettings: onPropertyUpdate: ", key, " = ", value)
    templateEditorStore.updateComponentById(id, { properties: { [key]: value } })
  }
</script>

<style scoped>
  .settingsSheet {
    overflow-y: auto;
  }
</style>
