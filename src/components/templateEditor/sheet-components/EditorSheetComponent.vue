<template>
  <VCard :title="component.name" class="sheet-component" />
</template>

<script lang=ts setup>
  import { SheetComponent } from '@/common/sheetComponent';
  type Props = {
    component: SheetComponent
  }

  defineProps<Props>()
</script>


<style>
  .sheet-component {
    width: fit-content;
    min-width: max-content;
    height: fit-content;
  }
</style>
