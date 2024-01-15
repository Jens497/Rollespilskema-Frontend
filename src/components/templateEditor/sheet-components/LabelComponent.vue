<template>
  <p
    class="label-component"
    :class="{
      'font-weight-bold': props.component.properties.font.value.bold.value,
      'font-italic': props.component.properties.font.value.italic.value
    }"
  >
    {{ component.properties.text.value }}
  </p>
</template>

<script lang=ts setup>
  import { SheetComponent } from '@/common/sheetComponent';
  import { properties, type Properties } from "@/common/sheetComponentProperties/Label"
  import { computed } from 'vue';


  type Props = {
    component: SheetComponent<Properties>
  }

  const props = defineProps<Props>()
  const fontSize = computed(() => props.component.properties.font.value.size.value + 'pt')
</script>


<style scoped>
  .label-component {
    width: fit-content;
    min-width: max-content;
    height: fit-content;
    font-size: v-bind('fontSize');
  }
</style>
