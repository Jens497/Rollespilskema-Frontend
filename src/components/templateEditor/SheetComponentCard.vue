<template>
  <VCard
    class="mx-auto"
    :image="component.image"
    :title="component.name"
  ></VCard>
</template>

<script setup lang="ts">
  import { SheetComponentType } from '@/common/sheetComponent.js';

  type Props = {
    component: SheetComponentType
  }
  defineProps<Props>()
</script>
