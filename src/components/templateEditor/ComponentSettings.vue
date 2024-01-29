<template>
  <div>
    <VSheet v-if="editorTemplate.state.value.selectedComponentId != undefined && editorTemplate.selectedComponent != undefined" class="settingsSheet">
      <PropertiesSettings
        class="propertySettings"
        property-group="common"
        :component-id="editorTemplate.state.value.selectedComponentId"
        :properties="editorTemplate.selectedComponent.value?.properties.common"
        @update-property="onPropertyUpdate"
      />
      <PropertiesSettings
        class="propertySettings"
        property-group="internal"
        :component-id="editorTemplate.state.value.selectedComponentId"
        :properties="editorTemplate.selectedComponent.value?.properties.internal"
        @update-property="onPropertyUpdate"
      />
    </VSheet>
  </div>
</template>

<script setup lang="ts">
  import { SheetComponentPropertyType, WithValue } from '@/common/sheetComponent';
  import PropertiesSettings, { type EmitUpdatePropertyParams } from '@/components/templateEditor/PropertiesSettings.vue';
  import { useEditorTemplate } from '@/composables/useEditorTemplate';

  const editorTemplate = useEditorTemplate()

  function onPropertyUpdate<T extends WithValue<SheetComponentPropertyType>>(payload: EmitUpdatePropertyParams<T>): void {
    const { propertyGroup, key, value, componentId: id } = payload;
    console.log("ComponentSettings: onPropertyUpdate: ", key, " = ", value)
    editorTemplate.updateComponentById(id, { properties: { [propertyGroup]: { [key]: value } } })
  }
</script>

<style scoped>
  .settingsSheet {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow-y: auto;
  }

  .propertySettings {
    position: relative;
    width: 100%;
  }
</style>
