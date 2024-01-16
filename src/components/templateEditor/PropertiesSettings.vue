<template>
  <div v-if="properties != undefined">
    <template v-for="(property, key) in properties " :key="key">
      <template v-if="property.kind == PropertyTypeKinds.Boolean">
        <VCheckbox :label="$t(`${keyPrefix}${key}`)" :model-value="property.value" @update:model-value="updateField(`${key}`, property, !!$event)" />
      </template>
      <template v-if="property.kind == PropertyTypeKinds.String">
        <VTextField :label="$t(`${keyPrefix}${key}`)" :model-value="property.value" @update:model-value="updateField(`${key}`, property, $event)" />
      </template>
      <template v-else-if="property.kind == PropertyTypeKinds.Number">
        <VTextField
          :label="$t(`${keyPrefix}${key}`)"
          :model-value="property.value"
          :rules="[(value) => !Number.isNaN(Number.parseFloat(value))]"
          @update:model-value="updateField(`${key}`, property, Number.parseFloat($event))"
        />
      </template>
      <template v-else-if="property.kind == PropertyTypeKinds.Enum">
        <VCombobox :label="$t(`${keyPrefix}${key}`)" :items="Object.keys(property.values)" @update:model-value="$event && updateField(`${key}`, property, property.values[$event])" />
      </template>
      <template v-else-if="property.kind == PropertyTypeKinds.Object">
        <VLabel class="text-h5" :text="$t(`${keyPrefix}${key}`) + ':'" /><br>
        <PropertiesSettings
          :component-id="componentId"
          :properties="property.value"
          :property-path="`${propertyPath}_${key}`"
          @update-property="updateField(`${key}`, property, { ...property.value, ...{ [$event.key]: $event.value } })"
        />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { SheetComponentProperties, SheetComponentPropertyTypeDefinition, PropertyTypeKinds, WithValue, SheetComponentPropertyType } from '@/common/sheetComponent';
  import { useTemplateEditorStore } from '@/store/templateEditor';
  import { computed } from 'vue';

  export interface Props {
    properties: SheetComponentProperties<SheetComponentPropertyTypeDefinition> | undefined,
    componentId: string,
    propertyPath?: string
  }

  const templateEditorStore = useTemplateEditorStore()

  const props = withDefaults(defineProps<Props>(), { propertyPath: "" })

  const keyPrefix = computed(() => `Components._${templateEditorStore.template[props.componentId].name}.${props.propertyPath ? props.propertyPath + '.' : ''}`)

  const emit = defineEmits({
    updateProperty<T extends WithValue<SheetComponentPropertyType>>(payload: { key: string, value: T, componentId: string }) {
      return payload.key != null && payload.key.length > 0 && payload.value != undefined;
    }
  })

  function updateField<T extends WithValue<SheetComponentPropertyType>>(key: string, property: T, value: T["value"]) {
    console.log("PropertiesSettings: updateField: ", key, property, " = ", value)
    const newProperty: T = { ...property, "value": value }
    emit("updateProperty", { key, value: newProperty, componentId: props.componentId })
  }

</script>
