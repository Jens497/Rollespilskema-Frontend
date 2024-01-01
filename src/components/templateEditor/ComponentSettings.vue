<template>
  <VSheet v-if=" templateEditorStore.selectedComponent != undefined">
    <p><VLabel class="text-h4" :text="templateEditorStore.selectedComponent?.name" /></p>
    <p><VLabel class="text-h5" text="position" /></p>
    <VTextField
      label="X"
      :model-value="templateEditorStore.selectedComponent?.pos.x"
      :rules="[(value) => !Number.isNaN(Number.parseFloat(value))]"
      @update:model-value="updatePosX"/>
    <VTextField
      label="Y"
      :model-value="templateEditorStore.selectedComponent?.pos.y"
      @update:model-value="updatePosY"/>

  </VSheet>
</template>

<script setup lang="ts">
  import { useTemplateEditorStore } from '@/store/templateEditor';

  const templateEditorStore = useTemplateEditorStore();
  function updatePosX(newValue: number | string) {
    let value = typeof newValue == "number" ? newValue : Number.parseFloat(newValue);
    if (Number.isNaN(value)) return;
    templateEditorStore.$patch({selectedComponent: { pos: { x: value } } })
  }
  function updatePosY(newValue: number | string) {
    let value = typeof newValue == "number" ? newValue : Number.parseFloat(newValue);
    if (Number.isNaN(value)) return;
    if (templateEditorStore.selectedComponent != undefined) {
      templateEditorStore.selectedComponent.pos.y = value
    }
  }
</script>
