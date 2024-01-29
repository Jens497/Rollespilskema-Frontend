<template>
  <v-textarea
    ref="el"
    class="input-component"
    :class="{
      'font-weight-bold': props.component.properties.internal.font.value.bold.value,
      'font-italic': props.component.properties.internal.font.value.italic.value,
    }"
    :model-value="props.component.properties.internal.text.value"
    :label="props.component.properties.internal.label.value"
    :variant="props.component.properties.internal.style.value"
    :single-line="false"
    :hint="props.component.properties.internal.hint.value"
    hide-details="auto"
    no-resize
    density="compact"
    :rows="rows"
    @update:focused="isFocused = $event"
    @update:model-value="onUpdateText"
    @mousedown:control="onClickControl"
    @click:control="onClickControl"
  />
</template>

<script lang=ts setup>
  import { type Properties } from "@/common/sheetComponentProperties/TextInput"
  import { computed } from 'vue';
  import { SheetComponentProps } from './SheetComponentWrapper.vue';
  import { px } from '@/util/CssUnits';
  import { ref } from "vue";

  interface Props extends SheetComponentProps<Properties> {
  }

  // TODO handle multiline
  const props = defineProps<Props>()
  const emit = defineEmits<{ click: [payload: MouseEvent] }>()
  const el = ref<HTMLElement>()

  const fontSize = computed(() => props.component.properties.internal.font.value.size.value)
  const height = computed(() => props.component.properties.common.size.value.height.value)
  const rows = computed(() => Math.max(1, Math.round((height.value / (fontSize.value + 7) - 2))))

  const onUpdateText = (newValue: string) => props.patchProperties({ internal: { text: { value: newValue } } });

  const isFocused = ref(false);
  const lastFocusValue = ref(false);


  function onClickControl(event: MouseEvent) {
    if (isFocused.value && lastFocusValue.value) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      console.log(`${event.type}:control  -  if`, event)
    } else {
      console.log(`${event.type}:control  -  else`, event)
    }
    lastFocusValue.value = isFocused.value
  }
</script>


<style scoped>
  .input-component {
    box-sizing: border-box;
    font-size: v-bind('px(fontSize)');
    height: 100%;
  }
</style>
