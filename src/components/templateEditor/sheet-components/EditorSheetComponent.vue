<template>
  <VCard
    :title="component.name"
    class="sheet-component"
    :style="{
      top: component.pos.y + 'px',
      left: component.pos.x + 'px',
      borderStyle: isSelected ? 'solid' : 'none',
      borderWidth: '2px'
    }"
    @click="onClick"
  />
</template>

<script lang=ts setup>
  import { SheetComponent } from '@/common/sheetComponent';


  type Props = {
    component: SheetComponent,
    isSelected: boolean
  }
  withDefaults(
    defineProps<Props>(),
    { isSelected: false }
  )
  function onClick() {
  }
</script>


<style>
  .sheet-component {
    width: fit-content;
    min-width: max-content;
    height: fit-content;
  }
</style>
