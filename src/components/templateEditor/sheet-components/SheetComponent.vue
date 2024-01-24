<template>
  <component :is="vueComponentOf(component)" v-if="vueComponentOf(component) != undefined" :component="component" />
  <VCard v-else :title="component.name" class="sheet-component" />
</template>

<script lang=ts setup>
  import { vueComponentOf } from "@/common/sheetComponentDefinitions"
  import { SheetComponent } from '@/common/sheetComponentDefinitions';
  export interface SheetComponentProps {
    component: SheetComponent
  }

  defineProps<SheetComponentProps>()
</script>


<style scoped>
  .sheet-component {
    width: fit-content;
    min-width: max-content;
    height: fit-content;
  }
</style>
