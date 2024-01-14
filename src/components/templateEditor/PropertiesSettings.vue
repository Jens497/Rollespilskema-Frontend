<template>
  <div v-if="properties != undefined">
    <template v-for="(property, key) in properties " :key="key">
      <template v-if="property.kind == PropertyTypeKinds.String">
        <VTextField :label="`${key}`" :model-value="property.value" @update:model-value="updateField(property, $event)" />
      </template>
      <template v-else-if="property.kind == PropertyTypeKinds.Number">
        <VTextField :label="`${key}`" :model-value="property.value"
          :rules="[(value) => !Number.isNaN(Number.parseFloat(value))]"
          @update:model-value="updateField(property, Number.parseFloat($event))" />
      </template>
      <template v-else-if="property.kind == PropertyTypeKinds.Enum">
        <VCombobox :label="key + ''" :items="Object.entries(property.values).map(([k, v]) => ({ title: k, value: v }))" />
      </template>
      <template v-else-if="property.kind == PropertyTypeKinds.Object">
        <VLabel :text="`${key}:`" /><br />
        <PropertiesSettings :properties="property.value" />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { SheetComponentProperties, SheetComponentPropertyTypeDefinition, PropertyTypeKinds, WithValue, SheetComponentPropertyType } from '@/common/sheetComponent';
  import { defineEmits, ref } from 'vue';
  export interface Props {
    properties: SheetComponentProperties<SheetComponentPropertyTypeDefinition> | undefined,
  }
  const props = defineProps<Props>()
  const value = ref({ title: "Green", value: "#00ff00" })
  const emit = defineEmits({
    updateProperty<T extends WithValue<SheetComponentPropertyType>>(payload: { property: T, value: T["value"] }) {
      return payload.property != null && payload.value != undefined;
    }
  })


  function updateField<T extends WithValue<SheetComponentPropertyType>>(property: T, value: T["value"]) {
    emit("updateProperty", { property, value })
  }

</script>
