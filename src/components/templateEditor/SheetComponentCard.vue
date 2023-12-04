<template>
  <VCard
    class="mx-auto"
    :image="component.image"
    :title="component.name"
  ></VCard>
</template>

<script setup lang="ts">
  import { SheetComponent } from '@/common/sheetComponent.js';

  type Props = {
    component: SheetComponent
  }
  defineProps<Props>()
</script>
