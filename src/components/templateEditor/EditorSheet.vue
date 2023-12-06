<template>
  <VSheet>
    <VCard v-for="(component, index) in components" :key="index" :title="component.name" />
  </VSheet>
</template>

<script lang=ts setup>
  import { SheetComponent } from '@/common/sheetComponent';

  type Props = {
    components: SheetComponent[]
  }

  defineProps<Props>()
  defineEmits(['update:components'])
</script>
