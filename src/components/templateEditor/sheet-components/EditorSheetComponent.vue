<template>
  <VCard
    :title="component.name"
    class="sheet-component"
    :style="{top: component.pos.y + 'px', left: component.pos.x + 'px'}"
    @click="onClick"
  />
</template>

<script lang=ts setup>
  import { SheetComponent } from '@/common/sheetComponent';


  type Props = {
    component: SheetComponent
  }
  defineProps<Props>()
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
