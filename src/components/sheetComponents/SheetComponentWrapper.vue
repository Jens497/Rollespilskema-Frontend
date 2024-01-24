<template>
  <component :is="vueComponentOf(component)" v-if="vueComponentOf(component) != undefined" v-bind="props" />
  <VCard v-else :title="component.name" class="sheet-component" />
</template>

<script lang=ts setup>
  import { SheetComponent, vueComponentOf } from "@/common/sheetComponentDefinitions"

  interface Props {
    component: SheetComponent
  }

  const props = defineProps<Props>()

  defineExpose<Props>(props)
</script>


<style scoped>
  .sheet-component {
    width: fit-content;
    min-width: max-content;
    height: fit-content;
  }
</style>
