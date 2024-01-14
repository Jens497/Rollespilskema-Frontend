<template>
  <VSheet v-if="templateEditorStore.selectedComponent != undefined">
    <p>
      <VLabel class="text-h4" :text="templateEditorStore.selectedComponent?.name" />
    </p>
    <p>
      <VLabel class="text-h5" text="position" />
    </p>
    <VTextField label="X" v-model="templateEditorStore.selectedComponent.pos.x"
      :rules="[(value) => !Number.isNaN(Number.parseFloat(value)) || 'Must be a number']"
      @update:model-value="updatePosX" />
    <VTextField label="Y" :model-value="templateEditorStore.selectedComponent?.pos.y" @update:model-value="updatePosY" />
    <PropertiesSettings :properties="properties" @update-property="onPropertyUpdate" />
  </VSheet>
</template>

<script setup lang="ts">
  import { SheetComponentProperties, SheetComponentPropertyType, SheetComponentPropertyTypeDefinition, WithValue } from '@/common/sheetComponent';
  import { useTemplateEditorStore } from '@/store/templateEditor';
  import { ref } from 'vue';
  import PropertiesSettings from './PropertiesSettings.vue';


  const templateEditorStore = useTemplateEditorStore();
  const properties = ref<SheetComponentProperties<SheetComponentPropertyTypeDefinition> | undefined>(templateEditorStore.selectedComponent?.properties)


  function updatePosX(newValue: number | string) {
    let value = typeof newValue == "number" ? newValue : Number.parseFloat(newValue);
    if (Number.isNaN(value)) return;
    templateEditorStore.$patch({ selectedComponent: { pos: { x: value } } })
  }
  function updatePosY(newValue: number | string) {
    let value = typeof newValue == "number" ? newValue : Number.parseFloat(newValue);
    if (Number.isNaN(value)) return;
    if (templateEditorStore.selectedComponent != undefined) {
      templateEditorStore.selectedComponent.pos.y = value
    }
  }

  function onPropertyUpdate<T extends WithValue<SheetComponentPropertyType>>(payload: { property: T, value: T["value"] }) {
    const { property, value } = payload;
    console.log(`Update: ${property} = ${value}`)
  }
</script>
