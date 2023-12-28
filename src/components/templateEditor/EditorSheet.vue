<template>
  <VSheet class="sheet-container">
    <EditorSheetComponent v-for="(component, index) in components"
      :key="index"
      :component="component"
      :isSelected="component == templateStore.selectedComponent"
      class="sheet-component"
      @click="templateStore.selectedComponent != component ? templateStore.selectedComponent = component : templateStore.selectedComponent = undefined"
    />
  </VSheet>
</template>

<script lang=ts setup>
  import { SheetComponent } from '@/common/sheetComponent';
  import EditorSheetComponent from '@/components/templateEditor/sheet-components/EditorSheetComponent.vue'
  import { useTemplateStore } from '@/store/template';


  type Props = {
    components: SheetComponent[]
  }

  defineProps<Props>()
  defineEmits(['update:components'])
  const templateStore = useTemplateStore()
</script>

<style>
  .sheet-container {
    position: relative;
    overflow: auto;
    height: 100%;
    width: 100%;
  }
  .sheet-component {
    position: absolute;
  }
</style>
