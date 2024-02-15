<template>
  <div id="settings-container">
    <VSheet v-if="editorTemplate.state.value.selectedComponentId != undefined && selectedComponent != undefined" class="settingsSheet">
      <VLabel class="text-h4" :text="$t(`Properties.internal.${selectedComponent.name}`)" />
      <PropertiesSettings
        class="propertySettings"
        :properties="editorTemplate.selectedComponent.value?.properties.common"
        :property-path="commonKeyPrefix"
        @update-property="onPropertyUpdate(editorTemplate.state.value.selectedComponentId, 'common', $event)"
      />
      <PropertiesSettings
        class="propertySettings"
        :properties="editorTemplate.selectedComponent.value?.properties.internal"
        :property-path="internalKeyPrefix"
        @update-property="onPropertyUpdate(editorTemplate.state.value.selectedComponentId, 'internal', $event)"
      />
    </VSheet>
  </div>
</template>

<script setup lang="ts">
  import { SheetComponentPropertyType, WithValue } from '@/common/sheetComponent';
  import { SheetComponent } from '@/common/sheetComponentDefinitions';
  import PropertiesSettings, { type EmitUpdatePropertyParams } from '@/components/templateEditor/PropertiesSettings.vue';
  import { useEditorTemplate } from '@/composables/useEditorTemplate';
  import { computed } from 'vue';

  const editorTemplate = useEditorTemplate()
  const selectedComponent = computed(() => editorTemplate.selectedComponent.value)

  type PropertyGroup = keyof SheetComponent["properties"]
  function onPropertyUpdate<T extends WithValue<SheetComponentPropertyType>>(componentId: string, propertyGroup: PropertyGroup, payload: EmitUpdatePropertyParams<T>): void {
    const { key, value } = payload;
    console.debug("ComponentSettings: onPropertyUpdate: ", key, " = ", value)
    editorTemplate.updateComponentById(componentId, { properties: { [propertyGroup]: { [key]: value } } })
  }

  const commonKeyPrefix = "Properties.common"
  const internalKeyPrefix = computed(() => `Properties.internal._${selectedComponent.value?.name}`)
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
