<template>
  <div
    v-if="properties != undefined"
    :style="{
      paddingLeft: px(nestingLevel * 4),
      borderLeft: nestingLevel > 0 ? `1px solid ${borderColor}` : ''
    }"
  >
    <template v-for="(property, key) in properties " :key="key">
      <template v-if="property.kind == PropertyTypeKinds.Boolean">
        <VCheckbox
          :label="translateKey(key)"
          :model-value="property.value"
          hide-details="auto"
          density="compact"
          @update:model-value="updateField(`${key}`, property, !!$event)"
        />
      </template>
      <template v-if="property.kind == PropertyTypeKinds.String">
        <VTextarea
          :label="translateKey(key)"
          :model-value="property.value"
          auto-grow
          :rows="1"
          hide-details="auto"
          density="comfortable"
          @update:model-value="updateField(`${key}`, property, $event)"
        />
      </template>
      <template v-else-if="property.kind == PropertyTypeKinds.Number">
        <VTextField
          :label="translateKey(key)"
          :model-value="property.value"
          :rules="[(value) => !Number.isNaN(Number.parseFloat(value))]"
          inputmode="decimal"
          hide-details="auto"
          density="comfortable"
          @update:model-value="updateField(`${key}`, property, Number.parseFloat($event))"
        />
      </template>
      <template v-else-if="property.kind == PropertyTypeKinds.Enum">
        <VCombobox
          :label="translateKey(key)"
          :items="enumToItems(`${key}`, property)"
          :model-value="property.value"
          :return-object="false"
          hide-details="auto"
          density="comfortable"
          @update:model-value="$event && updateField(`${key}`, property, $event)"
        />
      </template>
      <template v-else-if="property.kind == PropertyTypeKinds.Object">
        <VLabel :class="[`text-h${5 + nestingLevel}`, `mt-5`]" :text="translateKey(key) + ':'" /><br>
        <VLazy>
          <PropertiesSettings
            :properties="property.value"
            :property-path="`${propertyPath}._${key}`"
            :nesting-level="nestingLevel + 1"
            @update-property="updateField(`${key}`, property, { ...property.value, ...{ [$event.key]: $event.value } })"
          />
        </VLazy>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { PropertyTypeKinds, WithValue, SheetComponentPropertyType, EnumSheetComponentProperty } from '@/common/sheetComponent';
  import { SheetComponentProperties, SheetComponentPropertyTypeDefinition } from '@/common/sheetComponentDefinitions';
  import { px } from '@/util/CssUnits';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useTheme } from 'vuetify/lib/framework.mjs';

  export interface Props {
    properties: SheetComponentProperties<SheetComponentPropertyTypeDefinition> | undefined,
    propertyPath: string,
    nestingLevel?: number
  }
  export type EmitUpdatePropertyParams<T extends WithValue<SheetComponentPropertyType>> = {
    key: string,
    value: T,
  }
  const props = withDefaults(defineProps<Props>(), { nestingLevel: 0 })
  const emit = defineEmits<{ updateProperty: [payload: EmitUpdatePropertyParams<WithValue<SheetComponentPropertyType>>] }>()

  const theme = useTheme()
  const borderColor = computed(() => theme.current.value.colors.primary)

  const { t } = useI18n()

  function translateKey(key: string | number): string {
    return t(`${props.propertyPath}.${key}`, `${key}`);
  }

  function updateField<T extends WithValue<SheetComponentPropertyType>>(key: string, property: T, value: T["value"]) {
    console.debug("PropertiesSettings: updateField: ", key, property, " = ", value)
    const newProperty: T = { ...property, "value": value }
    emit("updateProperty", { key, value: newProperty })
  }

  function enumToItems(key: string, enumProperty: EnumSheetComponentProperty): { title: string, value: string | number }[] {
    return Object.entries(enumProperty.values).map(([name, value]) => ({ title: translateKey(`_${key}.${name}`), value: value }))
  }
</script>

<style scoped>
  /* Separate sibling text fields to better distinguish them */
  .v-text-field+.v-text-field {
    margin-top: 10px;
  }
</style>
