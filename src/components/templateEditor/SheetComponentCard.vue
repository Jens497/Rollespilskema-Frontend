<template>
  <VCard
    class="mx-auto"
    :image="component.image"
    :title="component.name"
  />
</template>

<script setup lang="ts">
  import { SheetComponentType } from '@/common/sheetComponentDefinitions';

  type Props = {
    component: SheetComponentType
  }
  defineProps<Props>()
</script>
