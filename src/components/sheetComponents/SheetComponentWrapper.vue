<template>
  <div class="sheet-component">
    <component
      :is="vueComponentOf(component)"
      v-if="vueComponentOf(component) != undefined"
      v-bind="props"
    />
    <VCard v-else :title="component.name" />
  </div>
</template>

<script lang=ts setup>
  import { SheetComponent, SheetComponentPropertyTypeDefinition, vueComponentOf } from "@/common/sheetComponentDefinitions"
  import { px } from "@/util/CssUnits";
  import { _DeepPartial } from "pinia";

  export interface SheetComponentProps<T extends SheetComponentPropertyTypeDefinition = SheetComponentPropertyTypeDefinition> {
    component: SheetComponent<T>
    patchProperties: (updates: _DeepPartial<SheetComponent<T>["properties"]>) => void
  }

  const props = defineProps<SheetComponentProps>()

  defineExpose<SheetComponentProps>(props)
</script>


<style scoped>
  .sheet-component {
    box-sizing: content-box;
    height: v-bind('px(props.component.properties.common.size.value.height.value)');
    width: v-bind('px(props.component.properties.common.size.value.width.value)');
    overflow: hidden;
  }
</style>
