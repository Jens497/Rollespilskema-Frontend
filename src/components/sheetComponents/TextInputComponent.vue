<template>
  <v-textarea
    class="input-component"
    :class="{
      'font-weight-bold': props.component.properties.internal.appearance.value.font.value.bold.value,
      'font-italic': props.component.properties.internal.appearance.value.font.value.italic.value,
    }"
    :model-value="props.component.properties.internal.contents.value.text.value"
    :label="props.component.properties.internal.contents.value.label.value"
    :variant="props.component.properties.internal.appearance.value.style.value"
    :single-line="false"
    :hint="props.component.properties.internal.contents.value.hint.value"
    hide-details="auto"
    no-resize
    :rows="rows"
    @update:focused="isFocused = $event"
    @update:model-value="onUpdateText"
    @mousedown:control.stop="onClickControl"
    @click:control.stop
  />
</template>

<script lang=ts setup>
  import { type Properties } from "@/common/sheetComponentProperties/TextInput"
  import { computed } from 'vue';
  import { SheetComponentProps } from './SheetComponentWrapper.vue';
  import { px } from '@/util/CssUnits';
  import { ref } from "vue";
  import { useEditorTemplate } from "@/composables/useEditorTemplate";
  import { tryOrDefault } from "@/util/tsUtils";

  interface Props extends SheetComponentProps<Properties> {
  }

  // TODO handle multiline & input type
  const props = defineProps<Props>()

  const fontSize = computed(() => props.component.properties.internal.appearance.value.font.value.size.value)
  const height = computed(() => props.component.properties.common.size.value.height.value)
  const rows = computed(() => Math.max(1, Math.floor((height.value / (fontSize.value * 1.5)) - 3)))
  const editorTemplate = tryOrDefault(useEditorTemplate, undefined)

  const onUpdateText = (newValue: string) => props.patchProperties({ internal: { contents: { value: { text: { value: newValue } } } } });

  const isFocused = ref(false);

  function onClickControl(_event: MouseEvent) {
    if (!isFocused.value) {
      editorTemplate?.selectComponentByIdentity(props.component)
    }
  }
</script>


<style scoped>
  .input-component {
    box-sizing: border-box;
    font-size: v-bind('px(fontSize)');
    height: 100%;
    margin: v-bind('props.component.properties.internal.appearance.value.style.value == "outlined" ? px(fontSize / 3) : px(0)');
  }
</style>
