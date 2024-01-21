<template>
  <div v-if="properties != undefined">
    <template v-for="(property, key) in properties " :key="key">
      <template v-if="property.kind == PropertyTypeKinds.Boolean">
        <VCheckbox
          :label="translateKey(keyPrefix, key)"
          :model-value="property.value"
          @update:model-value="updateField(`${key}`, property, !!$event)"
        />
      </template>
      <template v-if="property.kind == PropertyTypeKinds.String">
        <VTextField
          :label="translateKey(keyPrefix, key)"
          :model-value="property.value"
          @update:model-value="updateField(`${key}`, property, $event)"
        />
      </template>
      <template v-else-if="property.kind == PropertyTypeKinds.Number">
        <VTextField
          :label="translateKey(keyPrefix, key)"
          :model-value="property.value"
          :rules="[(value) => !Number.isNaN(Number.parseFloat(value))]"
          @update:model-value="updateField(`${key}`, property, Number.parseFloat($event))"
        />
      </template>
      <template v-else-if="property.kind == PropertyTypeKinds.Enum">
        <VCombobox
          :label="translateKey(keyPrefix, key)"
          :items="enumToItems(`${key}`, property)"
          :model-value="property.value"
          :return-object="false"
          @update:model-value="$event && updateField(`${key}`, property, $event)"
        />
      </template>
      <template v-else-if="property.kind == PropertyTypeKinds.Object">
        <VLabel class="text-h5" :text="translateKey(keyPrefix, key) + ':'" /><br>
        <PropertiesSettings
          :component-id="componentId"
          :properties="property.value"
          :property-group="propertyGroup"
          :property-path="`${propertyPath}_${key}`"
          @update-property="updateField(`${key}`, property, { ...property.value, ...{ [$event.key]: $event.value } })"
        />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { PropertyTypeKinds, WithValue, SheetComponentPropertyType, EnumSheetComponentProperty } from '@/common/sheetComponent';
  import { SheetComponent, SheetComponentProperties, SheetComponentPropertyTypeDefinition } from '@/common/sheetComponentDefinitions';
  import { useTemplateEditorStore } from '@/store/templateEditor';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  type PropertyGroup = keyof SheetComponent["properties"]
  export interface Props {
    properties: SheetComponentProperties<SheetComponentPropertyTypeDefinition> | undefined,
    componentId: string,
    propertyGroup: PropertyGroup,
    propertyPath?: string,
  }

  const templateEditorStore = useTemplateEditorStore()

  const props = withDefaults(defineProps<Props>(), { propertyPath: "" })

  const componentPrefixKey = computed(() => props.propertyGroup != "common" ? `._${templateEditorStore.template[props.componentId].name}` : "")
  const keyPrefix = computed(() => `Properties.${props.propertyGroup}${componentPrefixKey.value}.${props.propertyPath ? props.propertyPath + '.' : ''}`)

  export type EmitUpdatePropertyParams<T extends WithValue<SheetComponentPropertyType>> = {
    propertyGroup: PropertyGroup,
    key: string,
    value: T,
    componentId: string
  }

  const emit = defineEmits<{ updateProperty: [payload: EmitUpdatePropertyParams<WithValue<SheetComponentPropertyType>>] }>()

  const { t } = useI18n()

  function translateKey(keyPrefix: string, key: string | number): string {
    return t(`${keyPrefix}${key}`, `${key}`);
  }

  function updateField<T extends WithValue<SheetComponentPropertyType>>(key: string, property: T, value: T["value"]) {
    console.log("PropertiesSettings: updateField: ", key, property, " = ", value)
    const newProperty: T = { ...property, "value": value }
    emit("updateProperty", { propertyGroup: props.propertyGroup, key, value: newProperty, componentId: props.componentId })
  }


  function enumToItems(key: string, enumProperty: EnumSheetComponentProperty): { title: string, value: string | number }[] {
    return Object.entries(enumProperty.values).map(([name, value]) => ({ title: translateKey(keyPrefix.value, `_${key}.${name}`), value: value }))
  }
</script>
