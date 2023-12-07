<template>
  <VCard
    :title="component.name"
    :style="{top: component.pos.y + 'px', left: component.pos.x + 'px'}"
    @click="onClick"
  />
</template>

<script lang=ts setup>
  import { SheetComponent } from '@/common/sheetComponent';
  

  type Props = {
    component: SheetComponent
  } & VCard
  defineProps<Props>()
  function onClick() {
  }
</script>
