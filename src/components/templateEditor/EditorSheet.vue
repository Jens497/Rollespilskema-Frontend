<template>
  <VSheet class="sheet-container">
    <EditorSheetComponent v-for="(component, index) in components"  :key="index" :component="component" class="sheet-component"/>
  </VSheet>
</template>

<script lang=ts setup>
  import { SheetComponent } from '@/common/sheetComponent';
  import EditorSheetComponent  from '@/components/templateEditor/sheet-components/EditorSheetComponent.vue'

  type Props = {
    components: SheetComponent[]
  }

  defineProps<Props>()
  defineEmits(['update:components'])
</script>

<style>
  .sheet-container {
    position: relative;
  }
  .sheet-component {
    position: absolute;
  }
</style>
